'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChartRadialClickable } from '@/components/calorie-components/chart-radial-clickable';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface FoodLogItem {
  id: string;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

interface AIChatNutritionUIProps {
  foodLog: FoodLogItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  onChartClick?: () => void;
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

export function AIChatNutritionUI({ 
  foodLog, 
  totalCalories, 
  totalProtein, 
  totalCarbs, 
  totalFat,
  onChartClick 
}: AIChatNutritionUIProps) {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-auto">
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

          {/* Nutrition Chart */}
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
      </div>
    </div>
  );
}