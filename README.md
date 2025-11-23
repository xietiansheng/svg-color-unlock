# SVG ColorUnlock

> Read this in [中文](README.zh-CN.md).

A front-end–only cleaner and viewer that strips `fill`/`stroke` and related attributes from designer-provided SVGs, rewriting them to `currentColor` so icons inherit text color. Built with Vite + Vue 3 + TypeScript and deployable to GitHub Pages.

## Features
- Paste or upload SVG text for instant parsing
- Recursively remove `fill` / `stroke` / `style` / `fill-opacity` / `stroke-opacity`
- Auto-add `fill="currentColor"`
- Side-by-side preview: original vs cleaned, with synchronized zoom and reset
- Copy or download the cleaned SVG

## Tech Stack
- Vite
- Vue 3.5 (Composition API + `<script setup>`)
- TypeScript
- Vanilla CSS

## Project Structure
```
svg-colorunlock/
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ src/
│  ├─ main.ts
│  ├─ App.vue
│  ├─ components/
│  │  ├─ SvgInputPanel.vue
│  │  ├─ SvgPreview.vue
│  │  └─ SvgOutputPanel.vue
│  ├─ utils/
│  │  ├─ parseSvg.ts
│  │  ├─ cleanSvg.ts
│  │  └─ download.ts
│  └─ styles/
│     └─ index.css
└─ .gitignore
```

## Local Development
Requires `pnpm`.
```bash
pnpm install
pnpm dev
```
Open the local URL shown in the terminal.

## Build & Deploy
`vite.config.ts` is set with `base: './'` for GitHub Pages–friendly output.
```bash
pnpm build
```
Deploy the `dist/` folder to GitHub Pages.

## Core Logic
- `src/utils/parseSvg.ts`: Parses and validates SVG with `DOMParser`.
- `src/utils/cleanSvg.ts`: Recursively removes blocking attributes and sets `fill="currentColor"`.
- `src/utils/download.ts`: Converts string to Blob and triggers download.

## How to Use
1) Paste or upload SVG in the input panel.  
2) Click “清理 SVG” to generate the inheritable version.  
3) Compare original vs cleaned in the preview; use zoom to inspect details.  
4) Copy or download from the output panel.  

## Optional Check
Run type checking:
```bash
pnpm typecheck
```
