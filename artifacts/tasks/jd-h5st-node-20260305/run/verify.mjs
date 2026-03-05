import { generateH5st } from './sign.mjs';

const input = {
  appid: 'jd-cphdeveloper-m',
  functionId: 'recommend_like_m',
  body: '{"func":"item_rec","recpos":6163,"param":"{\\"pagenum\\":1,\\"pagecount\\":20,\\"startpos\\":0,\\"ptag\\":\\"\\",\\"sku\\":\\"\\",\\"cid1\\":\\"\\",\\"cid2\\":\\"\\",\\"cid3\\":\\"\\"}","clientPageId":"","clientVersion":"2.0"}',
};

const out = await generateH5st({ appId: '2088b', input });
const h5st = out?.h5st ?? '';
console.log(JSON.stringify({
  hasH5st: Boolean(h5st),
  h5stParts: h5st ? h5st.split(';').length : 0,
  h5stPreview: h5st ? h5st.slice(0, 80) : null,
  keys: Object.keys(out ?? {}),
}, null, 2));
