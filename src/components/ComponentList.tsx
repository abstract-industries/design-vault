import { Link } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { components } from "@/data/components"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

interface ComponentListProps {
  selectedId?: string
  isMobile?: boolean
}

export function ComponentList({ selectedId, isMobile = false }: ComponentListProps) {
  const categories = Array.from(new Set(components.map(c => c.category)))

  if (isMobile) {
    return (
      <div className="h-screen bg-muted/30">
        <div className="p-4 bg-background border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">DesignVault</h2>
          <ModeToggle />
        </div>
        <ScrollArea className="h-[calc(100vh-72px)]">
          <div className="p-4 space-y-6">
            {categories.map(category => (
              <div key={category}>
                <h3 className="text-base font-bold text-foreground mb-3">
                  {category}
                </h3>
                <div className="bg-card rounded-lg overflow-hidden shadow-sm">
                  {components
                    .filter(c => c.category === category)
                    .map((component, index, arr) => (
                      <div key={component.id}>
                        <Link
                          to={`/component/${component.id}`}
                          className={cn(
                            "flex items-center justify-between px-4 py-3 transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            selectedId === component.id && "bg-accent text-accent-foreground"
                          )}
                        >
                          <span className="text-sm font-medium">{component.name}</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        {index < arr.length - 1 && (
                          <Separator className="mx-4" />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="w-64 border-r h-screen">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">DesignVault</h2>
        <ModeToggle />
      </div>
      <ScrollArea className="h-[calc(100vh-72px)]">
        <div className="pt-4 px-2 pb-4">
          {categories.map(category => (
            <div key={category} className="mb-6">
              <h3 className="px-2 mb-3 text-base font-bold text-foreground">
                {category}
              </h3>
              <div className="space-y-1">
                {components
                  .filter(c => c.category === category)
                  .map(component => (
                    <Link
                      key={component.id}
                      to={`/component/${component.id}`}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        selectedId === component.id &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      <span>{component.name}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}