# Reverse Artifacts

推荐每个逆向任务都写入统一任务目录：

`artifacts/tasks/<taskId>/`

读取优先级：

1. 先复用已存在的 `artifacts/tasks/<taskId>/` 全链路数据。
2. 若不存在，再参考 `scripts/cases/*` 抽象 case。
3. 仍不足时，按参数方法论模板新建任务目录并执行。

最少包含：

- `task.json`
- `timeline.jsonl`
- `network.jsonl`
- `scripts.jsonl`
- `runtime-evidence.jsonl`
- `cookies.json`
- `env/entry.js`
- `env/env.js`
- `env/polyfills.js`
- `env/capture.json`
- `report.md`

这些文件的用途：

- 回看页面观察证据
- 追踪哪个请求、哪个脚本、哪个 cookie 参与参数生成
- 记录 local rebuild 进展
- 给 Codex / Claude / Gemini 续做同一个任务

注意：
- 可执行脚本与链路数据统一放 `artifacts/tasks/`，目录结构保持稳定便于复用。
- `scripts/cases/*` 仍保持抽象模板，不放可直接复用实现。
- 可直接复用任务骨架：`artifacts/tasks/_TEMPLATE/`。
