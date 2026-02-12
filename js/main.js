document.addEventListener("DOMContentLoaded",()=>{

const exercises=[
{ id:1,name:"Стойка на руках у стены",levels:[0,1,1,0,0,0,0]},
{ id:2,name:"Стойка на одной руке у стены",levels:[0,3,3,0,0,1,1]},
{ id:3,name:"Разворот 360°",levels:[0,2,2,1,0,2,2]},
{ id:4,name:"Стойка free",levels:[3,2,2,1,1,3,2]},
{ id:5,name:"Спичаг",levels:[3,3,1,1,3,3,2]},
{ id:6,name:"Star free",levels:[0,0,1,2,0,3,1]},
{ id:7,name:"Угол (2 кубика)",levels:[0,1,0,0,0,1,0]},
{ id:8,name:"Угол (1 кубик)",levels:[0,2,0,0,0,1,1]},
{ id:9,name:"Угол (пол)",levels:[0,3,0,0,0,1,2]},
{ id:10,name:"Заход в звезду",levels:[1,2,0,0,1,2,3]},
{ id:11,name:"Biceps stand",levels:[0,2,1,0,1,3,1]},
{ id:12,name:"Крокодил в biceps stand",levels:[0,2,2,3,3,0,1]},
{ id:13,name:"Needle",levels:[0,0,2,0,0,3,1]},
{ id:14,name:"Side star free",levels:[0,0,2,3,0,0,2]},
{ id:15,name:"Подъём полупальцы (колени)",levels:[2,0,0,0,0,0,0]},
{ id:16,name:"Подъём полупальцы (планка)",levels:[3,0,0,0,0,0,0]},
{ id:17,name:"Monolimb reverse star",levels:[0,1,2,1,1,3,2]},
{ id:18,name:"Планка 5 минут",levels:[0,1,2,0,3,0,0]},
{ id:19,name:"Baby H2H",levels:[2,2,1,0,0,3,2]},
{ id:20,name:"Уголок в Tucksit",levels:[2,2,1,1,3,0,1]}
];

function render(ids,blockId){
const container=document.querySelector(`#${blockId} .items`);
ids.forEach(id=>{
const ex=exercises.find(e=>e.id===id);
const label=document.createElement("label");
label.innerHTML=`<input type="checkbox" value="${id}"> ${id}. ${ex.name}`;
container.appendChild(label);
});
}

render([1,2,3,4,5,6],"block1");
render([7,8,9],"block2");
render([10,11,12,13,14,15,16],"block3");
render([17,18,19,20],"block4");

document.getElementById("flyer-form").addEventListener("submit",(e)=>{
e.preventDefault();

const checked=[...document.querySelectorAll("input:checked")].map(i=>parseInt(i.value));
const levels=[0,0,0,0,0,0,0];

checked.forEach(id=>{
const ex=exercises.find(e=>e.id===id);
ex.levels.forEach((lvl,i)=>{
if(lvl>levels[i]) levels[i]=lvl;
});
});

const active=levels.filter(l=>l>0).length;

let rank="❌ Разряд не присваивается";
let color="#FFFFFF";

if(active>=4){

if(active<7){
rank="III юношеский";
color="#FF0000";
}
else{

const min=Math.min(...levels);
const count3=levels.filter(l=>l===3).length;

if(count3===7){
rank="I взрослый";
color="#800080";
}
else if(min>=2){
if(count3>=4){
rank="II взрослый";
color="#0000FF";
}
else{
rank="III взрослый";
color="#00FF00";
}
}
else if(min===1){
rank="I юношеский";
color="#FFFF00";
}
}
}

generateResultHTML({
fullname:e.target.fullname.value,
city:e.target.city.value,
diploma:e.target.diploma.value,
rank,
color
});

});

});
