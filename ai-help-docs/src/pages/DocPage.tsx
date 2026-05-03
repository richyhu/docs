import { useParams, Link } from "react-router-dom"
import { useRef } from "react"
import Sidebar from "@/components/Layout/Sidebar"
import DocContent from "@/components/Docs/DocContent"
import AISidebar from "@/components/AI/AISidebar"
import FloatingToolbar from "@/components/AI/FloatingToolbar"
import { useDocContent } from "@/hooks/useDocContent"
import { useSelection } from "@/hooks/useSelection"
import { ChevronRight } from "lucide-react"
import { docCategories } from "@/data/docs"

export default function DocPage() {
  const { slug } = useParams<{ slug: string }>()
  const { article } = useDocContent(slug)
  const contentRef = useRef<HTMLDivElement>(null)
  const { selection, clearSelection } = useSelection(contentRef)

  if (!article) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center bg-slate-50/30">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">文档未找到</h2>
            <p className="text-slate-400 mb-6">请从导航栏选择一篇文档</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
            >
              返回首页
            </Link>
          </div>
        </main>
        <AISidebar />
      </div>
    )
  }

  const category = docCategories.find(c => c.id === article.category)
  const currentCatArticles = category?.articles || []
  const currentIdx = currentCatArticles.findIndex(a => a.slug === article.slug)
  const prevArticle = currentIdx > 0 ? currentCatArticles[currentIdx - 1] : null
  const nextArticle = currentIdx < currentCatArticles.length - 1 ? currentCatArticles[currentIdx + 1] : null

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-12" ref={contentRef}>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link to="/" className="hover:text-slate-600 transition-colors">首页</Link>
            <ChevronRight size={14} />
            <span className="text-slate-600">{category?.title}</span>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-medium">{article.title}</span>
          </div>
          <DocContent content={article.content} />
          <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between gap-4">
            {prevArticle ? (
              <Link
                to={`/docs/${prevArticle.slug}`}
                className="flex-1 p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all group"
              >
                <div className="text-xs text-slate-400 mb-1">上一篇</div>
                <div className="text-sm font-medium text-slate-800 group-hover:text-slate-600">
                  ← {prevArticle.title}
                </div>
              </Link>
            ) : <div />}
            {nextArticle ? (
              <Link
                to={`/docs/${nextArticle.slug}`}
                className="flex-1 p-4 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/50 transition-all text-right group"
              >
                <div className="text-xs text-slate-400 mb-1">下一篇</div>
                <div className="text-sm font-medium text-slate-800 group-hover:text-slate-600">
                  {nextArticle.title} →
                </div>
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>
      <AISidebar />
      {selection.text && selection.rect && (
        <FloatingToolbar
          selectedText={selection.text}
          position={{ x: selection.rect.x + selection.rect.width / 2, y: selection.rect.y }}
          pageContext={article.content}
          onAction={clearSelection}
        />
      )}
    </div>
  )
}
