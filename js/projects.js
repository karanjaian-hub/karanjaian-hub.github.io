/* ============================================================
   Ian Karanja Murimi — Portfolio
   js/projects.js — Project Data + Rendering + Slideshow
   ============================================================ */

const projects = [
  {
    id: 'akiba',
    name: 'Akiba',
    tagline: 'Every shilling has a story.',
    desc: 'A smart personal finance app for Kenya that automatically imports and categorizes M-Pesa transactions, tracks budgets, and delivers AI-powered financial insights — built on a production-grade microservices backend.',
    cat: 'Mobile · Full-Stack',
    tags: ['Kotlin','Jetpack Compose','Vert.x 5','Java 21','RabbitMQ','Redis','PostgreSQL','Groq AI','M-Pesa Daraja','Docker','Microservices'],
    images: ['akiba-1','akiba-2','akiba-3','akiba-4','akiba-5','akiba-6','akiba-7','akiba-8','akiba-9','akiba-10','akiba-11','akiba-12','akiba-13','akiba-14','akiba-15','akiba-16'].map(n=>`assets/images/${n}.jpg`),
    github: 'https://github.com/karanjaian-hub/akiba',
    demo: 'https://www.youtube.com/embed/nkgpPm89e0M',
    featured: true
  },
  {
    id: 'careconnect',
    name: 'CareConnect',
    tagline: 'Referrals that reach the right doctor, fast.',
    desc: 'A digital platform that streamlines patient referrals between healthcare facilities, replacing paperwork and phone calls with a fast, trackable, HL7 FHIR-compliant system.',
    cat: 'Full-Stack · Healthtech',
    tags: ['Java 21','Spring Boot 3','React 18','PostgreSQL','Redis','TailwindCSS','Docker','HL7 FHIR','GitHub Actions'],
    images: Array.from({length:17},(_,i)=>`assets/images/careconnect-${i+1}.jpg`),
    github: 'https://github.com/karanjaian-hub/careconnect',
    demo: 'https://www.youtube.com/embed/WXgyD70kU0o',
    featured: false
  },
  {
    id: 'eventflow',
    name: 'EventFlow',
    tagline: 'Half a million invitations. Zero missed RSVPs.',
    desc: 'A scalable event management platform that handles mass guest invitations and tracks RSVPs in real time — powered by Kafka, WebSockets, and Redis distributed locks.',
    cat: 'Full-Stack · Systems',
    tags: ['Java 17','Spring Boot','Apache Kafka','WebSocket','React 18','Redis','PostgreSQL','Docker'],
    images: Array.from({length:8},(_,i)=>`assets/images/eventflow-${i+1}.jpg`),
    github: 'https://github.com/karanjaian-hub/eventflow',
    demo: 'https://www.youtube.com/embed/y_LIegszRIw',
    featured: false
  },
  {
    id: 'noteflow',
    name: 'NoteFlow',
    tagline: 'Every keystroke, safely stored.',
    desc: 'A cloud-native note-taking web app with rich text editing, auto-save, tags, folders, and search — built on a reactive microservices backend with a persistent save queue and zero data loss.',
    cat: 'Full-Stack · Backend',
    tags: ['Java 21','Vert.x 5','Redis','PostgreSQL','Vanilla JS','Docker','Railway','Microservices'],
    images: Array.from({length:5},(_,i)=>`assets/images/noteflow-${i+1}.jpg`),
    github: 'https://github.com/karanjaian-hub/noteflow',
    demo: 'https://www.youtube.com/embed/hlrW0PpHrvo',
    featured: false
  },
  {
    id: 'rentflow',
    name: 'RentFlow Kenya',
    tagline: 'Pay rent. Get a receipt. Automatically.',
    desc: 'A comprehensive SaaS platform that automates rent collection, utility billing, and property management for Kenyan landlords — powered by M-Pesa, with WhatsApp-integrated communication and automated landlord payouts.',
    cat: 'Full-Stack · SaaS',
    tags: ['Java 21','Spring Boot 3','React 18','TypeScript','PostgreSQL','Redis','M-Pesa Daraja','WhatsApp Business API','AWS','Docker'],
    images: Array.from({length:3},(_,i)=>`assets/images/rentflow-${i+1}.jpg`),
    github: 'https://github.com/karanjaian-hub/rentflow-kenya',
    demo: '#',
    featured: false
  }
];

const ghIcon = `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`;

function demoBtn(p) {
  if (p.demo !== '#') {
    return `<button class="btn-ghost btn-demo" data-demo="${p.demo}" data-name="${p.name}" style="padding:10px 20px;font-size:13px;">▶ Watch Demo</button>`;
  }
  return `<button class="btn-ghost" disabled style="opacity:0.4;padding:10px 20px;font-size:13px;">▶ Demo Soon</button>`;
}

