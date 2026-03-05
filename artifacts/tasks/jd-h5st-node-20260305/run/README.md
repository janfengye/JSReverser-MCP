# JD h5st pure-node run

## 目标
- 本地 Node.js 直接生成 `h5st`
- 运行时不依赖浏览器

## 文件
- `seed.mjs`: 本地补环境种子（cookie/storage/ua/屏幕等）
- `env.mjs`: 浏览器环境补丁
- `security_main.js`: 站点签名主脚本（本地副本）
- `security_rac.js`: 站点 rac 脚本（本地副本）
- `sign.mjs`: 加载脚本并导出 `generateH5st`
- `verify.mjs`: 一键生成并打印结果
- `verify-api.mjs`: 本地生成 `h5st` 后直接请求 `recommend_like_m`
- `verify-api2.mjs`: 本地生成 `h5st` 后直接请求 `m_search_promptwords`
- `verify.test.mjs`: 最小回归测试（校验 `h5st` 存在且 10 段）

## 执行
```bash
node verify.mjs
node verify-api.mjs
node verify-api2.mjs
node --test verify.test.mjs
```

## 说明
- 当前默认 `appId` 为 `2088b`。
- 若参数或种子过期，更新 `seed.mjs` 后重跑。
- `verify-api.mjs` 与 `verify-api2.mjs` 会输出响应摘要（业务码、关键字段、脱敏样本）。
