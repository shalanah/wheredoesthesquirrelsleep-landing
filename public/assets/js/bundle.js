!function(t){function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};n.m=t,n.c=e,n.i=function(t){return t},n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=4)}([function(t,n,e){"use strict";var i=function(){window.onload=function(){document.body.classList.add("loaded")}};t.exports=i},function(t,n,e){"use strict";var i=function(){var t=window.innerWidth,n=window.innerHeight,e=document.body.className;n>t?-1===e.indexOf("vertical")&&(document.body.className="vertical "+e):-1!==e.indexOf("vertical")&&(document.body.className=e.replace("vertical ",""))},o=function(){i(),window.addEventListener("resize",function(){i()})};t.exports=o},function(t,n,e){"use strict";var i=function(t){var n=window.innerWidth,e=window.innerHeight;return t.width=n,t.height=e,{width:n,height:e}},o=function(t,n){return Math.floor(Math.random()*(n-t+1)+t)},r=function(t){var n=t.width,e=t.height,i=t.density;return Math.round(n*e*i)},a=function(t){window.requestAnimFrame=function(t){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/30)}}();var n=function(t){var n=(t.id,t.cx),e=t.cy,i=t.radius,o=t.opacity;return c.beginPath(),c.clearRect(n-i-1,e-i-1,2*i+2,2*i+2),c.closePath(),c.beginPath(),c.arc(n,e,i,0,2*Math.PI,!1),c.fillStyle="rgba(111,168,207,"+o+")",c.fill(),{cx:n,cy:e,radius:i,opacity:o}},e=function(t){var n=t.opacity,e=t.increase,i=t.step,o=t.opacityMin,r=t.opacityMax;return e?n>r-i?(e=!1,n-=i):n+=i:n<o+i?(e=!0,n+=i):n-=i,{opacity:n,increase:e}},a=function(t){for(var e=t.width,i=t.height,a=t.density,c=[],u=r({width:e,height:i,density:a}),d=0;d<u;d++)c.push(n({cx:o(0,e),cy:o(0,i),radius:Math.max(o(0,3),1),opacity:Math.max(Math.random(),.1)}));return c},c=t.getContext("2d"),u=i(t),d=u.width,s=u.height,h=a({width:d,height:s,density:3e-4});!function t(i){for(var r=i.percent,a=i.step,c=i.opacityMin,u=i.opacityMax,d=0,s=Math.floor(h.length*r);d<s;d++){var f=h[d],w=f.opacity,p=void 0!==f.increase?f.increase:1===o(0,1);h[d]=Object.assign({},n(f),e({opacity:w,increase:p,step:a,opacityMin:c,opacityMax:u}))}window.requestAnimFrame(function(){t({percent:r,step:a,opacityMin:c,opacityMax:u})})}({percent:.75,step:.027,opacityMin:0,opacityMax:1}),window.addEventListener("resize",function(){var n=i(t),e=n.width,o=n.height;(e>d||o>s)&&(s=o,d=e,h=[],c.clearRect(0,0,d,s),h=a({width:d,height:s,density:3e-4}))})};t.exports=a},function(t,n){},function(t,n,e){"use strict";e(3);var i=e(0),o=e(2),r=e(1);o(document.getElementById("bg")),i(),r()}]);