import { Link } from "react-router-dom"
import { BookOpen } from "lucide-react"

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <BookOpen size={22} className="text-indigo-700 group-hover:text-amber-500 transition-colors" />
          <span className="font-bold text-indigo-900 group-hover:text-indigo-700 transition-colors">
            AI 帮助中心
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-indigo-400 hidden sm:block">
            智能文档 · AI 驱动
          </span>
        </div>
      </div>
    </header>
  )
}
