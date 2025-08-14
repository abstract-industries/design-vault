export interface ComponentItem {
  id: string
  name: string
  category: string
  description: string
}

export const components: ComponentItem[] = [
  {
    id: "button",
    name: "Button",
    category: "Actions",
    description: "Displays a button or a component that looks like a button."
  },
  {
    id: "card",
    name: "Card",
    category: "Layout",
    description: "Displays a card with header, content, and footer."
  },
  {
    id: "input",
    name: "Input",
    category: "Forms",
    description: "Displays a form input field."
  },
  {
    id: "select",
    name: "Select",
    category: "Forms",
    description: "Displays a dropdown select component."
  },
  {
    id: "dialog",
    name: "Dialog",
    category: "Overlay",
    description: "A modal dialog component."
  },
  {
    id: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Displays a callout for user attention."
  },
  {
    id: "badge",
    name: "Badge",
    category: "Data Display",
    description: "Displays a badge component."
  },
  {
    id: "avatar",
    name: "Avatar",
    category: "Data Display",
    description: "An image element with a fallback for representing the user."
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "A set of layered sections of content."
  },
  {
    id: "tooltip",
    name: "Tooltip",
    category: "Overlay",
    description: "A popup that displays information related to an element."
  }
]