// Lets any section open the chat widget, optionally with a question already
// asked. The widget is mounted once in App, outside the page tree, so a window
// event is simpler than threading a context through every section.

export const OPEN_CHAT_EVENT = 'chat:open'

export interface OpenChatDetail {
  question?: string
}

export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent<OpenChatDetail>(OPEN_CHAT_EVENT, { detail: { question } }))
}
