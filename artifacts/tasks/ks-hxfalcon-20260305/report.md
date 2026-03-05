# Local Task Report

## Summary
- targetParam: `__NS_hxfalcon`
- status: `partial`
- note: 纯 Node 已复现真签名链路；严格接口结果受当前 cookie/会话状态影响。

## Request Contract
- kconf: `POST /rest/wd/kconf/get`
- strict: `POST /rest/wd/ugH5App/tag/text/feed/recent`
- required fields: `kww`, `cookie(did/kwfv1/kwssectoken/kwscode)`, `caver`, `requestBody`

## Sign Chain
- sign entry: `vendor.aj.call("$encode", [payload, callbacks])`
- cat version: `vendor.aj.call("$getCatVersion") -> "2"`
- payload keys: `url/query/form/requestBody/projectInfo`

## Env Dependencies
- `window/document/navigator/location/history/performance/storage`
- `atob/btoa/crypto/addEventListener/removeEventListener`

## Verify Result
- `kconf/get`
  - no-sign: `status=200 result=1 hasData=true`
  - fake-sign: `status=200 result=1 hasData=true`
  - real-sign: `status=200 result=1 hasData=true`
- `feed/recent`
  - 本次复跑（2026-03-05）: no/fake/real 均 `result=2`（无数据）
  - 历史一次命中（同日）: fake/no-sign `result=50`，real-sign `result=1 hasData=true feedCount=18`
  - 结论: 该接口除签名外还受业务态（cookie/kww/session）门控。

## First Divergence
- 首差异：早期仅使用假签名/弱接口判断时出现“HTTP 200 但无业务数据”误判。
- next action：统一以 `result/hasData/errorMsg` 作为验收口径，严格接口优先。
