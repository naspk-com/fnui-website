# 徽标 FnBadge

在图标或头像上叠加数量与红点提示。

## 使用说明

- FnBadge：`content`（字符串或数字）、`dot`，以及可选的非负数值 `max`；
  大于 max 的数字内容会显示为 `max+`；默认插槽为被锚定的内容。无事件或
  ref 方法。红点是装饰性的；文本内容会暴露给辅助技术。
- 这些组件在两个平台上共享 fnUI 原生标记。调用方提供的文本和图片替代内容
  不会自动翻译。

## 设计参考

- [TDesign 徽标 设计指南](https://tdesign.tencent.com/vue-next/components/badge?tab=design)
