import { create } from "zustand"
import type { AIState, ChatMessage, Conversation } from "@/types"

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export const useAIStore = create<AIState & {
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void
  toggleCollapse: () => void
  createConversation: (pageContext: string) => string
  addMessage: (conversationId: string, message: ChatMessage) => void
  updateLastAssistantMessage: (conversationId: string, content: string) => void
  setActiveConversation: (id: string | null) => void
  clearConversation: (conversationId: string) => void
  setLoading: (loading: boolean) => void
}>((set, get) => ({
  isOpen: false,
  sidebarCollapsed: true,
  conversations: [],
  activeConversationId: null,
  isLoading: false,

  toggleSidebar: () => set(s => ({ isOpen: !s.isOpen })),
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleCollapse: () => set(s => ({ sidebarCollapsed: !s.sidebarCollapsed })),

  createConversation: (pageContext: string) => {
    const id = generateId()
    const conversation: Conversation = {
      id,
      messages: [],
      createdAt: Date.now(),
      pageContext,
    }
    set(s => ({
      conversations: [...s.conversations, conversation],
      activeConversationId: id,
      isOpen: true,
    }))
    return id
  },

  addMessage: (conversationId: string, message: ChatMessage) => {
    set(s => ({
      conversations: s.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, messages: [...conv.messages, message] }
          : conv
      ),
    }))
  },

  updateLastAssistantMessage: (conversationId: string, content: string) => {
    set(s => ({
      conversations: s.conversations.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: conv.messages.map((msg, idx) =>
                idx === conv.messages.length - 1 && msg.role === "assistant"
                  ? { ...msg, content }
                  : msg
              ),
            }
          : conv
      ),
    }))
  },

  setActiveConversation: (id: string | null) => set({ activeConversationId: id }),

  clearConversation: (conversationId: string) => {
    set(s => ({
      conversations: s.conversations.map(conv =>
        conv.id === conversationId
          ? { ...conv, messages: [] }
          : conv
      ),
    }))
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}))
