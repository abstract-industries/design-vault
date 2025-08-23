import { Link, useLocation } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { components } from "@/data/components"

export function AppSidebar() {
  const location = useLocation()
  
  // Extract component ID from the current path
  const currentPath = location.pathname
  const selectedId = currentPath.startsWith('/component/') 
    ? currentPath.replace('/component/', '') 
    : undefined
  
  // Group components by category
  const categories = Array.from(new Set(components.map(c => c.category)))

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between px-2 py-2">
          <h2 className="text-xl font-semibold">DesignVault</h2>
          <ModeToggle />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {categories.map((category) => (
          <SidebarGroup key={category}>
            <SidebarGroupLabel>{category}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {components
                  .filter((c) => c.category === category)
                  .map((component) => (
                    <SidebarMenuItem key={component.id}>
                      <SidebarMenuButton 
                        asChild
                        isActive={selectedId === component.id}
                      >
                        <Link to={`/component/${component.id}`}>
                          <span>{component.name}</span>
                          <ChevronRight className="ml-auto h-4 w-4" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}