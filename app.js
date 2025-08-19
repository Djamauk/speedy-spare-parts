/* Speedy Spare Parts - EV site (English/Amharic) */

const App = (() => {
const state = {
lang: 'en',
cart: [],
data: {
categories: [
{ id: 1, name: 'Battery & Charging', name_am: 'ባትሪ እና ኃይል መሙላት', icon: 'assets/categories/battery.svg' },
{ id: 2, name: 'Electric Motor', name_am: 'የኤሌክትሪክ ሞተር', icon: 'assets/categories/motor.svg' },
{ id: 3, name: 'Thermal Management', name_am: 'የሙቀት አስተዳደር', icon: 'assets/categories/thermal.svg' },
{ id: 4, name: 'Brake System', name_am: 'የብሬክ ስርዓት', icon: 'assets/categories/brake.svg' },
{ id: 5, name: 'Electronics & Control', name_am: 'ኤሌክትሮኒክስ እና ቁጥጥር', icon: 'assets/categories/electronics.svg' },
{ id: 6, name: 'Body & Interior', name_am: 'ቅርፅ እና ውስጠኛ ክፍል', icon: 'assets/categories/body.svg' }
],
vehicles: [
{ make: 'Tesla', models: ['Model 3','Model S','Model X','Model Y'] },
{ make: 'BYD', models: ['Dolphin','Seagull','Song L','Seal','Yuan UP','E2','Sea Lion 07'] },
{ make: 'BMW', models: ['iX3','i5','i4','iX'] },
{ make: 'Toyota', models: ['bZ4X','Prius Prime','RAV4 Prime'] },
{ make: 'Hyundai', models: ['IONIQ 5','IONIQ 6','Kona Electric','NEXO'] },
{ make: 'Kia', models: ['EV6','Niro EV','Soul EV','e-Niro'] },
{ make: 'Nissan', models: ['Leaf','Ariya','e-NV200'] },
{ make: 'Volkswagen', models: ['ID.4','ID.3','e-Golf','ID.6'] },
{ make: 'MG', models: ['ZS EV','MG4 EV','Marvel R','HS EV'] },
{ make: 'MAXUS', models: ['EV30','EV80','EV90','eDeliver 3'] }
],
products: [
{
id: 1,
name: 'EV Charging Cable Type 2',
brand: 'Phoenix Contact',
img: 'assets/products/charging-cable.jpg',
price: 8500, oldPrice: 9500, currency: 'ETB',
stock: 15,
badge: '32A',
spec: { current: '32A', voltage: '400V AC', length: '5m', connector: 'Type 2' },
safety: '⚠️ High Voltage — Professional install',
},
{
id: 2,
name: 'Battery Management System (BMS)',
brand: 'Daly BMS',
img: 'assets/products/bms-unit.jpg',
price: 12500, oldPrice: 14000, currency: 'ETB',
stock: 8,
badge: 'BMS 16S',
spec: { max_current: '200A', cell_count: '16S', comms: 'CAN/RS485', ip: 'IP65' },
safety: '🔋 Battery safety — handle and store properly',
},
{
id: 3,
name: 'EV Motor Controller',
brand: 'Kelly Controls',
img: 'assets/products/motor-controller.jpg',
price: 25000, oldPrice: 28000, currency: 'ETB',
stock: 5,
badge: '800A',
spec: { max_current: '800A', voltage_range: '96-144V', power: '120kW', eff: '98%' },
safety: '⚠️ High Voltage — Professional install',
},
{
id: 4,
name: 'EV Cooling System Radiator',
brand: 'Valeo',
img: 'assets/products/ev-radiator.jpg',
price: 15500, oldPrice: 17200, currency: 'ETB',
stock: 10,
badge: 'Thermal',
spec: { core: '400x300x26mm', material: 'Aluminum', ports: '16mm', pressure: '2.0 bar' },
safety: '🔧 Professional installation required',
},
{
id: 5,
name: 'EV Display Unit Touchscreen',
brand: 'Continental',
img: 'assets/products/ev-display.jpg',
price: 18000, oldPrice: 20500, currency: 'ETB',
stock: 6,
badge: '10.25"',
spec: { size: '10.25"', res: '1440x540', iface: 'LVDS', temp: '-30°C to +85°C' },
safety: '🔧 Professional installation required',
},
{
id: 6,
name: 'EV Brake Pads - Regenerative Compatible',
brand: 'Brembo',
img: 'assets/products/ev-brake-pads.jpg',
price: 3200, oldPrice: 3600, currency: 'ETB',
stock: 20,
badge: 'Low dust',
spec: { length: '142.4mm', width: '56.4mm', thickness: '17.0mm', material: 'Low-metallic' },
safety: '🔧 Professional installation required',
},
{
id: 7,
name: 'EV High Voltage Cable Assembly',
brand: 'TE Connectivity',
img: 'assets/products/hv-cable.jpg',
price: 9500, oldPrice: 11000, currency: 'ETB',
stock: 12,
badge: '600V',
spec: { voltage: '600V DC', current: '400A', length: '2.5m', shielding: 'Foil + braid' },
safety: '⚠️ High Voltage — Professional install',
},
{
id: 8,
name: 'EV Charging Port Assembly',
brand: 'Yazaki',
img: 'assets/products/charging-port.jpg',
price: 6800, oldPrice: 7500, currency: 'ETB',
stock: 9,
badge: 'CCS',
spec: { socket: 'Type 2 CCS', ac: '63A AC', dc: '125A DC', ip: 'IP54' },
safety: '⚠️ High Voltage — Professional install',
}
],
dealers: [
{ name: 'EV Parts Ethiopia', name_am: 'ኤሌክትሪክ ተሽከርካሪ ክፍሎች ኢትዮጲያ', location: 'Addis Ababa - Bole', location_am: 'አዲስ አበባ - ቦሌ', phone: '+251-11-345-6789', spec: 'Battery & Electronics' },
{ name: 'Green Auto Solutions', name_am: 'አረንጓዴ የመኪና መፍትሄዎች', location: 'Addis Ababa - Merkato', location_am: 'አዲስ አበባ - መርካቶ', phone: '+251-11-456-7890', spec: 'Motor & Thermal' },
{ name: 'Sustainable Motors', name_am: 'ዘላቂ ሞተሮች', location: 'Bahir Dar', location_am: 'ባህር ዳር', phone: '+251-58-567-8901', spec: 'Brakes & Body' }
]
}
};

// Helpers
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const fmtETB = (v) => ${v.toLocaleString()} ${state.lang==='am'?'ብር':'ETB'};

function init() {
document.documentElement.classList.add('smooth');
$('#year').textContent = new Date().getFullYear();
bindLanguageToggle();
populateCategories();
populateVehicleFinder();
populateFilters();
renderProducts();
renderDealers();
bindSearch();
bindFilters();
setupAnchorScroll();
applyLanguage(); // set initial language
}

function bindLanguageToggle() {
('.lang-btn').forEach(btn=>{ btn.addEventListener('click', ()=>{ ('.lang-btn').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');
state.lang = btn.dataset.lang;
applyLanguage();
renderProducts(true);
renderDealers();
populateCategories();
populateFilters();
});
});
}

function applyLanguage() {
(
′
[
d
a
t
a
−
e
n
]
′
)
.
f
o
r
E
a
c
h
(
e
l
=
>
c
o
n
s
t
t
e
x
t
=
s
t
a
t
e
.
l
a
n
g
=
=
=
′
a
m
′
?
e
l
.
g
e
t
A
t
t
r
i
b
u
t
e
(
′
d
a
t
a
−
a
m
′
)
:
e
l
.
g
e
t
A
t
t
r
i
b
u
t
e
(
′
d
a
t
a
−
e
n
′
)
;
i
f
(
t
e
x
t
)
e
l
.
t
e
x
t
C
o
n
t
e
n
t
=
t
e
x
t
;
)
;
( 
′
 [data−en] 
′
 ).forEach(el=>consttext=state.lang=== 
′
 am 
′
 ?el.getAttribute( 
′
 data−am 
′
 ):el.getAttribute( 
′
 data−en 
′
 );if(text)el.textContent=text;);('[data-ph-en]').forEach(el=>{
el.placeholder = state.lang==='am' ? el.getAttribute('data-ph-am') : el.getAttribute('data-ph-en');
});
}

function populateCategories() {
const wrap = $('#categoryGrid');
wrap.innerHTML = '';
state.data.categories.forEach(cat=>{
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = <img src="${cat.icon}" alt="${cat.name}" class="card__img" loading="lazy"/> <div class="card__body"> <h4 class="card__title">${state.lang==='am'?cat.name_am:cat.name}</h4> <span class="badge">EV</span> </div> ;
wrap.appendChild(card);
});
}

function populateVehicleFinder() {
const makeSel = $('#makeSelect');
const modelSel = $('#modelSelect');
const yearSel = $('#yearSelect');

text
makeSel.innerHTML = `<option value="">${state.lang==='am'?'ምርጫ አድርጉ':'Select Make'}</option>` + 
  state.data.vehicles.map(v=>`<option value="${v.make}">${v.make}</option>`).join('');

makeSel.addEventListener('change', ()=>{
  const make = makeSel.value;
  modelSel.disabled = !make;
  if(!make){ modelSel.innerHTML=''; return; }
  const models = state.data.vehicles.find(v=>v.make===make)?.models || [];
  modelSel.innerHTML = `<option value="">${state.lang==='am'?'ሞዴል ይምረጡ':'Select Model'}</option>` + 
    models.map(m=>`<option value="${m}">${m}</option>`).join('');
});

const now = new Date().getFullYear();
let years = [];
for(let y=2018, end=Math.max(now,2025); y<=end; y++) years.push(y);
yearSel.innerHTML = years.map(y=>`<option value="${y}">${y}</option>`).join('');

$('#findPartsBtn').addEventListener('click', ()=>{
  const make = makeSel.value; const model = modelSel.value;
  if(make && model) {
    alert(state.lang==='am' ? `ለ ${make} ${model} ክፍሎች ተገኝተዋል።` : `Filtered parts for ${make} ${model}.`);
  } else {
    alert(state.lang==='am' ? 'እባክዎን ምርት እና ሞዴል ይምረጡ።' : 'Please select make and model.');
  }
});
}

function populateFilters() {
const sel = $('#filterCategory');
sel.innerHTML = <option value="">${state.lang==='am'?'ሁሉም ምድቦች':'All Categories'}</option> +
state.data.categories.map(c=><option value="${c.id}">${state.lang==='am'?c.name_am:c.name}</option>).join('');
}

function renderProducts(keepScroll=false) {
const grid = $('#productGrid');
const selCat = $('#filterCategory').value;
const maxPrice = parseFloat($('#filterPrice').value||'30000');
const stockFilter = $('#filterStock').value;
const sort = $('#sortBy').value;

text
let list = [...state.data.products];

if(selCat){
  const map = {1:,2:,3:,4:,5:[5,[]};[1][2][3]
  list = list.filter(p=>map[selCat]?.includes(p.id));
}

list = list.filter(p=>p.price<=maxPrice);

if(stockFilter==='in') list = list.filter(p=>p.stock>10);
if(stockFilter==='low') list = list.filter(p=>p.stock>0 && p.stock<=10);

if(sort==='name') list.sort((a,b)=>a.name.localeCompare(b.name));
if(sort==='priceAsc') list.sort((a,b)=>a.price-b.price);
if(sort==='priceDesc') list.sort((a,b)=>b.price-a.price);

grid.innerHTML = list.map(p=>{
  const stockClass = p.stock>10?'stock--in':'stock--low';
  const stockText = p.stock>10 ? (state.lang==='am'?'በመጋዘን አለ':'In Stock')
                               : (state.lang==='am'?'አነስተኛ መጠን':'Low Stock');
  return `
    <div class="card">
      <img src="${p.img}" alt="${p.name}" class="card__img" loading="lazy"/>
      <div class="card__body">
        <h4 class="card__title">${p.name}</h4>
        <div class="card__meta">${p.brand}</div>
        <div class="price">
          <span class="price__now">${fmtETB(p.price)}</span>
          <span class="price__old">${fmtETB(p.oldPrice)}</span>
          <span class="badge">${p.badge}</span>
        </div>
        <div class="stock ${stockClass}">${stockText}</div>
        <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn--primary" data-add="${p.id}" data-en="Add to Cart" data-am="ወደ ሳጥን ጨምር">
            ${state.lang==='am'?'ወደ ሳጥን ጨምር':'Add to Cart'}
          </button>
          <button class="btn" data-view="${p.id}" data-en="Details" data-am="ዝርዝር">
            ${state.lang==='am'?'ዝርዝር':'Details'}
          </button>
        </div>
      </div>
    </div>
  `;
}).join('');

$$('#productGrid [data-add]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = +btn.dataset.add;
    const prod = state.data.products.find(x=>x.id===id);
    if(prod){
      state.cart.push({id: prod.id, qty: 1});
      $('#cartCount').textContent = state.cart.length;
      alert(state.lang==='am'?'ወደ ሳጥን ታክሏል።':'Added to cart.');
    }
  });
});
$$('#productGrid [data-view]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = +btn.dataset.view;
    showProductModal(id);
  });
});

