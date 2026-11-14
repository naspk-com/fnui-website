# 气泡确认 FnPopconfirm

在气泡中确认一项高风险操作。

## 使用说明

- Props：受控的 `visible`、必填的 `title`、`disabled`、`triggerText`、
  `confirmText`、`cancelText`、`confirmLoading`，以及桌面端的 `placement`
  （`top`、`bottom`、`left`、`right`）。
- 插槽：`trigger`、默认描述内容，以及接收 `confirm`、`cancel`、`loading`
  的 `footer`。无 ref 方法。触发内容不能包含可交互元素。
- 事件：打开或关闭时触发 `update:visible`，取消按钮触发 `cancel`，确认时触发
  `confirm`。确认仅表达意图，不会自动关闭；父组件控制异步结果与可见性。
- 桌面端使用锚定到触发元素的 fnUI popover；移动端使用居中的 fnUI Dialog，
  并忽略 `placement`。`disabled` 阻止打开。不支持 hover 触发。

## 设计参考

- [TDesign 气泡确认 设计指南](https://tdesign.tencent.com/vue-next/components/popconfirm?tab=design)
