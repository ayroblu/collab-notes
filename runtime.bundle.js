(()=>{"use strict";var e,r,t,o,n,a={},i={};function l(e){var r=i[e];if(void 0!==r)return r.exports;var t=i[e]={id:e,loaded:!1,exports:{}};return a[e](t,t.exports,l),t.loaded=!0,t.exports}l.m=a,l.amdO={},e=[],l.O=(r,t,o,n)=>{if(!t){var a=1/0;for(s=0;s<e.length;s++){for(var[t,o,n]=e[s],i=!0,c=0;c<t.length;c++)(!1&n||a>=n)&&Object.keys(l.O).every((e=>l.O[e](t[c])))?t.splice(c--,1):(i=!1,n<a&&(a=n));if(i){e.splice(s--,1);var u=o();void 0!==u&&(r=u)}}return r}n=n||0;for(var s=e.length;s>0&&e[s-1][2]>n;s--)e[s]=e[s-1];e[s]=[t,o,n]},l.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return l.d(r,{a:r}),r},t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,l.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var n=Object.create(null);l.r(n);var a={};r=r||[null,t({}),t([]),t(t)];for(var i=2&o&&e;"object"==typeof i&&!~r.indexOf(i);i=t(i))Object.getOwnPropertyNames(i).forEach((r=>a[r]=()=>e[r]));return a.default=()=>e,l.d(n,a),n},l.d=(e,r)=>{for(var t in r)l.o(r,t)&&!l.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce(((r,t)=>(l.f[t](e,r),r)),[])),l.u=e=>e+".bundle.js",l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),l.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),o={},n="collab-notes:",l.l=(e,r,t,a)=>{if(o[e])o[e].push(r);else{var i,c;if(void 0!==t)for(var u=document.getElementsByTagName("script"),s=0;s<u.length;s++){var d=u[s];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==n+t){i=d;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,l.nc&&i.setAttribute("nonce",l.nc),i.setAttribute("data-webpack",n+t),i.src=e),o[e]=[r];var f=(r,t)=>{i.onerror=i.onload=null,clearTimeout(p);var n=o[e];if(delete o[e],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((e=>e(t))),r)return r(t)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),c&&document.head.appendChild(i)}},l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;l.g.importScripts&&(e=l.g.location+"");var r=l.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),l.p=e})(),(()=>{l.b=document.baseURI||self.location.href;var e={3666:0};l.f.j=(r,t)=>{var o=l.o(e,r)?e[r]:void 0;if(0!==o)if(o)t.push(o[2]);else if(3666!=r){var n=new Promise(((t,n)=>o=e[r]=[t,n]));t.push(o[2]=n);var a=l.p+l.u(r),i=new Error;l.l(a,(t=>{if(l.o(e,r)&&(0!==(o=e[r])&&(e[r]=void 0),o)){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+n+": "+a+")",i.name="ChunkLoadError",i.type=n,i.request=a,o[1](i)}}),"chunk-"+r,r)}else e[r]=0},l.O.j=r=>0===e[r];var r=(r,t)=>{var o,n,[a,i,c]=t,u=0;if(a.some((r=>0!==e[r]))){for(o in i)l.o(i,o)&&(l.m[o]=i[o]);if(c)var s=c(l)}for(r&&r(t);u<a.length;u++)n=a[u],l.o(e,n)&&e[n]&&e[n][0](),e[a[u]]=0;return l.O(s)},t=self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})()})();