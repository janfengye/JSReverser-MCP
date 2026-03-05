import { generateH5st } from './sign.mjs';
import { seed } from './seed.mjs';

const input = {
  appid: 'jd-cphdeveloper-m',
  functionId: 'm_search_promptwords',
  body: '{}',
};

const signed = await generateH5st({ appId: '2088b', input });
const eid = seed.cookie.match(/(?:^|; )cd_eid=([^;]+)/)?.[1] ?? '';

const url = new URL('https://api.m.jd.com/api');
url.searchParams.set('appid', signed.appid);
url.searchParams.set('functionId', signed.functionId);
url.searchParams.set('body', signed.body);
url.searchParams.set('h5st', signed.h5st);
url.searchParams.set('x-api-eid-token', eid);
url.searchParams.set('loginType', '2');
url.searchParams.set('_', String(Date.now()));
url.searchParams.set('sceneval', '2');

const headers = {
  'sec-ch-ua-platform': '"Linux"',
  referer: 'https://m.jd.com/',
  'sec-ch-ua': '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
  'sec-ch-ua-mobile': '?0',
  'user-agent': seed.userAgent,
  accept: 'application/json',
  'x-referer-page': 'https://m.jd.com/',
  'x-rp-client': 'h5_1.0.0',
  'accept-language': 'en-US,en;q=0.9',
  cookie: seed.cookie,
  origin: 'https://m.jd.com',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-site',
  priority: 'u=1, i',
};

const res = await fetch(url, { method: 'GET', headers });
const text = await res.text();

let payload = null;
try {
  payload = JSON.parse(text);
} catch {}

const topLevelKeys = payload && typeof payload === 'object' ? Object.keys(payload).slice(0, 10) : [];

console.log(
  JSON.stringify(
    {
      status: res.status,
      responseLen: text.length,
      code: payload?.code,
      success: payload?.success,
      message: payload?.message,
      h5stPart8Len: signed.h5st?.split(';')?.[7]?.length ?? 0,
      responsePreview: {
        topLevelKeys,
        textPreview: text.slice(0, 220),
      },
    },
    null,
    2,
  ),
);
