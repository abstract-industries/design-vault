import { Link } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { components } from "@/data/components"
import { cn } from "@/lib/utils"

interface ComponentListProps {
  selectedId?: string
}

export function ComponentList({ selectedId }: ComponentListProps) {
  const categories = Array.from(new Set(components.map(c => c.category)))

  return (
    <div className="w-64 border-r h-screen">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Components</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-60px)]">
        <div className="px-2 pb-4">
          {categories.map(category => (
            <div key={category} className="mb-4">
              <h3 className="px-2 mb-2 text-sm font-medium text-muted-foreground">
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
                        "block px-3 py-2 text-sm rounded-md transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        selectedId === component.id &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      {component.name}
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