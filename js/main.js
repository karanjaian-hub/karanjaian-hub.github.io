/* ============================================================
   Ian Karanja Murimi — Portfolio
   js/main.js — All Interactions, Scroll, Nav, Animations
   "African Precision" — Electric Lime on Near-Black
   ============================================================ */

/* ============================================================
   1. SCROLL REVEAL
   Desktop only — elements hidden via CSS min-width: 769px
   Mobile — elements already visible, no JS needed
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-animate]');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   2. NAVBAR SCROLL BEHAVIOR
   ============================================================ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function update() {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* ============================================================
   3. ACTIVE NAV LINK
   ============================================================ */
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('.nav-links li a');
  if (!navLinks.length) return;

  const sections = Array.from(navLinks)
    .map(link => document.getElementById(link.getAttribute('href').replace('#', '')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: [0.3, 0.7] }
  );

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   4. MOBILE HAMBURGER MENU
   ============================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;

  let open = false;

  function openMenu() {
    open = true;
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    open = false;
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => open ? closeMenu() : openMenu());
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (open && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeMenu(); });
}

/* ============================================================
   5. COUNT-UP ANIMATION
   ============================================================ */
function initCountUp() {
  const stats = document.querySelectorAll('[data-count]');
  if (!stats.length) return;

  let done = false;
  const about = document.getElementById('about');
  if (!about) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !done) {
          done = true;
          stats.forEach(el => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 1500;
            const start = performance.now();

            function update(now) {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.round(eased * target);
              if (progress < 1) requestAnimationFrame(update);
              else el.textContent = target;
            }

            requestAnimationFrame(update);
          });
          observer.unobserve(about);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(about);
}

/* ============================================================
   6. SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth'
    });
  });
}

/* ============================================================
   7. FOOTER YEAR
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   8. BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.querySelector('.footer-back-top');
  if (!btn) return;

  function update() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ============================================================
   9. SKILL TAGS STAGGER
   ============================================================ */
function initSkillTagsStagger() {
  const skills = document.getElementById('skills');
  if (!skills) return;

  let done = false;
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !done) {
          done = true;
          const tags = skills.querySelectorAll('.tag');
          tags.forEach(tag => tag.classList.add('tag-hidden'));
          tags.forEach((tag, i) => {
            setTimeout(() => {
              tag.classList.remove('tag-hidden');
              tag.classList.add('tag-visible');
            }, i * 40);
          });
          observer.unobserve(skills);
        }
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(skills);
}

/* ============================================================
   10. PROJECT CARDS STAGGER
   ============================================================ */
function initProjectCardsStagger() {
  setTimeout(() => {
    const cards = document.querySelectorAll('.project-card[data-animate]');
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach(card => observer.observe(card));
  }, 200);
}

/* ============================================================
   11. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
}

/* ============================================================
   12. CUSTOM CURSOR — Desktop only
   ============================================================ */
function initCustomCursor() {
  if (window.innerWidth <= 768) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  document.body.appendChild(cursor);
  document.body.appendChild(dot);

  let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    cursor.classList.add('visible');
    dot.classList.add('visible');
  });

  function animate() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.querySelectorAll('a, button, .project-card, .tag, .btn, .nav-logo').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
  });
}

/* ============================================================
   13. CARD TILT — Desktop only
   ============================================================ */
function initCardTilt() {
  if (window.innerWidth <= 768) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -6;
      const rotateY = ((x - rect.width / 2) / rect.width) * 6;
      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.5s ease';
    });
  });
}

/* ============================================================
   14. TYPEWRITER — Hero title
   ============================================================ */
function initTypewriter() {
  const el = document.querySelector('.hero-title');
  if (!el) return;

  const text = 'Building for the African market';
  el.innerHTML = '<span class="typewriter-text"></span>';
  const span = el.querySelector('.typewriter-text');

  let i = 0;
  function type() {
    if (i < text.length) {
      span.textContent += text.charAt(i);
      i++;
      setTimeout(type, 55);
    }
  }

  setTimeout(type, 900);
}

/* ============================================================
   15. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbarScroll();
  initActiveNavLink();
  initMobileMenu();
  initCountUp();
  initSmoothScroll();
  initFooterYear();
  initBackToTop();
  initSkillTagsStagger();
  initProjectCardsStagger();
  initScrollProgress();
  initCustomCursor();
  initTypewriter();
  setTimeout(initCardTilt, 500);
});
