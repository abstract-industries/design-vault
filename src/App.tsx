import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ComponentView } from "@/components/ComponentView"
import { Welcome } from "@/components/Welcome"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/component/:id" element={<ComponentView />} />
          </Routes>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App