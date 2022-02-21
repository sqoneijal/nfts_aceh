!function(e){function t(t){for(var n,r,c=t[0],o=t[1],s=t[2],i=0,l=[];i<c.length;i++)r=c[i],Object.prototype.hasOwnProperty.call(D,r)&&D[r]&&l.push(D[r][0]),D[r]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);for(q&&q(t);l.length;)l.shift()();return A.push.apply(A,s||[]),a()}function a(){for(var e,t=0;t<A.length;t++){for(var a=A[t],n=!0,r=1;r<a.length;r++){var c=a[r];0!==D[c]&&(n=!1)}n&&(A.splice(t--,1),e=M(M.s=a[0]))}return e}var n=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!_[e]||!w[e])return;for(var a in w[e]=!1,t)Object.prototype.hasOwnProperty.call(t,a)&&(h[a]=t[a]);0==--g&&0===E&&j()}(e,t),n&&n(e,t)};var r,c=!0,o="0731c3d62fdbdc46949d",s={},i=[],l=[];function d(t){var a={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:r!==t,active:!0,accept:function(e,t){if(void 0===e)a._selfAccepted=!0;else if("function"==typeof e)a._selfAccepted=e;else if("object"==typeof e)for(var n=0;n<e.length;n++)a._acceptedDependencies[e[n]]=t||function(){};else a._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)a._selfDeclined=!0;else if("object"==typeof e)for(var t=0;t<e.length;t++)a._declinedDependencies[e[t]]=!0;else a._declinedDependencies[e]=!0},dispose:function(e){a._disposeHandlers.push(e)},addDisposeHandler:function(e){a._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=a._disposeHandlers.indexOf(e);t>=0&&a._disposeHandlers.splice(t,1)},invalidate:function(){switch(this._selfInvalidated=!0,m){case"idle":(h={})[t]=e[t],f("ready");break;case"ready":k(t);break;case"prepare":case"check":case"dispose":case"apply":(y=y||[]).push(t)}},check:O,apply:S,status:function(e){if(!e)return m;u.push(e)},addStatusHandler:function(e){u.push(e)},removeStatusHandler:function(e){var t=u.indexOf(e);t>=0&&u.splice(t,1)},data:s[t]};return r=void 0,a}var u=[],m="idle";function f(e){m=e;for(var t=0;t<u.length;t++)u[t].call(null,e)}var p,h,v,y,g=0,E=0,b={},w={},_={};function N(e){return+e+""===e?+e:e}function O(e){if("idle"!==m)throw new Error("check() is only allowed in idle status");return c=e,f("check"),(t=1e4,t=t||1e4,new Promise((function(e,a){if("undefined"==typeof XMLHttpRequest)return a(new Error("No browser support"));try{var n=new XMLHttpRequest,r=M.p+""+o+".hot-update.json";n.open("GET",r,!0),n.timeout=t,n.send(null)}catch(e){return a(e)}n.onreadystatechange=function(){if(4===n.readyState)if(0===n.status)a(new Error("Manifest request to "+r+" timed out."));else if(404===n.status)e();else if(200!==n.status&&304!==n.status)a(new Error("Manifest request to "+r+" failed."));else{try{var t=JSON.parse(n.responseText)}catch(e){return void a(e)}e(t)}}}))).then((function(e){if(!e)return f(P()?"ready":"idle"),null;w={},b={},_=e.c,v=e.h,f("prepare");var t=new Promise((function(e,t){p={resolve:e,reject:t}}));for(var a in h={},D)x(a);return"prepare"===m&&0===E&&0===g&&j(),t}));var t}function x(e){_[e]?(w[e]=!0,g++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=M.p+""+e+"."+o+".hot-update.js",document.head.appendChild(t)}(e)):b[e]=!0}function j(){f("ready");var e=p;if(p=null,e)if(c)Promise.resolve().then((function(){return S(c)})).then((function(t){e.resolve(t)}),(function(t){e.reject(t)}));else{var t=[];for(var a in h)Object.prototype.hasOwnProperty.call(h,a)&&t.push(N(a));e.resolve(t)}}function S(t){if("ready"!==m)throw new Error("apply() is only allowed in ready status");return function t(a){var n,c,l,d,u;function m(e){for(var t=[e],a={},n=t.map((function(e){return{chain:[e],id:e}}));n.length>0;){var r=n.pop(),c=r.id,o=r.chain;if((d=I[c])&&(!d.hot._selfAccepted||d.hot._selfInvalidated)){if(d.hot._selfDeclined)return{type:"self-declined",chain:o,moduleId:c};if(d.hot._main)return{type:"unaccepted",chain:o,moduleId:c};for(var s=0;s<d.parents.length;s++){var i=d.parents[s],l=I[i];if(l){if(l.hot._declinedDependencies[c])return{type:"declined",chain:o.concat([i]),moduleId:c,parentId:i};-1===t.indexOf(i)&&(l.hot._acceptedDependencies[c]?(a[i]||(a[i]=[]),p(a[i],[c])):(delete a[i],t.push(i),n.push({chain:o.concat([i]),id:i})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:a}}function p(e,t){for(var a=0;a<t.length;a++){var n=t[a];-1===e.indexOf(n)&&e.push(n)}}P();var g={},E=[],b={},w=function(){console.warn("[HMR] unexpected require("+x.moduleId+") to disposed module")};for(var O in h)if(Object.prototype.hasOwnProperty.call(h,O)){var x;u=N(O),x=h[O]?m(u):{type:"disposed",moduleId:O};var j=!1,S=!1,k=!1,A="";switch(x.chain&&(A="\nUpdate propagation: "+x.chain.join(" -> ")),x.type){case"self-declined":a.onDeclined&&a.onDeclined(x),a.ignoreDeclined||(j=new Error("Aborted because of self decline: "+x.moduleId+A));break;case"declined":a.onDeclined&&a.onDeclined(x),a.ignoreDeclined||(j=new Error("Aborted because of declined dependency: "+x.moduleId+" in "+x.parentId+A));break;case"unaccepted":a.onUnaccepted&&a.onUnaccepted(x),a.ignoreUnaccepted||(j=new Error("Aborted because "+u+" is not accepted"+A));break;case"accepted":a.onAccepted&&a.onAccepted(x),S=!0;break;case"disposed":a.onDisposed&&a.onDisposed(x),k=!0;break;default:throw new Error("Unexception type "+x.type)}if(j)return f("abort"),Promise.reject(j);if(S)for(u in b[u]=h[u],p(E,x.outdatedModules),x.outdatedDependencies)Object.prototype.hasOwnProperty.call(x.outdatedDependencies,u)&&(g[u]||(g[u]=[]),p(g[u],x.outdatedDependencies[u]));k&&(p(E,[x.moduleId]),b[u]=w)}var H,T=[];for(c=0;c<E.length;c++)u=E[c],I[u]&&I[u].hot._selfAccepted&&b[u]!==w&&!I[u].hot._selfInvalidated&&T.push({module:u,parents:I[u].parents.slice(),errorHandler:I[u].hot._selfAccepted});f("dispose"),Object.keys(_).forEach((function(e){!1===_[e]&&function(e){delete D[e]}(e)}));var F,q,R=E.slice();for(;R.length>0;)if(u=R.pop(),d=I[u]){var C={},L=d.hot._disposeHandlers;for(l=0;l<L.length;l++)(n=L[l])(C);for(s[u]=C,d.hot.active=!1,delete I[u],delete g[u],l=0;l<d.children.length;l++){var U=I[d.children[l]];U&&((H=U.parents.indexOf(u))>=0&&U.parents.splice(H,1))}}for(u in g)if(Object.prototype.hasOwnProperty.call(g,u)&&(d=I[u]))for(q=g[u],l=0;l<q.length;l++)F=q[l],(H=d.children.indexOf(F))>=0&&d.children.splice(H,1);f("apply"),void 0!==v&&(o=v,v=void 0);for(u in h=void 0,b)Object.prototype.hasOwnProperty.call(b,u)&&(e[u]=b[u]);var z=null;for(u in g)if(Object.prototype.hasOwnProperty.call(g,u)&&(d=I[u])){q=g[u];var V=[];for(c=0;c<q.length;c++)if(F=q[c],n=d.hot._acceptedDependencies[F]){if(-1!==V.indexOf(n))continue;V.push(n)}for(c=0;c<V.length;c++){n=V[c];try{n(q)}catch(e){a.onErrored&&a.onErrored({type:"accept-errored",moduleId:u,dependencyId:q[c],error:e}),a.ignoreErrored||z||(z=e)}}}for(c=0;c<T.length;c++){var X=T[c];u=X.module,i=X.parents,r=u;try{M(u)}catch(e){if("function"==typeof X.errorHandler)try{X.errorHandler(e)}catch(t){a.onErrored&&a.onErrored({type:"self-accept-error-handler-errored",moduleId:u,error:t,originalError:e}),a.ignoreErrored||z||(z=t),z||(z=e)}else a.onErrored&&a.onErrored({type:"self-accept-errored",moduleId:u,error:e}),a.ignoreErrored||z||(z=e)}}if(z)return f("fail"),Promise.reject(z);if(y)return t(a).then((function(e){return E.forEach((function(t){e.indexOf(t)<0&&e.push(t)})),e}));return f("idle"),new Promise((function(e){e(E)}))}(t=t||{})}function P(){if(y)return h||(h={}),y.forEach(k),y=void 0,!0}function k(t){Object.prototype.hasOwnProperty.call(h,t)||(h[t]=e[t])}var I={},D={11:0},A=[];function M(t){if(I[t])return I[t].exports;var a=I[t]={i:t,l:!1,exports:{},hot:d(t),parents:(l=i,i=[],l),children:[]};return e[t].call(a.exports,a,a.exports,function(e){var t=I[e];if(!t)return M;var a=function(a){return t.hot.active?(I[a]?-1===I[a].parents.indexOf(e)&&I[a].parents.push(e):(i=[e],r=a),-1===t.children.indexOf(a)&&t.children.push(a)):(console.warn("[HMR] unexpected require("+a+") from disposed module "+e),i=[]),M(a)},n=function(e){return{configurable:!0,enumerable:!0,get:function(){return M[e]},set:function(t){M[e]=t}}};for(var c in M)Object.prototype.hasOwnProperty.call(M,c)&&"e"!==c&&"t"!==c&&Object.defineProperty(a,c,n(c));return a.e=function(e){return"ready"===m&&f("prepare"),E++,M.e(e).then(t,(function(e){throw t(),e}));function t(){E--,"prepare"===m&&(b[e]||x(e),0===E&&0===g&&j())}},a.t=function(e,t){return 1&t&&(e=a(e)),M.t(e,-2&t)},a}(t)),a.l=!0,a.exports}M.m=e,M.c=I,M.d=function(e,t,a){M.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},M.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},M.t=function(e,t){if(1&t&&(e=M(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(M.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)M.d(a,n,function(t){return e[t]}.bind(null,n));return a},M.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return M.d(t,"a",t),t},M.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},M.p="",M.h=function(){return o};var H=window.webpackJsonp=window.webpackJsonp||[],T=H.push.bind(H);H.push=t,H=H.slice();for(var F=0;F<H.length;F++)t(H[F]);var q=T;A.push([97,0]),a()}({1:function(e,t,a){"use strict";a.d(t,"e",(function(){return o})),a.d(t,"a",(function(){return s})),a.d(t,"d",(function(){return i})),a.d(t,"b",(function(){return l})),a.d(t,"f",(function(){return d})),a.d(t,"c",(function(){return u}));var n=a(2),r=a.n(n),c=a(3),o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=new FormData;return"undefined"!=typeof user&&n.append("user_modified",user.username),Object.keys(t).map((function(e){n.append(e,t[e])})),window.Pace.restart(),r.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",r.a.post(e,n,a)},s=function(e){return window.Pace.restart(),r.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",r.a.get(e)},i=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2e3;c.Store.addNotification({title:e?"Succeed":"Warning",message:t,type:e?"success":"warning",insert:"top",container:"top-right",animationIn:["animated","bounceIn"],animationOut:["animated","bounceOut"],dismiss:{duration:a,onScreen:!0}})},l=function(e){for(var t,a=/<img.*?src="(.*?)"[^>]+>/g,n=[];t=a.exec(e);)n.push(t[1]);return n.length>0?n[0]:""},d=function(e){return{1:"Administrator",2:"Member"}[e]},u=function(e){return Math.abs(e)>999?Math.sign(e)*(Math.abs(e)/1e3).toFixed(1)+"k":Math.sign(e)*Math.abs(e)}},97:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(5),o=a.n(c),s=a(12),i=a(11),l=a(7),d=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"hero__1"},r.a.createElement(s.a,{fluid:!1},r.a.createElement(i.a,{className:"align-items-center"},r.a.createElement(l.a,{lg:6},r.a.createElement("div",{className:"hero__left space-y-20"},r.a.createElement("h1",{className:"hero__title"},"Discover digital art and collect NFTs Aceh"),r.a.createElement("p",{className:"hero__text txt"},"Aceh's NFTs are a shared community that used by some websites to provide to users best possible experience and share. Every income from the community to help build houses of worship, mosques, schools, and children who have lost their parents in Indonesia."),r.a.createElement("div",{className:"space-x-20 d-flex flex-column flex-md-row sm:space-y-20"},r.a.createElement("a",{className:"btn btn-primary",href:"/donation"},"Send your NFT for donation"),r.a.createElement("a",{className:"btn btn-white",href:"/creators"},"View Creators")))),r.a.createElement(l.a,{lg:6},r.a.createElement("img",{className:"img-fluid w-full",src:"/assets/images/in_hero1.png",alt:"",loading:"lazy"}))))))},u=a(1),m=a(3);function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,c=[],o=!0,s=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(c.push(n.value),!t||c.length!==t);o=!0);}catch(e){s=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(s)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var h=function(){var e=f(Object(n.useState)(!1),2),t=e[0],a=e[1],c=f(Object(n.useState)([]),2),o=c[0],i=c[1];return Object(n.useEffect)((function(){return a(!0),Object(u.a)("/home/topmember").then((function(e){var t=e.data;i(t)})).catch((function(e){void 0!==e.response.data.message?Object(u.d)(!1,e.response.data.message):Object(u.d)(!1,e.response.statusText)})).then((function(){a(!1)})).then((function(){new Swiper(".swiper_artists",{loop:!0,slidesPerView:3,spaceBetween:10,breakpoints:{320:{slidesPerView:1},768:{slidesPerView:2},1e3:{slidesPerView:4}},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}})})),function(){}}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(m.ReactNotifications,null),r.a.createElement(s.a,{fluid:!1},r.a.createElement("div",{className:"space-y-30"},r.a.createElement("div",{className:"section_head"},r.a.createElement("h2",{className:"section__title"},"Top Members")),r.a.createElement("div",{className:"section_body swiper_artists"},r.a.createElement("div",{className:"swiper-wrapper position-relative"},t?r.a.createElement("p",null,"Loading..."):o.map((function(e,t){return r.a.createElement("div",{className:"swiper-slide",key:t},r.a.createElement("div",{className:"creator_item creator_card rounded_border space-x-10"},r.a.createElement("div",{className:"avatars space-x-10"},r.a.createElement("div",{className:"media"},r.a.createElement("div",{className:"badge"},r.a.createElement("img",{src:"/assets/images/Badge.svg",alt:"badge",loading:"lazy"})),r.a.createElement("a",{href:"Profile.html"},r.a.createElement("img",{src:"/assets/images/".concat(e.avatar),alt:e.display_name,className:"avatar avatar-md"}))),r.a.createElement("div",null,r.a.createElement("a",{href:"Profile.html"},r.a.createElement("p",{className:"avatars_name color_black"},e.display_name)),r.a.createElement("span",{className:"price color_green"},Math.random().toFixed(2)," ETH")))))}))),r.a.createElement("div",{className:"swiper-pagination"}),r.a.createElement("div",{className:"swiper-button-prev"}),r.a.createElement("div",{className:"swiper-button-next"})))))};function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==a)return;var n,r,c=[],o=!0,s=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(c.push(n.value),!t||c.length!==t);o=!0);}catch(e){s=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(s)throw r}}return c}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return y(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return y(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var g=function(){var e=v(Object(n.useState)(!1),2),t=e[0],a=e[1],c=v(Object(n.useState)(!1),2),o=c[0],d=c[1],f=v(Object(n.useState)(!1),2),p=f[0],h=f[1],y=v(Object(n.useState)(!1),2),g=y[0],E=y[1],b=v(Object(n.useState)([]),2),w=b[0],_=b[1],N=v(Object(n.useState)([]),2),O=N[0],x=N[1],j=v(Object(n.useState)(0),2),S=j[0],P=j[1],k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;e>0?d(!0):a(!0),Object(u.a)("/home/getdaftarcreators?page=".concat(e)).then((function(t){var a=t.data;a.length>7?h(!0):h(!1),_(e>0?function(e){return e.concat(a)}:a),P(e+1)})).catch((function(e){void 0!==e.response.data.message?Object(u.d)(!1,e.response.data.message):Object(u.d)(!1,e.response.statusText)})).then((function(){a(!1),d(!1)}))};return Object(n.useEffect)((function(){return E(!0),Object(u.a)("/home/getdaftarkategori").then((function(e){var t=e.data;x(t)})).catch((function(e){void 0!==e.response.data.message?Object(u.d)(!1,e.response.data.message):Object(u.d)(!1,e.response.statusText)})).then((function(){E(!1)})),k(),function(){}}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(m.ReactNotifications,null),r.a.createElement("div",{className:"mt-100"},r.a.createElement(s.a,{fluid:!1},r.a.createElement("div",{className:"section__head"},r.a.createElement("div",{className:"d-md-flex sm:space-y-20 space-x-20 justify-content-between align-items-center"},r.a.createElement("h2",{className:"section__title text-center"},"Explore Creators & NFTs"),r.a.createElement("ul",{className:"menu_categories space-x-20"},g?r.a.createElement("li",null,"Loading..."):O.map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement("a",{href:"#",className:"color_brand"},r.a.createElement("i",{className:e.icon})," ",r.a.createElement("span",null,e.nama)))}))))),r.a.createElement(i.a,null,function(){if(t){for(var e=[],a=0;a<4;a++)e.push(r.a.createElement(l.a,{xl:3,lg:4,md:6,sm:6,key:a},r.a.createElement("div",{className:"card__item four"},r.a.createElement("div",{className:"card_body space-y-10"},r.a.createElement("div",{className:"creators space-x-10 placeholder",style:{height:20}}),r.a.createElement("div",{className:"card_head placeholder"}),r.a.createElement("h6",{className:"card_title placeholder",style:{height:20}}),r.a.createElement("div",{className:"card_footer d-block space-y-10 placeholder",style:{height:20}})))));return e}}(),w.map((function(e,t){return r.a.createElement(l.a,{xl:3,lg:4,md:6,sm:6,key:t},r.a.createElement("div",{className:"card__item four"},r.a.createElement("div",{className:"card_body space-y-10"},r.a.createElement("div",{className:"creators space-x-10"},r.a.createElement("div",{className:"avatars space-x-3"},r.a.createElement("a",{href:"/creators/detail/".concat(e.id)},r.a.createElement("img",{src:"/assets/images/".concat(e.avatar),alt:"Avatar",className:"avatar avatar-sm"})),r.a.createElement("a",{href:"/creators/detail/".concat(e.id)},r.a.createElement("p",{className:"avatars_name txt_xs"},e.display_name)))),r.a.createElement("div",{className:"card_head"},r.a.createElement("a",{href:"/itemdetail/".concat(e.id_nft)},r.a.createElement("img",{src:e.image,alt:e.title,loading:"lazy"})),r.a.createElement("a",{href:"#",className:"likes space-x-3"},r.a.createElement("i",{className:"ri-heart-3-fill"}),r.a.createElement("span",{className:"txt_sm"},(10*Math.random()).toFixed(2),"k"))),r.a.createElement("h6",{className:"card_title"},r.a.createElement("a",{className:"color_black",href:"/itemdetail/".concat(e.id_nft)},e.title)))))}))),p?r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("a",{href:"#",className:"btn btn-sm btn-white",onClick:function(e){e.preventDefault(),k(S)}},r.a.createElement("i",{className:"ri-restart-line"})," ",o?"Loading...":"View more Creators & NFTs")):"")))},E=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"call2action"},r.a.createElement(s.a,{fluid:!1},r.a.createElement(i.a,{className:"justify-content-between align-items-center sm:space-y-20"},r.a.createElement(l.a,{md:6},r.a.createElement("div",{className:"space-y-20"},r.a.createElement("h1",{className:"text-white"},"Start your own collection today"),r.a.createElement("p",{className:"color_text section__text"},"NFT Aceh is a shared community used by several creators in Indonesia to provide the best experience for users and enthusiasts of NFT assets."),r.a.createElement("a",{href:"/explorer",className:"btn btn-primary"},"Start Collecting"))),r.a.createElement("div",{className:"col-md-auto"},r.a.createElement("img",{className:"img-fluid img__logo",src:"/assets/images/Logo_illustrstion.png",alt:"Collection",loading:"lazy"}))))))},b=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,{fluid:!1,style:{marginBottom:100}},r.a.createElement("div",{className:"logos__wrap"},r.a.createElement("div",{className:"row align-items-center justify-content-between"},r.a.createElement(l.a,{md:12,className:"col-lg-auto"},r.a.createElement("h3",{className:"section__title md:mb-20 text-left d-flex justify-content-center"},"Loved by the community")),r.a.createElement(l.a,{md:12,className:"col-lg-auto"},r.a.createElement("div",{className:"d-flex flex-column flex-md-row justify-content-center space-x-20 sm:space-x-0 sm:space-y-20 align-items-center"},r.a.createElement("img",{src:"/assets/images/1.svg",alt:"",loading:"lazy"}),r.a.createElement("img",{src:"/assets/images/2.svg",alt:"",loading:"lazy"}),r.a.createElement("img",{src:"/assets/images/3.svg",alt:"",loading:"lazy"})))))))},w=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,null),r.a.createElement("div",{className:"section__artists mt-100"},r.a.createElement(h,null),r.a.createElement(g,null),r.a.createElement(E,null),r.a.createElement(b,null)))};o.a.render(r.a.createElement(w,null),document.getElementById("root"))}});