'use client';

import { useState } from 'react';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Response } from '@/components/ai-elements/response';
import { Actions, Action } from '@/components/ai-elements/actions';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning';
import { PromptInput, PromptInputTextarea, PromptInputToolbar, PromptInputSubmit } from '@/components/ai-elements/prompt-input';
import { ChartRadialSimple } from '@/components/calorie-components/chart-radial-simple';
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from '@/components/ai-elements/tool';
import { Copy, Edit3, RotateCw } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';

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

type NutritionItem = {
  item: string;
  quantity: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

const nutritionColumns: ColumnDef<NutritionItem>[] = [
  {
    accessorKey: 'item',
    header: 'Item',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
  {
    accessorKey: 'calories',
    header: 'Calories',
  },
  {
    accessorKey: 'carbs',
    header: 'Carbs (g)',
  },
  {
    accessorKey: 'protein',
    header: 'Protein (g)',
  },
  {
    accessorKey: 'fat',
    header: 'Fat (g)',
  },
];

const NutritionDataTable = () => {
  const nutritionData: NutritionItem[] = [
    {
      item: 'Pepperoni grandma slice',
      quantity: '1',
      calories: 500,
      carbs: 35,
      protein: 25,
      fat: 28,
    },
    {
      item: "Mike's hot honey",
      quantity: '1 tsp',
      calories: 150,
      carbs: 12,
      protein: 0,
      fat: 0,
    },
  ];

  const table = useReactTable({
    data: nutritionData,
    columns: nutritionColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={nutritionColumns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export const AIChatNutritionExample = () => {
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
      content: (
        <>
          <p className="mb-4">Alright, here's how I broke it down. Let me know if this looks right to you.</p>
          <NutritionDataTable />
          <p className="mt-4">How's this look?</p>
        </>
      ),
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
                    
                    {message.showChart && (
                      <div className="mt-6">
                        <div className="w-full max-w-sm">
                          <ChartRadialSimple 
                            calories={1520}
                            maxCalories={2000}
                            protein={67}
                            carbs={147}
                            fat={63}
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