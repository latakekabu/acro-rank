function generateResultHTML(data){

const today=new Date().toLocaleDateString("ru-RU",{
  day:"numeric",
  month:"long",
  year:"numeric"
});

const html=`
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Результат — ${data.rank}</title>

<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>

<style>
body{
margin:0;
font-family:system-ui;
min-height:100dvh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#0f172a,#1e293b);
color:white;
perspective:1400px;
}

.card{
background:rgba(255,255,255,0.08);
backdrop-filter:blur(20px);
border-radius:30px;
padding:60px;
width:700px;
max-width:90%;
transform-style:preserve-3d;
transition:transform .3s ease;
box-shadow:0 40px 100px rgba(0,0,0,.6);
animation:fadeIn .6s ease;
}

@keyframes fadeIn{
from{opacity:0;transform:scale(.95);}
to{opacity:1;transform:scale(1);}
}

.logo{
width:120px;
margin:auto;
display:block;
margin-bottom:20px;
}

.rank{
font-size:56px;
font-weight:800;
color:${data.color};
text-shadow:0 0 25px ${data.color};
transform:translateZ(80px);
margin:20px 0;
}

.meta{
opacity:.85;
}

#map{
margin-top:40px;
width:100%;
height:350px;
border-radius:20px;
overflow:hidden;
}
</style>
</head>
<body>

<div class="card" id="card">
<img src="https://latakekabu.github.io/acro-rank/assets/img/acronavty.png" class="logo">

<p>Присвоен спортивный разряд:</p>
<div class="rank">${data.rank}</div>

<p>${data.fullname}</p>
<p>${data.city}</p>
<p class="meta">Дата присвоения: ${today}</p>

<p style="margin-top:20px;">Найдите свою базу — наслаждайтесь!</p>

<div id="map"></div>
</div>

<script>
const card=document.getElementById("card");

card.addEventListener("mousemove",(e)=>{
const rect=card.getBoundingClientRect();
const x=e.clientX-rect.left;
const y=e.clientY-rect.top;
const centerX=rect.width/2;
const centerY=rect.height/2;
const rotateX=((y-centerY)/centerY)*6;
const rotateY=((x-centerX)/centerX)*-6;
card.style.transform=\`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
});

card.addEventListener("mouseleave",()=>{
card.style.transform="rotateX(0deg) rotateY(0deg)";
});

ymaps.ready(function(){
ymaps.geocode("${data.city}",{results:1}).then(function(res){
const obj=res.geoObjects.get(0);
if(!obj)return;
const coords=obj.geometry.getCoordinates();
const map=new ymaps.Map("map",{center:coords,zoom:10});
const placemark=new ymaps.Placemark(coords,{balloonContent:"${data.rank}"});
map.geoObjects.add(placemark);
});
});
</script>

</body>
</html>
`;

const blob=new Blob([html],{type:"text/html"});
const url=URL.createObjectURL(blob);
const a=document.createElement("a");
a.href=url;
a.download="result.html";
a.click();
URL.revokeObjectURL(url);
}
