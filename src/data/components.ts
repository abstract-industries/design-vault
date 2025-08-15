export interface ComponentItem {
  id: string
  name: string
  category: string
  description: string
}

export const components: ComponentItem[] = [
  // Examples
  {
    id: "chatbot",
    name: "Chatbot",
    category: "Examples",
    description: "Complete chatbot implementation using AI Elements"
  },
  
  // Components
  {
    id: "actions",
    name: "Actions",
    category: "Components",
    description: "Action buttons for message interactions"
  },
  {
    id: "branch",
    name: "Branch",
    category: "Components",
    description: "Show alternative AI responses and conversation branches"
  },
  {
    id: "code-block",
    name: "Code Block",
    category: "Components",
    description: "Syntax-highlighted code display with copy functionality"
  },
  {
    id: "conversation",
    name: "Conversation",
    category: "Components",
    description: "Container component for AI conversations and chat interfaces"
  },
  {
    id: "image",
    name: "Image",
    category: "Components",
    description: "Image display component with loading states and error handling"
  },
  {
    id: "inline-citation",
    name: "Inline Citation",
    category: "Components",
    description: "Display inline citations and references in AI responses"
  },
  {
    id: "loader",
    name: "Loader",
    category: "Components",
    description: "Loading indicators for AI processing and streaming"
  },
  {
    id: "message",
    name: "Message",
    category: "Components",
    description: "Display individual messages in a conversation thread"
  },
  {
    id: "prompt-input",
    name: "Prompt Input",
    category: "Components",
    description: "Input field for user prompts with auto-resize and submission handling"
  },
  {
    id: "reasoning",
    name: "Reasoning",
    category: "Components",
    description: "Display AI reasoning process with expandable/collapsible view"
  },
  {
    id: "response",
    name: "Response",
    category: "Components",
    description: "AI response component with streaming support and formatting"
  },
  {
    id: "source",
    name: "Sources",
    category: "Components",
    description: "Show source references and attribution for AI responses"
  },
  {
    id: "suggestion",
    name: "Suggestion",
    category: "Components",
    description: "Display suggested prompts and quick actions"
  },
  {
    id: "task",
    name: "Task",
    category: "Components",
    description: "Display AI task progress and status updates"
  },
  {
    id: "tool",
    name: "Tool",
    category: "Components",
    description: "Show AI tool usage and function calls"
  },
  {
    id: "web-preview",
    name: "Web Preview",
    category: "Components",
    description: "Preview web content and links within the conversation"
  }
]