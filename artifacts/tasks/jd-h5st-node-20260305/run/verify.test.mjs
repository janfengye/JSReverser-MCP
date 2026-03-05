import test from 'node:test';
import assert from 'node:assert/strict';
import { generateH5st } from './sign.mjs';

test('generate h5st in pure node env', async () => {
  const result = await generateH5st({
    appId: '2088b',
    input: {
      appid: 'jd-cphdeveloper-m',
      functionId: 'recommend_like_m',
      body: '{"func":"item_rec","recpos":6163,"param":"{\\"pagenum\\":1,\\"pagecount\\":20,\\"startpos\\":0,\\"ptag\\":\\"\\",\\"sku\\":\\"\\",\\"cid1\\":\\"\\",\\"cid2\\":\\"\\",\\"cid3\\":\\"\\"}","clientPageId":"","clientVersion":"2.0"}'
    }
  });

  assert.equal(typeof result.h5st, 'string');
  assert.ok(result.h5st.length > 32);
  assert.equal(result.h5st.split(';').length, 10);
});
