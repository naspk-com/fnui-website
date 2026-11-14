# 级联选择 FnCascader

逐级选择树形结构中的路径。

## 使用说明

- Props：受控的 `modelValue`（`string | number | null`）、`options`
  （递归的 `value`、`label`，可选 `disabled`、`children`）、`disabled`、
  `label`、`placeholder`、`backText`、`openText`、`emptyText`。值必须是全局
  唯一的字符串或有限数值；循环引用和共享节点会被拒绝。
- 事件：选择不同的启用值时依次触发 `update:modelValue` 和 `change`。
  Cascader 只能选择叶子；TreeSelect 可选择任意节点。禁用节点及其后代无法
  选择或进入。
- `node` 插槽接收 `{ node, path, selected }`，其中 `selected` 为布尔值或
  `mixed`；其内容不能包含可交互子元素。不暴露 ref 方法。打开时从根节点开始；
  返回只改变导航状态。即使父组件拒绝变更，选择也会关闭抽屉。不在 options 中的
  外部模型值会以文本展示，不会被静默更改。
- 两个平台都使用 fnUI 抽屉和原生按钮，采用单层视图与返回按钮。
- 可选的 `searchable` 会在启用路径中执行本地、不区分大小写的标签搜索；
  结果展示完整路径。Cascader 搜索返回叶子，TreeSelect 搜索也返回分支。
  `searchPlaceholder` 覆盖本地化搜索标签。禁用节点显示为禁用，其后代不会
  被搜索。
- 可选的 `multiple` 通过 `checkedValues` 和 `update:checkedValues` /
  `check-change`（按此顺序）启用独立的受控勾选。值必须是唯一的字符串或有限
  数值；未知键会保留。选择请求会让抽屉保持打开；点击完成（`doneText`）才会
  关闭。除非启用 `cascade`，勾选彼此独立。级联模式下，已启用的父节点与后代
  勾选会联动，勾选的懒加载节点新加载的启用子节点会被请求为已勾选。父组件
  可以拒绝这些请求；多选模式下 `modelValue` 不生效。
- 懒加载节点可设置 `lazy` 并提供 `loadChildren(node)`，返回子节点的 Promise。
  加载和可重试错误使用本地化的 `loadingText` 与 `loadErrorText`；失败时
  触发 `load-error`，携带节点和错误。已加载的键必须在全局唯一。空结果会变成
  叶子。搜索仅覆盖已加载节点。更改 options 或 loader 会清除缓存子节点和导航；
  过期请求会被忽略。
- 可选的 `clearable` 会添加一个单独标注的清除按钮。单选模式通过
  `update:modelValue` / `change` 请求 null；多选模式通过
  `update:checkedValues` / `check-change` 请求空数组。父组件可以拒绝任一
  请求。`clearText` 覆盖其本地化标签。
- 不支持厂商特有的 API。

## 设计参考

- [TDesign 级联选择 设计指南](https://tdesign.tencent.com/vue-next/components/cascader?tab=design)
