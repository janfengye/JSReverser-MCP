import { writeFile } from 'node:fs/promises';

const targets = [
  ['security_main.js', 'https://storage.360buyimg.com/webcontainer/main/js_security_v3_main.js?v=20260305'],
  ['security_rac.js', 'https://storage.360buyimg.com/webcontainer/main/js-security-v3-rac-beta.js?v=20260305'],
  ['m_tk.js', 'https://gias.jd.com/js/m-tk.js'],
];

for (const [name, url] of targets) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
      referer: 'https://m.jd.com/',
      origin: 'https://m.jd.com',
    },
  });
  if (!res.ok) {
    throw new Error(`fetch ${url} failed: ${res.status}`);
  }
  const text = await res.text();
  await writeFile(new URL(name, import.meta.url), text, 'utf8');
  console.log(`${name}: ${text.length}`);
}
