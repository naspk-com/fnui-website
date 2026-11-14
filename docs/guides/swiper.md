# 轮播 FnSwiper

在有限空间内轮播多张内容卡片。

## 使用说明

- Props：必填的受控从 0 开始的 `modelValue`、正整数 `count`、必填的无障碍
  标签 `label`，以及可选的 `previousText`、`nextText`、`slideText`、
  `disabled`、`loop`、`showIndicators`、`swipeable`（默认 true）、
  `autoplay`、`interval`、`pauseText` 与 `playText`。索引必须是小于 count
  的整数。
- 上一步/下一步、可选的数字指示器以及水平触摸手势会依次触发
  `update:modelValue` 和 `change`；父组件可以拒绝请求。循环为可选项。手势
  从非交互的幻灯片内容开始，保留垂直滚动，并忽略取消的指针。默认插槽接收
  `{ index }`。没有暴露的 ref 方法。
- 两个平台都使用相同的幻灯片容器和原生按钮。可选的 `animation: 'fade'`
  会在接受的切换中应用淡入淡出过渡，并遵循减少动态效果偏好。`preloadAdjacent`
  会在隐藏的惰性容器中渲染相邻插槽内容；避免在这些插槽中使用重复 ID 或产生
  副作用。默认文案遵循中文/英文 Provider 语言。
- 启用滑动时，幻灯片会保留水平触摸手势；需要水平触摸滚动的幻灯片内容应设置
  `swipeable` 为 false。
- 可选的 autoplay 每 `interval` 毫秒请求下一张（默认 5000，最小 250），
  遵循 `loop`，不循环时在最后一张停止。暂停/播放按钮控制自动请求。焦点、
  指针悬停、文档隐藏、禁用状态和减少动态效果偏好都会暂停自动播放。父组件仍
  拥有控制权并可拒绝请求。自动切换不会使用实时播报。
- 不支持完整的 TDesign Swiper API。真实设备上的手势行为仍需验收。

## 设计参考

- [TDesign 轮播 设计指南](https://tdesign.tencent.com/vue-next/components/swiper?tab=design)
