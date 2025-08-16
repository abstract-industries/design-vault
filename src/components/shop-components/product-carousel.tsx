import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type ProductCarouselProps = {
  className?: string
  children?: React.ReactNode
}

const ProductCarousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ProductCarouselProps
>(({ className, children, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  const checkScrollability = React.useCallback(() => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollPrev(scrollLeft > 0)
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1)
  }, [])

  React.useEffect(() => {
    checkScrollability()
    const container = scrollContainerRef.current
    if (!container) return

    container.addEventListener("scroll", checkScrollability)
    window.addEventListener("resize", checkScrollability)

    return () => {
      container.removeEventListener("scroll", checkScrollability)
      window.removeEventListener("resize", checkScrollability)
    }
  }, [checkScrollability])

  const scrollPrev = React.useCallback(() => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const itemWidth = container.offsetWidth * 0.8 // Match the basis-4/5 width
    container.scrollBy({ left: -itemWidth, behavior: "smooth" })
  }, [])

  const scrollNext = React.useCallback(() => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const itemWidth = container.offsetWidth * 0.8 // Match the basis-4/5 width
    container.scrollBy({ left: itemWidth, behavior: "smooth" })
  }, [])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  return (
    <div
      ref={ref}
      onKeyDownCapture={handleKeyDown}
      className={cn("relative group", className)}
      role="region"
      aria-roledescription="carousel"
      {...props}
    >
      {/* Content container with scroll snap */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex -ml-4">
          {children}
        </div>
      </div>

      {/* Previous button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute h-8 w-8 rounded-full -left-12 top-1/2 -translate-y-1/2",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>

      {/* Next button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute h-8 w-8 rounded-full -right-12 top-1/2 -translate-y-1/2",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
})
ProductCarousel.displayName = "ProductCarousel"

const ProductCarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }) => {
  // This component is no longer needed, but kept for compatibility
  return <>{children}</>
})
ProductCarouselContent.displayName = "ProductCarouselContent"

const ProductCarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-4/5 pl-4 snap-start",
        className
      )}
      {...props}
    />
  )
})
ProductCarouselItem.displayName = "ProductCarouselItem"

// Legacy exports for compatibility
const ProductCarouselPrevious = () => null
const ProductCarouselNext = () => null

export {
  ProductCarousel,
  ProductCarouselContent,
  ProductCarouselItem,
  ProductCarouselPrevious,
  ProductCarouselNext,
}