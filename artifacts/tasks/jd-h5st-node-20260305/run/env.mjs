import { performance } from 'node:perf_hooks';
import { webcrypto } from 'node:crypto';
import { TextEncoder, TextDecoder } from 'node:util';
import vm from 'node:vm';
import { seed } from './seed.mjs';

const nativeSetTimeout = globalThis.setTimeout.bind(globalThis);
const nativeClearTimeout = globalThis.clearTimeout.bind(globalThis);

function define(name, value) {
  Object.defineProperty(globalThis, name, {
    configurable: true,
    writable: true,
    value,
  });
}

function createStorage(initial) {
  const store = new Map();
  for (const [k, v] of Object.entries(initial)) {
    if (v == null) continue;
    store.set(String(k), typeof v === 'string' ? v : JSON.stringify(v));
  }
  return {
    getItem(key) {
      const k = String(key);
      return store.has(k) ? store.get(k) : null;
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
    removeItem(key) {
      store.delete(String(key));
    },
    clear() {
      store.clear();
    },
    key(index) {
      return Array.from(store.keys())[index] ?? null;
    },
    get length() {
      return store.size;
    },
  };
}

export function setupEnv() {
  const originalConsoleError = console.error.bind(console);
  const originalConsoleLog = console.log.bind(console);
  const shouldIgnoreNoise = (args) => {
    if (!args?.length) return false;
    const first = args[0];
    if (typeof first === 'string' && first === '[Error]') return true;
    const joined = args
      .map((v) => {
        if (v && typeof v === 'object' && 'stack' in v) return String(v.stack ?? '');
        return String(v ?? '');
      })
      .join('\n');
    if (joined.includes('./m_tk.js') && joined.includes('getEncryptedCollectInfo')) return true;
    if (first && typeof first === 'object' && 'stack' in first) {
      const stack = String(first.stack ?? '');
      if (stack.includes('./m_tk.js') && stack.includes('getEncryptedCollectInfo')) return true;
    }
    return false;
  };
  console.error = (...args) => {
    if (shouldIgnoreNoise(args)) return;
    originalConsoleError(...args);
  };
  console.log = (...args) => {
    if (shouldIgnoreNoise(args)) return;
    originalConsoleLog(...args);
  };

  define('window', globalThis);
  define('self', globalThis);
  define('global', globalThis);
  define('Window', function Window() {});
  define('HTMLAllCollection', class HTMLAllCollection extends Array {});
  define('performance', performance);
  define('crypto', webcrypto);
  define('TextEncoder', TextEncoder);
  define('TextDecoder', TextDecoder);

  define('atob', (value) => Buffer.from(value, 'base64').toString('binary'));
  define('btoa', (value) => Buffer.from(value, 'binary').toString('base64'));

  define('location', {
    href: seed.locationHref,
    protocol: 'https:',
    host: 'm.jd.com',
    hostname: 'm.jd.com',
    origin: 'https://m.jd.com',
    pathname: '/',
    search: '',
    hash: '',
  });

  define('navigator', {
    userAgent: seed.userAgent,
    language: seed.language,
    languages: seed.languages,
    platform: seed.platform,
    hardwareConcurrency: seed.hardwareConcurrency,
    deviceMemory: seed.deviceMemory,
    cookieEnabled: true,
    webdriver: false,
  });

  define('screen', seed.screen);
  define('innerWidth', seed.viewport.innerWidth);
  define('innerHeight', seed.viewport.innerHeight);
  define('outerWidth', seed.viewport.outerWidth);
  define('outerHeight', seed.viewport.outerHeight);
  define('devicePixelRatio', seed.viewport.devicePixelRatio);

  class ElementMock {
    constructor(tagName = 'div') {
      this.tagName = String(tagName).toUpperCase();
      this.children = [];
      this.style = {};
      this.parentNode = null;
      this.src = '';
      this.type = '';
      this.readyState = 'complete';
      this.onload = null;
      this.onerror = null;
      this.onreadystatechange = null;
    }

    appendChild(child) {
      child.parentNode = this;
      this.children.push(child);
      const triggerReady = () => {
        if (typeof child.onload === 'function') {
          nativeSetTimeout(() => child.onload(), 0);
        }
        if (typeof child.onreadystatechange === 'function') {
          nativeSetTimeout(() => child.onreadystatechange(), 0);
        }
      };

      if (this.tagName === 'HEAD' && child.tagName === 'SCRIPT' && child.src) {
        fetch(String(child.src), { headers: { 'user-agent': seed.userAgent, referer: 'https://m.jd.com/' } })
          .then((res) => (res.ok ? res.text() : ''))
          .then((code) => {
            if (code) {
              vm.runInThisContext(code, { filename: String(child.src) });
            }
            triggerReady();
          })
          .catch(() => {
            if (typeof child.onerror === 'function') {
              child.onerror(new Error('script load failed'));
            }
          });
      } else {
        triggerReady();
      }
      return child;
    }

    removeChild(child) {
      this.children = this.children.filter((it) => it !== child);
      child.parentNode = null;
    }

    getContext() {
      return {
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 1,
        lineCap: 'round',
        textBaseline: 'alphabetic',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: '#000',
        font: '12px sans-serif',
        fillRect() {},
        arc() {},
        stroke() {},
        fillText() {},
        measureText(text) {
          return { width: String(text).length * 7.1 };
        },
        createLinearGradient() {
          return { addColorStop() {} };
        },
        beginPath() {},
        closePath() {},
      };
    }

    toDataURL() {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAqUExURf///////////0dwTP///////////////////////////////////////5p/RLkAAAANdFJOU4Ag3wAQmshQ72CvcDhs89WxAAAAdklEQVQI12MwdjSGAgbLXkUY01f1liEDCExmkA1us74LAlcYjC5dMBYEAWEGwyBmmFpjOGAwLhCGMU3vXocbtqbNXAkEUhhkl7eZJ0GYSAqMJxzGYpjhMrgVRjegFjsDnaNkCXbORQYP1asQR25msLwLdzrCQwDfSjfpYyzAPQAAAABJRU5ErkJggg==';
    }
  }

  class DocumentMock {
    constructor() {
      this.cookie = seed.cookie;
      this.location = globalThis.location;
      this.referrer = '';
      this.title = '又好又便宜';
      this.compatMode = 'CSS1Compat';
      this.characterSet = 'UTF-8';
      this.hidden = false;
      this.visibilityState = 'visible';
      this.head = new ElementMock('head');
      this.body = new ElementMock('body');
      this.documentElement = new ElementMock('html');
    }

    createElement(tagName) {
      return new ElementMock(tagName);
    }

    querySelector() {
      return null;
    }

    getElementsByTagName(tagName) {
      if (String(tagName).toLowerCase() === 'head') return [this.head];
      if (String(tagName).toLowerCase() === 'body') return [this.body];
      return [this.documentElement];
    }

    addEventListener() {}

    removeEventListener() {}
  }

  define('Element', ElementMock);
  define('HTMLCanvasElement', ElementMock);
  define('Document', DocumentMock);
  define('document', new DocumentMock());
  const helperData = structuredClone(seed.helperData ?? {});
  // These keys are runtime promise caches in browser. Seeding them as plain objects
  // breaks internal `.then(...)` chains.
  delete helperData['loader.utils#getScriptOnce'];
  delete helperData['loader.utils#loadRacScriptOnce'];
  delete helperData['main.sign#__requestDeps'];
  define('__JDWEBSIGNHELPER_$DATA__', helperData);

  const plugins = [
    { name: 'PDF Viewer', filename: 'internal-pdf-viewer', length: 2 },
    { name: 'Chrome PDF Viewer', filename: 'internal-pdf-viewer', length: 2 },
    { name: 'Chromium PDF Viewer', filename: 'internal-pdf-viewer', length: 2 },
    { name: 'Microsoft Edge PDF Viewer', filename: 'internal-pdf-viewer', length: 2 },
    { name: 'WebKit built-in PDF', filename: 'internal-pdf-viewer', length: 2 },
  ];
  plugins.item = (i) => plugins[i] ?? null;
  plugins.namedItem = (name) => plugins.find((x) => x.name === name) ?? null;

  const mimeTypes = [
    { type: 'application/pdf', suffixes: 'pdf' },
    { type: 'text/pdf', suffixes: 'pdf' },
  ];
  mimeTypes.item = (i) => mimeTypes[i] ?? null;
  mimeTypes.namedItem = (name) => mimeTypes.find((x) => x.type === name) ?? null;

  define('localStorage', createStorage(seed.localStorage));
  define('sessionStorage', createStorage(seed.sessionStorage));

  Object.assign(globalThis.navigator, {
    appCodeName: 'Mozilla',
    appName: 'Netscape',
    appVersion: seed.userAgent.replace('Mozilla/', ''),
    product: 'Gecko',
    productSub: '20030107',
    vendor: 'Google Inc.',
    vendorSub: '',
    onLine: true,
    maxTouchPoints: 0,
    pdfViewerEnabled: true,
    doNotTrack: null,
    plugins,
    mimeTypes,
    userAgentData: {
      brands: [
        { brand: 'Not:A-Brand', version: '99' },
        { brand: 'Google Chrome', version: '145' },
        { brand: 'Chromium', version: '145' },
      ],
      mobile: false,
      platform: 'Linux',
      async getHighEntropyValues() {
        return {
          architecture: 'x86',
          bitness: '64',
          model: '',
          platform: 'Linux',
          platformVersion: '6.8.0',
          uaFullVersion: '145.0.0.0',
        };
      },
      toJSON() {
        return {
          brands: this.brands,
          mobile: this.mobile,
          platform: this.platform,
        };
      },
    },
  });

  define('chrome', {
    loadTimes: () => ({}),
    csi: () => ({}),
    app: {},
  });
  define('history', { length: 3, back() {}, forward() {}, go() {} });

  define('setTimeout', (fn, delay = 0, ...args) => {
    const timer = nativeSetTimeout(fn, delay, ...args);
    if (typeof timer?.unref === 'function') timer.unref();
    return timer;
  });
  define('clearTimeout', nativeClearTimeout);
  define('setInterval', () => 0);
  define('clearInterval', () => {});
  define('requestAnimationFrame', (cb) => {
    const timer = nativeSetTimeout(() => cb(Date.now()), 16);
    if (typeof timer?.unref === 'function') timer.unref();
    return timer;
  });
  define('cancelAnimationFrame', (id) => nativeClearTimeout(id));

  define('fetch', globalThis.fetch ?? (() => Promise.reject(new Error('fetch unavailable'))));

  const IntlDateTimeFormat = Intl.DateTimeFormat;
  Intl.DateTimeFormat = function patchedDateTimeFormat(...args) {
    const formatter = new IntlDateTimeFormat(...args);
    return formatter;
  };

  Date.prototype.getTimezoneOffset = function patchedTimezoneOffset() {
    return seed.timezoneOffset;
  };
}
