# 图片预览 FnImageViewer

全屏查看图片，支持缩放、旋转、切换与手势操作。

## 使用说明

- Props：受控的 `visible`、受控的 `index`、`images`（`src`、`alt`）、
  必填的 `title`，以及 `previousText`、`nextText`、`closeLabel`、
  `zoomInText`、`zoomOutText`、`rotateText`、`resetText`。非空图片列表需要
  有效的从 0 开始的索引；空列表要求索引为 0。
- 事件：关闭时触发 `update:visible`；导航时依次触发 `update:index` 和
  `change`。父组件持有这两个值，并可以拒绝请求。
- 无插槽或 ref 方法。空图片列表不会显示图片或导航。查看器使用 fnUI 抽屉、
  浮层栈、Escape 处理和焦点恢复。缩放以 25% 为步长，从 25% 到 400%；旋转
  顺时针前进 90 度。重置恢复 100% 与零旋转。可滚动图片区域允许查看放大的
  图片。当接受的索引、图片来源或可见性变化时，变换状态会重置；被拒绝的索引
  请求不会重置它。图片加载错误遵循原生图片行为。
- 可选的 `showThumbnails` 添加受控索引按钮；`thumbnailText` 为其提供标签。
  可选的 `swipeable` 在 100% 缩放下根据水平触摸手势请求相邻图片；放大后的
  图片保留原生滚动。`preloadAdjacent` 可选择在可见时预取相邻图片。
- 可选的 `pinchable` 启用双指触摸缩放，`pannable` 启用 100% 以上缩放时的
  鼠标或触摸拖拽平移。启用双指缩放会保留图片区域的触摸手势；按钮缩放和原生
  滚动仍是替代方式。不支持图片编辑。仍需完成设备与辅助技术验收。

## 设计参考

- [TDesign 图片预览 设计指南](https://tdesign.tencent.com/vue-next/components/image-viewer?tab=design)
