import { useState, useEffect } from "react"
import { getArticleBySlug } from "@/data/docs"
import type { DocArticle } from "@/types"

export function useDocContent(slug: string | undefined) {
  const [article, setArticle] = useState<DocArticle | null>(null)

  useEffect(() => {
    if (slug) {
      const found = getArticleBySlug(slug)
      setArticle(found || null)
    } else {
      setArticle(null)
    }
  }, [slug])

  return { article }
}
