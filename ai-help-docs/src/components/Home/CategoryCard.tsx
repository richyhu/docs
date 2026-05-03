import { useNavigate } from "react-router-dom"
import { Rocket, Sparkles, GraduationCap, HelpCircle } from "lucide-react"
import type { DocCategory } from "@/types"

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket size={24} />,
  Sparkles: <Sparkles size={24} />,
  GraduationCap: <GraduationCap size={24} />,
  HelpCircle: <HelpCircle size={24} />,
}

export default function CategoryCard({ category }: { category: DocCategory }) {
  const navigate = useNavigate()
  const firstSlug = category.articles[0]?.slug

  return (
    <button
      onClick={() => firstSlug && navigate(`/docs/${firstSlug}`)}
      className="group text-left bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 hover:bg-white/20 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/5 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400 mb-4 group-hover:bg-amber-400/30 transition-colors">
        {iconMap[category.icon] || <Sparkles size={24} />}
      </div>
      <h3 className="text-white font-semibold text-lg mb-2">{category.title}</h3>
      <p className="text-indigo-300 text-sm leading-relaxed">{category.description}</p>
      <div className="mt-4 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        {category.articles.length} 篇文档 →
      </div>
    </button>
  )
}
