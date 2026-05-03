import { Lightbulb, Languages, FileText, HelpCircle } from "lucide-react"
import { useAIStore } from "@/stores/aiStore"
import { useAIChat } from "@/hooks/useAIChat"

interface FloatingToolbarProps {
  selectedText: string
  position: { x: number; y: number }
  pageContext: string
  onAction: () => void
}

const actions = [
  { key: "explain", label: "解释", icon: Lightbulb, prompt: "请解释以下内容：" },
  { key: "translate", label: "翻译", icon: Languages, prompt: "请将以下内容翻译为中文：" },
  { key: "summarize", label: "总结", icon: FileText, prompt: "请总结以下内容的要点：" },
  { key: "ask", label: "提问", icon: HelpCircle, prompt: "关于以下内容，" },
]

export default function FloatingToolbar({ selectedText, position, pageContext, onAction }: FloatingToolbarProps) {
  const { openSidebar, createConversation, activeConversationId } = useAIStore()
  const { sendMessage } = useAIChat()

  const handleAction = (prompt: string) => {
    openSidebar()
    if (!activeConversationId) {
      createConversation(pageContext)
    }
    setTimeout(() => {
      sendMessage(`${prompt}\n\n${selectedText}`, pageContext)
    }, 100)
    onAction()
  }

  return (
    <div
      data-floating-toolbar
      className="fixed z-50 flex items-center gap-1 bg-white rounded-xl shadow-xl border border-indigo-100 p-1.5 animate-in fade-in duration-200"
      style={{
        left: `${position.x}px`,
        top: `${position.y - 52}px`,
        transform: "translateX(-50%)",
      }}
    >
      {actions.map(action => (
        <button
          key={action.key}
          onClick={() => handleAction(action.prompt)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-indigo-700 hover:bg-indigo-50 hover:text-indigo-900 transition-colors whitespace-nowrap"
        >
          <action.icon size={14} />
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  )
}
