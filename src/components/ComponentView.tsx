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

// Import UI components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  ProductCarousel,
  ProductCarouselContent,
  ProductCarouselItem,
  ProductCarouselNext,
  ProductCarouselPrevious,
} from "@/components/shop-components/product-carousel"
import { ChartRadialSimple } from "@/components/calorie-components/chart-radial-simple"

interface ComponentViewProps {
  isMobile?: boolean
}

export function ComponentView({ isMobile = false }: ComponentViewProps) {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const component = components.find(c => c.id === id)
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')

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
      case "avatar":
        return <AvatarExample />
      case "carousel":
        return <CarouselExample />
      case "product-carousel":
        return <ProductCarouselExample />
      case "chart-radial-simple":
        return <ChartRadialSimpleExample />
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

  const getExampleCode = () => {
    switch (component.id) {
      case "avatar":
        return (
          <CodeBlock 
            code={`import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}`}
            language="tsx"
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        )
      case "carousel":
        return (
          <CodeBlock 
            code={`import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`}
            language="tsx"
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        )
      case "chart-radial-simple":
        return (
          <CodeBlock
            code={`import { Flame, Beef, Droplet, Wheat } from "lucide-react"
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { 
    name: "carbs", 
    value: 65, 
    max: 100,
    fill: "var(--color-carbs)",
    grams: "162g / 250g"
  },
  { 
    name: "fat", 
    value: 72, 
    max: 100,
    fill: "var(--color-fat)",
    grams: "48g / 67g"
  },
  { 
    name: "protein", 
    value: 85, 
    max: 100,
    fill: "var(--color-protein)",
    grams: "106g / 125g"
  },
  { 
    name: "calories", 
    value: 75, 
    max: 100,
    fill: "var(--color-calories)",
    amount: "1,875 / 2,500"
  },
]

const chartConfig = {
  value: {
    label: "Progress",
  },
  calories: {
    label: "Calories",
    color: "hsl(var(--chart-1))",
  },
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-2))",
  },
  fat: {
    label: "Fat",
    color: "hsl(var(--chart-3))",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function NutritionTracker() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Daily Nutrition</CardTitle>
        <CardDescription>Track your macros and calories</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart 
            data={chartData} 
            startAngle={90} 
            endAngle={-270}
            innerRadius={30} 
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  hideLabel 
                  nameKey="name"
                  formatter={(value, name, item) => (
                    <div className="flex w-full items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.payload.fill }} />
                        <span className="capitalize">{name}</span>
                      </div>
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {item.payload.grams || item.payload.amount}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar 
              dataKey="value" 
              background
              cornerRadius={10}
              fill="var(--color-calories)"
              stackId="a"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Calories</p>
              <p className="text-sm font-medium">1,875 / 2,500</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Beef className="h-4 w-4 text-red-500" />
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Protein</p>
              <p className="text-sm font-medium">106g / 125g</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-yellow-500" />
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Fat</p>
              <p className="text-sm font-medium">48g / 67g</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wheat className="h-4 w-4 text-green-500" />
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Carbs</p>
              <p className="text-sm font-medium">162g / 250g</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}`}
            language="tsx"
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        )
      case "product-carousel":
        return (
          <CodeBlock 
            code={`import * as React from "react"

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import {
  ProductCarousel,
  ProductCarouselItem,
} from "@/components/shop-components/product-carousel"

export function ProductCarouselDemo() {
  const products = [
    { id: 1, name: "Premium Headphones", byline: "Wireless • Noise Cancelling", price: "$299", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
    { id: 2, name: "Smart Watch", byline: "Series 9 • GPS + Cellular", price: "$399", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" },
    { id: 3, name: "Wireless Speaker", byline: "Bluetooth • Waterproof", price: "$199", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop" },
    { id: 4, name: "Gaming Mouse", byline: "RGB • 16000 DPI", price: "$79", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop" },
    { id: 5, name: "Mechanical Keyboard", byline: "Cherry MX • RGB Backlit", price: "$149", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop" },
  ]

  const handleProductClick = (product: typeof products[0]) => {
    console.log("Product clicked:", product)
  }

  return (
    <ProductCarousel className="w-full max-w-sm">
      {products.map((product) => (
        <ProductCarouselItem key={product.id}>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleProductClick(product)}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg text-left mb-1">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground text-left mb-2">{product.byline}</p>
              <p className="text-xl font-bold text-primary text-left">
                {product.price}
              </p>
            </CardContent>
          </Card>
        </ProductCarouselItem>
      ))}
    </ProductCarousel>
  )
}`}
            language="tsx"
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        )
      case "actions":
        return (
          <CodeBlock
            code={`import { Actions, Action } from "@/components/ai-elements/actions"
import { Copy, Edit, RotateCcw } from "lucide-react"

export function ActionsDemo() {
  return (
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
  )
}`}
            language="tsx"
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        )
      default:
        return (
          <CodeBlock
            code={`// Code example for ${component.name} component
// This will be implemented soon`}
            language="tsx"
          >
            <CodeBlockCopyButton />
          </CodeBlock>
        )
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Back button for mobile */}
      {isMobile && (
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      )}
      
      <div className={cn(
        component?.id === "chatbot" && isMobile ? "h-[calc(100dvh-6rem)]" : 
        component?.id === "chatbot" ? "h-[calc(100dvh-7rem)]" : "overflow-auto",
        component?.id === "chatbot" ? "" : (isMobile ? "p-4" : "p-8")
      )}>
        <div className={cn(
          component?.id === "chatbot" ? "h-full" : "max-w-2xl min-w-0 mx-auto"
        )}>

          {component.id === "chatbot" ? (
            // Full-height chatbot example
            getExampleComponent()
          ) : (
            // Regular component layout
            <div className="space-y-8">
              {/* Component heading */}
              <div>
                <h1 className="text-3xl font-bold">{component.name}</h1>
                <p className="text-muted-foreground mt-2">{component.description}</p>
              </div>

              {/* Tab navigation */}
              <div className="flex gap-2 border-b">
                <Button
                  variant={activeTab === 'preview' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('preview')}
                  className="rounded-b-none"
                >
                  Preview
                </Button>
                <Button
                  variant={activeTab === 'code' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('code')}
                  className="rounded-b-none"
                >
                  Code
                </Button>
              </div>

              {/* Content container */}
              <div className="w-full h-[480px] border rounded-lg">
                {activeTab === 'preview' ? (
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    {getExampleComponent()}
                  </div>
                ) : (
                  <div className="w-full h-full p-4 overflow-auto">
                    {getExampleCode()}
                  </div>
                )}
              </div>
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

function AvatarExample() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="rounded-lg">
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            src="https://github.com/evilrabbit.png"
            alt="@evilrabbit"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

function CarouselExample() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

function ChartRadialSimpleExample() {
  return <ChartRadialSimple />
}

function ProductCarouselExample() {
  const products = [
    { id: 1, name: "Premium Headphones", byline: "Wireless • Noise Cancelling", price: "$299", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop" },
    { id: 2, name: "Smart Watch", byline: "Series 9 • GPS + Cellular", price: "$399", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop" },
    { id: 3, name: "Wireless Speaker", byline: "Bluetooth • Waterproof", price: "$199", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop" },
    { id: 4, name: "Gaming Mouse", byline: "RGB • 16000 DPI", price: "$79", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop" },
    { id: 5, name: "Mechanical Keyboard", byline: "Cherry MX • RGB Backlit", price: "$149", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop" },
  ]

  const handleProductClick = (product: typeof products[0]) => {
    console.log("Product clicked:", product)
  }

  return (
    <ProductCarousel className="w-full max-w-sm">
      {products.map((product) => (
        <ProductCarouselItem key={product.id}>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => handleProductClick(product)}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-lg text-left mb-1">{product.name}</CardTitle>
              <p className="text-sm text-muted-foreground text-left mb-2">{product.byline}</p>
              <p className="text-xl font-bold text-primary text-left">
                {product.price}
              </p>
            </CardContent>
          </Card>
        </ProductCarouselItem>
      ))}
    </ProductCarousel>
  )
}