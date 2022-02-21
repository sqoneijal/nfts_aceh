!function(e){function t(t){for(var r,a,o=t[0],c=t[1],i=t[2],l=0,s=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(P,a)&&P[a]&&s.push(P[a][0]),P[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(R&&R(t);s.length;)s.shift()();return S.push.apply(S,i||[]),n()}function n(){for(var e,t=0;t<S.length;t++){for(var n=S[t],r=!0,a=1;a<n.length;a++){var o=n[a];0!==P[o]&&(r=!1)}r&&(S.splice(t--,1),e=k(k.s=n[0]))}return e}var r=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!O[e]||!E[e])return;for(var n in E[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(h[n]=t[n]);0==--y&&0===b&&N()}(e,t),r&&r(e,t)};var a,o=!0,c="0731c3d62fdbdc46949d",i={},l=[],s=[];function d(t){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:a!==t,active:!0,accept:function(e,t){if(void 0===e)n._selfAccepted=!0;else if("function"==typeof e)n._selfAccepted=e;else if("object"==typeof e)for(var r=0;r<e.length;r++)n._acceptedDependencies[e[r]]=t||function(){};else n._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)n._declinedDependencies[e[t]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=n._disposeHandlers.indexOf(e);t>=0&&n._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,f){case"idle":(h={})[t]=e[t],p("ready");break;case"ready":H(t);break;case"prepare":case"check":case"dispose":case"apply":(g=g||[]).push(t)}},check:_,apply:M,status:function(e){if(!e)return f;u.push(e)},addStatusHandler:function(e){u.push(e)},removeStatusHandler:function(e){var t=u.indexOf(e);t>=0&&u.splice(t,1)},data:i[t]};return a=void 0,n}var u=[],f="idle";function p(e){f=e;for(var t=0;t<u.length;t++)u[t].call(null,e)}var m,h,v,g,y=0,b=0,w={},E={},O={};function j(e){return+e+""===e?+e:e}function _(e){if("idle"!==f)throw new Error("check() is only allowed in idle status");return o=e,p("check"),(t=1e4,t=t||1e4,new Promise((function(e,n){if("undefined"==typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,a=k.p+""+c+".hot-update.json";r.open("GET",a,!0),r.timeout=t,r.send(null)}catch(e){return n(e)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+a+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+a+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(e){return void n(e)}e(t)}}}))).then((function(e){if(!e)return p(D()?"ready":"idle"),null;E={},w={},O=e.c,v=e.h,p("prepare");var t=new Promise((function(e,t){m={resolve:e,reject:t}}));for(var n in h={},P)x(n);return"prepare"===f&&0===b&&0===y&&N(),t}));var t}function x(e){O[e]?(E[e]=!0,y++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=k.p+""+e+"."+c+".hot-update.js",document.head.appendChild(t)}(e)):w[e]=!0}function N(){p("ready");var e=m;if(m=null,e)if(o)Promise.resolve().then((function(){return M(o)})).then((function(t){e.resolve(t)}),(function(t){e.reject(t)}));else{var t=[];for(var n in h)Object.prototype.hasOwnProperty.call(h,n)&&t.push(j(n));e.resolve(t)}}function M(t){if("ready"!==f)throw new Error("apply() is only allowed in ready status");return function t(n){var r,o,s,d,u;function f(e){for(var t=[e],n={},r=t.map((function(e){return{chain:[e],id:e}}));r.length>0;){var a=r.pop(),o=a.id,c=a.chain;if((d=I[o])&&(!d.hot._selfAccepted||d.hot._selfInvalidated)){if(d.hot._selfDeclined)return{type:"self-declined",chain:c,moduleId:o};if(d.hot._main)return{type:"unaccepted",chain:c,moduleId:o};for(var i=0;i<d.parents.length;i++){var l=d.parents[i],s=I[l];if(s){if(s.hot._declinedDependencies[o])return{type:"declined",chain:c.concat([l]),moduleId:o,parentId:l};-1===t.indexOf(l)&&(s.hot._acceptedDependencies[o]?(n[l]||(n[l]=[]),m(n[l],[o])):(delete n[l],t.push(l),r.push({chain:c.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function m(e,t){for(var n=0;n<t.length;n++){var r=t[n];-1===e.indexOf(r)&&e.push(r)}}D();var y={},b=[],w={},E=function(){console.warn("[HMR] unexpected require("+x.moduleId+") to disposed module")};for(var _ in h)if(Object.prototype.hasOwnProperty.call(h,_)){var x;u=j(_),x=h[_]?f(u):{type:"disposed",moduleId:_};var N=!1,M=!1,H=!1,S="";switch(x.chain&&(S="\nUpdate propagation: "+x.chain.join(" -> ")),x.type){case"self-declined":n.onDeclined&&n.onDeclined(x),n.ignoreDeclined||(N=new Error("Aborted because of self decline: "+x.moduleId+S));break;case"declined":n.onDeclined&&n.onDeclined(x),n.ignoreDeclined||(N=new Error("Aborted because of declined dependency: "+x.moduleId+" in "+x.parentId+S));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(x),n.ignoreUnaccepted||(N=new Error("Aborted because "+u+" is not accepted"+S));break;case"accepted":n.onAccepted&&n.onAccepted(x),M=!0;break;case"disposed":n.onDisposed&&n.onDisposed(x),H=!0;break;default:throw new Error("Unexception type "+x.type)}if(N)return p("abort"),Promise.reject(N);if(M)for(u in w[u]=h[u],m(b,x.outdatedModules),x.outdatedDependencies)Object.prototype.hasOwnProperty.call(x.outdatedDependencies,u)&&(y[u]||(y[u]=[]),m(y[u],x.outdatedDependencies[u]));H&&(m(b,[x.moduleId]),w[u]=E)}var A,z=[];for(o=0;o<b.length;o++)u=b[o],I[u]&&I[u].hot._selfAccepted&&w[u]!==E&&!I[u].hot._selfInvalidated&&z.push({module:u,parents:I[u].parents.slice(),errorHandler:I[u].hot._selfAccepted});p("dispose"),Object.keys(O).forEach((function(e){!1===O[e]&&function(e){delete P[e]}(e)}));var q,R,L=b.slice();for(;L.length>0;)if(u=L.pop(),d=I[u]){var U={},T=d.hot._disposeHandlers;for(s=0;s<T.length;s++)(r=T[s])(U);for(i[u]=U,d.hot.active=!1,delete I[u],delete y[u],s=0;s<d.children.length;s++){var X=I[d.children[s]];X&&((A=X.parents.indexOf(u))>=0&&X.parents.splice(A,1))}}for(u in y)if(Object.prototype.hasOwnProperty.call(y,u)&&(d=I[u]))for(R=y[u],s=0;s<R.length;s++)q=R[s],(A=d.children.indexOf(q))>=0&&d.children.splice(A,1);p("apply"),void 0!==v&&(c=v,v=void 0);for(u in h=void 0,w)Object.prototype.hasOwnProperty.call(w,u)&&(e[u]=w[u]);var V=null;for(u in y)if(Object.prototype.hasOwnProperty.call(y,u)&&(d=I[u])){R=y[u];var B=[];for(o=0;o<R.length;o++)if(q=R[o],r=d.hot._acceptedDependencies[q]){if(-1!==B.indexOf(r))continue;B.push(r)}for(o=0;o<B.length;o++){r=B[o];try{r(R)}catch(e){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:u,dependencyId:R[o],error:e}),n.ignoreErrored||V||(V=e)}}}for(o=0;o<z.length;o++){var C=z[o];u=C.module,l=C.parents,a=u;try{k(u)}catch(e){if("function"==typeof C.errorHandler)try{C.errorHandler(e)}catch(t){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:u,error:t,originalError:e}),n.ignoreErrored||V||(V=t),V||(V=e)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:u,error:e}),n.ignoreErrored||V||(V=e)}}if(V)return p("fail"),Promise.reject(V);if(g)return t(n).then((function(e){return b.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e}));return p("idle"),new Promise((function(e){e(b)}))}(t=t||{})}function D(){if(g)return h||(h={}),g.forEach(H),g=void 0,!0}function H(t){Object.prototype.hasOwnProperty.call(h,t)||(h[t]=e[t])}var I={},P={2:0},S=[];function k(t){if(I[t])return I[t].exports;var n=I[t]={i:t,l:!1,exports:{},hot:d(t),parents:(s=l,l=[],s),children:[]};return e[t].call(n.exports,n,n.exports,function(e){var t=I[e];if(!t)return k;var n=function(n){return t.hot.active?(I[n]?-1===I[n].parents.indexOf(e)&&I[n].parents.push(e):(l=[e],a=n),-1===t.children.indexOf(n)&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),l=[]),k(n)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return k[e]},set:function(t){k[e]=t}}};for(var o in k)Object.prototype.hasOwnProperty.call(k,o)&&"e"!==o&&"t"!==o&&Object.defineProperty(n,o,r(o));return n.e=function(e){return"ready"===f&&p("prepare"),b++,k.e(e).then(t,(function(e){throw t(),e}));function t(){b--,"prepare"===f&&(w[e]||x(e),0===b&&0===y&&N())}},n.t=function(e,t){return 1&t&&(e=n(e)),k.t(e,-2&t)},n}(t)),n.l=!0,n.exports}k.m=e,k.c=I,k.d=function(e,t,n){k.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},k.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},k.t=function(e,t){if(1&t&&(e=k(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(k.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)k.d(n,r,function(t){return e[t]}.bind(null,r));return n},k.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return k.d(t,"a",t),t},k.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},k.p="",k.h=function(){return c};var A=window.webpackJsonp=window.webpackJsonp||[],z=A.push.bind(A);A.push=t,A=A.slice();for(var q=0;q<A.length;q++)t(A[q]);var R=z;S.push([94,0]),n()}({1:function(e,t,n){"use strict";n.d(t,"e",(function(){return c})),n.d(t,"a",(function(){return i})),n.d(t,"d",(function(){return l})),n.d(t,"b",(function(){return s})),n.d(t,"f",(function(){return d})),n.d(t,"c",(function(){return u}));var r=n(2),a=n.n(r),o=n(3),c=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=new FormData;return"undefined"!=typeof user&&r.append("user_modified",user.username),Object.keys(t).map((function(e){r.append(e,t[e])})),window.Pace.restart(),a.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",a.a.post(e,r,n)},i=function(e){return window.Pace.restart(),a.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",a.a.get(e)},l=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2e3;o.Store.addNotification({title:e?"Succeed":"Warning",message:t,type:e?"success":"warning",insert:"top",container:"top-right",animationIn:["animated","bounceIn"],animationOut:["animated","bounceOut"],dismiss:{duration:n,onScreen:!0}})},s=function(e){for(var t,n=/<img.*?src="(.*?)"[^>]+>/g,r=[];t=n.exec(e);)r.push(t[1]);return r.length>0?r[0]:""},d=function(e){return{1:"Administrator",2:"Member"}[e]},u=function(e){return Math.abs(e)>999?Math.sign(e)*(Math.abs(e)/1e3).toFixed(1)+"k":Math.sign(e)*Math.abs(e)}},94:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(5),c=n.n(o),i=n(12),l=n(11),s=n(7),d=n(3),u=n(1),f=n(17),p=n(15),m=n.n(p);function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,a,o=[],c=!0,i=!1;try{for(n=n.call(e);!(c=(r=n.next()).done)&&(o.push(r.value),!t||o.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==n.return||n.return()}finally{if(i)throw a}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var g=function(){var e=h(Object(r.useState)(!0),2),t=e[0],n=e[1],o=h(Object(r.useState)(!1),2),c=o[0],p=o[1],v=h(Object(r.useState)(!0),2),g=v[0],y=v[1],b=h(Object(r.useState)([]),2),w=b[0],E=b[1],O=h(Object(r.useState)(0),2),j=O[0],_=O[1],x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;e>0?p(!0):n(!0),Object(u.a)("/blog/getdata?page=".concat(e)).then((function(e){var t=e.data;t.length>5?y(!0):y(!1),E((function(e){return e.concat(t)})),_((function(e){return e+1}))})).catch((function(e){void 0!==e.response.data.message?Object(u.d)(!1,e.response.data.message):Object(u.d)(!1,e.response.statusText)})).then((function(){n(!1),p(!1)}))};return Object(r.useEffect)((function(){return x(),function(){}}),[]),a.a.createElement(a.a.Fragment,null,a.a.createElement(d.ReactNotifications,null),a.a.createElement("main",{className:"mt-100 mb-100"},a.a.createElement(i.a,{fluid:!1},a.a.createElement("div",{className:"main"},a.a.createElement(l.a,null,a.a.createElement(s.a,{lg:12,sm:12,className:"pr-5 pr-sm-0 pl-sm-0"},a.a.createElement(i.a,{fluid:!1},a.a.createElement(l.a,null,function(){if(t){for(var e=[],n=0;n<3;n++)e.push(a.a.createElement(s.a,{lg:4,md:4,sm:12,key:n},a.a.createElement("div",{className:"blog has_style_grid"},a.a.createElement(l.a,{className:"align-items-center"},a.a.createElement(s.a,{xs:12,className:"col-row"},a.a.createElement("div",{className:"blog-img placeholder",style:{height:200}})),a.a.createElement(s.a,{xs:12,className:"col-row"},a.a.createElement("div",{className:"blog-wrap"},a.a.createElement("h3",{className:"blog-title placeholder",style:{height:20}}),a.a.createElement("p",{className:"blog-excerpt placeholder",style:{height:100}}),a.a.createElement("div",{className:"blog-author-detail d-flex justify-content-between align-items-center placeholder",style:{height:40}})))))));return e}var r=[];return w.map((function(e,t){r.push(a.a.createElement(s.a,{lg:4,md:4,sm:12,key:t},a.a.createElement("div",{className:"blog has_style_grid"},a.a.createElement(l.a,{className:"align-items-center"},a.a.createElement(s.a,{xs:12,className:"col-row"},a.a.createElement("div",{className:"blog-img"},a.a.createElement("div",{className:"meta absolute"},a.a.createElement("a",{href:"#",className:"comments meta-info mobile"},a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"},a.a.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),a.a.createElement("path",{d:"M14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L11.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L14.6 8zM7 10.588V19h11.16L21 12.104V10h-6.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-4.71 6.672c-.25.354-.57.644-.933.858zM5 11H3v8h2v-8z"}))," ",e.likes),a.a.createElement("span",{className:"views-counter meta-info mobile comments"},a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"},a.a.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),a.a.createElement("path",{d:"M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"}))," ",e.views),a.a.createElement("div",{className:"min-read meta-info",title:"3 Min Read"},a.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24",height:"24"},a.a.createElement("path",{fill:"none",d:"M0 0h24v24H0z"}),a.a.createElement("path",{d:"M13.12 17.023l-4.199-2.29a4 4 0 1 1 0-5.465l4.2-2.29a4 4 0 1 1 .959 1.755l-4.2 2.29a4.008 4.008 0 0 1 0 1.954l4.199 2.29a4 4 0 1 1-.959 1.755zM6 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm11-6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"}))," ",e.share)),function(){if(Object(u.b)(m()("".concat(e.content))))return a.a.createElement("img",{src:Object(u.b)(m()("".concat(e.content))),alt:e.title,loading:"lazy"})}())),a.a.createElement(s.a,{xs:12,className:"col-row"},a.a.createElement("div",{className:"blog-wrap"},a.a.createElement("h3",{className:"blog-title"},a.a.createElement("a",{href:"/blog/".concat(e.slug)},e.title)),a.a.createElement("p",{className:"blog-excerpt"},Object(f.a)(m()("".concat(e.content)).toString().replace(/(<([^>]+)>)/gi,""))),a.a.createElement("div",{className:"blog-author-detail d-flex justify-content-between align-items-center"},a.a.createElement("div",{className:"c-customer-review-meta d-flex justify-content-start align-items-center"},a.a.createElement("div",{className:"user"},a.a.createElement("img",{src:"/assets/images/".concat(e.avatar),alt:e.display_name,className:"avatar avatar-sm rounded-circle",loading:"lazy"})),a.a.createElement("div",{className:"meta pl-20"},a.a.createElement("p",{className:"name"},e.display_name),a.a.createElement("p",{className:"author-post"},"Verified writer"))),a.a.createElement("span",{className:"font-semibold text-gray"},e.tgl_posting))))))))})),r}()),g?a.a.createElement("div",{className:"d-flex justify-content-center pt-30"},a.a.createElement("a",{href:"#",className:"btn btn-sm btn-white",onClick:function(e){e.preventDefault(),x(j)}},a.a.createElement("i",{className:"ri-restart-line"}),c?"Loading...":"View more blogs")):a.a.createElement(a.a.Fragment,null))))))))};c.a.render(a.a.createElement(g,null),document.getElementById("root"))}});