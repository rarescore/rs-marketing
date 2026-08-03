
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupNav(){
  const btn = $('.menu-btn');
  const menu = $('.mobile-menu');
  if(!btn || !menu) return;
  btn.addEventListener('click',()=>{
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') { menu.classList.remove('open'); btn.setAttribute('aria-expanded','false'); }
  });
}
function setupProgress(){
  const bar = $('.progress'); if(!bar) return;
  window.addEventListener('scroll',()=>{
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = `${Math.max(0, Math.min(100, scrollY / h * 100))}%`;
  }, {passive:true});
}
function setupReveals(){
  const items = $$('.reveal');
  if(!items.length || reduced){items.forEach(i=>i.classList.add('show'));return;}
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
  },{threshold:.14});
  items.forEach(i=>io.observe(i));
}
function setupF1(){
  const car = $('.f1-wrap'); const hero = $('.hero');
  if(!car || !hero || reduced) return;
  let ticking = false;
  const render = () => {
    const rect = hero.getBoundingClientRect();
    const total = hero.offsetHeight - innerHeight * .15;
    const progress = Math.max(0, Math.min(1, -rect.top / total));
    const eased = 1 - Math.pow(1-progress, 3);
    const x = -45 + eased * 150;
    const bounce = Math.sin(progress * 42) * 2.8;
    const tilt = Math.sin(progress * 8) * 1.6;
    car.style.transform = `translateX(${x}vw) translateY(${bounce}px) rotate(${tilt}deg)`;
    ticking = false;
  };
  window.addEventListener('scroll',()=>{ if(!ticking){ requestAnimationFrame(render); ticking=true; } }, {passive:true});
  render();
}
function setupAudit(){
  const open = $('[data-audit-open]'), modal = $('.audit-modal'), close=$('[data-audit-close]');
  if(!open||!modal||!close) return;
  open.addEventListener('click',()=>{modal.classList.add('open'); close.focus();});
  close.addEventListener('click',()=>modal.classList.remove('open'));
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.classList.remove('open');});
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') modal.classList.remove('open');});
}
function setupContact(){
  const form = $('#contactForm'); if(!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    $$('.error', form).forEach(el=>el.textContent='');
    let ok = true;
    ['name','email','business','problem'].forEach(id=>{
      const field = $('#'+id);
      if(field && !field.value.trim()){ $('#'+id+'Error').textContent = 'Required field.'; ok=false; }
    });
    const email = $('#email');
    if(email && email.value && !email.value.includes('@')){ $('#emailError').textContent='Enter a valid email.'; ok=false; }
    if(ok){ form.reset(); $('#formStatus').innerHTML = '<div class="success">Your request is ready to connect to a form provider. Replace the placeholder submit handler in assets/js/main.js before launch.</div>'; }
  });
}

document.addEventListener('DOMContentLoaded',()=>{setupNav();setupProgress();setupReveals();setupF1();setupAudit();setupContact();});
