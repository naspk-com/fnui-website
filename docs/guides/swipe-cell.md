# 滑动单元格 FnSwipeCell

左右滑动单元格以显示操作按钮。

## 使用说明

- Props：受控的 `open`、必填的右侧 `actions`、可选的 `leftActions`（具有
  全局唯一的字符串或有限数值 `value`、`label`，可选 `disabled`）、必填的
  `label`、`disabled`、`openText` 与 `closeText`。
- 在非交互内容上的水平单指手势超过 40px 且以水平方向为主时，会请求打开或
  关闭。垂直手势和取消的指针不会改变状态。原生切换按钮可从两侧提供访问，
  无需手势；`leftOpenText` 覆盖左侧标签。两条路径都会依次触发 `update:open`
  和 `open-change`；父组件可以拒绝请求。
- 打开时，启用的操作按钮会以操作值触发 `action`，且不会自动关闭。默认插槽
  提供单元格内容；`action` 插槽接收 `{ item, side }`，且不能包含可交互后代。
  `openSide` 可控制展开侧，并依次触发 `update:openSide` 和 `side-change`；
  省略时侧边状态保持在组件本地。被拒绝的受控侧边变化不会在原来的侧边请求打开。
  `actionWidth` 设置每个操作的像素宽度（最小 44）。内容跟随水平拖拽，并稳定到
  接受的受控状态。`FnSwipeCellGroup` 会在某个单元格打开时请求关闭其他打开的
  单元格；父组件可以拒绝这些请求。不暴露 ref 方法，也不提供完整的 TDesign API。
- 启用时，单元格会保留水平触摸手势；需要水平触摸滚动的嵌套内容不应放在滑动
  区域内。

## 设计参考

- [TDesign 滑动单元格 设计指南](https://tdesign.tencent.com/mobile-vue/components/swipe-cell?tab=design)
