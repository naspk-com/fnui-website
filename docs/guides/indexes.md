# 索引列表 FnIndexes

按字母或分组索引快速定位列表项。

## 使用说明

- Props：`groups`，包含唯一的非空字符串 `key` 和 `items`
  （`{ value: string | 有限数值, label, disabled? }`）；item 值在跨组范围内
  唯一。必填的 `label` 为列表命名，`indexLabel` 为索引导航命名。`height` 是
  有限的像素高度，默认 320。
- 每个索引按钮会滚动组件自身的列表到对应分组，并触发 `navigate`，携带分组键。
  每个启用的项会触发 `select`，携带其值。`item` 插槽接收 `{ item, group }`，
  且不能包含可交互后代。不暴露 ref 方法。
- 使用原生按钮和限高的滚动容器；选择索引不会改变焦点或滚动页面。可选的
  `sort` 会按 Unicode 码元对分组键排序，且不修改源数据。可选的
  `trackActive` 会在滚动或导航时标记当前分组，并在变化时触发
  `active-change`。触摸和触控笔在索引按钮间拖动会导航到不同分组。
- 可选的 `virtual: { rowHeight, overscan? }` 会为标题和项渲染固定高度的窗口；
  `rowHeight` 至少 44 像素，`overscan` 为非负整数。列表高度仍由 `height`
  控制。窗口外的行会被卸载，因此跨窗口的键盘和读屏行为需要浏览器与设备验收。
  它不会推断字母分组，也不实现完整的 TDesign API。

## 设计参考

- [TDesign 索引列表 设计指南](https://tdesign.tencent.com/mobile-vue/components/indexes?tab=design)
