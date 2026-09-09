import{q as a}from"./index-CocPCZxW.js";/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var n=a("outline","player-play","IconPlayerPlay",[["path",{d:"M7 4v16l13 -8z",key:"svg-0"}]]);const l=[{value:"all",label:"All"},{value:"Assigned",label:"Not Started"},{value:"In Progress",label:"In progress"},{value:"Completed",label:"Completed"}],s=(e,t)=>t&&e!=="Completed"?"red":e==="Completed"?"teal":e==="In Progress"?"blue":"gray",u=e=>e==="Assigned"?"Not started":e||"Not started",i=e=>{if(!e)return"No due date";const t=new Date(e);return isNaN(t.getTime())?"No due date":t.toLocaleDateString(void 0,{month:"short",day:"numeric",year:"numeric"})},d=e=>{if(!e)return null;const t=new Date(e);if(isNaN(t.getTime()))return null;const r=new Date;return r.setHours(0,0,0,0),t.setHours(0,0,0,0),Math.round((t.getTime()-r.getTime())/864e5)};export{l as C,n as I,s as a,d,i as f,u as s};
