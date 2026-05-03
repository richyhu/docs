import type { ChatMessage as ChatMessageType } from "@/types"
import { Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  if (message.role === "system") return null

  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
        isUser ? "bg-slate-800 text-white" : "bg-orange-100 text-orange-600"
      }`}>
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? "bg-slate-800 text-white rounded-tr-md"
          : "bg-slate-50 text-slate-800 rounded-tl-md"
      }`}>
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="prose prose-sm prose-slate max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-headings:my-2 prose-pre:bg-[#0c1222] prose-pre:text-xs">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content || "思考中..."}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}
