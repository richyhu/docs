export interface DocCategory {
  id: string
  title: string
  description: string
  icon: string
  articles: DocArticle[]
}

export interface DocArticle {
  slug: string
  title: string
  category: string
  content: string
  order: number
}

export interface ChatMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface Conversation {
  id: string
  messages: ChatMessage[]
  createdAt: number
  pageContext: string
}

export interface AIState {
  isOpen: boolean
  conversations: Conversation[]
  activeConversationId: string | null
  isLoading: boolean
  sidebarCollapsed: boolean
}
