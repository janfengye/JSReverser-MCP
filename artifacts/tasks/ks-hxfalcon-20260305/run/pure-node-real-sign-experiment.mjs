import fs from 'node:fs';
import vm from 'node:vm';

function mkStorage(seed = {}) {
  const m = new Map(Object.entries(seed));
  return {
    getItem(k) { return m.has(k) ? m.get(k) : null; },
    setItem(k, v) { m.set(String(k), String(v)); },
    removeItem(k) { m.delete(String(k)); },
    clear() { m.clear(); },
    key(i) { return Array.from(m.keys())[i] ?? null; },
    get length() { return m.size; },
  };
}

const location = {
  href: 'https://ktag6nr93.m.chenzhongtech.com/fw/tag/text?cc=share_copylink&kpf=ANDROID_PHONE&fid=1966405051&shareMethod=token&kpn=KUAISHOU&subBiz=TEXT_TAG&rich=true&shareId=18637808483971&shareToken=X5B8MvIrJb3M1t0&tagName=jk&shareType=7&shareMode=app&appType=21&shareObjectId=jk&timestamp=1761110782909',
  origin: 'https://ktag6nr93.m.chenzhongtech.com',
  host: 'ktag6nr93.m.chenzhongtech.com',
  hostname: 'ktag6nr93.m.chenzhongtech.com',
  pathname: '/fw/tag/text',
  protocol: 'https:',
  search: '',
};

const dummyEl = {
  style: {},
  childNodes: [],
  appendChild() {},
  removeChild() {},
  setAttribute() {},
  getAttribute() { return ''; },
  addEventListener() {},
  removeEventListener() {},
  getContext() { return {}; },
  getBoundingClientRect() { return { width: 0, height: 0, top: 0, left: 0 }; },
};

const document = {
  location,
  cookie: [
    'did=web_4e638f01b4a94d42808240069bb140e0',
    'didv=1772716081000',
    'kwpsecproductname=kuaishou-growth-offSite-h5-ssr',
    'kwfv1=PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8eL7P0mDw/mD+ecE+9chw/PlPnc7G9P78f+fPAGEPBPUPemf+0GAG/WMPB8f+/WUGnpfPBGEPAcl+9Ph+Bc7P9pf+eLFP0Sj+e8YPeGA80qAP9rh8BPlwBHl+frUG/mjwZ==',
    'kwssectoken=zGw2aPYrE9iEMdyfFO5vqhJK+ci53D5h5gsQ8v1O+nux9ge+un20JI7phROTyzp7XFOLzCq8cyT3N4rje++S/A==',
    'kwscode=47ab2e018ffd9a5082f18bdb7573fdbd8685d52802237835ce948df0fea3c848',
  ].join('; '),
  documentElement: dummyEl,
  body: dummyEl,
  head: dummyEl,
  createElement() { return { ...dummyEl }; },
  getElementById() { return dummyEl; },
  querySelector() { return dummyEl; },
  querySelectorAll() { return []; },
  addEventListener() {},
  removeEventListener() {},
};

globalThis.window = globalThis;
globalThis.self = globalThis;
globalThis.global = globalThis;
globalThis.top = globalThis;
globalThis.parent = globalThis;
globalThis.location = location;
globalThis.document = document;
Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: {
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    platform: 'Linux x86_64',
    language: 'zh-CN',
    languages: ['zh-CN', 'zh', 'en-US', 'en'],
    cookieEnabled: true,
  },
});
globalThis.localStorage = mkStorage({
  LOAD_DEVICE_INCREASE_ID: '10',
  OTHER_DEVICE_INCREASE_ID: '80',
  WEBLOGGER_CUSTOM_INCREAMENT_ID_KEY: '27',
  WEBLOGGER_INCREAMENT_ID_KEY: '110',
  kwfcv1: '4',
});
globalThis.sessionStorage = mkStorage({
  WEBLOGGER_SESSIONID: '37ae889a-4140-4f04-a4ce-239698ae367c',
});
globalThis.history = { length: 1, pushState() {}, replaceState() {} };
globalThis.screen = { width: 1920, height: 1080, availWidth: 1920, availHeight: 1040 };
globalThis.performance = {
  now: () => Date.now(),
  timing: {
    navigationStart: Date.now() - 500,
    fetchStart: Date.now() - 480,
    domContentLoadedEventEnd: Date.now() - 10,
    loadEventEnd: Date.now(),
  },
};
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.atob = (v) => Buffer.from(v, 'base64').toString('binary');
globalThis.btoa = (v) => Buffer.from(v, 'binary').toString('base64');
if (!globalThis.crypto) {
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true,
    value: (await import('node:crypto')).webcrypto,
  });
}
globalThis.setTimeout = setTimeout;
globalThis.clearTimeout = clearTimeout;
globalThis.setInterval = setInterval;
globalThis.clearInterval = clearInterval;
globalThis.__safeApply = (fn, thisArg, args) => {
  if (typeof fn !== 'function') return void 0;
  try {
    return Function.prototype.apply.call(fn, thisArg, args);
  } catch {
    return void 0;
  }
};

