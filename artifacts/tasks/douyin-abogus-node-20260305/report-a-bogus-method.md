# a_bogus 方法定位（2026-03-05）

## 关键观测
通过 `inject_preload_script` 钩住 `URLSearchParams.append` 后，命中记录：

- `append('a_bogus', '<long-signature>')`
- 紧接着 `XMLHttpRequest.open('GET', '...&a_bogus=...')`

## 关键调用栈
典型栈（去重后）：

1. `d @ bdms.js:2:131912`
2. `X @ bdms.js:2:131083`
3. `n @ bdms.js:2:130952`
4. `value @ runtime.js/runtime-stable.js:5:33702`
5. `value @ runtime.js/runtime-stable.js:5:34210`
6. `l @ runtime.js/runtime-stable.js:5:35335`
7. `XMLHttpRequest.open`（URL 已含 `a_bogus`）

## 结论
- `a_bogus` 不是业务层显式拼接，而是 `bdms + security runtime` 内部 VM 逻辑在请求发送前注入。
- `byted_acrawler.frontierSign` 仅返回 `X-Bogus`，与当前接口使用的 `a_bogus` 不是同一输出。

## 当前可用产物
- Node 成功请求脚本：`run/run-local.mjs`
- 运行文档：`run/README.md`
