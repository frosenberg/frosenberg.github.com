# Claude.md

Next.js 16 (App Router) + Tailwind CSS 4 + Framer Motion + Lucide React + TypeScript

## Structure
`src/`: app/ (routes), components/, lib/, hooks/, types/

## Rules
- Server Components default; `"use client"` only when needed
- Tailwind utilities only; use `cn()` for conditionals
- Framer Motion for animations; import only `motion`, `AnimatePresence`
- Lucide: import icons individually, size via prop
- Strict TypeScript; no `any`; `interface` for objects, `type` for unions
- Data fetching in Server Components only
- Use `next/image`, `next/link`

## Patterns
```tsx
// Server (default)
export default async function Page({ id }: { id: string }) {
  const data = await fetch(id);
  return <div>{data.title}</div>;
}

// Client
"use client";
import { motion } from "framer-motion";
export const Btn = () => <motion.button whileTap={{ scale: 0.95 }} />;

// Conditional classes
<div className={cn("base", active && "active")} />
```

## Avoid
`pages/` dir, full icon imports, unnecessary `"use client"`, `useEffect` for fetching