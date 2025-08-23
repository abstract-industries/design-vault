'use client';

import { useState } from 'react';
import { LayoutGroup } from 'motion/react';
import { AIChatNutritionHeader } from './ai-chat-nutrition-header';
import { AIChatNutritionMotion } from './ai-chat-nutrition-motion';

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

export const AIChatNutritionExample = () => {
  const [currentView, setCurrentView] = useState<'chat' | 'ui'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'user',
      content: "Hey",
    },
    {
      id: '2',
      role: 'assistant',
      content: `Hey! What have you eaten lately?`,
      showActions: true,
    },
    {
      id: '3',
      role: 'user',
      content: "I ate some pizza earlier",
    },
    {
      id: '4',
      role: 'assistant',
      type: 'reasoning',
      reasoningContent: 'Thinking...',
      content: `Ok got it, you had some pizza.

| Item | Quantity |
|------|----------|
| Pizza | -- |

How much did you eat?`,
      showActions: true,
    },
    {
      id: '5',
      role: 'user',
      content: "Just one slice",
    },
    {
      id: '6',
      role: 'assistant',
      type: 'reasoning',
      reasoningContent: 'Thinking...',
      content: `Ok, just one slice.

| Item | Quantity |
|------|----------|
| Pizza | 1 slice |

What kind of pizza was it?`,
      showActions: true,
    },
    {
      id: '7',
      role: 'user',
      content: "It was a grandma slice with pepperoni and cheese. Also had a little mike's hot honey drizzled on top",
    },
    {
      id: '8',
      role: 'assistant',
      type: 'reasoning',
      reasoningContent: 'Thinking...',
      content: `Does this look good?

| Item | Quantity | Description |
|------|----------|-------------|
| Pizza | 1 slice | Pepperoni, cheese, hot honey (drizzle) |`,
      showActions: true,
    },
    {
      id: '9',
      role: 'user',
      content: "Yep",
    },
    {
      id: '10',
      role: 'assistant',
      type: 'reasoning',
      reasoningContent: `Searching nutritional databases...

Looking up:
- Grandma-style pizza slice with pepperoni
- Mike's hot honey drizzle

Calculating nutritional breakdown:
- Pepperoni grandma slice: ~500 calories, 35g carbs, 25g protein, 28g fat
- Mike's hot honey (1 tsp): ~150 calories, 12g carbs, 0g protein, 0g fat

Total: 650 calories`,
    },
    {
      id: '11',
      role: 'assistant',
      content: `Alright, here's how I broke it down. Let me know if this looks right to you.

| Item | Quantity | Calories | Carbs (g) | Protein (g) | Fat (g) |
|------|----------|----------|-----------|-------------|---------|
| Pepperoni grandma slice | 1 | 500 | 35 | 25 | 28 |
| Mike's hot honey | 1 tsp | 150 | 12 | 0 | 0 |

How's this look?`,
      showActions: true,
    },
    {
      id: '12',
      role: 'user',
      content: "Perfect",
    },
    {
      id: '13',
      role: 'assistant',
      type: 'tool',
      toolData: {
        type: 'add_to_daily_totals',
        state: 'output-available' as const,
        input: {
          items: [
            { name: 'Pepperoni grandma slice', calories: 500, protein: 25, carbs: 35, fat: 28 },
            { name: "Mike's hot honey", calories: 150, protein: 0, carbs: 12, fat: 0 }
          ],
          date: 'today'
        },
        output: 'Successfully added 650 calories to your daily total'
      }
    },
    {
      id: '14',
      role: 'assistant',
      content: `Great! I've added this meal to your daily totals. You had 650 calories from the pizza, bringing your daily total to 1,520 calories.`,
      showActions: true,
      showChart: true,
    }
  ]);

  // Sample food log data derived from chat
  const foodLog: FoodLogItem[] = [
    {
      id: '1',
      name: 'Pepperoni grandma slice',
      calories: 500,
      carbs: 35,
      protein: 25,
      fat: 28,
    },
    {
      id: '2',
      name: "Mike's hot honey",
      calories: 150,
      carbs: 12,
      protein: 0,
      fat: 0,
    },
    {
      id: '3',
      name: 'Coffee with milk',
      calories: 60,
      carbs: 8,
      protein: 3,
      fat: 2,
    },
    {
      id: '4',
      name: 'Greek yogurt',
      calories: 100,
      carbs: 12,
      protein: 15,
      fat: 0,
    },
    {
      id: '5',
      name: 'Banana',
      calories: 105,
      carbs: 27,
      protein: 1,
      fat: 0,
    },
    {
      id: '6',
      name: 'Grilled chicken salad',
      calories: 350,
      carbs: 20,
      protein: 35,
      fat: 15,
    },
    {
      id: '7',
      name: 'Apple',
      calories: 95,
      carbs: 25,
      protein: 0,
      fat: 0,
    },
    {
      id: '8',
      name: 'Protein shake',
      calories: 160,
      carbs: 8,
      protein: 30,
      fat: 2,
    }
  ];

  // Calculate totals
  const totalCalories = foodLog.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = foodLog.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = foodLog.reduce((sum, item) => sum + item.carbs, 0);
  const totalFat = foodLog.reduce((sum, item) => sum + item.fat, 0);

  return (
    <LayoutGroup>
      <div className="h-full flex flex-col bg-background">
        <AIChatNutritionHeader 
          currentView={currentView} 
          onViewChange={setCurrentView} 
        />
        
        <div className="flex-1 overflow-hidden relative">
          <AIChatNutritionMotion
            currentView={currentView}
            onViewChange={setCurrentView}
            messages={messages}
            setMessages={setMessages}
            foodLog={foodLog}
            totalCalories={totalCalories}
            totalProtein={totalProtein}
            totalCarbs={totalCarbs}
            totalFat={totalFat}
          />
        </div>
      </div>
    </LayoutGroup>
  );
};