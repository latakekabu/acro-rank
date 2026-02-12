function generateResultHTML(data){

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
background:linear-gradient(135deg,#e0f2fe,#ffffff);
display:flex;
justify-content:center;
align-items:center;
min-height:100dvh;
}

.card{
background:rgba(255,255,255,0.7);
backdrop-filter:blur(25px);
border-radius:30px;
padding:60px;
box-shadow:0 40px 100px rgba(0,0,0,0.15);
text-align:center;
transform-style:preserve-3d;
transition:transform .4s ease;
}

.card:hover{
transform:rotateX(6deg) rotateY(-6deg);
}

.rank{
font-size:42px;
font-weight:700;
color:${data.color};
margin:25px 0;
}

#map{
margin-top:40px;
width:600px;
height:400px;
border-radius:20px;
overflow:hidden;
}
</style>
</head>
<body>

<div class="card">
<h1>Персональный результат</h1>
<p>${data.fullname}</p>
<p>${data.city}</p>
<div class="rank">${data.rank}</div>
<div id="map"></div>
</div>

<script>
ymaps.ready(function () {
ymaps.geocode("${data.city}",{results:1}).then(function(res){
const obj=res.geoObjects.get(0);
if(!obj) return;
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
