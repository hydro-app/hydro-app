if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const f=e=>n(e,c),t={module:{uri:c},exports:o,require:f};i[c]=Promise.all(s.map((e=>t[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-6f3267ed.js",revision:null},{url:"assets/index-c9866511.css",revision:null},{url:"favicon.ico",revision:"15a14127c8b0543662db21a2cce1aee0"},{url:"favicon.png",revision:"6128b412f016f15db7cfdd1efc20be65"},{url:"index.html",revision:"6311b97cbe10e1f63e31cad03fb5c709"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"favicon.ico",revision:"15a14127c8b0543662db21a2cce1aee0"},{url:"favicon.png",revision:"6128b412f016f15db7cfdd1efc20be65"},{url:"manifest.webmanifest",revision:"d1de39fe7e8e7357869584f91c8f7f3d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
