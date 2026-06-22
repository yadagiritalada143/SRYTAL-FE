import{q as x,j as e,S as h,X as n,W as o,Z as m,T as i}from"./index--OtVQQkR.js";import{C as j}from"./CommonButton-Cdmeh3gv.js";/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var g=x("outline","inbox","IconInbox",[["path",{d:"M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M4 13h3l3 3h4l3 -3h3",key:"svg-1"}]]);const f=({isLoading:t,error:c,isEmpty:l,label:a="data",children:d,onRetry:s,minHeight:r="400px"})=>t?e.jsx(h,{label:`Loading ${a}...`,minHeight:r}):c?e.jsx(n,{h:r,w:"100%",children:e.jsxs(o,{align:"center",gap:"md",children:[e.jsx(m,{size:48,color:"red"}),e.jsxs(i,{size:"lg",fw:500,children:["Failed to load ",a]}),s&&e.jsx(j,{variant:"light",color:"blue",onClick:s,children:"Try Again"})]})}):l?e.jsx(n,{h:r,w:"100%",children:e.jsxs(o,{align:"center",gap:"sm",children:[e.jsx(g,{size:48,opacity:.3}),e.jsxs(i,{size:"lg",c:"dimmed",children:["No ",a," found"]})]})}):e.jsx(e.Fragment,{children:d});export{f as D};
