'use client';

import * as motion from 'motion/react-client';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Response } from '@/components/ai-elements/response';
import { Actions, Action } from '@/components/ai-elements/actions';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning';
import { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputSubmit } from '@/components/ai-elements/prompt-input';
import { ChartRadialClickable } from '@/components/calorie-components/chart-radial-clickable';
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from '@/components/ai-elements/tool';
import { Copy, Edit3, RotateCw } from 'lucide-react';

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


interface AIChatNutritionChatProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  onChartClick?: () => void;
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFat?: number;
}

export function AIChatNutritionChat({ 
  messages, 
  setMessages,
  onChartClick,
  totalCalories = 1520,
  totalProtein = 67,
  totalCarbs = 147,
  totalFat = 63
}: AIChatNutritionChatProps) {
  const handleCopy = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message?.content) {
      if (typeof message.content === 'string') {
        navigator.clipboard.writeText(message.content);
      }
    }
  };

  const handleEdit = (messageId: string) => {
    console.log('Edit message:', messageId);
  };

  const handleRegenerate = (messageId: string) => {
    console.log('Regenerate message:', messageId);
  };

  return (
    <div className="h-full flex flex-col bg-background relative">
      <Conversation className="h-full">
        <ConversationContent className="max-w-3xl mx-auto w-full p-4 pb-40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
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
                          <Action
                            tooltip="Copy"
                            onClick={() => handleCopy(message.id)}
                          >
                            <Copy className="h-4 w-4" />
                          </Action>
                          <Action
                            tooltip="Edit"
                            onClick={() => handleEdit(message.id)}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Action>
                          <Action
                            tooltip="Regenerate"
                            onClick={() => handleRegenerate(message.id)}
                          >
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
                  </div>
                  
                  {message.showActions && (
                    <Actions>
                      <Action
                        tooltip="Copy"
                        onClick={() => handleCopy(message.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Action>
                      <Action
                        tooltip="Edit"
                        onClick={() => handleEdit(message.id)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Action>
                      <Action
                        tooltip="Regenerate"
                        onClick={() => handleRegenerate(message.id)}
                      >
                        <RotateCw className="h-4 w-4" />
                      </Action>
                    </Actions>
                  )}
                </div>
              )}
            </div>
          ))}
          </motion.div>
          
          {/* Render chart outside of fade wrapper */}
          {messages.some(m => m.showChart) && (
            <div className="mt-6 mb-6">
              <div className="w-full max-w-sm">
                <ChartRadialClickable 
                  calories={totalCalories}
                  maxCalories={2000}
                  protein={totalProtein}
                  carbs={totalCarbs}
                  fat={totalFat}
                  onClick={onChartClick}
                />
              </div>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.3 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="absolute bottom-0 left-0 right-0 p-4 pb-8">
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
      </motion.div>
    </div>
  );
}