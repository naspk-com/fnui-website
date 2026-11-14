# 引导 FnGuide

按步骤高亮界面元素，引导用户完成首次使用。

## 使用说明

- Props：必填的受控从 0 开始的 `modelValue`、非空 `steps`（每项为
  `{ title, description?, target? }`，其中 `target` 是 CSS 选择器），以及
  可选的 `label`、`previousText`、`nextText`、`finishText`、`closeText`、
  `disabled`、`overlay`、`scrollToTarget` 和受控的 `visible`（默认 true）。
  索引必须是步骤范围内的整数。
- 上一步/下一步依次触发 `update:modelValue` 和 `change`；父组件可以拒绝请求。
  完成仅触发 `finish`，不会关闭或改变索引。`step` 插槽接收 `{ step, index }`；
  不暴露 ref 方法。
- 默认是行内面板。可选的 `overlay` 会在 Provider 浮层作用域内渲染模态框，
  高亮可见目标，通过共享模态栈捕获焦点，并在 Escape 或关闭时触发
  `update:visible(false)`。父组件可以拒绝关闭。模态框默认阻止与目标交互。
  `allowTargetInteraction` 会让高亮目标保持可交互，并将其纳入焦点循环；
  其他区域仍被覆盖。缺失、非法、离屏或零尺寸的目标会显示居中面板，不显示高亮。
  目标边界会在步骤变化、窗口尺寸变化、滚动以及目标尺寸变化时刷新；添加之前
  缺失的目标需要上述某一触发条件。启用 `scrollToTarget` 时，接受的步骤会先
  请求原生就近滚动，然后再测量；浏览器和任何被锁定的祖先元素决定滚动是否可行。
  默认文案遵循中文/英文 Provider 语言。
- 不支持：持久化和完整的 TDesign Guide API。仍需完成真实设备与辅助技术验收。

## 设计参考

- [TDesign 引导 设计指南](https://tdesign.tencent.com/vue-next/components/guide?tab=design)
