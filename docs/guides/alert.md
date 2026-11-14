# 提示 FnAlert

在页面内展示一条需要关注的状态信息。

## 使用说明

- FnAlert：必填的 `title`、`tone`，可选默认插槽用于详情，以及可选的
  `closable` 配合受控的 `visible`。关闭时依次触发 `update:visible` 和
  `close`；`closeText` 覆盖本地化标签。无 ref 方法。使用 alert 语义，不自动
  消失、不滚动；它不是 toast。
- 这些组件在两个平台上共享 fnUI 原生标记。调用方提供的文本和图片替代内容
  不会自动翻译。

## 设计参考

- [TDesign 提示 设计指南](https://tdesign.tencent.com/vue-next/components/alert?tab=design)
