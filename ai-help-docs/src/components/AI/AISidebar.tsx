import { useAIStore } from "@/stores/aiStore"
import { useAIChat } from "@/hooks/useAIChat"
import { MessageSquare, X, Send, Trash2, Square } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import ChatMessage from "./ChatMessage"

export default function AISidebar() {
  const { isOpen, conversations, activeConversationId, isLoading, toggleSidebar, openSidebar, clearConversation, setActiveConversation, createConversation } = useAIStore()
  const { sendMessage, stopGeneration } = useAIChat()
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const activeConv = conversations.find(c => c.id === activeConversationId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConv?.messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    const pageContent = activeConv?.pageContext || ""
    sendMessage(input.trim(), pageContent)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleClear = () => {
    if (activeConversationId) {
      clearConversation(activeConversationId)
    }
  }

  const handleNewConversation = (context: string) => {
    createConversation(context)
    setInput("")
  }

  if (!isOpen) {
    return (
      <button
        onClick={openSidebar}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-30 bg-slate-800 text-white p-3 rounded-l-xl shadow-lg hover:bg-slate-700 transition-all hover:pr-4 group border border-slate-600 border-r-0"
        title="打开 AI 助手"
      >
        <MessageSquare size={20} className="group-hover:text-orange-400 transition-colors" />
      </button>
    )
  }

  return (
    <aside className="w-[380px] shrink-0 h-screen sticky top-0 flex flex-col bg-white border-l border-slate-100 shadow-xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-400/20 flex items-center justify-center">
            <MessageSquare size={16} className="text-orange-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">AI 助手</h3>
            <p className="text-slate-300 text-xs">基于当前文档回答</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {activeConversationId && (
            <button
              onClick={handleClear}
              className="p-1.5 text-slate-300 hover:text-orange-400 transition-colors rounded-lg hover:bg-white/10"
              title="清除对话"
            >
              <Trash2 size={16} />
            </button>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!activeConv || activeConv.messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4">
              <MessageSquare size={28} className="text-slate-300" />
            </div>
            <h4 className="text-slate-800 font-semibold mb-2">AI 文档助手</h4>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              我可以基于当前文档内容<br />回答您的问题
            </p>
            <div className="space-y-2">
              {["解释当前文档的核心内容", "这个功能如何使用？", "总结这篇文档的要点"].map(q => (
                <button
                  key={q}
                  onClick={() => {
                    const ctx = activeConv?.pageContext || ""
                    if (!activeConversationId) handleNewConversation(ctx)
                    sendMessage(q, ctx)
                  }}
                  className="block w-full text-left text-sm px-4 py-2.5 rounded-xl bg-slate-50 text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          activeConv.messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入您的问题..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/40 transition-all"
            disabled={isLoading}
          />
          {isLoading ? (
            <button
              onClick={stopGeneration}
              className="p-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
              title="停止生成"
            >
              <Square size={16} />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
