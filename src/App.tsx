import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { ComponentList } from "@/components/ComponentList"
import { ComponentView } from "@/components/ComponentView"
import { Welcome } from "@/components/Welcome"
import { useMediaQuery } from "@/hooks/useMediaQuery"

function Layout() {
  const { id } = useParams<{ id: string }>()
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Mobile layout - show either list or detail view
  if (isMobile) {
    return (
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<ComponentList isMobile={true} />} />
          <Route path="/component/:id" element={<ComponentView isMobile={true} />} />
        </Routes>
      </div>
    )
  }

  // Desktop layout - show both side by side
  return (
    <div className="flex h-screen">
      <ComponentList selectedId={id} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/component/:id" element={<ComponentView />} />
      </Routes>
    </div>
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