import { useNavigate } from "react-router-dom"
import { Search, BookOpen } from "lucide-react"
import { docCategories } from "@/data/docs"
import CategoryCard from "./CategoryCard"

export default function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] py-24 px-6">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-amber-300 px-4 py-1.5 rounded-full text-sm mb-6 border border-white/10">
          <BookOpen size={16} />
          <span>AI 驱动的智能文档</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
          帮助中心
        </h1>
        <p className="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          集成 AI 智能助手的现代文档系统，让知识获取更高效、更智能
        </p>
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
          <input
            type="text"
            placeholder="搜索文档..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all text-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = (e.target as HTMLInputElement).value
                if (value) navigate(`/search?q=${encodeURIComponent(value)}`)
              }
            }}
          />
        </div>
      </div>
      <div className="relative max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {docCategories.map(cat => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  )
}