let vendorExports = null;
try {
  vendorExports = await import('../env/scripts/vendor.mjs');
  const vendorKeys = Object.keys(vendorExports);
  console.log('[vendor-loaded]', vendorKeys.slice(0, 20));
  console.log('[vendor-has-d]', vendorKeys.includes('d'), typeof vendorExports.d);
  if (vendorExports?.d) {
    globalThis.RiskMgt = vendorExports.d;
    try {
      const risk = new vendorExports.d({
        isBrowser: true,
        window: globalThis,
        document: globalThis.document,
        localStorage: globalThis.localStorage,
        sessionStorage: globalThis.sessionStorage,
      });
      console.log(
        '[risk-instance-methods]',
        Object.getOwnPropertyNames(Object.getPrototypeOf(risk))
      );
    } catch (e2) {
      console.log('[risk-instance-failed]', String(e2));
    }
  }
} catch (e) {
  console.log('[vendor-failed]', String(e));
}

function readPatched(path) {
  let code = fs.readFileSync(path, 'utf8');
  code = code.replace(/(_(?:garp|ace|sabo)_[A-Za-z0-9]+)\.apply\(/g, '__safeApply($1,');
  return code;
}

function run(code, filename) {
  vm.runInThisContext(code, { filename, displayErrors: true });
}

try {
  const kwfCandidates = [
    'kwf-live.js',
    'kwf.dec.js',
  ];
  let loadedKwf = null;
  for (const file of kwfCandidates) {
    const p = `artifacts/tasks/ks-hxfalcon-20260305/env/scripts/${file}`;
    if (!fs.existsSync(p)) continue;
    run(readPatched(p), file);
    loadedKwf = file;
    console.log('[kwf-loaded]', file);
    break;
  }
  if (!loadedKwf) throw new Error('no kwf script found');
  for (const file of [
    'kws-12-live.dec.js',
    'kws-10.dec.js',
    'kws-13.dec.js',
    'kws-8.dec.js',
    'kws-16.dec.js',
  ]) {
    const p = `artifacts/tasks/ks-hxfalcon-20260305/env/scripts/${file}`;
    if (!fs.existsSync(p)) continue;
    try {
      run(readPatched(p), file);
      console.log('[kws-loaded]', file);
    } catch (e) {
      console.log('[kws-failed]', file, String(e));
    }
  }
} catch (err) {
  console.error('[load-failed]', err?.stack || String(err));
}

const globalKeys = Object.keys(globalThis);
const ownNames = Object.getOwnPropertyNames(globalThis);
const candidates = ownNames.filter((k) => /encode|cat|kw|sign|falcon|guard/i.test(k));
console.log('[global-candidates]', candidates);

const gs = globalThis;
const hasBridge = !!gs.kwpsec && typeof gs.kwpsec === 'object';
console.log('[kwpsec]', hasBridge ? Object.keys(gs.kwpsec) : null);
console.log(
  '[kwpsec-own-names]',
  hasBridge ? Object.getOwnPropertyNames(gs.kwpsec) : null
);
if (hasBridge && typeof gs.kwpsec.getData === 'function') {
  try {
    const fp = gs.kwpsec.getData();
    console.log('[kwpsec.getData]', typeof fp, fp ? String(fp).slice(0, 80) : fp);
  } catch (e) {
    console.log('[kwpsec.getData-error]', String(e));
  }
}

let catVersion = null;
let sign = null;
try {
  if (hasBridge && typeof gs.kwpsec.call === 'function') {
    catVersion = gs.kwpsec.call('$getCatVersion');
  }
} catch (e) {
  console.log('[cat-via-kwpsec.call-error]', String(e));
}

const payload = {
  url: '/rest/wd/ugH5App/tag/text/feed/recent',
  query: { caver: '2' },
  form: {},
  requestBody: { tagName: 'jk', pcursor: '', count: 18 },
  projectInfo: { did: 'web_4e638f01b4a94d42808240069bb140e0', appKey: 'nuojwbmH5T' },
};

function tryCallEncode(fn) {
  return new Promise((resolve, reject) => {
    try {
      fn(payload, {
        suc(a, b) {
          resolve({ signResult: a, signInput: b });
        },
        err(e) {
          reject(e);
        },
      });
    } catch (e) {
      reject(e);
    }
  });
}

for (const path of [
  'kwpsec.call',
  'window.$encode',
  'window.kwpsec.$encode',
  'window.kwpsec.encode',
]) {
  try {
    let fn = null;
    if (path === 'kwpsec.call' && hasBridge && typeof gs.kwpsec.call === 'function') {
      const ret = await new Promise((resolve, reject) => {
        try {
          gs.kwpsec.call('$encode', [payload, { suc: (a, b) => resolve({ signResult: a, signInput: b }), err: reject }]);
        } catch (e) {
          reject(e);
        }
      });
      sign = ret;
      console.log('[encode-ok]', path, ret.signResult?.slice?.(0, 60));
      break;
    }
    if (path === 'window.$encode' && typeof gs.$encode === 'function') fn = gs.$encode;
    if (path === 'window.kwpsec.$encode' && hasBridge && typeof gs.kwpsec.$encode === 'function') fn = gs.kwpsec.$encode;
    if (path === 'window.kwpsec.encode' && hasBridge && typeof gs.kwpsec.encode === 'function') fn = gs.kwpsec.encode;
    if (fn) {
      const ret = await tryCallEncode(fn);
      sign = ret;
      console.log('[encode-ok]', path, ret.signResult?.slice?.(0, 60));
      break;
    }
  } catch (e) {
    console.log('[encode-fail]', path, String(e));
  }
}

console.log(
  JSON.stringify(
    {
      ownCount: ownNames.length,
      catVersion,
      hasSign: !!sign,
      signPreview: sign?.signResult ? `${String(sign.signResult).slice(0, 50)}...` : null,
      signInputPreview: sign?.signInput ? String(sign.signInput).slice(0, 150) : null,
    },
    null,
    2
  )
);
