# fnOS 1.2.1000 实际 WebUI 参考

采集日期：2026-11-13。来源：用户授权访问的 `http://10.30.30.33:5666/`。登录由用户完成；本轮打开九个应用查看页面，没有执行安装、删除、清空、服务开关或备份任务。

系统设置页面显示版本为 `fnOS 1.2.1000`。浏览器采集视口出现 1814×1266 与 1814×944，窗口初始 DOM 度量为 1100×640；截图工具输出的图片尺寸可能不同，不能直接把截图像素当作 CSS px。本轮观察为深色，浅色与其他子页尚未逐项采集。

## 已采集页面

| 文件 | 实际页面 | 证据边界 |
| --- | --- | --- |
| screenshots/files.png | 文件管理 / 我的文件列表 | DOM 确认分类、导航、工具栏、三种视图、字段与统计；截图侧栏有裁切 / 遮挡 |
| screenshots/settings.png | 系统设置 / 设备信息 | 分类导航、设备 / 系统 / 账号 / 存储 / 硬件 / 网络卡片；下方内容未完整截图 |
| screenshots/app-center.png | 应用中心 / 全部 | 搜索、分类、推广区域、官方应用卡片；详情与安装流程未操作 |
| screenshots/download.png | 下载 / 全部 / 无任务 | iframe 内布局由截图确认，未采集内部 DOM 与添加任务表单 |
| screenshots/docker.png | Docker / 概览 | iframe 内健康卡片、服务设置、CPU / 内存 / 网络图表；侧栏有遮挡，其他子页待采 |
| screenshots/backup.png | 备份 / 创建备份任务 | 备份飞牛 / 备份远程存储两种入口；创建流程未操作 |
| screenshots/resources.png | 资源管理 / 运行状态 / 总览 | 二级 tabs、资源卡片、硬盘表格；动态指标取样时变化 |
| screenshots/logs.png | 日志 / 列表 | 等级 / 模块筛选、五列事件表格、条数与分页；不公开原始日志内容 |
| screenshots/trash.png | 回收站 / 我的文件 / 空态 | 两类文件、导航、搜索、禁用操作、空态、统计；有数据与确认状态待采 |

截图是内部参考，包含本机账号、设备信息或日志，不能直接复制到公开网站。网站模板使用固定模拟数据与 Fn 组件生成自己的页面截图。部分窗口截图有遮挡，后续视觉基线需要固定窗口位置、视口、主题与缩放重新取样。

## 图标来源

九个 `icons/*.png` 均从桌面图标的实际 DOM `img.src` 获取。URL 参数为 `size=256`，返回 PNG 实际为 **224×224**；尺寸通过 PNG 头检查。

公共前缀：`http://10.30.30.33:5666/static/app/icons/`；各路径后缀为 `/icon.png?size=256`。

| 本地文件 | 应用资源 ID | SHA-256 |
| --- | --- | --- |
| icons/files.png | trim.file-manager | cd0f83ec2f3b274230d2431b1d960a16312531a6f2d3516ded015b86dff80381 |
| icons/settings.png | trim.setting | b0f3ca7f687ab5ea0c6c905dd0fe81061debfde081665b3cf5860cbf224162b5 |
| icons/app-center.png | trim.app-center | 4f531c0692e3852831c9970330f2e205edb44536fa0255590d33d18885d843e0 |
| icons/download.png | trim.download-center | 9de1412267b02086ae8accc72727a61ca0b6a832a8836704153e7a6f193fb40c |
| icons/docker.png | trim.docker | 9232184c3246c7a84637ceec0dae7903f9534ac4623c314d14865ad07f57f587 |
| icons/backup.png | trim.backup-and-sync | d7ed51eab5aafbcbd48640edee0337990c4e4e107dea47e807a6215265e1452f |
| icons/resources.png | trim.resource-manager | 2acc19f0f32bac4b8308fa540b8f1c2b2c21cdb2114a700c070ac52dc3d2e389 |
| icons/logs.png | trim.log-center | 2bb4af791bdd6bcc870bb6e6fc2b75db378b9db26f4275c547b5d67628952363 |
| icons/trash.png | trim.file-manager.trash | 8fbe1ee1f0eddc34bbc9c6fe19478ff85bb2622ad74554bac70a36ea3f8cf1ae |

这些是 fnOS 原始参考资产，不是已经发布的 Fn 图标包。生产组件中的动作图标使用 FnIcon 的语义接口；应用入口图标与通用动作图标分别管理。不能从可下载推定图标的开源许可；网站资产接入按实际分发约定处理。

## CSS 来源

- URL：`http://10.30.30.33:5666/assets/index-D-IiW2Ad.css`。
- 本地文件：`index-D-IiW2Ad.css`。
- 原始大小：639,685 bytes。
- SHA-256：`b87a86c51ee2b3aedbe72fd55f97b27c12a9147870ef6b35491cc01618c9b099`。
- 正则初筛得到 506 个不同的声明变量，其中 425 个以 `--semi-` 开头；这是初筛数量，正式提取仍采用 CSS AST。
- CSS URL 中发现新手引导浅 / 深背景资源引用；未据此推定所有图标都由 CSS 提供。

原始 CSS 只供分析，不作为模板运行依赖。页面还使用 `base-Tabs-*`、`trim-ui__app-layout--window` 等自有结构，不能把所有组件当成 Semi wrapper。下载 iframe 源地址曾观察为 `/apps/download/`，直接打开重定向回桌面；这不是可独立运行的开放 API 示例入口。

## 后续补采

每个模板补齐浅 / 深色、窄 / 常规窗口、空 / 有数据 / loading / error、选择 / 禁用及对应弹层。优先补文件管理新建文件夹、设置表单、日志筛选和分页；随后补应用详情、下载添加任务、Docker 子页、备份向导与进程列表。需要修改系统或业务数据的流程用专用验证场景或模拟数据取样。

模板规划见 [website/templates/index.md](../../../website/templates/index.md)，统一开发方案见 [开发方案](../../../docs/fnos-tdesign-unified-ui-plan.md)。
