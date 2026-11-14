# fnUI 文档站

fnUI 的组件文档、可运行示例与模板预览，基于 Vue 3 + Vite 构建。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

静态产物输出到 `dist/`。设置 `FNUI_BASE=/fnui/` 可构建子路径版本。

生产构建需保留 CSS 分包：文档站、桌面预览和移动预览分别加载各自的样式，避免两端 TDesign 样式相互覆盖。

## 内容组织

- `src/data/catalog.ts`：组件目录。
- `src/examples/`：组件示例，由 `src/data/examples.ts` 登记。
- `docs/guides/`：每个组件独立的使用指南。
- `playground/`：模板预览与开发调试页面。
- `fnos-static/`、`fnos-reference-icons/`：模板与文档使用的演示素材。

组件库与主题包分别位于 [fnui](https://github.com/naspk-com/fnui) 与
[fnui-theme](https://github.com/naspk-com/fnui-theme)。
