# 时间选择 FnTimePicker

选择时间或时间范围，支持秒级精度。

## 使用说明

- Props：受控的 `modelValue`（`string | null`）、`min`、`max`、`disabled`、`readonly`、
  `label`、`placeholder`、`confirmText` 与 `cancelText`。日期值为 `YYYY-MM-DD`
  格式的日历日期；时间值为 24 小时制 `HH:mm`，启用 `seconds` 时为
  `HH:mm:ss`。
- 事件：确认变更时依次触发 `update:modelValue` 和 `change`。取消与关闭不会改动模型，
  值由父组件持有。
- 可选的 `editable` 会添加原生单值输入框。`shortcuts` 提供
  `{ label, value }` 形式的快捷草稿。`formatValue(value)` 仅格式化展示值，
  不改变规范模型。配合 `parseValue(text)` 时，可编辑输入框接受自定义文本，
  非法输入返回 null。`panel` 插槽接收 `{ value, setValue }`，用于替换
  厂商面板。桌面端日期面板还提供 `cell` 插槽，接收 `{ value }`（Date 对象）；
  移动端使用替代的 `panel` 插槽。不暴露 ref 方法。
- 状态：null 表示未选择。打开值为 null 的选择器时，从当前本地日期或 `00:00`
  开始，确认前不会提交。`disabled` 与 `readonly` 会阻止打开。打开期间模型变化
  会替换草稿。显式标签优先于 Provider 语言。
- 桌面端：在挂载到 Provider 浮层的 fnUI popover 中使用 TDesign DatePickerPanel
  和 TimePickerPanel。移动端：在 fnUI 模态抽屉中使用 TDesign DateTimePicker。
  滚轮移动仅产生草稿；两个平台都需要确认。
- 可选的 `range` 使用受控的 `rangeValue`（`[start, end]`，两端同为 null，或
  都是有效且有序的值），并在同一个 popover 或抽屉中使用原生日期/时间输入框。
  确认时依次触发 `update:rangeValue` 和 `range-change`；取消和被拒绝的更新会
  保留外部值。清空两个输入框会请求 `[null, null]`；不完整或顺序颠倒的草稿
  无法确认。`startText`、`endText`、`rangeErrorText` 与 `boundsErrorText`
  可覆盖本地化标签和校验文案。
- 包含边界的 `min` 与 `max` 使用与值相同的格式。日期默认范围为
  1900-01-01 至 2100-12-31；时间默认范围为 00:00 至 23:59。厂商时间面板
  可能显示超出范围的值，但确认会被禁用并给出说明，直到修正为止。
- 可选的同步纯函数 `disabledValue(value)` 会阻止确认单个日期或时间，包括
  范围端点。厂商面板仍可显示这些值；不可用的草稿会展示 `disabledValueText`。
  如果回调发生变化，已有外部值不会被自动判定为无效；范围端点之间的禁用值
  允许存在。
- `formatFnDateTimeInZone(instant, timeZone, locale?)` 用于格式化某个时刻。
  `resolveFnDateTimeInZone('YYYY-MM-DDTHH:mm:ss', timeZone, policy?)` 将
  IANA 时区的墙钟时间解析为 Date。默认 `reject` 策略会在夏令时缺口和重叠时
  抛错；`earlier` 与 `later` 会选择转换两侧对应的时刻。无效时区与日期会抛错。
- 日期是日历值，不是 UTC 时间戳。无效的外部值会被拒绝，而不是静默归一化。
- 仍需在真实设备上完成触摸、键盘与辅助技术的验收。移动端滚轮由 TDesign 提供；
  fnUI 提供原生确认与取消按钮，但不为滚轮添加键盘控制。

## 设计参考

- [TDesign 时间选择 设计指南](https://tdesign.tencent.com/vue-next/components/time-picker?tab=design)
