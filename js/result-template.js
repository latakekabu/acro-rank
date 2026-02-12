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

<style>
body{
margin:0;
font-family:system-ui,-apple-system,Segoe UI,Roboto;
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#0f172a,#1e293b);
color:white;
perspective:1400px;
overflow:hidden;
}

.card{
background:rgba(255,255,255,0.08);
backdrop-filter:blur(20px);
border-radius:30px;
padding:60px;
width:700px;
max-width:92%;
transform-style:preserve-3d;
transition:transform .3s ease;
box-shadow:0 40px 100px rgba(0,0,0,.6);
animation:fadeIn .6s ease;
text-align:center;
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
margin-top:10px;
}

.footer{
margin-top:25px;
font-weight:600;
letter-spacing:.5px;
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

<div class="footer">Найдите свою базу — наслаждайтесь!</div>

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
</script>

</body>
</html>
`;

/* ===== DEVICE DETECTION ===== */

const isMobile=/Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

if(isMobile){
  const newWindow=window.open();
  newWindow.document.write(html);
  newWindow.document.close();
}else{
  const blob=new Blob([html],{type:"text/html"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download="result.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

}