if(!keepScroll) window.scrollTo({ top: $('#productGrid').offsetTop - 80, behavior: 'smooth' });
}

function showProductModal(id){
const p = state.data.products.find(x=>x.id===id);
if(!p) return;
const overlay = document.createElement('div');
overlay.style.position='fixed';
overlay.style.inset='0';
overlay.style.background='rgba(0,0,0,.5)';
overlay.style.display='flex';
overlay.style.alignItems='center';
overlay.style.justifyContent='center';
overlay.style.zIndex='1000';

text
const box = document.createElement('div');
box.style.background='#fff';
box.style.borderRadius='12px';
box.style.maxWidth='720px';
box.style.width='95%';
box.style.overflow='hidden';
box.innerHTML = `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:0">
    <img src="${p.img}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;background:#f1f5f9"/>
    <div style="padding:14px">
      <h3 style="margin:0 0 6px">${p.name}</h3>
      <div style="color:#475569;margin-bottom:8px">${p.brand}</div>
      <div class="price">
        <span class="price__now">${fmtETB(p.price)}</span>
        <span class="price__old">${fmtETB(p.oldPrice)}</span>
        <span class="badge">${p.badge}</span>
      </div>
      <p style="margin:10px 0">${p.safety}</p>
      <h4 style="margin:10px 0 6px">${state.lang==='am'?'ዝርዝር መግለጫ':'Specifications'}</h4>
      <ul style="margin:0 0 10px 18px">
        ${Object.entries(p.spec).map(([k,v])=>`<li><strong>${k.replace(/_/g,' ')}:</strong> ${v}</li>`).join('')}
      </ul>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn--primary" data-close="1">${state.lang==='am'?'ዝጋ':'Close'}</button>
        <a class="btn" target="_blank" rel="noopener"
           href="https://wa.me/447752660256?text=Hello%20Speedy%20Spare%20Parts%2C%20I%20want%20to%20order%3A%20${encodeURIComponent(p.name)}">
           WhatsApp
        </a>
      </div>
    </div>
  </div>
`;
overlay.appendChild(box);
overlay.addEventListener('click', (e)=>{ if(e.target===overlay) document.body.removeChild(overlay) });
box.querySelector('[data-close]').addEventListener('click', ()=>document.body.removeChild(overlay));
document.body.appendChild(overlay);
}

