globalThis.window = globalThis;
globalThis.self = globalThis;
globalThis.global = globalThis;
globalThis.document ??= {cookie: "", location: {href: ""}};
globalThis.navigator ??= {userAgent: "js-reverse-mcp"};
globalThis.location ??= {href: ""};
globalThis.atob ??= (value) => Buffer.from(value, "base64").toString("utf8");
globalThis.btoa ??= (value) => Buffer.from(value, "utf8").toString("base64");
globalThis.crypto ??= {subtle: {}};

globalThis.location = {href: "https://ktag6nr93.m.chenzhongtech.com/fw/tag/text?cc=share_copylink&kpf=ANDROID_PHONE&fid=1966405051&shareMethod=token&kpn=KUAISHOU&subBiz=TEXT_TAG&rich=true&shareId=18637808483971&shareToken=X5B8MvIrJb3M1t0&tagName=jk&shareType=7&shareMode=app&appType=21&shareObjectId=jk&timestamp=1761110782909"};

globalThis.document = {cookie: "kwssectoken=9bFEhSHrO82FIw2wyio7E/vNLC9d/C6I9Mv6k4b/NG3r9IHeyCmPRjtwIESGh0tBdETtX2iZ9D5NR+UQORBISw==; kwpsecproductname=kuaishou-growth-offSite-h5-ssr; did=web_4e638f01b4a94d42808240069bb140e0; didv=1772716081000; kwfv1=PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8BzfwnbY+0ZF+BHl+/zDG/rUPeDAG08SPAzfPeqA+/rU+er7P/cA+Ar7+erM+/WFG9LFP0r98fLA8f+fG/Dl+fLM+9HlP/Zl8/HFGfLF+nc9PeGl+0ZUP0rU+AmDP/mYwc==; kwscode=4b52a4cf3471b2421cd6a03c835b8d168a7c5fe6b9af502750b3a617088bb8e3; ktrace-context=1|MS44Nzg0NzI0NTc4Nzk2ODY5LjIzMjMyNzk3LjE3NzI3MTYxOTg3NTUuNTk5NzM1NDY3|MS44Nzg0NzI0NTc4Nzk2ODY5LjQ1OTQ2NzY0LjE3NzI3MTYxOTg3NTUuNTk5NzM1NDY4|0|webservice-user-growth-node|webservice|true|src-Js", location: globalThis.location};

const localStorageSeed = new Map([["LOAD_DEVICE_INCREASE_ID","10"],["OTHER_DEVICE_INCREASE_ID","80"],["WEBLOGGER_CUSTOM_INCREAMENT_ID_KEY","27"],["kwfv1","PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8BzfwnbY+0ZF+BHl+/zDG/rUPeDAG08SPAzfPeqA+/rU+er7P/cA+Ar7+erM+/WFG9LFP0r98fLA8f+fG/Dl+fLM+9HlP/Zl8/HFGfLF+nc9PeGl+0ZUP0rU+AmDP/mYwc=="],["WEBLOGGER_INCREAMENT_ID_KEY","110"],["kwfcv1","4"]]);
globalThis.localStorage = {
  getItem(key) { return this._store.has(key) ? this._store.get(key) : null; },
  setItem(key, value) { this._store.set(String(key), String(value)); },
  removeItem(key) { this._store.delete(String(key)); },
  clear() { this._store.clear(); },
  key(index) { return Array.from(this._store.keys())[index] ?? null; },
  get length() { return this._store.size; },
  _store: localStorageSeed,
};

const sessionStorageSeed = new Map([["WEBLOGGER_SESSIONID","37ae889a-4140-4f04-a4ce-239698ae367c"]]);
globalThis.sessionStorage = {
  getItem(key) { return this._store.has(key) ? this._store.get(key) : null; },
  setItem(key, value) { this._store.set(String(key), String(value)); },
  removeItem(key) { this._store.delete(String(key)); },
  clear() { this._store.clear(); },
  key(index) { return Array.from(this._store.keys())[index] ?? null; },
  get length() { return this._store.size; },
  _store: sessionStorageSeed,
};
