import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

export default function DocContent({ content }: { content: string }) {
  return (
    <article className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-headings:font-bold prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-code:bg-slate-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#0c1222] prose-pre:border prose-pre:border-slate-700 prose-blockquote:border-orange-400 prose-blockquote:bg-orange-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-th:bg-slate-50 prose-th:text-slate-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
