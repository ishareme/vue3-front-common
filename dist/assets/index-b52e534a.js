import{C as a,s as f,o as u,a as k,k as s,r as o,n as d,i as b}from"./index-562e6ff2.js";const h={class:"h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"},C={__name:"index",props:{sticky:{type:Boolean,default:!0},onLeftClick:{type:Function},onRightClick:{type:Function}},setup(l){const e=l,n=a(),c=()=>{if(e.onLeftClick){e.onLeftClick();return}else n.back()},i=()=>{e.onRightClick&&e.onRightClick()};return(t,m)=>{const r=f("SvgIcon");return u(),k("div",{class:d([[l.sticky?" sticky top-0 left-0":"relative"],"w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"])},[s("div",{class:"w-5 h-full absolute left-0 top-0 flex items-center justify-center cursor-pointer",onClick:c},[o(t.$slots,"left",{},()=>[b(r,{name:"back",class:"w-2 h-2",fillClass:"fill-zinc-900 dark:fill-zinc-200"})])]),s("div",h,[o(t.$slots,"default")]),s("div",{class:"w-5 h-full absolute right-0 flex items-center justify-center",onClick:i},[o(t.$slots,"right")])],2)}}};export{C as default};
