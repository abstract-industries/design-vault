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
  {
    id: "ai-chat-nutrition",
    name: "AI Chat Nutrition",
    category: "Examples",
    description: "AI chat with nutrition tracking and calorie analysis"
  },
  
  // Calorie
  {
    id: "chart-radial-simple",
    name: "Nutrition Tracker",
    category: "Calorie",
    description: "Radial chart for tracking daily calories and macronutrients"
  },
  
  // Shop
  {
    id: "product-carousel",
    name: "Product Carousel",
    category: "Shop",
    description: "Product showcase carousel with peek effect and hover navigation"
  },
  
  // AI
  {
    id: "actions",
    name: "Actions",
    category: "AI",
    description: "Action buttons for message interactions"
  },
  {
    id: "branch",
    name: "Branch",
    category: "AI",
    description: "Show alternative AI responses and conversation branches"
  },
  {
    id: "code-block",
    name: "Code Block",
    category: "AI",
    description: "Syntax-highlighted code display with copy functionality"
  },
  {
    id: "conversation",
    name: "Conversation",
    category: "AI",
    description: "Container component for AI conversations and chat interfaces"
  },
  {
    id: "image",
    name: "Image",
    category: "AI",
    description: "Image display component with loading states and error handling"
  },
  {
    id: "inline-citation",
    name: "Inline Citation",
    category: "AI",
    description: "Display inline citations and references in AI responses"
  },
  {
    id: "loader",
    name: "Loader",
    category: "AI",
    description: "Loading indicators for AI processing and streaming"
  },
  {
    id: "message",
    name: "Message",
    category: "AI",
    description: "Display individual messages in a conversation thread"
  },
  {
    id: "prompt-input",
    name: "Prompt Input",
    category: "AI",
    description: "Input field for user prompts with auto-resize and submission handling"
  },
  {
    id: "reasoning",
    name: "Reasoning",
    category: "AI",
    description: "Display AI reasoning process with expandable/collapsible view"
  },
  {
    id: "response",
    name: "Response",
    category: "AI",
    description: "AI response component with streaming support and formatting"
  },
  {
    id: "source",
    name: "Sources",
    category: "AI",
    description: "Show source references and attribution for AI responses"
  },
  {
    id: "suggestion",
    name: "Suggestion",
    category: "AI",
    description: "Display suggested prompts and quick actions"
  },
  {
    id: "task",
    name: "Task",
    category: "AI",
    description: "Display AI task progress and status updates"
  },
  {
    id: "tool",
    name: "Tool",
    category: "AI",
    description: "Show AI tool usage and function calls"
  },
  {
    id: "web-preview",
    name: "Web Preview",
    category: "AI",
    description: "Preview web content and links within the conversation"
  },
  
  // UI
  {
    id: "avatar",
    name: "Avatar",
    category: "UI",
    description: "User avatar display component with fallback support"
  },
  {
    id: "badge",
    name: "Badge",
    category: "UI",
    description: "Badge component for labels and status indicators"
  },
  {
    id: "button",
    name: "Button",
    category: "UI",
    description: "Versatile button component with multiple variants and sizes"
  },
  {
    id: "card",
    name: "Card",
    category: "UI",
    description: "Container component for grouped content"
  },
  {
    id: "carousel",
    name: "Carousel",
    category: "UI",
    description: "Image and content carousel with navigation controls"
  },
  {
    id: "collapsible",
    name: "Collapsible",
    category: "UI",
    description: "Expandable/collapsible content container"
  },
  {
    id: "dropdown-menu",
    name: "Dropdown Menu",
    category: "UI",
    description: "Dropdown menu for actions and navigation"
  },
  {
    id: "hover-card",
    name: "Hover Card",
    category: "UI",
    description: "Card that appears on hover with additional information"
  },
  {
    id: "input",
    name: "Input",
    category: "UI",
    description: "Text input field with validation support"
  },
  {
    id: "scroll-area",
    name: "Scroll Area",
    category: "UI",
    description: "Custom scrollable area with styled scrollbars"
  },
  {
    id: "select",
    name: "Select",
    category: "UI",
    description: "Select dropdown for choosing from options"
  },
  {
    id: "separator",
    name: "Separator",
    category: "UI",
    description: "Visual separator for dividing content"
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "UI",
    description: "Multi-line text input with auto-resize capability"
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "UI",
    description: "Tooltip for displaying contextual information"
  }
]