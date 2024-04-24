import{A as g,r as c,u as _,a as C,b as F,c as $,d as P,e as L,f as A,g as B,j as e,L as H,$ as x,_ as b,T as q}from"./index-44600ca5.js";(function(){try{var s=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},t=new Error().stack;t&&(s._sentryDebugIds=s._sentryDebugIds||{},s._sentryDebugIds[t]="ddb7f38d-8af8-4e2f-afe9-0209ace8dab7",s._sentryDebugIdIdentifier="sentry-dbid-ddb7f38d-8af8-4e2f-afe9-0209ace8dab7")}catch{}})();const U=async(s,t)=>{const r=localStorage.getItem("authToken")??"";try{s({type:"FETCH_OPTIONS_DETAIL_REQUEST"});const a=await fetch(`${g}/election/question/${t}/addOptions`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});debugger;const i=await a.json();debugger;s({type:"FETCH_OPTIONS_DETAIL_SUCCESS",payload:i})}catch(a){console.log("Error fetching selected quetion Option:",a),s({type:"FETCH_OPTIONS_DETAIL_FAILURE",payload:"Unable to load selected Quetion Option"})}},z=async(s,t,r)=>{try{debugger;const a=localStorage.getItem("authToken")??"",i=await fetch(`${g}/election/question/${t}/addOptions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify(r)});debugger;const d=await i.json();if(!i.ok)throw new Error("Failed to create option for quetion "+t);return d.error?{ok:!1,error:d.error}:(s({type:"ADD_OPTION_SUCCESS",payload:d}),{ok:!0})}catch(a){return console.error("Operation failed:",a),{ok:!1,error:a}}},M=async(s,t)=>{try{const r=localStorage.getItem("authToken")??"";debugger;const a=await fetch(`${g}/election/option/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`}});if(!a.ok)throw new Error("Failed to delete option "+t);const i=await a.json();debugger;return i.error?{ok:!1,error:i.error}:i.success?(s({type:"DELETE_OPTION_SUCCESS",payload:t}),{ok:!0}):{ok:!1}}catch(r){return console.error("Operation failed:",r),{ok:!1,error:r}}},J=()=>{var v;let[s,t]=c.useState(!1);const[r,a]=c.useState(null),i=()=>t(!0),d=()=>t(!1),{register:T,handleSubmit:k,formState:{errors:y}}=_();let{electionID:u,quetionID:m}=C();const{t:o}=F();debugger;const E=$(),{electionDetail:f}=E,j=P(),O=L(),{optionsDetails:N,isLoading:D,isError:Q,errorMessage:R}=O,p=A();c.useEffect(()=>{u&&B(j,u),m&&U(p,m)},[m,p,u,j]);const l=(v=f==null?void 0:f.quetion.filter(n=>`${n==null?void 0:n.id}`===m))==null?void 0:v[0];if(D)return e.jsx(e.Fragment,{children:o("loading")});if(!l)return e.jsx("p",{className:"font-semibold text-center text-red-500",children:o("noSelectedQue")});const S=async n=>{console.log(n);const h=await M(p,n);console.log(h)},I=async n=>{const{optionName:h}=n,w=await z(p,l==null?void 0:l.id,{name:h,qid:l==null?void 0:l.id});debugger;w.ok?t(!1):a(w.error)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mx-auto mb-3",children:e.jsx(H,{to:`/account/election/${u}`,className:"rounded text-white bg-black text-sm inline px-2 py-2",children:o("gotoBallotPage")})}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h2",{className:"text-2xl mt-3 text-green-700 font-medium tracking-tight  dark:text-zinc-50",children:o("manageQuetion")}),e.jsx("button",{id:"newTaskBtn",onClick:i,className:"rounded-md bg-blue-600 px-4 py-2 m-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",children:o("newOptionButtonText")}),e.jsx(x,{appear:!0,show:s,as:c.Fragment,children:e.jsxs(b,{as:"div",className:"relative z-10",onClose:d,children:[e.jsx(x.Child,{as:c.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-25"})}),e.jsx("div",{className:"fixed inset-0 overflow-y-auto",children:e.jsx("div",{className:"flex min-h-full items-center justify-center p-4 text-center",children:e.jsx(x.Child,{as:c.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 scale-95",enterTo:"opacity-100 scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 scale-100",leaveTo:"opacity-0 scale-95",children:e.jsxs(b.Panel,{className:"w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all",children:[e.jsx(b.Title,{as:"h3",className:"text-lg font-medium leading-6 text-gray-900",children:o("NewQuetionModalHeader")}),e.jsx("div",{className:"mt-2",children:e.jsxs("form",{onSubmit:k(I),children:[r&&e.jsx("span",{className:"text-red-500",children:r}),e.jsx("input",{type:"text",id:"name",placeholder:o("newQueTitlePlaceHolder"),autoFocus:!0,...T("optionName",{required:!0}),className:`w-full border rounded-md py-2 px-3 my-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${y.optionName?"border-red-500":""}`}),y.optionName&&e.jsx("span",{className:"text-red-500",children:o("requiredNote")}),e.jsx("button",{type:"submit",id:"create-member-btn",className:"inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 mr-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",children:o("submitButtonText")}),e.jsx("button",{type:"submit",onClick:d,className:"inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",children:o("cancelButtonText")})]})})]})})})})]})})]}),e.jsxs("div",{children:[e.jsxs("h3",{className:"text-xl mt-3",children:[e.jsx("span",{className:"text-blue-700 font-sans font-bold",children:o("quetionTitleLable")}),l.title]}),e.jsxs("p",{className:"my-3 text-lg",children:[e.jsx("span",{className:"text-blue-700 font-sans font-bold text-md",children:o("quetionDescLable")}),l.description]})]}),N.options.length?e.jsxs("div",{className:"mt-5",children:[e.jsx("h3",{className:"text-xl font-bold my-3",children:o("listHeaderOption")}),e.jsx("div",{className:"grid gap-4 grid-cols-4 mt-5",children:N.options.map(n=>e.jsx("div",{className:"block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700",children:e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{children:e.jsxs("h5",{className:"mb-2 text-lg font-medium tracking-tight text-slate-700 dark:text-white",children:[e.jsxs("span",{className:"font-bold",children:[o("optionName")," : "]}),n.optionName]})}),e.jsx("button",{onClick:()=>{S(n.id)},children:e.jsx(q,{className:"h-8 w-8 text-red-600 hover:bg-red-500 hover:text-white border-red-600 border-2 hover:border-red-700 p-1 rounded-md transition duration-1200","aria-hidden":"true"})})]})},`${n.id}-${n.optionName}`))}),e.jsx("div",{})]}):e.jsx("p",{className:"text-red-500",children:o("noOptionadded")})]})};export{J as default};
//# sourceMappingURL=OptionsDetail-9022288b.js.map