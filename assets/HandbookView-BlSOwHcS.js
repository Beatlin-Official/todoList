import{r as d,b as m,d as M,c as o,a as l,w as N,v as q,F as b,e as y,f as v,g as c,u as p,o as s,h as w,I as k,n as S,t as C,i as $,j as D}from"./index-DQgPe6JO.js";const T={id:"inputBox"},j={id:"cardsBox"},z={id:"cardList"},F={key:0},H={id:"pageBox",class:"flex"},R={id:"pageList"},U=["onClick"],g=15,J={__name:"HandbookView",setup(E){const r=d(null),h=d([]),f=d({}),a=d(1),x=m(()=>P()),P=()=>r.value==""||r.value==null?h.value:(a.value=1,h.value.filter(n=>n.name.includes(r.value))),_=m(()=>{const n=(a.value-1)*g,t=n+g;return x.value.slice(n,t)}),u=m(()=>Math.ceil(x.value.length/g)),I=m(()=>{const n=[],t=Math.max(1,a.value-2),i=Math.min(u.value,a.value+2);for(let e=t;e<=i;e++)n.push(e);return n}),B=n=>{a.value=n},L=()=>{a.value>1&&a.value--},V=()=>{a.value<u.value&&a.value++};return M(()=>{fetch("https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0").then(n=>n.json()).then(n=>{h.value=n.results,f.value=n.results.reduce((t,i,e)=>t={...t,[i.name]:e+1},{})})}),(n,t)=>{const i=$("RouterLink");return s(),o("main",null,[t[4]||(t[4]=l("h1",{class:"subtitle"},"Handbook",-1)),l("div",T,[N(l("input",{type:"text",placeholder:"Search Pokemon's name","onUpdate:modelValue":t[0]||(t[0]=e=>r.value=e),class:"text-gray-500"},null,512),[[q,r.value]])]),l("div",j,[l("div",z,[(s(!0),o(b,null,y(_.value,e=>(s(),o("div",{id:"cardItem",key:e.idx},[c(i,{to:`/handbook/${f.value[e.name]}`},{default:w(()=>[D(C(e.name),1)]),_:2},1032,["to"])]))),128)),_.value.length==0?(s(),o("div",F,t[3]||(t[3]=[l("p",null,"Please Search again",-1)]))):v("",!0)])]),l("div",H,[a.value!==1?(s(),o("button",{key:0,onClick:t[1]||(t[1]=e=>a.value=1)},[c(p(k),{icon:"tabler:square-chevrons-left"})])):v("",!0),a.value!==1?(s(),o("button",{key:1,onClick:L},[c(p(k),{icon:"tabler:square-chevron-left"})])):v("",!0),l("div",R,[(s(!0),o(b,null,y(I.value,e=>(s(),o("button",{id:"pageItem",key:e,onClick:A=>B(e),class:S([{current:e===a.value},"px-3"])},C(e),11,U))),128))]),a.value!==u.value&&u.value!==0?(s(),o("button",{key:2,onClick:V},[c(p(k),{icon:"tabler:square-chevron-right"})])):v("",!0),a.value!==u.value&&u.value!==0?(s(),o("button",{key:3,onClick:t[2]||(t[2]=e=>a.value=u.value)},[c(p(k),{icon:"tabler:square-chevrons-right"})])):v("",!0)])])}}};export{J as default};