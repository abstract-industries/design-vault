'use client';

import { useState } from 'react';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Response } from '@/components/ai-elements/response';
import { Actions, Action } from '@/components/ai-elements/actions';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning';
import { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputSubmit } from '@/components/ai-elements/prompt-input';
import { ChartRadialSimple } from '@/components/calorie-components/chart-radial-simple';
import { Copy, Edit3, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AIChatNutritionExample = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'user',
      content: "I had a chicken Caesar salad for lunch with extra dressing and croutons, then a large cappuccino with whole milk.",
    },
    {
      id: '2',
      role: 'assistant',
      content: `I've recorded what you ate for lunch. Here's the breakdown:

| Food Item | Quantity | Details |
|-----------|----------|---------|
| Chicken Caesar Salad | 1 serving | With extra dressing |
| Croutons | Extra portion | Added to salad |
| Cappuccino | Large | Made with whole milk |

Let me look up the nutritional information for these items.`,
      showActions: true,
    },
    {
      id: '3',
      role: 'assistant',
      type: 'reasoning',
      content: `Searching nutritional databases for:
- Chicken Caesar salad (restaurant portion with extra dressing): ~650 calories
- Extra croutons: ~100 calories  
- Large cappuccino with whole milk: ~120 calories

Total estimated calories: 870 calories

Breaking down macronutrients:
- Protein: ~42g (mainly from chicken)
- Carbohydrates: ~48g (croutons, milk)
- Fat: ~56g (dressing, cheese, milk)`,
    },
    {
      id: '4',
      role: 'assistant',
      content: `Based on the nutritional analysis, here's your lunch breakdown:

**Total Calories: 870**

Your lunch provided a substantial amount of your daily caloric needs. The Caesar salad with extra dressing is quite calorie-dense due to the creamy dressing and cheese. Here's how this fits into a typical 2000-calorie daily diet:`,
      showActions: true,
      showChart: true,
    }
  ]);

  const handleCopy = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message?.content) {
      navigator.clipboard.writeText(message.content);
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
          {messages.map((message) => (
            <div key={message.id} className="mb-6">
              {message.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-lg bg-primary text-primary-foreground px-4 py-2">
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ) : message.type === 'reasoning' ? (
                <div className="mb-4">
                  <Reasoning>
                    <ReasoningTrigger />
                    <ReasoningContent>{message.content}</ReasoningContent>
                  </Reasoning>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <Response>{message.content}</Response>
                    
                    {message.showChart && (
                      <div className="mt-6 flex justify-center">
                        <div className="w-full max-w-sm">
                          <ChartRadialSimple 
                            calories={870}
                            maxCalories={2000}
                            protein={42}
                            carbs={48}
                            fat={56}
                          />
                        </div>
                      </div>
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
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 pb-8">
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
    </div>
  );
};