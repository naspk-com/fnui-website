# 文字 FnTypography

展示文本内容，支持省略、复制和就地编辑。

## 使用说明

- FnTypography：`as`（`p`、`span`、`strong`、`h1` 到 `h6`）和默认插槽。
  `ellipsis` 将可见内容限制为指定行数；0 表示不限制。提供 `copyText` 会添加
  使用浏览器 Clipboard API 的按钮，并在成功时触发 `copy`，失败时触发
  `copy-error`。`copyLabel` 自定义其本地化标签。剪贴板访问可能需要安全上下文
  和权限。启用 `editable` 时，`modelValue` 为必填；编辑保存会依次触发
  `update:modelValue` 和 `change`，由父组件控制显示值。Escape 或取消会丢弃
  草稿。存在默认插槽时，编辑期间由插槽控制显示；外部值变化不会替换进行中的
  草稿。标签可通过 `editLabel`、`saveLabel` 和 `cancelLabel` 自定义。
  无 ref 方法。
- 这些组件在两个平台上共享 fnUI 原生标记。调用方提供的文本和图片替代内容
  不会自动翻译。

## 设计参考

- [TDesign 文字 设计指南](https://tdesign.tencent.com/vue-next/components/typography?tab=design)
