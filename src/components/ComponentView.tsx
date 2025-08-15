import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { components } from "@/data/components"
import { ArrowLeft, Copy, Edit, RotateCcw, MicIcon, GlobeIcon } from "lucide-react"
import { useChat } from '@ai-sdk/react'
import { cn } from "@/lib/utils"

// Import AI Elements properly
import { Actions, Action } from "@/components/ai-elements/actions"
import { Branch } from "@/components/ai-elements/branch"
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/code-block"
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation"
import { Image } from "@/components/ai-elements/image"
import { InlineCitation } from "@/components/ai-elements/inline-citation"
import { Loader } from "@/components/ai-elements/loader"
import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/message"
import { 
  PromptInput, 
  PromptInputTextarea, 
  PromptInputToolbar, 
  PromptInputSubmit, 
  PromptInputTools,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem
} from "@/components/ai-elements/prompt-input"
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ai-elements/reasoning"
import { Response } from "@/components/ai-elements/response"
import { Source, Sources, SourcesContent, SourcesTrigger } from "@/components/ai-elements/source"
import { Suggestion } from "@/components/ai-elements/suggestion"
import { Task } from "@/components/ai-elements/task"
import { Tool } from "@/components/ai-elements/tool"
import { WebPreview } from "@/components/ai-elements/web-preview"

interface ComponentViewProps {
  isMobile?: boolean
}

export function ComponentView({ isMobile = false }: ComponentViewProps) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const component = components.find(c => c.id === id)

  if (!component) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Component not found</h2>
          <p className="text-muted-foreground">Select a component from the list</p>
        </div>
      </div>
    )
  }

  const getExampleComponent = () => {
    switch (component.id) {
      case "actions":
        return <ActionsExample />
      case "branch":
        return <BranchExample />
      case "code-block":
        return <CodeBlockExample />
      case "conversation":
        return <ConversationExample />
      case "image":
        return <ImageExample />
      case "inline-citation":
        return <InlineCitationExample />
      case "loader":
        return <LoaderExample />
      case "message":
        return <MessageExample />
      case "chatbot":
        return <ChatbotExample isMobile={isMobile} />
      case "prompt-input":
        return <PromptInputExample />
      case "reasoning":
        return <ReasoningExample />
      case "response":
        return <ResponseExample />
      case "source":
        return <SourceExample />
      case "suggestion":
        return <SuggestionExample />
      case "task":
        return <TaskExample />
      case "tool":
        return <ToolExample />
      case "web-preview":
        return <WebPreviewExample />
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Component Preview</CardTitle>
              <CardDescription>
                Interactive examples for {component.name} are being developed.
              </CardDescription>
            </CardHeader>
          </Card>
        )
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Fixed header for mobile */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-10 bg-background border-b">
          <div className="flex items-center p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{component.name}</h1>
            </div>
          </div>
        </div>
      )}

      {/* Fixed header for desktop */}
      {!isMobile && (
        <div className="fixed top-0 left-64 right-0 z-10 bg-background border-b">
          <div className="p-6">
            <h1 className="text-3xl font-bold">{component.name}</h1>
          </div>
        </div>
      )}
      
      <div className={cn(
        component?.id === "chatbot" && isMobile ? "h-[calc(100dvh-6rem)]" : 
        component?.id === "chatbot" ? "h-[calc(100dvh-7rem)]" : "overflow-auto",
        isMobile ? "mt-20" : "mt-24",
        component?.id === "chatbot" ? "" : (isMobile ? "p-4" : "p-8")
      )}>
        <div className={cn(
          component?.id === "chatbot" ? "h-full" : "max-w-4xl mx-auto"
        )}>

          {component.id === "chatbot" ? (
            // Full-height chatbot example
            getExampleComponent()
          ) : (
            // Regular component layout
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-semibold mb-4">Examples</h2>
                <div className="space-y-4">
                  {getExampleComponent()}
                </div>
              </section>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Example Components
function ActionsExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Actions</CardTitle>
        <CardDescription>Interactive action buttons for messages</CardDescription>
      </CardHeader>
      <CardContent>
        <Actions>
          <Action tooltip="Copy message" onClick={() => console.log("Copy clicked")}>
            <Copy className="w-4 h-4" />
          </Action>
          <Action tooltip="Edit message" onClick={() => console.log("Edit clicked")}>
            <Edit className="w-4 h-4" />
          </Action>
          <Action tooltip="Regenerate response" onClick={() => console.log("Regenerate clicked")}>
            <RotateCcw className="w-4 h-4" />
          </Action>
        </Actions>
      </CardContent>
    </Card>
  )
}

function BranchExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Response Branches</CardTitle>
        <CardDescription>Navigate between different AI response variations</CardDescription>
      </CardHeader>
      <CardContent>
        <Branch>
          <div className="p-4 border rounded">
            <p>This is response variation 1 of 3</p>
          </div>
        </Branch>
      </CardContent>
    </Card>
  )
}

function CodeBlockExample() {
  const code = `function hello() {
  console.log("Hello, AI Elements!");
  return true;
}`
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Display</CardTitle>
        <CardDescription>Syntax-highlighted code with copy functionality</CardDescription>
      </CardHeader>
      <CardContent>
        <CodeBlock code={code} language="javascript">
          <CodeBlockCopyButton />
        </CodeBlock>
      </CardContent>
    </Card>
  )
}

function ConversationExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversation Container</CardTitle>
        <CardDescription>Full conversation interface with messages</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 h-[300px]">
          <Conversation>
            <Message from="user">
              <MessageAvatar src="/api/placeholder/40/40" name="User" />
              <MessageContent>
                Hello! Can you help me understand AI Elements?
              </MessageContent>
            </Message>
            <Message from="assistant">
              <MessageAvatar src="/api/placeholder/40/40" name="AI" />
              <MessageContent>
                Of course! AI Elements is a collection of components designed for building AI-powered interfaces.
              </MessageContent>
            </Message>
          </Conversation>
        </div>
      </CardContent>
    </Card>
  )
}

function ImageExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Display</CardTitle>
        <CardDescription>Image component with loading and error states</CardDescription>
      </CardHeader>
      <CardContent>
        <Image 
          src="https://via.placeholder.com/400x200" 
          alt="Placeholder image"
          className="rounded-lg"
        />
      </CardContent>
    </Card>
  )
}

function InlineCitationExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inline Citations</CardTitle>
        <CardDescription>Reference citations within text content</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This is an example text with an{" "}
          <InlineCitation href="#" index={1}>
            inline citation
          </InlineCitation>{" "}
          that references a source.
        </p>
      </CardContent>
    </Card>
  )
}

function LoaderExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading States</CardTitle>
        <CardDescription>Various loading indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Loader />
            <span className="text-sm text-muted-foreground">Processing...</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function MessageExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat Messages</CardTitle>
        <CardDescription>User and assistant message display</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Message from="user">
            <MessageAvatar src="/api/placeholder/40/40" name="User" />
            <MessageContent>
              Hello! Can you help me understand AI Elements?
            </MessageContent>
          </Message>
          <Message from="assistant">
            <MessageAvatar src="/api/placeholder/40/40" name="AI" />
            <MessageContent>
              Of course! AI Elements is a collection of components designed for building AI-powered interfaces.
            </MessageContent>
          </Message>
        </div>
      </CardContent>
    </Card>
  )
}

