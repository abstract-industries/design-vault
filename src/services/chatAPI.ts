// Mock chat API service for demonstration
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp?: number
}

export interface ChatRequest {
  messages: ChatMessage[]
  model: string
  webSearch: boolean
}

export interface ChatResponse {
  message: ChatMessage
  reasoning?: string
  sources?: Array<{
    title: string
    url: string
  }>
}

// Simulate AI responses
const mockResponses = [
  "I'd be happy to help you with that! Let me break down the key concepts for you.",
  "That's an interesting question. Here's what I can tell you about it...",
  "Based on my understanding, here are the main points to consider:",
  "Great question! Let me provide you with a comprehensive explanation.",
  "I can help clarify that for you. Here's what you need to know:",
]

const mockSources = [
  { title: "AI Elements Documentation", url: "https://docs.ai-elements.dev" },
  { title: "React Best Practices", url: "https://react.dev/learn" },
  { title: "TypeScript Guide", url: "https://www.typescriptlang.org/docs" },
]

export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
  
  const userMessage = request.messages[request.messages.length - 1]
  const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
  
  const response: ChatResponse = {
    message: {
      id: Date.now().toString(),
      role: 'assistant',
      content: `${randomResponse}\n\nYou asked: "${userMessage.content}"\n\nThis is a simulated response demonstrating the AI Elements chatbot functionality. In a real implementation, this would connect to actual AI APIs like OpenAI, Anthropic, or others.`,
      timestamp: Date.now()
    }
  }
  
  // Add sources if web search is enabled
  if (request.webSearch) {
    response.sources = mockSources.slice(0, Math.floor(Math.random() * 3) + 1)
  }
  
  // Add reasoning for some responses
  if (Math.random() > 0.5) {
    response.reasoning = "Let me think about this step by step:\n1. Analyzing the user's question\n2. Considering relevant context\n3. Formulating a helpful response"
  }
  
  return response
}

// Simulate streaming response
export async function* streamChatMessage(request: ChatRequest): AsyncGenerator<Partial<ChatResponse>> {
  const response = await sendChatMessage(request)
  
  // Yield reasoning first if available
  if (response.reasoning) {
    yield { reasoning: response.reasoning }
    await new Promise(resolve => setTimeout(resolve, 500))
  }
  
  // Yield sources if available
  if (response.sources) {
    yield { sources: response.sources }
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  
  // Stream the message content word by word
  const words = response.message.content.split(' ')
  let content = ''
  
  for (const word of words) {
    content += (content ? ' ' : '') + word
    yield {
      message: {
        ...response.message,
        content
      }
    }
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100))
  }
}