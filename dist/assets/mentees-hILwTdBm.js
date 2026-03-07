import{j as a,X as I,w as T,e as o,D as z,S as m,G as h,V as f,Z as L,T as i}from"./index-DfnWq7xn.js";import{d as b}from"./styled-components.browser.esm-W9l6irbE.js";import{a as P}from"./button-YeGxM59q.js";import{T as D}from"./Title-BM81k4np.js";import{T as N}from"./TextInput-CNbc9Zqr.js";import{I as X}from"./IconSearch-BTbNcSvH.js";import{S as M}from"./SimpleGrid-DTQELfTj.js";import{C as B}from"./Card-BX8EQKL3.js";import{B as E}from"./Badge-GX8SSAgs.js";import{P as Y}from"./Pagination-Bjv3IWad.js";import"./api-client-BYwL8Kg8.js";import"./InputBase-CYMnu6N_.js";import"./Input-DXZIqHyS.js";import"./use-input-props-BJf518vS.js";import"./createReactComponent-DS3Akqs6.js";import"./get-base-value-BvcpHr4h.js";import"./create-event-handler-C3eq9ghx.js";import"./get-auto-contrast-value-Da6zqqWm.js";import"./use-uncontrolled-yFROsThf.js";const $=({children:r,styles:t})=>a.jsx(F,{children:a.jsx("button",{style:t==null?void 0:t.root,children:r})}),F=b.div`
  button {
    position: relative;
    padding: 7px 18px;
    border-radius: 18px;
    border: 1px solid rgb(61, 106, 255);
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 1px;
    background: transparent;
    color: #fff;
    overflow: hidden;
    box-shadow: 0 0 0 0 transparent;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
  }

  button:hover {
    background: rgb(61, 106, 255);
    box-shadow: 0 0 30px 5px rgba(0, 142, 236, 0.815);
    -webkit-transition: all 0.2s ease-out;
    -moz-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
  }

  button:hover::before {
    -webkit-animation: sh02 0.5s 0s linear;
    -moz-animation: sh02 0.5s 0s linear;
    animation: sh02 0.5s 0s linear;
  }

  button::before {
    content: '';
    display: block;
    width: 0px;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0%;
    opacity: 0;
    background: #fff;
    box-shadow: 0 0 50px 30px #fff;
    -webkit-transform: skewX(-20deg);
    -moz-transform: skewX(-20deg);
    -ms-transform: skewX(-20deg);
    -o-transform: skewX(-20deg);
    transform: skewX(-20deg);
  }

  @keyframes sh02 {
    from {
      opacity: 0;
      left: 0%;
    }
    50% {
      opacity: 1;
    }
    to {
      opacity: 0;
      left: 100%;
    }
  }

  button:active {
    box-shadow: 0 0 0 0 transparent;
    -webkit-transition: box-shadow 0.2s ease-in;
    -moz-transition: box-shadow 0.2s ease-in;
    transition: box-shadow 0.2s ease-in;
  }
`,W=({primaryText:r,onClick:t})=>a.jsx(R,{children:a.jsxs("button",{className:"button",onClick:t,children:[a.jsx("div",{className:"bg"}),a.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 342 208",height:208,width:342,className:"splash",children:[a.jsx("path",{strokeLinecap:"round",strokeWidth:3,d:"M54.1054 99.7837C54.1054 99.7837 40.0984 90.7874 26.6893 97.6362C13.2802 104.485 1.5 97.6362 1.5 97.6362"}),a.jsx("path",{strokeLinecap:"round",strokeWidth:3,d:"M285.273 99.7841C285.273 99.7841 299.28 90.7879 312.689 97.6367C326.098 104.486 340.105 95.4893 340.105 95.4893"})]}),a.jsxs("div",{className:"wrap",children:[a.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 221 42",height:42,width:221,className:"path",children:a.jsx("path",{strokeLinecap:"round",strokeWidth:3,d:"M182.674 2H203C211.837 2 219 9.16344 219 18V24C219 32.8366 211.837 40 203 40H18C9.16345 40 2 32.8366 2 24V18C2 9.16344 9.16344 2 18 2H47.8855"})}),a.jsx("div",{className:"outline"}),a.jsxs("div",{className:"content",children:[a.jsx("span",{className:"char state-1",children:r.split("").map((s,n)=>a.jsx("span",{"data-label":s,style:{"--i":n+1},children:s},n))}),a.jsx("div",{className:"icon",children:a.jsx("div",{})})]})]})]})}),R=b.div`
  .button {
    --white: #ffe7ff;
    --purple-100: #f4b1fd;
    --purple-200: #d190ff;
    --purple-300: #c389f2;
    --purple-400: #8e26e2;
    --purple-500: #5e2b83;
    --radius: 18px;

    border-radius: var(--radius);
    outline: none;
    cursor: pointer;
    font-size: 12.5px;
    font-family: Arial;
    background: transparent;
    border: 0;
    position: relative;
    width: 90px;
    height: 30px;
    border: 1px solid rgb(61, 106, 255);
    transform: rotate(360deg) skewX(0deg);
  }
  .wrap {
    border-radius: inherit;
    overflow: hidden;
    height: 100%;
    transform: translate(6px, -6px);
    padding: 3px;
    background: linear-gradient(
      to bottom,
      var(--purple-100) 0%,
      var(--purple-400) 100%
    );
    position: relative;
    transition: all 0.3s ease;
  }

  .outline {
    position: absolute;
    overflow: hidden;
    inset: 0;
    opacity: 0;
    outline: none;
    border-radius: inherit;
    transition: all 0.4s ease;
  }
  .content {
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    position: relative;
    height: 100%;
    gap: 10px;
    border-radius: calc(var(--radius) * 0.85);
    font-weight: 600;
    transition: all 0.3s ease;
    background: linear-gradient(
      to bottom,
      var(--purple-300) 0%,
      var(--purple-400) 100%
    );
    box-shadow:
      inset -2px 12px 11px -5px var(--purple-200),
      inset 1px -3px 11px 0px rgb(0 0 0 / 35%);
  }
  .content::before {
    content: '';
    inset: 0;
    position: absolute;
    z-index: 10;
    width: 80%;
    top: 45%;
    bottom: 35%;
    opacity: 0.7;
    margin: auto;
    background: linear-gradient(to bottom, transparent, var(--purple-400));
    filter: brightness(1.3) blur(5px);
  }

  .char {
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .char span {
    display: block;
    color: transparent;
    position: relative;
  }
  .char.state-1 span {
    animation: charAppear 1.2s ease backwards calc(var(--i) * 0.03s);
  }
  .char.state-1 span::before,
  .char span::after {
    content: attr(data-label);
    position: absolute;
    color: var(--white);
    text-shadow: -1px 1px 2px var(--purple-500);
    left: 0;
  }
  .char span::before {
    opacity: 0;
    transform: translateY(-100%);
  }
  .char.state-2 {
    position: absolute;
    left: 80px;
  }
  .char.state-2 span::after {
    opacity: 1;
  }

  .icon {
    animation: resetArrow 0.8s cubic-bezier(0.7, -0.5, 0.3, 1.2) forwards;
    z-index: 10;
  }
  .icon div,
  .icon div::before,
  .icon div::after {
    height: 3px;
    border-radius: 1px;
    background-color: var(--white);
  }
  .icon div::before,
  .icon div::after {
    content: '';
    position: absolute;
    right: 0;
    transform-origin: center right;
    width: 14px;
    border-radius: 15px;
    transition: all 0.3s ease;
  }
  .icon div {
    position: relative;
    width: 22px;
    box-shadow: -2px 2px 5px var(--purple-400);
    transform: scale(0.9);
    background: linear-gradient(to bottom, var(--white), var(--purple-100));
    animation: swingArrow 1s ease-in-out infinite;
    animation-play-state: paused;
  }
  .icon div::before {
    transform: rotate(44deg);
    top: 1px;
    box-shadow: 1px -2px 3px -1px var(--purple-400);
    animation: rotateArrowLine 1s linear infinite;
    animation-play-state: paused;
  }
  .icon div::after {
    bottom: 1px;
    transform: rotate(316deg);
    box-shadow: -2px 2px 3px 0 var(--purple-400);
    background: linear-gradient(200deg, var(--white), var(--purple-100));
    animation: rotateArrowLine2 1s linear infinite;
    animation-play-state: paused;
  }

  .path {
    position: absolute;
    z-index: 12;
    bottom: 0;
    left: 0;
    right: 0;
    stroke-dasharray: 150 480;
    stroke-dashoffset: 150;
    pointer-events: none;
  }

  .splash {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    stroke-dasharray: 60 60;
    stroke-dashoffset: 60;
    transform: translate(-17%, -31%);
    stroke: var(--purple-300);
  }

  /** STATES */

  .button:hover .words {
    opacity: 1;
  }
  .button:hover .words span {
    animation-play-state: running;
  }

  .button:hover .char.state-1 span::before {
    animation: charAppear 0.7s ease calc(var(--i) * 0.03s);
  }

  .button:hover .char.state-1 span::after {
    opacity: 1;
    animation: charDisappear 0.7s ease calc(var(--i) * 0.03s);
  }

  .button:hover .wrap {
    transform: translate(8px, -8px);
  }

  .button:hover .outline {
    opacity: 1;
  }

  .button:hover .outline::before,
  .button:hover .icon div::before,
  .button:hover .icon div::after,
  .button:hover .icon div {
    animation-play-state: running;
  }

  .button:active .bg::before {
    filter: blur(5px);
    opacity: 0.7;
    box-shadow:
      -7px 6px 0 0 rgb(115 75 155 / 40%),
      -14px 12px 0 0 rgb(115 75 155 / 25%),
      -21px 18px 4px 0 rgb(115 75 155 / 15%);
  }
  .button:active .content {
    box-shadow:
      inset -1px 12px 8px -5px rgba(71, 0, 137, 0.4),
      inset 0px -3px 8px 0px var(--purple-200);
  }

  .button:active .words,
  .button:active .outline {
    opacity: 0;
  }

  .button:active .wrap {
    transform: translate(3px, -3px);
  }

  .button:active .splash {
    animation: splash 0.8s cubic-bezier(0.3, 0, 0, 1) forwards 0.05s;
  }

  .button:focus .path {
    animation: path 1.6s ease forwards 0.2s;
  }

  .button:focus .icon {
    animation: arrow 1s cubic-bezier(0.7, -0.5, 0.3, 1.5) forwards;
  }

  .char.state-2 span::after,
  .button:focus .char.state-1 span {
    animation: charDisappear 0.5s ease forwards calc(var(--i) * 0.03s);
  }

  .button:focus .char.state-2 span::after {
    animation: charAppear 1s ease backwards calc(var(--i) * 0.03s);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes charAppear {
    0% {
      transform: translateY(50%);
      opacity: 0;
      filter: blur(20px);
    }
    20% {
      transform: translateY(70%);
      opacity: 1;
    }
    50% {
      transform: translateY(-15%);
      opacity: 1;
      filter: blur(0);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes charDisappear {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-70%);
      opacity: 0;
      filter: blur(3px);
    }
  }

  @keyframes arrow {
    0% {
      opacity: 1;
    }
    50% {
      transform: translateX(60px);
      opacity: 0;
    }
    51% {
      transform: translateX(-200px);
      opacity: 0;
    }
    100% {
      transform: translateX(-128px);
      opacity: 1;
    }
  }

  @keyframes swingArrow {
    50% {
      transform: translateX(5px) scale(0.9);
    }
  }

  @keyframes rotateArrowLine {
    50% {
      transform: rotate(30deg);
    }
    80% {
      transform: rotate(55deg);
    }
  }

  @keyframes rotateArrowLine2 {
    50% {
      transform: rotate(330deg);
    }
    80% {
      transform: rotate(300deg);
    }
  }

  @keyframes resetArrow {
    0% {
      transform: translateX(-128px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes path {
    from {
      stroke: white;
    }
    to {
      stroke-dashoffset: -480;
      stroke: #f9c6fe;
    }
  }

  @keyframes splash {
    to {
      stroke-dasharray: 2 60;
      stroke-dashoffset: -60;
    }
  }
`,G=[{empId:"SSIPL-007",name:"Sai Babu",email:"sai@gmail.com",joiningDate:"2025-04-25",totalTasksAssigned:3},{empId:"SSIPL-010",name:"Ravi Kumar",email:"ravi@gmail.com",joiningDate:"2025-05-01",totalTasksAssigned:2},{empId:"SSIPL-015",name:"Anitha",email:"anitha@gmail.com",joiningDate:"2025-06-15",totalTasksAssigned:5},{empId:"SSIPL-007",name:"Sai Babu",email:"sai@gmail.com",joiningDate:"2025-04-25",totalTasksAssigned:3},{empId:"SSIPL-010",name:"Ravi Kumar",email:"ravi@gmail.com",joiningDate:"2025-05-01",totalTasksAssigned:2},{empId:"SSIPL-015",name:"Anitha",email:"anitha@gmail.com",joiningDate:"2025-06-15",totalTasksAssigned:5},{empId:"SSIPL-007",name:"Sai Babu",email:"sai@gmail.com",joiningDate:"2025-04-25",totalTasksAssigned:3},{empId:"SSIPL-010",name:"Ravi Kumar",email:"ravi@gmail.com",joiningDate:"2025-05-01",totalTasksAssigned:2},{empId:"SSIPL-015",name:"Anitha",email:"anitha@gmail.com",joiningDate:"2025-06-15",totalTasksAssigned:5}],la=()=>{const r=I(),{themeConfig:t,organizationConfig:s}=T(),[n,g]=o.useState([]),[w,v]=o.useState(!0),[p,k]=o.useState(""),[l,x]=o.useState(1),y=z();o.useEffect(()=>{setTimeout(()=>{g(G),v(!1)},1e3)},[]);const d=n.filter(e=>e.name.toLowerCase().includes(p.toLowerCase())||e.empId.toLowerCase().includes(p.toLowerCase())),c=6,u=Math.ceil(d.length/c),j=d.slice((l-1)*c,l*c),S=l,A=x;return a.jsxs(m,{gap:24,px:"md",style:{color:t.button.textColor,fontFamily:r.fontFamily},children:[a.jsx(m,{align:"center",gap:9,mt:"lg",mb:"md",children:a.jsx(D,{className:"text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4",children:"Mentee Tasks Flow"})}),a.jsx(h,{justify:"space-between",align:"center",children:a.jsx(N,{placeholder:"Search by name or EMP ID ...",value:p,onChange:e=>{k(e.currentTarget.value),x(1)},leftSection:a.jsx(X,{size:18}),w:{base:"100%",sm:300},radius:"md",styles:{input:{backgroundColor:t.backgroundColor,color:t.color,borderColor:t.borderColor}}})}),w?a.jsx(f,{h:250,children:a.jsx(L,{size:"lg",type:"bars",color:t.button.color})}):a.jsx(a.Fragment,{children:d.length===0?a.jsx(f,{h:200,children:a.jsx(i,{fw:600,c:"dimmed",children:"No search results found"})}):a.jsxs(a.Fragment,{children:[a.jsx(M,{cols:{base:1,sm:2,md:3},spacing:"lg",mt:"md",children:j.map((e,C)=>a.jsxs(B,{shadow:"sm",radius:"md",withBorder:!0,p:"md",style:{backgroundColor:t.backgroundColor,color:t.color,border:`1px solid ${t.borderColor}`,transition:"transform 0.15s ease, box-shadow 0.15s ease",width:"100%"},className:"hover:shadow-lg hover:scale-[1.02] cursor-pointer",children:[a.jsxs(m,{gap:3,children:[a.jsxs(h,{gap:"3",justify:"space-between",w:"100%",children:[a.jsx(i,{fw:600,size:"sm",children:e.name}),a.jsx(E,{size:"sm",variant:"light",color:"blue",fw:500,children:e.empId})]}),a.jsxs(i,{size:"xs",c:"dimmed",children:["Email : ",e.email]}),a.jsxs(i,{size:"xs",c:"gray",children:["Joined : ",e.joiningDate]})]}),a.jsxs(h,{mt:"md",justify:"space-between",children:[a.jsxs($,{radius:"sm",children:[e.totalTasksAssigned," Tasks"]}),a.jsx(W,{primaryText:"Assign",onClick:()=>y(`${P(s.organization_name)}/dashboard/common/mentees/${e.empId}`),children:"Assign"})]})]},`${e.empId}-${C}`))}),u>1&&a.jsx(f,{className:"my-8",children:a.jsx(Y,{total:u,value:S,onChange:A,mt:"md",size:"md",radius:"md",styles:{control:{borderColor:t.borderColor}}})})]})})]})};export{la as default};
