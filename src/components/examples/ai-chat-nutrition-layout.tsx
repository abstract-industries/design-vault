'use client';

import { useState } from 'react';
import { LayoutGroup } from 'motion/react';
import * as motion from 'motion/react-client';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Copy, Edit3, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Response } from '@/components/ai-elements/response';
import { Actions, Action } from '@/components/ai-elements/actions';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning';
import { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputSubmit } from '@/components/ai-elements/prompt-input';
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from '@/components/ai-elements/tool';
import { ChartRadialSimple } from '@/components/calorie-components/chart-radial-simple';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content?: string | React.ReactNode;
  type?: 'reasoning' | 'tool';
  showActions?: boolean;
  showChart?: boolean;
  reasoningContent?: string;
  toolData?: {
    type: string;
    state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error';
    input: any;
    output: string;
  };
}

interface FoodLogItem {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface AIChatNutritionLayoutProps {
  currentView: 'chat' | 'ui';
  onViewChange: (view: 'chat' | 'ui') => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  foodLog: FoodLogItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

function getSemanticDateTitle(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays === -1) return "Tomorrow";
  if (diffDays > 1 && diffDays <= 7) return `${diffDays} days ago`;
  if (diffDays < -1 && diffDays >= -7) return `In ${Math.abs(diffDays)} days`;
  
