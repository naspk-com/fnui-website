# 日历 FnCalendar

按月浏览并选择日期，适合日程与文件时间筛选。

## 使用说明

- Props：受控的 `modelValue`（`YYYY-MM-DD | null`）、受控的 `month`
  （`YYYY-MM`，必填）、`min` 与 `max`（`YYYY-MM-DD`，包含边界）、`disabled`、
  `readonly`、`label`、`previousText` 与 `nextText`。默认范围为
  1900-01-01 至 2100-12-31。日期必须是有效的日历日期；选中的值必须位于边界内，
  展示的月份必须与边界有交集。非法输入会抛错。
- 事件：选择另一日期时依次触发 `update:modelValue` 和 `change`。切换月份时
  依次触发 `update:month` 和 `month-change`。父组件持有这两个值，并可以拒绝
  任一请求。切换月份不会自动改变已选日期。
- `day` 插槽接收 `{ date, day, selected, disabled }`，且不能包含可交互后代。
  不暴露 ref 方法。`disabled` 阻止所有交互；`readonly` 允许切换月份但禁止
  选择日期。超出包含边界的日期以及边界外的月份导航会被禁用。
- 两个平台都使用相同的行内语义表格和原生按钮。日期值是日历日期，不是时间戳。
  默认的控件与星期标签遵循 Provider 的中文或英文语言；传入的标签会覆盖默认值。
  要求显式传入月份可避免服务端与客户端当前日期不同导致的 hydration 差异。
- 日期按钮只有一个 tab 停靠点。方向键按一天或一周移动焦点，Home/End 移到本周
  开头/结尾，Page Up/Down 移到上/下一个月的同一天，并限制在该月最后一天。
  导航不会选择日期，且保持在 `min` / `max` 内。按键跨月时，只有父组件接受
  月份请求后焦点才会移动。
- 可选的 `range` 使用单独受控的 `rangeValue` 起止日期元组（每一项可为 null）。
  第一次点击请求起点；第二次点击请求完整且有序的范围，反向点击也会被排序。
  在完整范围之后点击会开始新的范围。请求会依次触发 `update:rangeValue` 和
  `range-change`；父组件可以拒绝。日期必须有效且在边界内，不允许只有终点而
  没有起点。
- 可选的 `disabledDate(date)` 会禁用单个日期按钮；回调必须同步且纯。方向键和
  翻页导航会朝移动方向跳过禁用日期，每次按键最多 366 天。如果回调变化，已有
  选择不会被自动清除；范围可以在可选择的端点之间包含禁用日期。
- 可选的 `multiple` 单独控制 `selectedDates`，并依次触发
  `update:selectedDates` 和 `selection-change`；不能与 `range` 同时使用。
  `weekStartsOn` 设置每周第一天，取值 0（周日）到 6（周六），默认 1。
  `view` 受控（`month` 或 `year`），点击标题会请求 `update:view` 以打开年份
  视图。选择月份只有在父组件接受月份请求后才会返回月视图。
- 不支持：时区转换和完整的 TDesign calendar API。键盘激活遵循原生按钮行为；
  辅助技术验收尚未完成。

## 设计参考

- [TDesign 日历 设计指南](https://tdesign.tencent.com/vue-next/components/calendar?tab=design)
