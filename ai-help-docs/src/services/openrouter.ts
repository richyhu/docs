import type { ChatMessage } from "@/types"

const API_URL = "https://openrouter.ai/api/v1/chat/completions"
const MODEL = "z-ai/glm-4.5-air:free"
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || ""

interface StreamCallbacks {
  onChunk: (text: string) => void
  onDone: () => void
  onError: (error: Error) => void
}

export async function streamChat(
  messages: ChatMessage[],
  callbacks: StreamCallbacks,
  signal?: AbortSignal
) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "AI Help Docs",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: true,
      }),
      signal,
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error("No response body")

    const decoder = new TextDecoder()
    let buffer = ""

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split("\n")
      buffer = lines.pop() || ""

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed === "data: [DONE]") continue
        if (!trimmed.startsWith("data: ")) continue

        try {
          const json = JSON.parse(trimmed.slice(6))
          const content = json.choices?.[0]?.delta?.content
          if (content) {
            callbacks.onChunk(content)
          }
        } catch {
          // skip malformed JSON
        }
      }
    }

    callbacks.onDone()
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") return
    callbacks.onError(error instanceof Error ? error : new Error(String(error)))
  }
}

export function buildSystemPrompt(pageContext: string): ChatMessage {
  return {
    role: "system",
    content: `你是一个专业的帮助文档 AI 助手。请基于以下文档内容回答用户的问题。如果问题超出文档范围，请礼貌地说明并尝试提供有用的建议。\n\n当前页面文档内容：\n${pageContext}`,
  }
}
