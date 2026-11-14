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

构建时会按组件目录生成静态页面，例如 `dist/components/button/index.html`，供 EdgeOne Pages 等静态托管服务直接访问。指南、组件总览和模板页也会生成对应入口；桌面和移动预览仍使用各自的 HTML 文件。部署时构建命令为 `npm run build`，输出目录为 `dist`。请在部署后检查页面的无尾斜杠地址、刷新及前进后退行为；无需配置 SPA 重写或边缘函数。

## 内容组织

- `src/data/catalog.ts`：组件目录。
- `src/examples/`：组件示例，由 `src/data/examples.ts` 登记。
- `docs/guides/`：每个组件独立的使用指南。
- `playground/`：模板预览与开发调试页面。
- `fnos-static/`、`fnos-reference-icons/`：模板与文档使用的演示素材。

组件库与主题包分别位于 [fnui](https://github.com/naspk-com/fnui) 与
[fnui-theme](https://github.com/naspk-com/fnui-theme)。
