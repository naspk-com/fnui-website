# 标签 FnTag

用简短标签标识状态、分类或筛选条件。

## 使用说明

- FnTag：`tone`（`default`、`primary`、`success`、`warning`、`danger`）；
  默认插槽为标签内容。可选的 `selectable` 使用受控的 `checked`，并依次触发
  `update:checked` 和 `change`。可选的 `closable` 将 `close` 作为意图事件
  触发；由父组件移除标签。`disabled` 会阻止两种操作，`closeText` 为移除
  操作提供标签。
- 这些组件在两个平台上共享 fnUI 原生标记。调用方提供的文本和图片替代内容
  不会自动翻译。

## 设计参考

- [TDesign 标签 设计指南](https://tdesign.tencent.com/vue-next/components/tag?tab=design)
