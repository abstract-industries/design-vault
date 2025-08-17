"use client"

import { Flame, Beef, Droplet, Wheat } from "lucide-react"
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts"
import { useState, useEffect } from "react"

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

export const description = "A calorie tracking radial chart"

const originalChartData = [
  { 
    name: "carbs", 
    value: 65, 
    displayValue: 65,
    max: 100,
    fill: "hsl(142, 71%, 45%)", // Green matching Wheat icon
    grams: "162g / 250g",
    actualGrams: 162,
    targetGrams: 250,
    isOver: false
  },
  { 
    name: "fat", 
    value: 100, // Capped at 100 for display
    displayValue: 115, // Actual value over 100
    max: 100,
    fill: "hsl(48, 96%, 53%)", // Yellow matching Droplet icon
    grams: "77g / 67g",
    actualGrams: 77,
    targetGrams: 67,
    isOver: true
  },
  { 
    name: "protein", 
    value: 85, 
    displayValue: 85,
    max: 100,
    fill: "hsl(0, 84%, 60%)", // Red matching Beef icon
    grams: "106g / 125g",
    actualGrams: 106,
    targetGrams: 125,
    isOver: false
  },
  { 
    name: "calories", 
    value: 75, 
    displayValue: 75,
    max: 100,
    fill: "hsl(217, 91%, 60%)", // Blue for calories
    amount: "1,875 / 2,500",
    actualAmount: 1875,
    targetAmount: 2500,
    isOver: false
  },
]

const chartConfig = {
  value: {
    label: "Progress",
  },
  calories: {
    label: "Calories",
    color: "hsl(217, 91%, 60%)",
  },
  protein: {
    label: "Protein",
    color: "hsl(0, 84%, 60%)",
  },
  fat: {
    label: "Fat",
    color: "hsl(48, 96%, 53%)",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(142, 71%, 45%)",
  },
} satisfies ChartConfig

function getSemanticDate(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays <= 7) return `${diffDays} days ago`
  
  // For dates older than a week, show the actual date
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

function getShortTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  }).toLowerCase()
}

export function ChartRadialSimple() {
  const [currentDate] = useState(new Date())
  const [hoveredMacro, setHoveredMacro] = useState<string | null>(null)
  
  // Create chart data with hover effects
  const chartData = hoveredMacro 
    ? originalChartData.map(item => ({
        ...item,
        fill: item.name === hoveredMacro ? item.fill : "hsl(0, 0%, 80%)" // Gray out non-hovered
      }))
    : originalChartData
  
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          {hoveredMacro ? hoveredMacro.charAt(0).toUpperCase() + hoveredMacro.slice(1) : 'Daily Nutrition'}
        </CardTitle>
        <CardDescription>
          {getSemanticDate(currentDate)} at {getShortTime(currentDate)}
        </CardDescription>
      </CardHeader>
      <CardContent 
        className="flex-1 pb-0"
        onMouseLeave={() => setHoveredMacro(null)}
      >
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] relative"
        >
          <RadialBarChart 
            data={chartData} 
            startAngle={90} 
            endAngle={-270}
            innerRadius={30} 
            outerRadius={110}
            onMouseMove={(e: any) => {
              if (e && e.activePayload && e.activePayload[0]) {
                setHoveredMacro(e.activePayload[0].payload.name)
              }
            }}
            onMouseLeave={() => setHoveredMacro(null)}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  hideLabel
                  hideIndicator
                  formatter={(value: any, name: string, item: any) => (
                    <div className="flex w-full items-center justify-between gap-4">
                      <span className="capitalize font-medium">{name}</span>
                      <span className="font-mono font-medium tabular-nums text-foreground">
                        {item.payload.isOver ? (
                          <>
                            <span style={{ color: "hsl(0, 84%, 60%)" }}>{item.payload.actualGrams}g</span>
                            <span> / {item.payload.targetGrams}g</span>
                          </>
                        ) : (
                          item.payload.grams || item.payload.amount
                        )}
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
              onMouseEnter={(data: any) => {
                if (data) {
                  setHoveredMacro(data.name)
                }
              }}
              onMouseLeave={() => setHoveredMacro(null)}
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="grid grid-cols-2 gap-4 w-full">
          <div 
            className="flex items-center gap-2 cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredMacro('calories')}
            onMouseLeave={() => setHoveredMacro(null)}
            style={{ 
              opacity: hoveredMacro && hoveredMacro !== 'calories' ? 0.3 : 1,
            }}
          >
            <Flame 
              className="h-4 w-4 transition-colors duration-200"
              style={{ 
                color: hoveredMacro && hoveredMacro !== 'calories' 
                  ? 'hsl(0, 0%, 60%)' 
                  : 'hsl(217, 91%, 60%)' 
              }}
            />
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Calories</p>
              <p className="text-sm font-medium">1,875 / 2,500</p>
            </div>
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredMacro('protein')}
            onMouseLeave={() => setHoveredMacro(null)}
            style={{ 
              opacity: hoveredMacro && hoveredMacro !== 'protein' ? 0.3 : 1,
            }}
          >
            <Beef 
              className="h-4 w-4 transition-colors duration-200"
              style={{ 
                color: hoveredMacro && hoveredMacro !== 'protein' 
                  ? 'hsl(0, 0%, 60%)' 
                  : 'hsl(0, 84%, 60%)' 
              }}
            />
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Protein</p>
              <p className="text-sm font-medium">106g / 125g</p>
            </div>
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredMacro('fat')}
            onMouseLeave={() => setHoveredMacro(null)}
            style={{ 
              opacity: hoveredMacro && hoveredMacro !== 'fat' ? 0.3 : 1,
            }}
          >
            <Droplet 
              className="h-4 w-4 transition-colors duration-200"
              style={{ 
                color: hoveredMacro && hoveredMacro !== 'fat' 
                  ? 'hsl(0, 0%, 60%)' 
                  : 'hsl(48, 96%, 53%)' 
              }}
            />
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Fat</p>
              <p className="text-sm font-medium">
                <span style={{ color: "hsl(0, 84%, 60%)" }}>77g</span>
                <span> / 67g</span>
              </p>
            </div>
          </div>
          <div 
            className="flex items-center gap-2 cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredMacro('carbs')}
            onMouseLeave={() => setHoveredMacro(null)}
            style={{ 
              opacity: hoveredMacro && hoveredMacro !== 'carbs' ? 0.3 : 1,
            }}
          >
            <Wheat 
              className="h-4 w-4 transition-colors duration-200"
              style={{ 
                color: hoveredMacro && hoveredMacro !== 'carbs' 
                  ? 'hsl(0, 0%, 60%)' 
                  : 'hsl(142, 71%, 45%)' 
              }}
            />
            <div className="space-y-0.5">
              <p className="text-xs text-muted-foreground">Carbs</p>
              <p className="text-sm font-medium">162g / 250g</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}