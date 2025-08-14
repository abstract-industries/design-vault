import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"
import { ComponentList } from "@/components/ComponentList"
import { ComponentView } from "@/components/ComponentView"
import { Welcome } from "@/components/Welcome"

function Layout() {
  const { id } = useParams<{ id: string }>()

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