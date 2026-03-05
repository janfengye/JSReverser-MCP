import { generateH5st } from './sign.mjs';
import { seed } from './seed.mjs';

const rawLog = console.log.bind(console);
const rawErr = console.error.bind(console);
const isNoise = (args) => {
  if (!args?.length) return false;
  const text = args
    .map((v) => {
      if (v && typeof v === 'object' && 'stack' in v) return String(v.stack ?? '');
      return String(v ?? '');
    })
    .join('\n');
  return (
    text.includes('./m_tk.js') ||
    text.includes('getEncryptedCollectInfo') ||
    text.trim() === '[Error]'
  );
};
console.log = (...args) => {
  if (isNoise(args)) return;
  rawLog(...args);
};
console.error = (...args) => {
  if (isNoise(args)) return;
  rawErr(...args);
};

function buildInput() {
  const body = JSON.stringify({
    func: 'item_rec',
    recpos: 6163,
    param: JSON.stringify({
      pagenum: 1,
      pagecount: 20,
      startpos: 0,
      ptag: '',
      sku: '',
      cid1: '',
      cid2: '',
      cid3: '',
    }),
    clientPageId: '',
    clientVersion: '2.0',
  });
  return {
    appid: 'jd-cphdeveloper-m',
    functionId: 'recommend_like_m',
    body,
  };
}

function getEidFromCookie(cookie) {
  return cookie.match(/(?:^|; )cd_eid=([^;]+)/)?.[1] ?? '';
}

const input = buildInput();
const signed = await generateH5st({ appId: '2088b', input });
const eid = getEidFromCookie(seed.cookie);

const url = new URL('https://api.m.jd.com/api');
url.searchParams.set('appid', signed.appid);
url.searchParams.set('functionId', signed.functionId);
url.searchParams.set('body', signed.body);
url.searchParams.set('h5st', signed.h5st);
url.searchParams.set('x-api-eid-token', eid);
url.searchParams.set('loginType', '2');

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

const feedItems = payload?.data?.feeds?.content ?? [];
const sampleItems = Array.isArray(feedItems)
  ? feedItems.slice(0, 3).map((it) => ({
      id: it?.id,
      price: it?.price,
      name: typeof it?.name === 'string' ? it.name.slice(0, 32) : undefined,
    }))
  : [];

console.log(
  JSON.stringify(
    {
      status: res.status,
      responseLen: text.length,
      rs: payload?.rs,
      fn: payload?.fn,
      msg: payload?.msg,
      h5stPart8Len: signed.h5st?.split(';')?.[7]?.length ?? 0,
      h5stPreview: signed.h5st?.slice(0, 120),
      responsePreview: {
        st: payload?.st,
        fn: payload?.fn,
        itemCount: Array.isArray(feedItems) ? feedItems.length : 0,
        sampleItems,
      },
    },
    null,
    2,
  ),
);
