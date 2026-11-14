# 图片 FnImage

展示图片，支持懒加载、加载失败回退与点击预览。

## 使用说明

- FnImage：必填的 `src` 和 `alt`，可选的 `width`、`height` 以及原生
  `loading`；触发原生 `load` 和 `error`。可选的 `fallbackSrc` 在原图失败后
  使用一次，且不会应用原图的 `srcset`；更改任一来源都会重试原图。回退图失败
  时只触发 `error`，不再重试。平台入口支持 `preview` 和 `placeholder` 插槽；
  加载完成后，预览按钮会打开 `FnImageViewer`。请提供尺寸以确保加载占位可见。
  `previewLabel` 为按钮命名。仅核心导出保持为无预览的原生图片。
- 这些组件在两个平台上共享 fnUI 原生标记。调用方提供的文本和图片替代内容
  不会自动翻译。

## 设计参考

- [TDesign 图片 设计指南](https://tdesign.tencent.com/vue-next/components/image?tab=design)
