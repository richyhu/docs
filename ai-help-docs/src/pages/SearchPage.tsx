import { useSearchParams, Link } from "react-router-dom"
import { Search, FileText, ChevronRight } from "lucide-react"
import { getAllArticles, docCategories } from "@/data/docs"
import Header from "@/components/Layout/Header"
import { useMemo } from "react"

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return getAllArticles().filter(
      a => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white">
      <Header />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
          <input
            type="text"
            defaultValue={query}
            placeholder="搜索文档..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-indigo-100 text-indigo-900 placeholder-indigo-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/40 transition-all text-lg shadow-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const val = (e.target as HTMLInputElement).value
                window.location.href = `/search?q=${encodeURIComponent(val)}`
              }
            }}
          />
        </div>

        {query ? (
          <div>
            <p className="text-indigo-400 text-sm mb-6">
              找到 {results.length} 个与 "{query}" 相关的结果
            </p>
            {results.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                  <Search size={28} className="text-indigo-300" />
                </div>
                <h3 className="text-indigo-900 font-semibold mb-2">未找到相关文档</h3>
                <p className="text-indigo-400 text-sm">请尝试使用不同的关键词</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map(article => {
                  const cat = docCategories.find(c => c.id === article.category)
                  return (
                    <Link
                      key={article.slug}
                      to={`/docs/${article.slug}`}
                      className="block p-5 rounded-2xl bg-white border border-indigo-100 hover:border-amber-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                          <FileText size={18} className="text-indigo-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-amber-600 font-medium">{cat?.title}</span>
                          </div>
                          <h3 className="text-indigo-900 font-semibold group-hover:text-indigo-700 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-indigo-400 text-sm mt-1 line-clamp-2">
                            {article.content.replace(/[#*`>\-]/g, "").slice(0, 120)}...
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-indigo-300 group-hover:text-amber-400 transition-colors shrink-0 mt-3" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-indigo-300" />
            </div>
            <h3 className="text-indigo-900 font-semibold mb-2">输入关键词搜索文档</h3>
            <p className="text-indigo-400 text-sm">支持搜索文档标题和内容</p>
          </div>
        )}
      </div>
    </div>
  )
}