function renderDealers(){
const list = $('#dealerList');
list.innerHTML = state.data.dealers.map(d=> <div class="dealer"> <h4 class="dealer__title">${state.lang==='am'?d.name_am:d.name}</h4> <p class="dealer__meta">${state.lang==='am'?d.location_am:d.location}</p> <p class="dealer__meta">${d.phone}</p> <span class="badge">${d.spec}</span> </div> ).join('');
}

function bindSearch(){
$('#searchBtn').addEventListener('click', ()=>{
const q = ($('#searchInput').value||'').toLowerCase().trim();
if(!q) { renderProducts(); return; }
const list = state.data.products.filter(p=>
p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
const grid = $('#productGrid');
grid.innerHTML = list.map(p=> <div class="card"> <img src="${p.img}" alt="${p.name}" class="card__img" loading="lazy"/> <div class="card__body"> <h4 class="card__title">${p.name}</h4> <div class="card__meta">${p.brand}</div> <div class="price"> <span class="price__now">${fmtETB(p.price)}</span> <span class="price__old">${fmtETB(p.oldPrice)}</span> <span class="badge">${p.badge}</span> </div> <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"> <button class="btn btn--primary" data-add="${p.id}">${state.lang==='am'?'ወደ ሳጥን ጨምር':'Add to Cart'}</button> <button class="btn" data-view="${p.id}">${state.lang==='am'?'ዝርዝር':'Details'}</button> </div> </div> </div> ).join('') || <p>${state.lang==='am'?'ምንም ውጤት አልተገኘም።':'No results found.'}</p>;
('#productGrid [data-add]').forEach(b=>b.addEventListener('click', ()=>alert(state.lang==='am'?'ወደ ሳጥን ታክሏል።':'Added to cart.'))); ('#productGrid [data-view]').forEach(b=>b.addEventListener('click', ()=>showProductModal(+b.dataset.view)));
});
}

function bindFilters(){
$('#filterCategory').addEventListener('change', ()=>renderProducts());
$('#filterPrice').addEventListener('input', ()=>renderProducts());
$('#filterStock').addEventListener('change', ()=>renderProducts());
$('#sortBy').addEventListener('change', ()=>renderProducts());
}

function setupAnchorScroll(){
$$('.nav__link').forEach(a=>{
a.addEventListener('click', (e)=>{
const href = a.getAttribute('href')||'';
if(href.startsWith('#')){
e.preventDefault();
const el = $(href);
if(el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
}
});
});
}

return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
