import { Link, useLocation } from "react-router-dom"
import { BookOpen, Menu, X } from "lucide-react"
import { useState } from "react"
import { docCategories } from "@/data/docs"

export default function Sidebar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const currentSlug = location.pathname.split("/docs/")[1] || ""

  const navContent = (
    <nav className="py-4">
      <div className="px-4 mb-4">
        <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm">
          ← 返回首页
        </Link>
      </div>
      {docCategories.map(cat => (
        <div key={cat.id} className="mb-3">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {cat.title}
          </div>
          {cat.articles.map(article => (
            <Link
              key={article.slug}
              to={`/docs/${article.slug}`}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 mx-2 rounded-xl text-sm transition-all duration-200 ${
                currentSlug === article.slug
                  ? "bg-slate-600/30 text-orange-300 font-medium border border-slate-500/30"
                  : "text-slate-200 hover:bg-white/5 hover:text-white"
              }`}
            >
              {article.title}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-800/90 backdrop-blur-sm rounded-xl text-white border border-slate-600/50"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className="hidden lg:block w-64 shrink-0 bg-[#0c1222]/5 border-r border-slate-100 h-screen sticky top-0 overflow-y-auto">
        <div className="p-4 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen size={20} className="text-slate-700" />
            <span className="font-bold text-slate-800">帮助中心</span>
          </Link>
        </div>
        {navContent}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileOpen(false)}>
          <aside
            className="w-72 h-full bg-white shadow-xl overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100">
              <Link to="/" className="flex items-center gap-2">
                <BookOpen size={20} className="text-slate-700" />
                <span className="font-bold text-slate-800">帮助中心</span>
              </Link>
            </div>
            {navContent}
          </aside>
        </div>
      )}
    </>
  )
}
