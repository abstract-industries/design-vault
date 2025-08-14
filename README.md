# DesignVault

A modern design system showcase application built with React, TypeScript, Vite, Tailwind CSS, and ShadCN/UI.

## Features

- **Component Library Browser**: Browse through your design system components in an organized sidebar
- **Live Examples**: View interactive examples of each component
- **Category Organization**: Components are organized by category (Actions, Forms, Layout, etc.)
- **Clean UI**: Built with ShadCN/UI and Tailwind CSS for a modern, accessible interface

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN/UI** - Component library built on Radix UI
- **React Router** - Navigation
- **Radix UI** - Unstyled, accessible components

## Project Structure

```
src/
├── components/
│   ├── ui/           # ShadCN/UI components
│   ├── ComponentList.tsx    # Sidebar component list
│   ├── ComponentView.tsx    # Component detail view
│   └── Welcome.tsx          # Welcome screen
├── data/
│   └── components.ts        # Component metadata
├── lib/
│   └── utils.ts            # Utility functions
└── App.tsx                 # Main app component
```

## Adding New Components

1. Add the component metadata to `src/data/components.ts`
2. Install the ShadCN/UI component or create your own in `src/components/ui/`
3. Add examples in `ComponentView.tsx`

## Customization

- **Theme**: Edit CSS variables in `src/index.css`
- **Components**: Modify or add components in `src/components/ui/`
- **Layout**: Adjust the main layout in `src/App.tsx`
