(()=>{"use strict";let e,t,n,l,o,a,c,i,d,r,s,m,u=[["default",[]]],y=[],g=document.createElement("div"),p=[];function f(e,t,n,l){null==e&&(t=JSON.stringify(n),localStorage.setItem(l,t))}function E(){let e=new Date,t=[];remembrall.style.color="rgba(0, 89, 255, 0.815)";for(let e=0;e<d.length;e++)for(let n=0;n<d[e][1].length;n++)""!=d[e][1][n].date&&t.push(new Date(d[e][1][n].date));0==t.every((function(t){return t.getTime()+72e4*t.getTimezoneOffset()>=e.getTime()}))&&(remembrall.style.color="red")}function h(){m.sort(((e,t)=>new Date(e.date).getTime()-new Date(t.date).getTime())),d.forEach((e=>e[1].sort(((e,t)=>new Date(e.date).getTime()-new Date(t.date).getTime()))))}document.addEventListener("click",(()=>{e=JSON.stringify(d),t=JSON.stringify(r),l=JSON.stringify(s),n=JSON.stringify(m),localStorage.setItem("classArray",e),localStorage.setItem("categoryNames",t),localStorage.setItem("allToDos",n),localStorage.setItem("toDoId",l)}));class v{constructor(e,t,n,l,o){this.title=e,this.description=t,this.category=n,this.date=l,this.id=o}}function C(e){let t=!0,n=document.createElement("div");if(n.classList.add("toDoItems"),""!=e.title){let l=document.createElement("div");l.classList.add("toDoButtons"),n.appendChild(l),toDoList.appendChild(n);let o=document.createElement("button"),a="✓";o.classList.add("completeButton"),o.textContent=a,l.appendChild(o);let c=document.createElement("div");c.textContent=e.title,n.appendChild(c);let i=document.createElement("button");i.classList.add("detailsButton"),i.textContent="Show More",l.append(i);let r=document.createElement("div");if(""!=e.date){let t=document.createElement("div");t.textContent="Due Date: "+e.date,r.appendChild(t)}if("default"!=e.category){let t=document.createElement("div");t.textContent="Category: "+e.category,r.appendChild(t)}if(""!=e.description){let t=document.createElement("div");t.textContent="Description: "+e.description,r.appendChild(t)}i.addEventListener("click",(()=>{1==t?(t=!1,i.textContent="Show Less",n.appendChild(r)):0==t&&(t=!0,i.textContent="Show More",n.removeChild(r))})),o.addEventListener("click",(()=>{var t,l;console.log(d),l=e,(t=n).addEventListener("click",(()=>{t.innerHTML="",t.style.display="flex",t.style.justifyContent="space-evenly";let e=document.createElement("div");e.innerHTML="Task Completed?",t.appendChild(e);let n=document.createElement("button");n.textContent="Yes",t.appendChild(n);let o=document.createElement("button");o.textContent="No",t.appendChild(o),n.addEventListener("click",(()=>{t.remove(),d.forEach((e=>e[1].forEach((t=>function(e,t){if(console.log(d),t.id==l.id){console.log(e.indexOf(t));let n=e.indexOf(t);e.splice(n,1),w()}}(e[1],t))))),E()})),o.addEventListener("click",(()=>{M()}))}))}))}}function L(e){let t=document.createElement("div");t.classList.add("categoryItems"),t.style.justifyContent="space-between",catList.appendChild(t);let n=document.createElement("div");if(n.classList.add("categoryNames"),n.textContent=e,t.appendChild(n),"default"!=e){let n=document.createElement("button");n.classList.add("categoryRemove"),n.textContent="-",t.appendChild(n),n.addEventListener("click",(()=>{var n,l;l=e,(n=t).addEventListener("click",(()=>{n.innerHTML="",n.style.display="flex",n.style.justifyContent="space-evenly";let e=document.createElement("div");e.innerHTML="Remove Category?",n.appendChild(e);let t=document.createElement("button");t.textContent="Yes",n.appendChild(t);let o=document.createElement("button");o.textContent="No",n.appendChild(o),t.addEventListener("click",(()=>{n.remove();for(let e=0;e<d.length;e++)d[e][0]==l&&(d.splice(e,1),catList.innerHTML="",toDoList.innerHTML="",d.forEach((e=>e[1].forEach((e=>C(e))))),x()),E()})),o.addEventListener("click",(()=>{catList.innerHTML="",x()}))}))}))}n.addEventListener("click",(()=>{k();for(let t=0;t<d.length;t++)d[t][0]==e&&(toDoList.innerHTML="",d[t][1].forEach((e=>C(e))))}))}function S(e){let t=document.createElement("option");t.classList.value=e,t.textContent=e,itemClass.appendChild(t)}function T(){modal.style.display="none",categoryModal.style.display="none"}function D(){g.classList.add("categoryItems"),g.textContent="Show All",catList.prepend(g)}function I(){g.style.display="none"}function k(){g.style.display="block"}function x(){d.forEach((e=>L(e[0])))}function w(){m=[],d.forEach((e=>e[1].forEach((e=>m.push(e)))))}function M(){toDoList.innerHTML="",m.forEach((e=>C(e)))}!function(){let g=localStorage.getItem("classArray"),E=localStorage.getItem("categoryNames"),h=localStorage.getItem("allToDos"),v=localStorage.getItem("toDoId");f(g,e,u,"classArray"),f(E,t,y,"categoryNames"),f(h,n,p,"allToDos"),f(v,l,1,"toDoId"),o=JSON.parse(localStorage.getItem("classArray")),a=JSON.parse(localStorage.getItem("categoryNames")),c=JSON.parse(localStorage.getItem("allToDos")),i=JSON.parse(localStorage.getItem("toDoId")),d=o,r=a,s=i,m=c}(),document.querySelectorAll("div").forEach((e=>{document.getElementById("element")})),document.querySelectorAll("input").forEach((e=>{document.getElementById("element")})),document.querySelectorAll("button").forEach((e=>{document.getElementById("element")})),document.querySelectorAll("select").forEach((e=>{document.getElementById("element")})),formSubmit.addEventListener("click",(()=>{let e=new v(title.value,description.value,itemClass.value,date.value,s);if(""!=e.title)return d.forEach((t=>{e.category==t[0]&&t[1].push(e)})),w(),newForm.reset(),h(),M(),T(),E(),s++})),newToDo.addEventListener("click",(()=>{modal.style.display="inline"})),formCancel.addEventListener("click",(()=>{newForm.reset(),T()})),addCategory.addEventListener("click",(()=>{categoryModal.style.display="inline"})),categorySubmit.addEventListener("click",(()=>{if(""!=categoryTitle.value&&function(e){r=[];for(let e=0;e<d.length;e++){let t=d[e][0];r.push(t)}return r.every((t=>t!=e))}(categoryTitle.value)){let e=categoryTitle.value;d.push([e,[]])}else alert("Please Enter a Valid Category");newCategory.reset(),catList.innerHTML="",D(),I(),d.forEach((e=>L(e[0]))),itemClass.innerHTML="",d.forEach((e=>S(e[0]))),categoryModal.style.display="none"})),categoryCancel.addEventListener("click",(()=>{newCategory.reset(),T()})),T(),D(),k(),I(),g.addEventListener("click",(()=>{I(),h(),M(),T()})),E(),null!=m&&M(),null!=d&&(d.forEach((e=>L(e[0]))),d.forEach((e=>S(e[0]))))})();