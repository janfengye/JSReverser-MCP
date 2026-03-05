# Local Task Report

## Summary
- targetParam: `h5st`
- status: `pass`
- note: 本地 Node 复现生成 `h5st`，并通过两个真实接口验证。

## Request Contract
- url: `https://api.m.jd.com/api`
- method: `GET`
- required fields: `appid/functionId/body/h5st/x-api-eid-token/loginType`

## Sign Chain
- entry: `run/sign.mjs -> generateH5st -> ParamsSign*.sign`
- output keys: `appid,functionId,body,_stk,_ste,h5st`
- h5st shape: `10` 段（`;` 分隔）

## Env Dependencies
- `window/document/navigator/location/history/performance/storage/crypto`
- security scripts: `security_main.js`, `security_rac.js`

## Verify Result
- `run/verify.mjs`
  - `hasH5st=true`
  - `h5stParts=10`
- `run/verify-api.mjs` (functionId=`recommend_like_m`)
  - `status=200`
  - `rs=0`
  - `itemCount=20`
- `run/verify-api2.mjs` (functionId=`m_search_promptwords`)
  - `status=200`
  - `retcode=0`
  - 返回热词数组

## Browser MCP Cross-check
- 页面：`https://m.jd.com/`
- 抓包：`reqid=74`（recommend_like_m）
  - 请求包含 `h5st` 与 `x-api-eid-token`
  - 响应 `status=200`，`rs=0`
- 抓包：`reqid=71`（`/sso/rac`）
  - 响应 `{"nfd":10}`

## First Divergence
- 早期差异主要来自环境能力与 seed 不完整导致签名段不稳定。
- current action: 以 `run/seed.mjs` 固定关键环境输入并通过双接口回归。