function PromptInputExample() {
  return (
    <div className="space-y-6">
      {/* Basic Example */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Prompt Input</CardTitle>
          <CardDescription>Simple input field with submit button</CardDescription>
        </CardHeader>
        <CardContent>
          <PromptInput onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const message = formData.get('message')
            console.log("Submitted:", message)
          }}>
            <PromptInputTextarea placeholder="Ask me anything..." />
            <PromptInputToolbar>
              <div className="flex-1" />
              <PromptInputSubmit />
            </PromptInputToolbar>
          </PromptInput>
        </CardContent>
      </Card>

      {/* With Tools Example */}
      <Card>
        <CardHeader>
          <CardTitle>With Tools & Actions</CardTitle>
          <CardDescription>Input with microphone, search, and submit buttons</CardDescription>
        </CardHeader>
        <CardContent>
          <PromptInput onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const message = formData.get('message')
            console.log("Submitted:", message)
          }}>
            <PromptInputTextarea placeholder="Type your message..." />
            <PromptInputToolbar>
              <PromptInputTools>
                <PromptInputButton onClick={() => console.log("Mic clicked")}>
                  <MicIcon size={16} />
                </PromptInputButton>
                <PromptInputButton onClick={() => console.log("Search clicked")}>
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </PromptInputButton>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputToolbar>
          </PromptInput>
        </CardContent>
      </Card>

      {/* With Model Selector Example */}
      <Card>
        <CardHeader>
          <CardTitle>With Model Selection</CardTitle>
          <CardDescription>Complete chat input with model picker</CardDescription>
        </CardHeader>
        <CardContent>
          <PromptInput onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            const message = formData.get('message')
            console.log("Submitted:", message)
          }}>
            <PromptInputTextarea placeholder="Ask me anything..." />
            <PromptInputToolbar>
              <PromptInputTools>
                <PromptInputButton onClick={() => console.log("Mic clicked")}>
                  <MicIcon size={16} />
                </PromptInputButton>
                <PromptInputButton onClick={() => console.log("Search clicked")}>
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </PromptInputButton>
                <PromptInputModelSelect defaultValue="gpt-4o">
                  <PromptInputModelSelectTrigger>
                    <PromptInputModelSelectValue />
                  </PromptInputModelSelectTrigger>
                  <PromptInputModelSelectContent>
                    <PromptInputModelSelectItem value="gpt-4o">
                      GPT-4o
                    </PromptInputModelSelectItem>
                    <PromptInputModelSelectItem value="claude-opus">
                      Claude 4 Opus
                    </PromptInputModelSelectItem>
                    <PromptInputModelSelectItem value="gemini-pro">
                      Gemini Pro
                    </PromptInputModelSelectItem>
                  </PromptInputModelSelectContent>
                </PromptInputModelSelect>
              </PromptInputTools>
              <PromptInputSubmit />
            </PromptInputToolbar>
          </PromptInput>
        </CardContent>
      </Card>

      {/* Status States Example */}
      <Card>
        <CardHeader>
          <CardTitle>Status States</CardTitle>
          <CardDescription>Different button states based on chat status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Ready State</p>
              <PromptInput onSubmit={(e) => e.preventDefault()}>
                <PromptInputTextarea placeholder="Ready to send..." />
                <PromptInputToolbar>
                  <div className="flex-1" />
                  <PromptInputSubmit status="ready" />
                </PromptInputToolbar>
              </PromptInput>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Submitted State</p>
              <PromptInput onSubmit={(e) => e.preventDefault()}>
                <PromptInputTextarea placeholder="Processing..." />
                <PromptInputToolbar>
                  <div className="flex-1" />
                  <PromptInputSubmit status="submitted" />
                </PromptInputToolbar>
              </PromptInput>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Streaming State</p>
              <PromptInput onSubmit={(e) => e.preventDefault()}>
                <PromptInputTextarea placeholder="Streaming response..." />
                <PromptInputToolbar>
                  <div className="flex-1" />
                  <PromptInputSubmit status="streaming" />
                </PromptInputToolbar>
              </PromptInput>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ReasoningExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Reasoning Display</CardTitle>
        <CardDescription>Expandable reasoning process visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <Reasoning>
          <div className="p-4 text-sm space-y-2">
            <p>• Analyzing the request...</p>
            <p>• Considering multiple approaches...</p>
            <p>• Selecting the optimal solution...</p>
          </div>
        </Reasoning>
      </CardContent>
    </Card>
  )
}

function ResponseExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Response</CardTitle>
        <CardDescription>Formatted AI response with markdown support</CardDescription>
      </CardHeader>
      <CardContent>
        <Response>
          Here's a formatted AI response with **bold text**, *italic text*, and `inline code`.
          
          It supports multiple paragraphs and markdown formatting.
        </Response>
      </CardContent>
    </Card>
  )
}

function SourceExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Source References</CardTitle>
        <CardDescription>Display source attribution</CardDescription>
      </CardHeader>
      <CardContent>
        <Source href="https://example.com/docs">
          AI Elements Documentation
        </Source>
      </CardContent>
    </Card>
  )
}

function SuggestionExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prompt Suggestions</CardTitle>
        <CardDescription>Quick action suggestions for users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Suggestion onSelect={() => console.log("Clicked suggestion 1")}>
            Tell me more about this
          </Suggestion>
          <Suggestion onSelect={() => console.log("Clicked suggestion 2")}>
            Show me an example
          </Suggestion>
          <Suggestion onSelect={() => console.log("Clicked suggestion 3")}>
            Explain in simple terms
          </Suggestion>
        </div>
      </CardContent>
    </Card>
  )
}

function TaskExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Progress</CardTitle>
        <CardDescription>Display AI task execution status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Task status="completed">
            Analyzing input data
          </Task>
          <Task status="in-progress">
            Processing information
          </Task>
          <Task status="pending">
            Generating response
          </Task>
        </div>
      </CardContent>
    </Card>
  )
}

function ToolExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tool Usage</CardTitle>
        <CardDescription>Display AI tool and function calls</CardDescription>
      </CardHeader>
      <CardContent>
        <Tool name="search_web">
          <div className="p-2 text-sm">
            <p><strong>Query:</strong> AI Elements documentation</p>
            <p><strong>Status:</strong> Executing...</p>
          </div>
        </Tool>
      </CardContent>
    </Card>
  )
}

function WebPreviewExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Web Content Preview</CardTitle>
        <CardDescription>Preview web links and content</CardDescription>
      </CardHeader>
      <CardContent>
        <WebPreview href="https://example.com">
          <div className="p-4 border rounded">
            <h3 className="font-semibold">Example Website</h3>
            <p className="text-sm text-muted-foreground">
              This is a preview of web content that can be displayed inline.
            </p>
          </div>
        </WebPreview>
      </CardContent>
    </Card>
  )
}

function ChatbotExample({ isMobile = false }: { isMobile?: boolean }) {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>('openai/gpt-4o');
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status } = useChat({
    api: '/api/chat', // This will point to our mock API
    body: {
      model: model,
      webSearch: webSearch,
    },
  });

  const models = [
    {
      name: 'GPT 4o',
      value: 'openai/gpt-4o',
    },
    {
      name: 'Deepseek R1',
      value: 'deepseek/deepseek-r1',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(
        { text: input },
        {
          body: {
            model: model,
            webSearch: webSearch,
          },
        },
      );
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <Conversation className={cn("h-full", isMobile ? "pb-24" : "")}>
        <ConversationContent>
          {messages.map((message) => (
            <div key={message.id}>
              {message.role === 'assistant' && (
                <Sources>
                  {message.parts?.map((part, i) => {
                    switch (part.type) {
                      case 'source-url':
                        return (
                          <>
                            <SourcesTrigger
                              count={
                                message.parts?.filter(
                                  (part) => part.type === 'source-url',
                                ).length || 0
                              }
                            />
                            <SourcesContent key={`${message.id}-${i}`}>
                              <Source
                                key={`${message.id}-${i}`}
                                href={part.url}
                                title={part.url}
                              />
                            </SourcesContent>
                          </>
                        );
                    }
                  })}
                </Sources>
              )}
              <Message from={message.role} key={message.id}>
                <MessageContent>
                  {message.parts?.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Response key={`${message.id}-${i}`}>
                            {part.text}
                          </Response>
                        );
                      case 'reasoning':
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={status === 'streaming'}
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      default:
                        return null;
                    }
                  }) || (
                    // Fallback for simple message content
                    <Response>{message.content}</Response>
                  )}
                </MessageContent>
              </Message>
            </div>
          ))}
          {status === 'submitted' && <Loader />}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className={cn(
        "border-t pt-2 pb-6 px-4 bg-background safe-area-inset-bottom",
        isMobile ? "fixed bottom-0 left-0 right-0" : ""
      )}>
        <PromptInput onSubmit={handleSubmit} className="mt-2">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              <PromptInputButton
                variant={webSearch ? 'default' : 'ghost'}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem key={model.value} value={model.value}>
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  )
}