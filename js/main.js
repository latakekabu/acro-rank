document.addEventListener("DOMContentLoaded", () => {

const exercises = [
1,2,3,4,5,6,7,8,9,10,
11,12,13,14,15,16,17,18,19,20
];

const blocks = {
block1: [1,2,3,4,5,6],
block2: [7,8,9],
block3: [10,11,12,13,14,15,16],
block4: [17,18,19,20]
};

/* ====== СОЗДАНИЕ ЧЕКБОКСОВ ====== */

Object.entries(blocks).forEach(([id,list])=>{
const container=document.querySelector(`#${id} .items`);
list.forEach(num=>{
const label=document.createElement("label");
label.innerHTML=`
<input type="checkbox" value="${num}">
${num}. Упражнение ${num}
`;
container.appendChild(label);
});
});

/* ====== SUBMIT ====== */

document.getElementById("flyer-form")
.addEventListener("submit",(e)=>{
e.preventDefault();

const fullname=e.target.fullname.value;
const city=e.target.city.value;
const diploma=e.target.diploma.value;

const checked=[...document.querySelectorAll("input[type='checkbox']:checked")];

const active=checked.length;

let rank="Разряд не присваивается";
let color="#FFFFFF";

if(active<4){
rank="Разряд не присваивается";
color="#FFFFFF";
}
else if(active<7){
rank="III юношеский";
color="#FF0000";
}
else{
rank="I юношеский";
color="#FFFF00";
}

generateResultHTML({
fullname,
city,
diploma,
rank,
color
});
});

/* ===== ADVANCED 3D ===== */

const allBlocks=document.querySelectorAll(".block");

allBlocks.forEach(block=>{
block.addEventListener("mousemove",(e)=>{
const rect=block.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;

block.style.setProperty("--x",x+"px");
block.style.setProperty("--y",y+"px");

const centerX=rect.width/2;
const centerY=rect.height/2;

const rotateX=((y-centerY)/centerY)*8;
const rotateY=((x-centerX)/centerX)*-8;

block.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

block.addEventListener("mouseleave",()=>{
block.style.transform="rotateX(0deg) rotateY(0deg)";
});
});

});
