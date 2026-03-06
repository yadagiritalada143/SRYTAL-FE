import{j as a,P as x,V as n,S as t,T as i,s as g}from"./index-BLI_TH8X.js";import{c as o}from"./createReactComponent-HfB31U8m.js";/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var p=o("outline","alert-triangle","IconAlertTriangle",[["path",{d:"M12 9v4",key:"svg-0"}],["path",{d:"M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z",key:"svg-1"}],["path",{d:"M12 16h.01",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var j=o("outline","inbox","IconInbox",[["path",{d:"M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M4 13h3l3 3h4l3 -3h3",key:"svg-1"}]]);const v=({isLoading:l,error:c,isEmpty:d,label:e="data",children:h,onRetry:s,minHeight:r="400px"})=>l?a.jsx(x,{label:`Loading ${e}...`,minHeight:r}):c?a.jsx(n,{h:r,w:"100%",children:a.jsxs(t,{align:"center",gap:"md",children:[a.jsx(p,{size:48,color:"red"}),a.jsxs(i,{size:"lg",fw:500,children:["Failed to load ",e]}),s&&a.jsx(g,{variant:"light",color:"blue",onClick:s,children:"Try Again"})]})}):d?a.jsx(n,{h:r,w:"100%",children:a.jsxs(t,{align:"center",gap:"sm",children:[a.jsx(j,{size:48,opacity:.3}),a.jsxs(i,{size:"lg",c:"dimmed",children:["No ",e," found"]})]})}):a.jsx(a.Fragment,{children:h});export{v as D,p as I};
