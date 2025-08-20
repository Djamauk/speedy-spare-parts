/* Speedy Spare Parts - EV site (English/Amharic) */
const App = (() => {
// Application state
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
safety: '⚠️ High Voltage — Professional install'
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
safety: '🔋 Battery safety — handle and store properly'
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
safety: '⚠️ High Voltage — Professional install'
}
],
dealers: [
{ name: 'EV Parts Ethiopia', name_am: 'ኤሌክትሪክ ተሽከርካሪ ክፍሎች ኢትዮጲያ', location: 'Addis Ababa - Bole', location_am: 'አዲስ አበባ - ቦሌ', phone: '+251-11-345-6789', spec: 'Battery & Electronics' },
{ name: 'Green Auto Solutions', name_am: 'አረንጓዴ የመኪና መፍትሄዎች', location: 'Addis Ababa - Merkato', location_am: 'አዲስ አበባ - መርካቶ', phone: '+251-11-456-7890', spec: 'Motor & Thermal' }
]
}
};

// Helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const fmtETB = (v) => ${v.toLocaleString()} ${state.lang === 'am' ? 'ብር' : 'ETB'};

// Initialize app
function init() {
document.documentElement.classList.add('smooth');

text
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

bindLanguageToggle();
populateCategories();
populateVehicleFinder();
populateFilters();
renderProducts();
renderDealers();
bindSearch();
bindFilters();
setupAnchorScroll();
applyLanguage();
}

function bindLanguageToggle() {
const langButtons = document.querySelectorAll('.lang-btn');
langButtons.forEach((btn) => {
btn.addEventListener('click', () => {
langButtons.forEach((b) => b.classList.remove('active'));
btn.classList.add('active');
const lang = btn.getAttribute('data-lang');
state.lang = lang === 'am' ? 'am' : 'en';
applyLanguage();
renderProducts(true);
renderDealers();
populateCategories();
populateFilters();
});
});
}

function applyLanguage() {
document.querySelectorAll('[data-en]').forEach((el) => {
const en = el.getAttribute('data-en');
const am = el.getAttribute('data-am');
el.textContent = state.lang === 'am' ? (am ?? en ?? '') : (en ?? am ?? '');
});
document.querySelectorAll('[data-ph-en]').forEach((el) => {
const phEn = el.getAttribute('data-ph-en');
const phAm = el.getAttribute('data-ph-am');
el.placeholder = state.lang === 'am' ? (phAm ?? phEn ?? '') : (phEn ?? phAm ?? '');
});
}

function populateCategories() {
const wrap = $('#categoryGrid');
if (!wrap) return;
wrap.innerHTML = '';
state.data.categories.forEach((cat) => {
const card = document.createElement('div');
card.className = 'card';
card.innerHTML = <img src="${cat.icon}" alt="${cat.name}" class="card__img" loading="lazy"/> <div class="card__body"> <h4 class="card__title">${state.lang === 'am' ? cat.name_am : cat.name}</h4> <span class="badge">EV</span> </div> ;
wrap.appendChild(card);
});
}

function populateVehicleFinder() {
const makeSel = document.getElementById('makeSelect');
const modelSel = document.getElementById('modelSelect');
const yearSel = document.getElementById('yearSelect');
const btn = document.getElementById('findPartsBtn');
if (!makeSel || !modelSel || !yearSel || !btn) return;

text
const makePlaceholder = state.lang === 'am' ? 'ምርጫ አድርጉ' : 'Select Make';
makeSel.innerHTML = `<option value="">${makePlaceholder}</option>` +
  state.data.vehicles.map((v) => `<option value="${v.make}">${v.make}</option>`).join('');

modelSel.disabled = true;
modelSel.innerHTML = '';

makeSel.addEventListener('change', () => {
  const make = makeSel.value;
  modelSel.disabled = !make;
  if (!make) {
    modelSel.innerHTML = '';
    return;
  }
  const models = (state.data.vehicles.find((v) => v.make === make) || { models: [] }).models;
  const modelPlaceholder = state.lang === 'am' ? 'ሞዴል ይምረጡ' : 'Select Model';
  modelSel.innerHTML = `<option value="">${modelPlaceholder}</option>` +
    models.map((m) => `<option value="${m}">${m}</option>`).join('');
});

const now = new Date().getFullYear();
const endYear = Math.max(now, 2025);
const years = [];
for (let y = 2018; y <= endYear; y++) years.push(y);
yearSel.innerHTML = years.map((y) => `<option value="${y}">${y}</option>`).join('');

btn.addEventListener('click', () => {
  const make = makeSel.value;
  const model = modelSel.value;
  if (make && model) {
    alert(state.lang === 'am'
      ? `ለ ${make} ${model} ክፍሎች ተገኝተዋል።`
      : `Filtered parts for ${make} ${model}.`);
  } else {
    alert(state.lang === 'am'
      ? 'እባክዎን ምርት እና ሞዴል ይምረጡ።'
      : 'Please select make and model.');
  }
});
}

