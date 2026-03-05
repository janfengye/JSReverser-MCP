import { webcrypto } from "node:crypto";

const REFERER =
  "https://ktag6nr93.m.chenzhongtech.com/fw/tag/text?cc=share_copylink&kpf=ANDROID_PHONE&fid=1966405051&shareMethod=token&kpn=KUAISHOU&subBiz=TEXT_TAG&rich=true&shareId=18637808483971&shareToken=X5B8MvIrJb3M1t0&tagName=jk&shareType=7&shareMode=app&appType=21&shareObjectId=jk&timestamp=1761110782909";
const ORIGIN = "https://ktag6nr93.m.chenzhongtech.com";
const KCONF_API = "https://ktag6nr93.m.chenzhongtech.com/rest/wd/kconf/get";
const STRICT_API =
  "https://ktag6nr93.m.chenzhongtech.com/rest/wd/ugH5App/tag/text/feed/recent";

const DID = "web_4e638f01b4a94d42808240069bb140e0";
const APP_KEY = "nuojwbmH5T";

const KWW =
  process.env.KWW ||
  "PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8ebS80pf+nrM+0H78ePM8/8f+AHIGAPEG0PE80PAG0Z7GASYG0mSGfQfw/cAwe4jPnHMw/GhPeP9+/ch+9bYPemjG/LUP/z0wnPUGAbY+nPU+fPlG/D780Yj+eQYwBHA8W==";
const COOKIE =
  process.env.COOKIE ||
  "did=web_4e638f01b4a94d42808240069bb140e0; didv=1772716081000; kwpsecproductname=kuaishou-growth-offSite-h5-ssr; kwfv1=PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8ebS80pf+nrM+0H78ePM8/8f+AHIGAPEG0PE80PAG0Z7GASYG0mSGfQfw/cAwe4jPnHMw/GhPeP9+/ch+9bYPemjG/LUP/z0wnPUGAbY+nPU+fPlG/D780Yj+eQYwBHA8W==; kwssectoken=xjFL0QHIDWBoHhd5rChZtGpoV2a3Y5XplgRo5biAyIunKAd6WLjGuFu4ff3L6Bzd4/w3CCLwm9zDjTUlie0OQ==; kwscode=44f52808927f2e0c07c9b448cd2a6c5a85dbd3211fa1cc694bacb26346fa59af";

function mkStorage(seed = {}) {
  const m = new Map(Object.entries(seed));
  return {
    getItem(k) {
      return m.has(k) ? m.get(k) : null;
    },
    setItem(k, v) {
      m.set(String(k), String(v));
    },
    removeItem(k) {
      m.delete(String(k));
    },
    clear() {
      m.clear();
    },
    key(i) {
      return Array.from(m.keys())[i] ?? null;
    },
    get length() {
      return m.size;
    },
  };
}

function setupBrowserLikeEnv() {
  const location = {
    href: REFERER,
    origin: ORIGIN,
    host: "ktag6nr93.m.chenzhongtech.com",
    hostname: "ktag6nr93.m.chenzhongtech.com",
    pathname: "/fw/tag/text",
    protocol: "https:",
    search: "",
  };

  const dummyEl = {
    style: {},
    childNodes: [],
    appendChild() {},
    removeChild() {},
    setAttribute() {},
    getAttribute() {
      return "";
    },
    addEventListener() {},
    removeEventListener() {},
    getContext() {
      return {};
    },
    getBoundingClientRect() {
      return { width: 0, height: 0, top: 0, left: 0 };
    },
  };

  const document = {
    location,
    cookie: COOKIE,
    scripts: [],
    documentElement: dummyEl,
    body: dummyEl,
    head: dummyEl,
    createElement() {
      return { ...dummyEl };
    },
    getElementById() {
      return dummyEl;
    },
    querySelector() {
      return dummyEl;
    },
    querySelectorAll() {
      return [];
    },
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
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: {
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
      platform: "Linux x86_64",
      language: "zh-CN",
      languages: ["zh-CN", "zh", "en-US", "en"],
      cookieEnabled: true,
      sendBeacon() {
        return true;
      },
    },
  });

  globalThis.localStorage = mkStorage({
    LOAD_DEVICE_INCREASE_ID: "10",
    OTHER_DEVICE_INCREASE_ID: "80",
    WEBLOGGER_CUSTOM_INCREAMENT_ID_KEY: "27",
    WEBLOGGER_INCREAMENT_ID_KEY: "110",
    kwfcv1: "4",
  });
  globalThis.sessionStorage = mkStorage({
    WEBLOGGER_SESSIONID: "37ae889a-4140-4f04-a4ce-239698ae367c",
  });
  globalThis.history = { length: 1, pushState() {}, replaceState() {} };
  globalThis.screen = {
    width: 1920,
    height: 1080,
    availWidth: 1920,
    availHeight: 1040,
  };

  const perf = globalThis.performance ?? {};
  if (typeof perf.now !== "function") perf.now = () => Date.now();
  if (!perf.timing) {
    perf.timing = {
      navigationStart: Date.now() - 500,
      fetchStart: Date.now() - 480,
      domContentLoadedEventEnd: Date.now() - 10,
      loadEventEnd: Date.now(),
    };
  }
  if (typeof perf.markResourceTiming !== "function") {
    perf.markResourceTiming = () => {};
  }
  globalThis.performance = perf;

  globalThis.addEventListener = () => {};
  globalThis.removeEventListener = () => {};
  globalThis.atob = (v) => Buffer.from(v, "base64").toString("binary");
  globalThis.btoa = (v) => Buffer.from(v, "binary").toString("base64");
  if (!globalThis.crypto) globalThis.crypto = webcrypto;
}

