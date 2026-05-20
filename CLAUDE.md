# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # install dependencies
pnpm dev              # start dev server (port 3662)
pnpm build            # typecheck + production build (tsc && vite build)
pnpm lint             # eslint src
```

There is no test suite. CI runs `pnpm tsc` only.

## Architecture

Keyboard-driven image annotation tool built with Vite + React 17 + SWC. Users paste an image from the clipboard, then add/move/resize annotations (rectangles, filled rectangles, text, arrows) entirely via keyboard shortcuts. All rendering uses the HTML5 Canvas API directly — there is no DOM-based annotation layer.

**Core data flow:** Clipboard paste → `useOnPasteImage` creates an `HTMLImageElement` → `Canvas` component holds an `elements` array in local state → on every state change, a `useEffect` clears the canvas, redraws the image, then iterates `elements` calling draw functions from `utils/canvas.ts`.

**Key modules:**
- `src/components/Canvas.tsx` — central component; owns all annotation state (`elements`, focus index) and registers ~30 keyboard shortcuts via `useKeyPress`
- `src/types.ts` — discriminated union `RenderedElement = Rectangle | Text | Arrow | FilledRectangle` with type guards
- `src/utils/canvas.ts` — pure Canvas2D drawing functions (`drawRoundedRect`, `drawText`, `drawArrow`, `drawFilledRect`); reads settings via `getState()` from the store
- `src/hooks/useKeyPress.ts` — custom hook for keyboard shortcuts; modifier syntax is dot-separated (e.g., `ctrl.shift.ArrowRight`); disables shortcuts while an input is focused (except Escape)
- `src/store.ts` — zustand store for app settings (colors, movement deltas, dark mode); settings persisted to localStorage
- `src/utils/settings.ts` — localStorage read/write for `Settings` type

**Path alias:** `src/` resolves to `./src/` (configured in both `vite.config.ts` and `tsconfig.json`).

**Styling:** Tailwind CSS with class-based dark mode. Dark mode toggle lives in the zustand store subscription that adds/removes the `dark` class on `<html>`.

**Deployment:** Vercel (https://image-annotator.vercel.app).
