# 动作面板 FnActionSheet

从底部弹出的操作列表，支持分组与懒加载。

## 使用说明

- Props：受控的 `visible`、必填的 `title`、唯一的
  `{ value: string | 有限数值, label, disabled? }` 数组 `items`、`closeLabel`
  与 `closeOnOverlayClick`（默认 false）。使用 fnUI 底部抽屉及其浮层栈、
  Escape 处理和焦点恢复。
- items 可以包含 `children`；选择分支会进入下一级，`backText` 为返回按钮
  提供标签。`lazy` 项可通过 `loadChildren(item)` 返回子项的 Promise。加载和
  可重试失败会展示；失败触发 `load-error`。键在整棵树中唯一，循环引用和共享
  项对象会被拒绝。关闭、更改 items 或更改 loader 会清除缓存并使未完成的请求
  失效。
- 选择启用的叶子会触发 `select`，携带其值，且不会自动关闭；父组件负责可见性。
  抽屉关闭时触发 `update:visible(false)`，随后以抽屉关闭来源触发 `close`。
  `item` 插槽接收 `{ item }`；不暴露 ref 方法。
- 插槽内容位于按钮内部，不能包含可交互控件。未实现完整的厂商 API。

## 设计参考

- [TDesign 动作面板 设计指南](https://tdesign.tencent.com/mobile-vue/components/action-sheet?tab=design)
