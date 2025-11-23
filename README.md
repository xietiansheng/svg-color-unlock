# SVG ColorUnlock

> English: [README.en.md](README.en.md)

一个纯前端的 SVG 清理与预览工具，移除设计稿里的 `fill` / `stroke` 等属性，统一改为 `currentColor`，让图标可以继承文字颜色。基于 Vite + Vue 3 + TypeScript，可直接部署到 GitHub Pages。

## 功能
- 粘贴或上传 SVG 源码，自动解析
- 递归移除 `fill` / `stroke` / `style` / `fill-opacity` / `stroke-opacity`
- 自动补全 `fill="currentColor"`
- 左右对比预览：原始 vs 清理后，同步缩放并可重置
- 一键复制或下载清理后的 SVG

## 技术栈
- Vite
- Vue 3.5 (Composition API + `<script setup>`)
- TypeScript
- 原生 CSS

## 目录结构
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

## 本地开发
确保已安装 `pnpm`。
```bash
pnpm install
pnpm dev
```
启动后访问终端输出的本地地址。

## 构建与部署
`vite.config.ts` 已设置 `base: './'`，构建产物可直接用于 GitHub Pages。
```bash
pnpm build
```
将 `dist/` 目录部署到 GitHub Pages 即可。

## 核心逻辑
- `src/utils/parseSvg.ts`：使用 `DOMParser` 解析并校验 SVG。
- `src/utils/cleanSvg.ts`：递归移除阻断继承的属性并设置 `fill="currentColor"`。
- `src/utils/download.ts`：将字符串转为 Blob，触发浏览器下载。

## 使用指南
1) 在输入区粘贴或上传 SVG。  
2) 点击“清理 SVG”生成可继承 `currentColor` 的版本。  
3) 在预览区对比原始与清理后的效果，可用缩放查看细节。  
4) 在输出区复制或下载优化后的 SVG。  

## 可选检查
运行类型检查：
```bash
pnpm typecheck
```
