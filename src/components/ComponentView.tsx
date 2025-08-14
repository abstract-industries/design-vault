import { useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { components } from "@/data/components"

export function ComponentView() {
  const { id } = useParams<{ id: string }>()
  const component = components.find(c => c.id === id)

  if (!component) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Component not found</h2>
          <p className="text-muted-foreground">Select a component from the list</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{component.name}</h1>
          <p className="text-muted-foreground">{component.description}</p>
        </div>

        <Separator className="mb-8" />

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Examples</h2>
            <div className="space-y-4">
              {component.id === "button" && <ButtonExamples />}
              {component.id === "card" && <CardExamples />}
              {!["button", "card"].includes(component.id) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>
                      Examples for {component.name} will be added soon.
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Props</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  Props documentation will be displayed here
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

function ButtonExamples() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>The default button variant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sizes</CardTitle>
          <CardDescription>Different button sizes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>States</CardTitle>
          <CardDescription>Button states</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button>Active</Button>
            <Button disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function CardExamples() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Basic Card</CardTitle>
          <CardDescription>A simple card with header and content</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content. You can put any content here.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Card with interactive elements</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Cards can contain interactive elements like buttons.</p>
          <div className="flex gap-2">
            <Button size="sm">Action</Button>
            <Button size="sm" variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}