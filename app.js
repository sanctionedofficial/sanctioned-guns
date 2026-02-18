const ITEMS = [
  {name:"Glock 19",category:"Tier 1",image:"images/glock19.png",stats:{damage:55,recoil:35,accuracy:60,range:40,fireRate:65}},
  {name:"Glock 17",category:"Tier 1",image:"images/glock17.png",stats:{damage:52,recoil:32,accuracy:62,range:38,fireRate:66}},
  {name:"Glock 45",category:"Tier 2",image:"images/glock45.png",stats:{damage:62,recoil:42,accuracy:58,range:45,fireRate:70}},
  {name:"SIG P320",category:"Tier 2",image:"images/p320.png",stats:{damage:64,recoil:45,accuracy:57,range:46,fireRate:68}},
  {name:"1911",category:"Tier 3",image:"images/1911.png",stats:{damage:72,recoil:55,accuracy:52,range:50,fireRate:54}},
  {name:"FN 5.7",category:"Tier 3",image:"images/fn57.png",stats:{damage:70,recoil:50,accuracy:60,range:56,fireRate:74}},
  {name:"Weed",category:"Drugs",image:"images/weed.png",stats:{damage:0,recoil:0,accuracy:0,range:0,fireRate:0}},
  {name:"Cocaine",category:"Drugs",image:"images/cocaine.png",stats:{damage:0,recoil:0,accuracy:0,range:0,fireRate:0}}
];

const grid = document.getElementById("grid");
const navItems = document.querySelectorAll(".navItem");
const search = document.getElementById("search");
const randomBtn = document.getElementById("randomBtn");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const mName = document.getElementById("mName");
const mImg = document.getElementById("mImg");
const vDmg = document.getElementById("vDmg");
const vRec = document.getElementById("vRec");
const vAcc = document.getElementById("vAcc");
const vRng = document.getElementById("vRng");
const vFr = document.getElementById("vFr");

let activeCat="Tier 1";

function render(){
  grid.innerHTML="";
  ITEMS.filter(i=>{
    return i.category===activeCat &&
    (!search.value || i.name.toLowerCase().includes(search.value.toLowerCase()))
  }).forEach(i=>{
    const el=document.createElement("div");
    el.className="item";
    el.innerHTML=`
      <img src="${i.image}">
      <div class="itemName">${i.name}</div>
    `;
    el.onclick=()=>openModal(i);
    grid.appendChild(el);
  });
}

function openModal(i){
  mName.textContent=i.name;
  mImg.src=i.image;
  vDmg.textContent=i.stats.damage;
  vRec.textContent=i.stats.recoil;
  vAcc.textContent=i.stats.accuracy;
  vRng.textContent=i.stats.range;
  vFr.textContent=i.stats.fireRate;
  modal.showModal();
}

navItems.forEach(n=>{
  n.onclick=()=>{
    navItems.forEach(x=>x.classList.remove("active"));
    n.classList.add("active");
    activeCat=n.dataset.cat;
    render();
  };
});

search.oninput=render;

randomBtn.onclick=()=>{
  const items=ITEMS.filter(i=>i.category===activeCat);
  if(!items.length) return;
  openModal(items[Math.floor(Math.random()*items.length)]);
};

closeModal.onclick=()=>modal.close();
modal.onclick=e=>{if(e.target===modal)modal.close();};

render();