function slides(imgs, name) {
  return imgs.map((src, i) => `
    <img src="${src}" alt="${name} screenshot ${i+1}"
      class="slide${i===0?' on':''}"
      loading="lazy" width="1280" height="720"
      onerror="this.style.display='none'">`).join('');
}

function dotsBtns(imgs) {
  return imgs.map((_,i) => `<button class="dot${i===0?' on':''}" data-i="${i}" aria-label="Slide ${i+1}"></button>`).join('');
}

function tags(arr) {
  return arr.map(t=>`<span class="tag">${t}</span>`).join('');
}

function buildFeatured(p) {
  return `
  <article class="project-card featured s1" data-animate data-id="${p.id}">
    <div class="feat-inner">
      <div class="slideshow" data-ss data-i="${p.name.charAt(0)}" style="min-height:320px;">
        ${slides(p.images, p.name)}
        <div class="dots">${dotsBtns(p.images)}</div>
        <button class="arrow l">‹</button>
        <button class="arrow r">›</button>
      </div>
      <div class="card-body">
        <div class="feat-badge">★ Featured Project</div>
        <p class="card-cat">${p.cat}</p>
        <h3 class="card-title">${p.name}</h3>
        <p class="card-line">${p.tagline}</p>
        <p class="card-desc">${p.desc}</p>
        <div class="card-tags">${tags(p.tags)}</div>
        <div class="card-actions">
          <a href="${p.github}" class="icon-btn" target="_blank" rel="noopener" aria-label="GitHub">${ghIcon}</a>
          ${demoBtn(p)}
        </div>
      </div>
    </div>
  </article>`;
}

function buildCard(p, idx) {
  return `
  <article class="project-card s${idx}" data-animate data-id="${p.id}">
    <div class="slideshow" data-ss data-i="${p.name.charAt(0)}">
      ${slides(p.images, p.name)}
      <div class="dots">${dotsBtns(p.images)}</div>
      <button class="arrow l">‹</button>
      <button class="arrow r">›</button>
    </div>
    <div class="card-body">
      <p class="card-cat">${p.cat}</p>
      <h3 class="card-title">${p.name}</h3>
      <p class="card-line">${p.tagline}</p>
      <div class="card-tags">${tags(p.tags)}</div>
      <div class="card-actions">
        <a href="${p.github}" class="icon-btn" target="_blank" rel="noopener" aria-label="GitHub">${ghIcon}</a>
        ${demoBtn(p)}
      </div>
    </div>
  </article>`;
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  let html = '';
  let cardIdx = 1;
  projects.forEach(p => {
    html += p.featured ? buildFeatured(p) : buildCard(p, Math.min(cardIdx++, 5));
  });
  grid.innerHTML = html;
  initSlideshows();
}

function initSlideshows() {
  document.querySelectorAll('[data-ss]').forEach(ss => {
    const slides = ss.querySelectorAll('.slide');
    const dots   = ss.querySelectorAll('.dot');
    const prev   = ss.querySelector('.arrow.l');
    const next   = ss.querySelector('.arrow.r');
    if (slides.length <= 1) return;

    let cur = 0, timer = null, tx = 0;

    function go(n) {
      slides[cur].classList.remove('on');
      dots[cur].classList.remove('on');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('on');
      dots[cur].classList.add('on');
    }

    function start() { stop(); timer = setInterval(() => go(cur+1), 3500); }
    function stop()  { clearInterval(timer); timer = null; }

    ss.addEventListener('mouseenter', stop);
    ss.addEventListener('mouseleave', start);

    prev?.addEventListener('click', e => { e.stopPropagation(); go(cur-1); start(); });
    next?.addEventListener('click', e => { e.stopPropagation(); go(cur+1); start(); });

    dots.forEach(d => d.addEventListener('click', e => { e.stopPropagation(); go(+d.dataset.i); start(); }));

    ss.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; }, {passive:true});
    ss.addEventListener('touchend',   e => {
      const diff = tx - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 50) { go(diff > 0 ? cur+1 : cur-1); start(); }
    }, {passive:true});

    start();
  });
}

function initModal() {
  const modal = document.getElementById('modal');
  const frame = document.getElementById('modalFrame');
  const title = document.getElementById('modalTitle');
  const close = document.getElementById('modalClose');
  if (!modal) return;

  function open(url, name) {
    frame.src = url + '?rel=0&autoplay=1';
    title.textContent = name + ' — Demo';
    modal.classList.add('on');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => close.focus(), 100);
  }

  function shut() {
    modal.classList.remove('on');
    modal.setAttribute('aria-hidden','true');
    frame.src = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-demo');
    if (btn?.dataset.demo && btn.dataset.demo !== '#') open(btn.dataset.demo, btn.dataset.name);
  });

  close.addEventListener('click', shut);
  modal.addEventListener('click', e => { if (e.target === modal) shut(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('on')) shut(); });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initModal();
});
