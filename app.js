/* Minimal stable JS to verify loading and anchors */
const App = (() => {
const state = {
lang: 'en',
data: {
categories: [
{ id: 1, name: 'Battery & Charging', name_am: 'ባትሪ እና ኃይል መሙላት', icon: 'assets/categories/battery.svg' },
{ id: 2, name: 'Electric Motor', name_am: 'የኤሌክትሪክ ሞተር', icon: 'assets/categories/motor.svg' },
{ id: 3, name: 'Thermal Management', name_am: 'የሙቀት አስተዳደር', icon: 'assets/categories/thermal.svg' },
{ id: 4, name: 'Brake System', name_am: 'የብሬክ ስርዓት', icon: 'assets/categories/brake.svg' },
{ id: 5, name: 'Electronics & Control', name_am: 'ኤሌክትሮኒክስ እና ቁጥጥር', icon: 'assets/categories/electronics.svg' },
{ id: 6, name: 'Body & Interior', name_am: 'ቅርፅ እና ውስጠኛ ክፍል', icon: 'assets/categories/body.svg' }
],
dealers: [
{ name: 'EV Parts Ethiopia', name_am: 'ኤሌክትሪክ ተሽከርካሪ ክፍሎች ኢትዮጲያ', location: 'Addis Ababa - Bole', location_am: 'አዲስ አበባ - ቦሌ', phone: '+251-11-345-6789', spec: 'Battery & Electronics' },
{ name: 'Green Auto Solutions', name_am: 'አረንጓዴ የመኪና መፍትሄዎች', location: 'Addis Ababa - Merkato', location_am: 'አዲስ አበባ - መርካቶ', phone: '+251-11-456-7890', spec: 'Motor & Thermal' }
]
}
};

const $ = (sel, root = document) => root.querySelector(sel);

function renderCategories() {
const wrap = $('#categoryGrid');
if (!wrap) return;
wrap.innerHTML = '';
state.data.categories.forEach((cat) => {
const div = document.createElement('div');
div.className = 'card';
div.innerHTML = <img src="${cat.icon}" alt="${cat.name}" class="card__img" loading="lazy"/> <div class="card__body"> <h4 class="card__title">${state.lang === 'am' ? cat.name_am : cat.name}</h4> <span class="badge">EV</span> </div> ;
wrap.appendChild(div);
});
}

function renderDealers() {
const list = document.getElementById('dealerList');
if (!list) return;
list.innerHTML = state.data.dealers.map((d) => <div class="dealer"> <h4 class="dealer__title">${state.lang === 'am' ? d.name_am : d.name}</h4> <p class="dealer__meta">${state.lang === 'am' ? d.location_am : d.location}</p> <p class="dealer__meta">${d.phone}</p> <span class="badge">${d.spec}</span> </div> ).join('');
}

function setupAnchorScroll() {
document.querySelectorAll('.nav__link').forEach((a) => {
a.addEventListener('click', (e) => {
const href = a.getAttribute('href') || '';
if (href.startsWith('#')) {
e.preventDefault();
const el = document.querySelector(href);
if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: 'smooth' });
}
});
});
}

function init() {
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
renderCategories();
renderDealers();
setupAnchorScroll();
console.log('Minimal app.js loaded');
}

return { init };
})();

document.addEventListener('DOMContentLoaded', App.init);