function makeKconfPayload(caver) {
  return {
    url: "/rest/wd/kconf/get",
    query: { caver },
    form: {},
    requestBody: { key: "frontend.browserConfig.h5ShareConfig", type: "json" },
    projectInfo: { did: DID, appKey: APP_KEY },
  };
}

function makeFeedPayload(caver) {
  return {
    url: "/rest/wd/ugH5App/tag/text/feed/recent",
    query: { caver },
    form: {},
    requestBody: { tagName: "jk", pcursor: "", count: 18 },
    projectInfo: { did: DID, appKey: APP_KEY },
  };
}

async function signWithVendor(Ee, payload) {
  return new Promise((resolve, reject) => {
    Ee.call("$encode", [
      payload,
      {
        suc(signResult, signInput) {
          resolve({ signResult, signInput });
        },
        err(e) {
          reject(e);
        },
      },
    ]);
  });
}

async function postKconf(ns, caver) {
  const query = ns
    ? `?__NS_hxfalcon=${encodeURIComponent(ns)}&caver=${encodeURIComponent(caver)}`
    : `?caver=${encodeURIComponent(caver)}`;
  const resp = await fetch(`${KCONF_API}${query}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      kww: KWW,
      origin: ORIGIN,
      referer: REFERER,
      cookie: COOKIE,
    },
    body: JSON.stringify({
      key: "frontend.browserConfig.h5ShareConfig",
      type: "json",
    }),
  });
  const json = await resp.json();
  return {
    status: resp.status,
    result: json?.result,
    errorMsg: json?.error_msg || null,
    hasData: !!json?.data,
  };
}

async function postFeedRecent(ns, caver) {
  const query = ns
    ? `?__NS_hxfalcon=${encodeURIComponent(ns)}&caver=${encodeURIComponent(caver)}`
    : `?caver=${encodeURIComponent(caver)}`;
  const resp = await fetch(`${STRICT_API}${query}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      kww: KWW,
      origin: ORIGIN,
      referer: REFERER,
      cookie: COOKIE,
      "user-agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({ tagName: "jk", pcursor: "", count: 18 }),
  });
  const json = await resp.json();
  console.log(json);
  return {
    status: resp.status,
    result: json?.result,
    errorMsg: json?.error_msg || null,
    hasData: !!json?.data,
    feedCount: Array.isArray(json?.data?.feeds) ? json.data.feeds.length : null,
  };
}

setupBrowserLikeEnv();

const vendor = await import("../env/scripts/vendor.mjs");
const Ee = vendor.aj;
if (!Ee || typeof Ee.call !== "function") {
  throw new Error("vendor.aj 不可用，无法生成真签名");
}

const caver = Ee.call("$getCatVersion");
const realKconf = await signWithVendor(Ee, makeKconfPayload(caver));
const realFeed = await signWithVendor(Ee, makeFeedPayload(caver));

const [
  kconfNoSign,
  kconfFake,
  kconfReal,
  feedNoSign,
  feedFake,
  feedReal,
] = await Promise.all([
  postKconf(null, caver),
  postKconf("abc123", caver),
  postKconf(realKconf.signResult, caver),
  postFeedRecent(null, caver),
  postFeedRecent("abc123", caver),
  postFeedRecent(realFeed.signResult, caver),
]);

console.log(
  JSON.stringify(
    {
      caver,
      vendorAjMethods: Object.getOwnPropertyNames(
        Object.getPrototypeOf(Ee) || {}
      ),
      generatedSign: {
        kconfLength: String(realKconf.signResult || "").length,
        feedLength: String(realFeed.signResult || "").length,
        feedPreview: String(realFeed.signResult || "").slice(0, 90),
      },
      verifyKconf: {
        noSign: kconfNoSign,
        fakeSign: kconfFake,
        realSign: kconfReal,
      },
      verifyFeedRecent: {
        noSign: feedNoSign,
        fakeSign: feedFake,
        realSign: feedReal,
      },
      note: "重点看 result/hasData/errorMsg，不要只看 HTTP 200。",
    },
    null,
    2
  )
);
