const sign =
  process.argv[2] ||
  "HUDR_sFnX-DtsHUFXsbDPT3TMP-sk0itDU-cTr0cF06WMoAOpL5EWcW627YLLDrveiddus0afKWJpRLFyBR0xs7X3z_cohNcAwU59OlLEWEmxmp-5nxK8Jqw8YWx5z5k5GG0OErQIMjmJmZP9aG4nk0LdBXPB7ElZht9I-bUlhQif$HE_223da5c0c27ff977d7f5689d443227d1ed6869696968b6f1c5d37fe44888e82e3d1ff568f23f57b3123f578169";
const caver = process.argv[3] || "2";
const endpoint = `https://ktag6nr93.m.chenzhongtech.com/rest/wd/kconf/get?__NS_hxfalcon=${encodeURIComponent(
  sign
)}&caver=${encodeURIComponent(caver)}`;

const headers = {
  "content-type": "application/json",
  kww: "PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8ebS80pf+nrM+0H78ePM8/8f+AHIGAPEG0PE80PAG0Z7GASYG0mSGfQfw/cAwe4jPnHMw/GhPeP9+/ch+9bYPemjG/LUP/z0wnPUGAbY+nPU+fPlG/D780Yj+eQYwBHA8W==",
  origin: "https://ktag6nr93.m.chenzhongtech.com",
  referer:
    "https://ktag6nr93.m.chenzhongtech.com/fw/tag/text?cc=share_copylink&kpf=ANDROID_PHONE&fid=1966405051&shareMethod=token&kpn=KUAISHOU&subBiz=TEXT_TAG&rich=true&shareId=18637808483971&shareToken=X5B8MvIrJb3M1t0&tagName=jk&shareType=7&shareMode=app&appType=21&shareObjectId=jk&timestamp=1761110782909",
  cookie:
    "did=web_4e638f01b4a94d42808240069bb140e0; didv=1772716081000; kwpsecproductname=kuaishou-growth-offSite-h5-ssr; kwfv1=PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8ebS80pf+nrM+0H78ePM8/8f+AHIGAPEG0PE80PAG0Z7GASYG0mSGfQfw/cAwe4jPnHMw/GhPeP9+/ch+9bYPemjG/LUP/z0wnPUGAbY+nPU+fPlG/D780Yj+eQYwBHA8W==; kwssectoken=UhSPwTzE0GRgQQKOWxFjQOUOZKVOIaC7Sa4izzg4a7VPpTWwwaElIN2dVzjizfnSh2L0gFAxYTgL/sbQU3PYuA==; kwscode=010115ebdbcf3ecc11856a43173b231fc02feec25611dca95de06c689ceb16ea",
};

const body = {
  key: "frontend.browserConfig.h5ShareConfig",
  type: "json",
};

const resp = await fetch(endpoint, {
  method: "POST",
  headers,
  body: JSON.stringify(body),
});

const text = await resp.text();
let json = null;
try {
  json = JSON.parse(text);
} catch {
  json = null;
}

console.log(
  JSON.stringify(
    {
      httpStatus: resp.status,
      ok: resp.ok,
      result: json?.result ?? null,
      hasData: Boolean(json?.data),
      bodyPreview: text.slice(0, 300),
    },
    null,
    2
  )
);
