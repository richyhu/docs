import { useCallback, useRef } from "react"
import { useAIStore } from "@/stores/aiStore"
import { streamChat, buildSystemPrompt } from "@/services/openrouter"
import type { ChatMessage } from "@/types"

export function useAIChat() {
  const abortRef = useRef<AbortController | null>(null)
  const {
    addMessage,
    updateLastAssistantMessage,
    createConversation,
    activeConversationId,
    conversations,
    setLoading,
    isLoading,
  } = useAIStore()

  const sendMessage = useCallback(async (content: string, pageContext: string) => {
    let convId = activeConversationId
    if (!convId) {
      convId = createConversation(pageContext)
    }

    const userMessage: ChatMessage = { role: "user", content }
    addMessage(convId, userMessage)

    const conv = useAIStore.getState().conversations.find(c => c.id === convId)
    const systemMessage = buildSystemPrompt(pageContext)
    const assistantPlaceholder: ChatMessage = { role: "assistant", content: "" }
    addMessage(convId, assistantPlaceholder)

    const allMessages = [systemMessage, ...(conv?.messages || []), userMessage]

    setLoading(true)
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    let accumulated = ""

    await streamChat(allMessages, {
      onChunk: (text) => {
        accumulated += text
        updateLastAssistantMessage(convId!, accumulated)
      },
      onDone: () => {
        setLoading(false)
      },
      onError: (error) => {
        updateLastAssistantMessage(convId!, `抱歉，发生了错误：${error.message}`)
        setLoading(false)
      },
    }, controller.signal)
  }, [activeConversationId, addMessage, createConversation, updateLastAssistantMessage, setLoading])

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort()
    setLoading(false)
  }, [setLoading])

  return { sendMessage, stopGeneration, isLoading }
}