  return format(date, 'MMMM d, yyyy');
}

export function AIChatNutritionLayout({
  currentView,
  onViewChange,
  messages,
  setMessages,
  foodLog,
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat
}: AIChatNutritionLayoutProps) {
  const [date, setDate] = useState<Date>(new Date());
  
  const handleCopy = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message?.content && typeof message.content === 'string') {
      navigator.clipboard.writeText(message.content);
    }
  };

  const handleEdit = (messageId: string) => {
    console.log('Edit message:', messageId);
  };

  const handleRegenerate = (messageId: string) => {
    console.log('Regenerate message:', messageId);
  };

  const toggleView = () => {
    onViewChange(currentView === 'chat' ? 'ui' : 'chat');
  };

  // Find if any message should show the chart
  const showChart = messages.some(m => m.showChart);
  const isChat = currentView === 'chat';

  return (
    <LayoutGroup>
      <div className="h-full flex flex-col bg-background relative overflow-hidden">
        {/* Chat View - Always in DOM */}
        <motion.div
          className="absolute inset-0 flex flex-col"
          animate={{
            opacity: isChat ? 1 : 0,
            pointerEvents: isChat ? 'auto' : 'none',
          }}
          transition={{ duration: 0.3 }}
        >
          <Conversation className="h-full">
            <ConversationContent className="max-w-3xl mx-auto w-full p-4 pb-40">
              {/* Render all messages */}
              {messages.map((message) => (
                <div key={message.id} className="mb-6">
                  {message.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="max-w-[80%] rounded-lg bg-primary text-primary-foreground px-4 py-2">
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ) : message.type === 'reasoning' && message.reasoningContent ? (
                    <>
                      <div className="mb-4">
                        <Reasoning>
                          <ReasoningTrigger />
                          <ReasoningContent>{message.reasoningContent}</ReasoningContent>
                        </Reasoning>
                      </div>
                      {message.content && (
                        <div className="space-y-2">
                          <div>
                            {typeof message.content === 'string' ? (
                              <Response>{message.content}</Response>
                            ) : (
                              <div className="text-sm">{message.content}</div>
                            )}
                          </div>
                          
                          {message.showActions && (
                            <Actions>
                              <Action tooltip="Copy" onClick={() => handleCopy(message.id)}>
                                <Copy className="h-4 w-4" />
                              </Action>
                              <Action tooltip="Edit" onClick={() => handleEdit(message.id)}>
                                <Edit3 className="h-4 w-4" />
                              </Action>
                              <Action tooltip="Regenerate" onClick={() => handleRegenerate(message.id)}>
                                <RotateCw className="h-4 w-4" />
                              </Action>
                            </Actions>
                          )}
                        </div>
                      )}
                    </>
                  ) : message.type === 'tool' && message.toolData ? (
                    <div className="mb-4">
                      <Tool defaultOpen>
                        <ToolHeader 
                          type={message.toolData.type as any}
                          state={message.toolData.state}
                        />
                        <ToolContent>
                          <ToolInput input={message.toolData.input} />
                          <ToolOutput 
                            output={message.toolData.output}
                            errorText={undefined}
                          />
                        </ToolContent>
                      </Tool>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        {typeof message.content === 'string' ? (
                          <Response>{message.content}</Response>
                        ) : (
                          <div className="text-sm">{message.content}</div>
                        )}
                        
                        {/* Chart positioned in content flow for this message */}
                        {message.showChart && showChart && isChat && (
                          <motion.div 
                            layout
                            layoutId="nutrition-chart"
                            className="mt-6"
                            transition={{
                              layout: {
                                type: "spring",
                                bounce: 0,
                                duration: 1
                              }
                            }}
                          >
                            <div className="w-full max-w-sm">
                              <motion.div
                                className="cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                                onClick={toggleView}
                              >
                                <ChartRadialSimple
                                  calories={totalCalories}
                                  maxCalories={2000}
                                  protein={totalProtein}
                                  carbs={totalCarbs}
                                  fat={totalFat}
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      {message.showActions && (
                        <Actions>
                          <Action tooltip="Copy" onClick={() => handleCopy(message.id)}>
                            <Copy className="h-4 w-4" />
                          </Action>
                          <Action tooltip="Edit" onClick={() => handleEdit(message.id)}>
                            <Edit3 className="h-4 w-4" />
                          </Action>
                          <Action tooltip="Regenerate" onClick={() => handleRegenerate(message.id)}>
                            <RotateCw className="h-4 w-4" />
                          </Action>
                        </Actions>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          
          {/* Gradient overlay to fade conversation behind prompt */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgb(255 255 255 / 1) 0%, rgb(255 255 255 / 1) 10%, rgb(255 255 255 / 0) 100%)'
            }}
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-4">
            <div className="max-w-3xl mx-auto">
              <PromptInput
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const message = formData.get('message');
                  if (message) {
                    setMessages([...messages, {
                      id: String(messages.length + 1),
                      role: 'user',
                      content: String(message),
                    }]);
                    e.currentTarget.reset();
                  }
                }}
              >
                <PromptInputTextarea placeholder="Tell me what you ate..." />
                <PromptInputToolbar>
                  <div className="flex-1" />
                  <PromptInputSubmit />
                </PromptInputToolbar>
              </PromptInput>
            </div>
          </div>
        </motion.div>

        {/* UI View - Always in DOM */}
        <motion.div
          className="absolute inset-0 overflow-auto"
          animate={{
            opacity: !isChat ? 1 : 0,
            pointerEvents: !isChat ? 'auto' : 'none',
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-3xl mx-auto p-8 space-y-8">
            {/* Date Title */}
            <h1 className="text-3xl font-semibold">
              {getSemanticDateTitle(date)}
            </h1>

            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Chart positioned in content flow for UI view */}
            {showChart && !isChat && (
              <motion.div 
                layout
                layoutId="nutrition-chart"
                className="w-full max-w-sm"
                transition={{
                  layout: {
                    type: "spring",
                    bounce: 0,
                    duration: 1
                  }
                }}
              >
                <motion.div
                  className="cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={toggleView}
                >
                  <ChartRadialSimple
                    calories={totalCalories}
                    maxCalories={2000}
                    protein={totalProtein}
                    carbs={totalCarbs}
                    fat={totalFat}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Food Log */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Log</h2>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Calories</TableHead>
                      <TableHead className="text-right">Carbs</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {foodLog.length > 0 ? (
                      foodLog.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.calories} cal</TableCell>
                          <TableCell className="text-right">{item.carbs}g carb</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                          No food items logged yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}