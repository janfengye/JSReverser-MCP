import vm from 'node:vm';
import { readFile } from 'node:fs/promises';
import { setupEnv } from './env.mjs';
import { seed } from './seed.mjs';

let loaded = false;

async function loadScript(pathname) {
  const code = await readFile(new URL(pathname, import.meta.url), 'utf8');
  vm.runInThisContext(code, { filename: pathname });
}

async function ensureLoaded() {
  if (loaded) return;
  setupEnv();
  // m_tk.js mainly drives browser-side fp collection and emits async noise in pure-node mode.
  // Signature generation works with security_main/security_rac plus seeded env data.
  await loadScript('./security_main.js');
  await loadScript('./security_rac.js');
  loaded = true;
}

export async function generateH5st({ appId, input }) {
  await ensureLoaded();
  const Ctor = globalThis.ParamsSign || globalThis.ParamsSignLite || globalThis.ParamsSignMain;
  if (typeof Ctor !== 'function') {
    throw new Error('ParamsSign* constructor not found after script load');
  }

  const signer = new Ctor({ appId });
  if (typeof seed.cltOverride === 'string' && seed.cltOverride.length > 100 && typeof signer._$clt === 'function') {
    signer._$clt = () => seed.cltOverride;
  }
  const result = await signer.sign({ ...input });
  return result;
}
