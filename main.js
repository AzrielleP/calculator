!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r=(()=>{const t=document.querySelector(".operation"),e=document.querySelector(".numbers"),n=document.querySelector(".outputEquation"),r=document.querySelector(".result");return{limitEquationLength:(n,r,o)=>{n.length>=20&&(e.removeEventListener("click",r,!1),t.removeEventListener("click",o,!1))},displayEquation:t=>{n.textContent=t},clearOutputEquation:()=>{n.textContent=""},clearResult:()=>{r.textContent=""},displayMathError:()=>{r.textContent="Math Error"},displaySyntaxError:()=>{r.textContent="Syntax Error"}}})();const o=document.querySelector(".result"),u=document.querySelector(".operation"),i=document.querySelector(".numbers"),l=document.querySelector(".deleteButton"),c=document.querySelector(".clearButton"),a=document.querySelector(".equalsButton");let s="";const d=()=>{s=s.slice(0,s.length-1),r.displayEquation(s)},p=()=>{r.displaySyntaxError(),r.clearOutputEquation(),s=""},f=(t,e,n)=>{const r=n.indexOf(t),o=n.indexOf(e);let u;return u=-1===r?o:-1===o?r:Math.min(r,o),n[u]},y=(t,e)=>{const n=[],r=t.indexOf(e),o=Number(t[r-1]),u=Number(t[r+1]);if(!isNaN(o)&&!isNaN(u))return n.push(t.splice(r-1,3,((t,e,n)=>{let r=0;if("+"===n)r=t+e;else if("-"===n)r=t-e;else if("x"===n)r=t*e;else if("/"===n){if(0===e)return"Error";r=t/e}return"number"==typeof r&&r.toString().length>7&&(r=r.toPrecision(7)),r})(o,u,e))),n;p()},m=t=>{const e=(t.length-1)/2;for(let n=0;n<e;n+=1)t.includes("x")||t.includes("/")?y(t,f("x","/",t)):(t.includes("+")||t.includes("-"))&&y(t,f("+","-",t));return t},E=t=>{r.limitEquationLength(s,E,g),t.target!==t.currentTarget&&(s+=t.target.textContent,r.displayEquation(s)),t.stopPropagation()},g=t=>{r.limitEquationLength(s,E,g),t.target!==t.currentTarget&&(/[+\-x/]/.test(s[s.length-1])&&d(),s+=t.target.textContent,r.displayEquation(s)),t.stopPropagation()};i.addEventListener("click",E),u.addEventListener("click",g),a.addEventListener("click",()=>{r.displayEquation(s);const t=(t=>{const e=t.split(/[+\-x/]/g),n=t.match(/[+\-x/]/g);let r=[];const o=[];for(let t=0;t<e.length;t+=1)r.push(e[t]),void 0!==n[t]&&r.push(n[t]);if("-"===t[0]&&(o.push(r.splice(0,3).join("")),r=o.concat(r)),!r.includes("")&&"."!==t[t.length-1])return r;p()})(s);"Error"===m(t)?(r.displayMathError(),r.clearOutputEquation(),s=""):o.textContent=m(t),""!==s&&(s=Number(m(t)))}),l.addEventListener("click",d),c.addEventListener("click",()=>{r.clearOutputEquation(),r.clearResult(),s=""})}]);