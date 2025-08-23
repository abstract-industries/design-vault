"use client"

import * as motion from "motion/react-client"
import { ChartRadialSimple } from "./chart-radial-simple"

interface ChartRadialClickableProps {
  calories?: number;
  maxCalories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  onClick?: () => void;
  layoutId?: string;
}

export function ChartRadialClickable({
  calories,
  maxCalories,
  protein,
  carbs,
  fat,
  onClick,
  layoutId = "nutrition-chart"
}: ChartRadialClickableProps) {
  return (
    <motion.div
      layoutId={layoutId}
      layout
      onClick={onClick}
      className="cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        layout: {
          type: "spring",
          bounce: 0.2,
          duration: 0.6
        }
      }}
    >
      <ChartRadialSimple
        calories={calories}
        maxCalories={maxCalories}
        protein={protein}
        carbs={carbs}
        fat={fat}
      />
    </motion.div>
  )
}