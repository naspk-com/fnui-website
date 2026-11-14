# 文件上传 FnFileUpload

选择、拖放并上传文件，展示队列与失败重试。

## 使用说明

- Props：受控的 `items`（`{ id, name, status?, progress? }`）、`multiple`、
  `directory`、`drop`、`disabled`、`accept`、`maxFiles`、`maxBytes`，以及
  可自定义的选择器/操作/状态文案。ID 必须是唯一的字符串或有限数值。限制必须
  非负；`maxFiles` 为整数或 Infinity。
- 文件选择器会触发 `select`，携带通过校验的浏览器 `File` 对象；触发 `reject`，
  携带 `{ file, reason: 'type' | 'size' | 'limit' }`。拒绝事件先触发。仅在请求
  时显示文件夹选择器；浏览器不支持 `webkitdirectory` 时禁用。文件夹选择可能
  返回多个文件，与 `multiple` 无关。浏览器提供相对路径时，路径保留在
  `File.webkitRelativePath` 上。
- items 由应用持有。`remove`、`cancel` 和 `retry` 以意图事件携带项 ID；
  应用更新状态并处理并发传输。默认插槽替换文件选择器标签。ref 方法
  `openFiles()` 与 `openDirectory()` 在可用时打开对应选择器。
- 可选的 `drop` 会暴露文件拖放区域，同时保留键盘选择器。它应用相同的类型、
  大小和数量检查；当 `multiple` 为 false 时，普通文件拖放一次只发出一个通过
  校验的文件。启用 `directory` 时，检测到的文件夹会被遍历，并在 `select`
  之前通过 `select-paths` 发出通过校验的 `{ file, path }`。文件夹拖放可以
  包含多个文件。遍历最多允许 10,000 个条目和 32 层嵌套。不会返回空文件夹。
  新的拖放会取代未完成的遍历；卸载或禁用会抑制其结果。遍历失败时会触发
  `drop-unsupported`，并独立处理单独拖入的文件。未启用 `directory` 时，
  检测到的文件夹会触发 `drop-unsupported` 并被跳过。文件夹检测依赖浏览器
  支持。`dropText` 自定义提示。
- 这是 UI 外壳，不是上传客户端：不包含网络传输、空目录处理、断点续传协议、
  任务持久化或 NAS 授权。浏览器过滤器和相对路径不可信；请在服务端校验文件
  内容和目标路径。

## 设计参考

- [TDesign 文件上传 设计指南](https://tdesign.tencent.com/vue-next/components/file-upload?tab=design)