function populateFilters() {
const sel = document.getElementById('filterCategory');
if (!sel) return;
sel.innerHTML = <option value="">${state.lang === 'am' ? 'ሁሉም ምድቦች' : 'All Categories'}</option> +
state.data.categories.map((c) => <option value="${c.id}">${state.lang === 'am' ? c.name_am : c.name}</option>).join('');
}

function renderProducts(keepScroll = false) {
const grid = document.getElementById('productGrid');
if (!grid) return;

text
const selCat = (document.getElementById('filterCategory') || {}).value || '';
const priceEl = document.getElementById('filterPrice');
const maxPrice = parseFloat((priceEl && priceEl.value) ? priceEl.value : '30000');
const stockFilter = (document.getElementById('filterStock') || {}).value || 'any';
const sort = (document.getElementById('sortBy') || {}).value || 'name';

let list = [...state.data.products];

// Simple category mapping for the sample products
if (selCat) {
  const map = {
    1: ,  // Battery & Charging
    2: ,     // Electric Motor (using controller as example)
    3: [],
    4: [],
    5: [],
    6: []
  };
  const ids = map[Number(selCat)] || [];
  list = list.filter((p) => ids.includes(p.id));
}

list = list.filter((p) => p.price <= maxPrice);

if (stockFilter === 'in') list = list.filter((p) => p.stock > 10);
if (stockFilter === 'low') list = list.filter((p) => p.stock > 0 && p.stock <= 10);

if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
if (sort === 'priceAsc') list.sort((a, b) => a.price - b.price);
if (sort === 'priceDesc') list.sort((a, b) => b.price - a.price);

grid.innerHTML = list.map((p) => {
  const stockClass = p.stock > 10 ? 'stock--in' : 'stock--low';
  const stockText = p.stock > 10
    ? (state.lang === 'am' ? 'በመጋዘን አለ' : 'In Stock')
    : (state.lang === 'am' ? 'አነስተኛ መጠን' : 'Low Stock');

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
          <button class="btn btn--primary" data-add="${p.id}">
            ${state.lang === 'am' ? 'ወደ ሳጥን ጨምር' : 'Add to Cart'}
          </button>
          <button class="btn" data-view="${p.id}">
            ${state.lang === 'am' ? 'ዝርዝር' : 'Details'}
          </button>
        </div>
      </div>
    </div>
  `;
}).join('');

// Bind add/view
$$('#productGrid [data-add]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = Number(btn.dataset.add);
    const prod = state.data.products.find((x) => x.id === id);
    if (prod) {
      state.cart.push({ id: prod.id, qty: 1 });
      const cartCount = document.getElementById('cartCount');
      if (cartCount) cartCount.textContent = String(state.cart.length);
      alert(state.lang === 'am' ? 'ወደ ሳጥን ታክሏል።' : 'Added to cart.');
    }
  });
});
$$('#productGrid [data-view]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = Number(btn.dataset.view);
    showProductModal(id);
  });
});

if (!keepScroll && grid.offsetTop) {
  window.scrollTo({ top: grid.offsetTop - 80, behavior: 'smooth' });
}
}

function showProductModal(id) {
const p = state.data.products.find((x) => x.id === id);
if (!p) return;

text
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.inset = '0';
overlay.style.background = 'rgba(0,0,0,.5)';
overlay.style.display = 'flex';
overlay.style.alignItems = 'center';
overlay.style.justifyContent = 'center';
overlay.style.zIndex = '1000';

const box = document.createElement('div');
box.style.background = '#fff';
box.style.borderRadius = '12px';
box.style.maxWidth = '720px';
box.style.width = '95%';
box.style.overflow = 'hidden';
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
      <p style="margin:10px 0">${p.safety || ''}</p>
      <h4 style="margin:10px 0 6px">${state.lang === 'am' ? 'ዝርዝር መግለጫ' : 'Specifications'}</h4>
      <ul style="margin:0 0 10px 18px">
        ${p.spec ? Object.entries(p.spec).map(([k, v]) => `<li><strong>${k.replace(/_/g, ' ')}:</strong> ${v}</li>`).join('') : ''}
      </ul>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn--primary" data-close="1">${state.lang === 'am' ? 'ዝጋ' : 'Close'}</button>
        <a class="btn" target="_blank" rel="noopener"
           href="https://wa.me/447752660256?text=${encodeURIComponent('Hello Speedy Spare Parts, I want to order: ' + p.name)}">
           WhatsApp
        </a>
      </div>
    </div>
  </div>
`;
overlay.appendChild(box);
overlay.addEventListener('click', (e) => { if (e.target === overlay) document.body.removeChild(overlay); });
const closeBtn = box.querySelector('[data-close]');
if (closeBtn) closeBtn.addEventListener('click', () => document.body.removeChild(overlay));
document.body.appendChild(overlay);
}

function renderDealers() {
const list = document.getElementById('dealerList');
if (!list) return;
list.innerHTML = state.data.dealers.map((d) => <div class="dealer"> <h4 class="dealer__title">${state.lang === 'am' ? d.name_am : d.name}</h4> <p class="dealer__meta">${state.lang === 'am' ? d.location_am : d.location}</p> <p class="dealer__meta">${d.phone}</p> <span class="badge">${d.spec}</span> </div> ).join('');
}

function bindSearch() {
const btn = document.getElementById('searchBtn');
if (!btn) return;
btn.addEventListener('click', () => {
const input = document.getElementById('searchInput');
const q = (input && input.value ? input.value : '').toLowerCase().trim();
if (!q) { renderProducts(); return; }
const list = state.data.products.filter((p) =>
p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
);
const grid = document.getElementById('productGrid');
if (!grid) return;
grid.innerHTML = list.map((p) => <div class="card"> <img src="${p.img}" alt="${p.name}" class="card__img" loading="lazy"/> <div class="card__body"> <h4 class="card__title">${p.name}</h4> <div class="card__meta">${p.brand}</div> <div class="price"> <span class="price__now">${fmtETB(p.price)}</span> <span class="price__old">${fmtETB(p.oldPrice)}</span> <span class="badge">${p.badge}</span> </div> <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap"> <button class="btn btn--primary" data-add="${p.id}"> ${state.lang === 'am' ? 'ወደ ሳጥን ጨምር' : 'Add to Cart'} </button> <button class="btn" data-view="${p.id}"> ${state.lang === 'am' ? 'ዝርዝር' : 'Details'} </button> </div> </div> </div> ).join('') || <p>${state.lang === 'am' ? 'ምንም ውጤት አልተገኘም።' : 'No results found.'}</p>;

text
  // rebind
  $$('#productGrid [data-add]').forEach((b) => b.addEventListener('click', () =>
    alert(state.lang === 'am' ? 'ወደ ሳጥን ታክሏል።' : 'Added to cart.')
  ));
  $$('#productGrid [data-view]').forEach((b) => b.addEventListener('click', () =>
    showProductModal(Number(b.dataset.view))
  ));
});
}

function bindFilters() {
const ids = ['filterCategory', 'filterPrice', 'filterStock', 'sortBy'];
ids.forEach((id) => {
const el = document.getElementById(id);
if (el) {
const evt = id === 'filterPrice' ? 'input' : 'change';
el.addEventListener(evt, () => renderProducts());
}
});
}

function setupAnchorScroll() {
$$('.nav__link').forEach((a) => {
a.addEventListener('click', (e) => {
const href = a.getAttribute('href') || '';
if (href.startsWith('#')) {
e.preventDefault();
const el = $(href);
if (el && el.offsetTop !== undefined) {
window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
}
}
});
});
}

// Expose only init
return { init };
})();

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', App.init);
