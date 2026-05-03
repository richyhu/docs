import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

export default function DocContent({ content }: { content: string }) {
  return (
    <article className="prose prose-indigo max-w-none prose-headings:text-indigo-900 prose-headings:font-bold prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-indigo-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#1e1b4b] prose-pre:border prose-pre:border-indigo-800 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-th:bg-indigo-50 prose-th:text-indigo-900">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
