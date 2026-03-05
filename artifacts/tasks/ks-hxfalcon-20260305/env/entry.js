import "./env.js";
import "./polyfills.js";

const capture = {
  "page": {
    "url": "https://ktag6nr93.m.chenzhongtech.com/fw/tag/text?cc=share_copylink&kpf=ANDROID_PHONE&fid=1966405051&shareMethod=token&kpn=KUAISHOU&subBiz=TEXT_TAG&rich=true&shareId=18637808483971&shareToken=X5B8MvIrJb3M1t0&tagName=jk&shareType=7&shareMode=app&appType=21&shareObjectId=jk&timestamp=1761110782909",
    "title": "#jk"
  },
  "cookies": [
    {
      "name": "kwssectoken",
      "value": "9bFEhSHrO82FIw2wyio7E/vNLC9d/C6I9Mv6k4b/NG3r9IHeyCmPRjtwIESGh0tBdETtX2iZ9D5NR+UQORBISw==",
      "domain": ".chenzhongtech.com",
      "path": "/",
      "expires": 1772716560,
      "size": 99,
      "httpOnly": false,
      "secure": false,
      "session": false,
      "priority": "Medium",
      "sameParty": false,
      "sourceScheme": "Secure"
    },
    {
      "name": "kwpsecproductname",
      "value": "kuaishou-growth-offSite-h5-ssr",
      "domain": ".chenzhongtech.com",
      "path": "/",
      "expires": 1775308200,
      "size": 47,
      "httpOnly": false,
      "secure": false,
      "session": false,
      "priority": "Medium",
      "sameParty": false,
      "sourceScheme": "Secure"
    },
    {
      "name": "did",
      "value": "web_4e638f01b4a94d42808240069bb140e0",
      "domain": ".chenzhongtech.com",
      "path": "/",
      "expires": 1807276081.454492,
      "size": 39,
      "httpOnly": false,
      "secure": false,
      "session": false,
      "priority": "Medium",
      "sameParty": false,
      "sourceScheme": "Secure"
    },
    {
      "name": "didv",
      "value": "1772716081000",
      "domain": ".chenzhongtech.com",
      "path": "/",
      "expires": 1807276081.454596,
      "size": 17,
      "httpOnly": false,
      "secure": false,
      "session": false,
      "priority": "Medium",
      "sameParty": false,
      "sourceScheme": "Secure"
    },
    {
      "name": "kwfv1",
      "value": "PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8BzfwnbY+0ZF+BHl+/zDG/rUPeDAG08SPAzfPeqA+/rU+er7P/cA+Ar7+erM+/WFG9LFP0r98fLA8f+fG/Dl+fLM+9HlP/Zl8/HFGfLF+nc9PeGl+0ZUP0rU+AmDP/mYwc==",
      "domain": ".chenzhongtech.com",
      "path": "/",
      "expires": 1775308380,
      "size": 223,
      "httpOnly": false,
      "secure": false,
      "session": false,
      "priority": "Medium",
      "sameParty": false,
      "sourceScheme": "Secure"
    },
    {
      "name": "kwscode",
      "value": "4b52a4cf3471b2421cd6a03c835b8d168a7c5fe6b9af502750b3a617088bb8e3",
      "domain": ".chenzhongtech.com",
      "path": "/",
      "expires": 1772716560,
      "size": 71,
      "httpOnly": false,
      "secure": false,
      "session": false,
      "priority": "Medium",
      "sameParty": false,
      "sourceScheme": "Secure"
    },
    {
      "name": "ktrace-context",
      "value": "1|MS44Nzg0NzI0NTc4Nzk2ODY5LjIzMjMyNzk3LjE3NzI3MTYxOTg3NTUuNTk5NzM1NDY3|MS44Nzg0NzI0NTc4Nzk2ODY5LjQ1OTQ2NzY0LjE3NzI3MTYxOTg3NTUuNTk5NzM1NDY4|0|webservice-user-growth-node|webservice|true|src-Js",
      "domain": "ktag6nr93.m.chenzhongtech.com",
      "path": "/",
      "expires": -1,
      "size": 206,
      "httpOnly": false,
      "secure": false,
      "session": true,
      "priority": "Medium",
      "sameParty": false,
      "sourceScheme": "Secure"
    }
  ],
  "localStorage": {
    "LOAD_DEVICE_INCREASE_ID": "10",
    "OTHER_DEVICE_INCREASE_ID": "80",
    "WEBLOGGER_CUSTOM_INCREAMENT_ID_KEY": "27",
    "kwfv1": "PeDA80mSG00ZF8e400wnrU+fr78fLAwn+f+erh8nz0Pfbf+fbS8e8f+erEGA40+epf+nbS8emSP0cMGfb08Bbf8BzfwnbY+0ZF+BHl+/zDG/rUPeDAG08SPAzfPeqA+/rU+er7P/cA+Ar7+erM+/WFG9LFP0r98fLA8f+fG/Dl+fLM+9HlP/Zl8/HFGfLF+nc9PeGl+0ZUP0rU+AmDP/mYwc==",
    "WEBLOGGER_INCREAMENT_ID_KEY": "110",
    "kwfcv1": "4"
  },
  "sessionStorage": {
    "WEBLOGGER_SESSIONID": "37ae889a-4140-4f04-a4ce-239698ae367c"
  },
  "runtimeEvidence": [],
  "targetScript": null
};
capture.targetScript = null;

if (capture.targetScript?.content) {
  eval(capture.targetScript.content);
}

const targetFunction = capture.runtimeEvidence?.find((item) => typeof item.functionName === "string")?.functionName;
if (targetFunction && typeof globalThis[targetFunction] === "function") {
  console.log({targetFunction, result: globalThis[targetFunction]("token", "nonce")});
} else {
  console.log({message: "target function not callable yet", targetFunction});
}
