
const industries = ['Plumbing','Med Spa','Real Estate','Restaurant','Dentist','Contractor','Law Firm','Auto Shop','E-commerce','Home Services'];
const names = ['Mason Carter','Elena Rivera','Andre Brooks','Tate Miller','Nina Park','Victor Stone','Sofia Lane','Ari Cohen','Mia Novak','Daniel Price','Lena Torres','Chris Morgan','Ava Bennett','Roman King','Isabel Flores','Noah Reed','Camila Hayes','Arman Voss','Julia Wells','Leo Grant'];
const snippets = [
  'The strategy finally made our marketing feel organized. The dashboard, calls, and execution rhythm helped our team understand what was working.',
  'The website direction felt more premium immediately. The copy, sections, and offer structure made the business look much more serious.',
  'We needed clearer Google visibility and a better sales path. The plan helped connect SEO, ads, and conversion instead of treating them separately.',
  'Professional, sharp, and very structured. The biggest value was having one system instead of random posts and disconnected campaigns.',
  'The audit showed gaps we had ignored for years. The recommendations were practical and the design quality felt high-end from the start.',
  'Their process was direct. We saw exactly what needed to be fixed across search, content, pages, reviews, and follow-up.',
  'The package structure made sense for our stage. It was clear what we were buying and what would be handled monthly.',
  'The messaging became stronger. Our old site talked about services; the new direction sold outcomes and trust.'
];
const reviews = Array.from({length:200},(_,i)=>({
  name:names[i%names.length], industry:industries[i%industries.length], rating:5,
  title:['Clean strategy','Premium execution','Better conversion path','Serious upgrade','Sharp marketing system'][i%5],
  text: snippets[i%snippets.length] + (i%3===0 ? ' The details around offer positioning, page flow, and follow-up gave us a clearer path to turn attention into qualified leads.' : '') + (i%7===0 ? ' This is demo testimonial copy and should be replaced with verified client reviews before launch.' : ''),
  photo:i%4===0
}));
function renderReviews(){
  const root=document.getElementById('reviewsRoot'); if(!root) return;
  let active='All', page=1; const per=20;
  const filters=['All',...industries];
  const draw=()=>{
    const filtered=active==='All'?reviews:reviews.filter(r=>r.industry===active);
    const pages=Math.ceil(filtered.length/per);
    const current=filtered.slice((page-1)*per,page*per);
    root.innerHTML = `<div class="filters" role="tablist">${filters.map(f=>`<button class="filter-btn ${f===active?'active':''}" data-filter="${f}" role="tab" aria-selected="${f===active}">${f}</button>`).join('')}</div>
    <div class="grid grid-2">${current.map(r=>`<article class="card reveal"><div class="review-head"><div class="avatar">${r.photo?r.name[0]:'RS'}</div><div><strong>${r.name}</strong><p class="fineprint">${r.industry} owner · Demo placeholder</p></div></div><div class="review-stars" aria-label="5 out of 5 stars">★★★★★</div><h3>${r.title}</h3><p>${r.text}</p></article>`).join('')}</div>
    <div class="pagination" aria-label="Review pagination">${Array.from({length:pages},(_,i)=>`<button class="page-btn ${i+1===page?'active':''}" data-page="${i+1}">${i+1}</button>`).join('')}</div>`;
    root.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;page=1;draw();}));
    root.querySelectorAll('[data-page]').forEach(b=>b.addEventListener('click',()=>{page=Number(b.dataset.page);draw();scrollTo({top:0,behavior:'smooth'});}));
    if(window.IntersectionObserver){document.querySelectorAll('.reveal').forEach(el=>setTimeout(()=>el.classList.add('show'),50));}
  };
  draw();
}
document.addEventListener('DOMContentLoaded',renderReviews);
