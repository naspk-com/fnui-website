# 头像 FnAvatar

展示用户头像，加载失败时回退为文字。

## 使用说明

- FnAvatar：`src`、必填的 `alt`，以及以像素为单位的 `size`；未提供来源或
  图片加载失败时，默认插槽作为回退内容。会触发原生 `error` 事件；更改 `src`
  会用新图片重试。无 ref 方法。
- 这些组件在两个平台上共享 fnUI 原生标记。调用方提供的文本和图片替代内容
  不会自动翻译。

## 设计参考

- [TDesign 头像 设计指南](https://tdesign.tencent.com/vue-next/components/avatar?tab=design)
