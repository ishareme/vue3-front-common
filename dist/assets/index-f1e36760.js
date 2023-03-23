import{d as h,F as _,L as V,a as i,v as y,E as c,b as C,c as S}from"./validate-0e6a3b11.js";import{g as p,P,C as B,s as u,o as x,a as E,i as e,k as o,j as f,u as t,b as N,d as U,aa as w,l as F}from"./index-562e6ff2.js";const T={class:"relative h-screen bg-white dark:bg-zinc-800 text-center xl:bg-zinc-200"},q={class:"block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"},H=o("h3",{class:"hidden mb-2 font-semibold text-base text-main dark:text-zinc-300 xl:block"}," 注册账号 ",-1),I=o("div",{class:"pt-1 pb-3 leading-[0] text-right"},[o("a",{class:"inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300 cursor-pointer"},"去登录")],-1),L=o("div",{class:"text-center"},[o("a",{class:"text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-300",href:"#",target:"__black"},"注册即同意《注册协议》")],-1),R={class:"flex justify-around mt-4"},G={__name:"index",setup(j){const n=p(!1),g=()=>{},d=P(),m=B();h("validateConfirmPassword",S);const s=p({username:"",password:"",confirmPassword:""}),k=async()=>{n.value=!0;const r={username:s.value.username,password:s.value.password};try{await d.dispatch("user/register",{...r,...m.query}),await d.dispatch("user/login",{...r,loginType:w})}catch{await d.dispatch("user/login",{...r,loginType:w})}finally{n.value=!1}m.push("/")};return(r,a)=>{const v=u("HButton"),b=u("SvgIcon"),z=u("SliderCaptcha");return x(),E("div",T,[e(V),o("div",q,[H,e(t(_),{onSubmit:k},{default:f(()=>[e(t(i),{type:"text",class:"dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900",name:"username",placeholder:"用户名",autocomplete:"auto",rules:t(y),modelValue:s.value.username,"onUpdate:modelValue":a[0]||(a[0]=l=>s.value.username=l)},null,8,["rules","modelValue"]),e(t(c),{class:"text-sm text-red-600 block mt-0.5 text-left",name:"username"}),e(t(i),{type:"text",class:"dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900",name:"password",placeholder:"密码",autocomplete:"auto",rules:t(C),modelValue:s.value.password,"onUpdate:modelValue":a[1]||(a[1]=l=>s.value.password=l)},null,8,["rules","modelValue"]),e(t(c),{class:"text-sm text-red-600 block mt-0.5 text-left",name:"password"}),e(t(i),{type:"password",class:"dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:default:bg-zinc-900",name:"confirmPassword",placeholder:"确认密码",autocomplete:"auto",rules:"validateConfirmPassword:@password",modelValue:s.value.confirmPassword,"onUpdate:modelValue":a[2]||(a[2]=l=>s.value.confirmPassword=l)},null,8,["modelValue"]),e(t(c),{class:"text-sm text-red-600 block mt-0.5 text-left",name:"confirmPassword"}),I,L,e(v,{loading:n.value,class:"w-full dark:bg-zinc-900 xl:dark:text-zinc-800"},{default:f(()=>[F("立即注册")]),_:1},8,["loading"])]),_:1}),o("div",R,[e(b,{class:"w-4 cursor-pointer",name:"qq"}),e(b,{class:"w-4 cursor-pointer",name:"wexin"})])]),r.isSliderCaptchaVisible?(x(),N(z,{key:0,onClose:a[3]||(a[3]=l=>r.isSliderCaptchaVisible=!1),onSuccess:g})):U("",!0)])}}};export{G as default};