import { useState, useEffect, useCallback } from "react"

interface SelectionState {
  text: string
  rect: DOMRect | null
}

export function useSelection(containerRef: React.RefObject<HTMLElement | null>) {
  const [selection, setSelection] = useState<SelectionState>({ text: "", rect: null })

  const handleSelectionChange = useCallback(() => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      setSelection({ text: "", rect: null })
      return
    }

    const range = sel.getRangeAt(0)
    const container = containerRef.current
    if (container && !container.contains(range.commonAncestorContainer)) {
      return
    }

    const text = sel.toString().trim()
    if (text.length > 0) {
      const rect = range.getBoundingClientRect()
      setSelection({ text, rect })
    }
  }, [containerRef])

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange)
    document.addEventListener("mousedown", (e) => {
      const target = e.target as HTMLElement
      if (!target.closest("[data-floating-toolbar]")) {
        setTimeout(() => {
          if (!window.getSelection()?.toString().trim()) {
            setSelection({ text: "", rect: null })
          }
        }, 100)
      }
    })
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [handleSelectionChange])

  const clearSelection = useCallback(() => {
    window.getSelection()?.removeAllRanges()
    setSelection({ text: "", rect: null })
  }, [])

  return { selection, clearSelection }
}
