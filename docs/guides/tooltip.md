# 文字提示 FnTooltip

悬停或聚焦时补充简短说明。

## 使用说明

- Props：受控的 `visible`、必填的 `title`、`disabled`、`triggerText`、
  `trigger`（`click` 或 `hover`）、以毫秒为单位的 `openDelay` 与
  `closeDelay`。插槽：`trigger` 和默认内容；无 ref 方法。
- 事件：依次触发 `update:visible` 和 `visible-change`。桌面端 hover 模式还会
  在键盘聚焦时打开，并保留点击激活；移动端无论 trigger 如何都使用点击。
  触发插槽不能包含可交互元素，因为它渲染在按钮内部。
- 这是交互式展开控件，不是仅悬停的 ARIA tooltip。必要信息必须在未打开时也能
  获取。不支持可交互触发插槽和自定义位置。

## 设计参考

- [TDesign 文字提示 设计指南](https://tdesign.tencent.com/vue-next/components/tooltip?tab=design)
