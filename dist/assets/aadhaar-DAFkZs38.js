const r=a=>a.replace(/\D/g,"").slice(0,12),s=a=>r(a??"").replace(/(\d{4})(?=\d)/g,"$1 ").trim();export{s as f,r as s};
