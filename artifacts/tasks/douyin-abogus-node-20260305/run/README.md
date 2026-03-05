# douyin a_bogus - Node 本地验证

## 已确认的生成链路（页面证据）
通过 preload hook 记录 `URLSearchParams.append('a_bogus', value)`，得到稳定调用栈：

1. `bdms.js:2:131912`（函数 `d`）
2. `bdms.js:2:131083`（函数 `X`）
3. `bdms.js:2:130952`（函数 `n`）
4. `runtime.js / runtime-stable.js` 包装调用（`value -> value -> l`）
5. 最终 `XMLHttpRequest.open` 时 URL 中已包含 `a_bogus`

结论：`a_bogus` 在 `bdms` 链路内由加密 VM 逻辑生成，并在发请求前注入 query。

## 本地 Node 复现
当前提供的是纯 Node（不依赖浏览器）直连验证脚本：

```bash
node artifacts/tasks/douyin-abogus-node-20260305/run/run-local.mjs
```

可通过环境变量替换签名参数：

```bash
A_BOGUS='...' MS_TOKEN='...' node artifacts/tasks/douyin-abogus-node-20260305/run/run-local.mjs
```

成功判定：
- HTTP 200
- JSON `status_code = 0`
- `resource_list` 返回非空

## 说明
- 当前脚本已经可在本机 Node 下拿到 API 成功数据。
- `a_bogus` 自动计算器（完全脱离浏览器、实时计算）仍需继续补齐 `bdms + runtime` 的执行环境和内部 VM 调用入口。
