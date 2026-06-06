/* ============================================================
   Ian Karanja Murimi — Portfolio
   js/main.js — All Interactions, Scroll, Nav, Animations
   "African Precision" — Electric Lime on Near-Black
   ============================================================ */

/* ============================================================
   1. SCROLL REVEAL
   IntersectionObserver watches all [data-animate] elements.
   Adds .is-visible once element enters viewport — never removes.
   ============================================================ */
function initScrollReveal() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;

    const isMobile = window.innerWidth <= 768;

    // On mobile, skip animations entirely — just show everything
    if (isMobile) {
        animatedElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.01,
            rootMargin: '0px 0px -60px 0px'
        }
    );

    animatedElements.forEach(el => observer.observe(el));
}

/* ============================================================
   2. NAVBAR SCROLL BEHAVIOR
   Adds .scrolled class when user scrolls past 80px.
   Triggers frosted glass background in CSS.
   ============================================================ */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function handleNavScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Run once on init in case page is loaded mid-scroll
    handleNavScroll();
    window.addEventListener('scroll', handleNavScroll, { passive: true });
}

/* ============================================================
   3. ACTIVE NAV LINK ON SCROLL
   Tracks which section is most visible and highlights
   the corresponding nav link with .active class.
   ============================================================ */
function initActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    if (!navLinks.length) return;

    // Collect all sections that have nav links pointing to them
    const sections = Array.from(navLinks)
        .map(link => {
            const id = link.getAttribute('href').replace('#', '');
            return document.getElementById(id);
        })
        .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');

                    // Remove .active from all nav links
                    navLinks.forEach(link => link.classList.remove('active'));

                    // Add .active to the matching link
                    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                    if (activeLink) activeLink.classList.add('active');
                }
            });
        },
        {
            threshold: [0.3, 0.7]
        }
    );

    sections.forEach(section => observer.observe(section));
}

/* ============================================================
   4. MOBILE HAMBURGER MENU
   Toggles fullscreen mobile menu overlay.
   Closes on link click or outside tap.
   ============================================================ */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (!hamburger || !mobileMenu) return;

    let isOpen = false;

    function openMenu() {
        isOpen = true;
        hamburger.classList.add('open');
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        isOpen = false;
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Toggle on hamburger click
    hamburger.addEventListener('click', () => {
        isOpen ? closeMenu() : openMenu();
    });

    // Close when a mobile menu link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on click outside the menu (but not on hamburger)
    document.addEventListener('click', (e) => {
        if (isOpen && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMenu();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) closeMenu();
    });
}

/* ============================================================
   5. COUNT-UP ANIMATION
   Animates stat numbers from 0 to their data-count value
   when the about section enters the viewport.
   Uses requestAnimationFrame for smooth easing.
   ============================================================ */
function initCountUp() {
    const statNumbers = document.querySelectorAll('[data-count]');
    if (!statNumbers.length) return;

    let hasRun = false;

    function animateCount(el) {
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1500; // ms
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target; // ensure exact final value
            }
        }

        requestAnimationFrame(update);
    }

    // Watch the about section — trigger count-up when it enters viewport
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasRun) {
                    hasRun = true;
                    statNumbers.forEach(el => animateCount(el));
                    observer.unobserve(aboutSection);
                }
            });
        },
        { threshold: 0.3 }
    );

    observer.observe(aboutSection);
}

/* ============================================================
   6. SMOOTH SCROLL
   Intercepts all anchor clicks starting with "#".
   Scrolls to target with 80px navbar offset.
   ============================================================ */
function initSmoothScroll() {
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navbarHeight = 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });
    });
}

/* ============================================================
   7. FOOTER YEAR
   Automatically inserts the current year.
   ============================================================ */
function initFooterYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/* ============================================================
   8. BACK TO TOP BUTTON
   Shows after 400px scroll, hides when near top.
   Scrolls to top smoothly on click.
   ============================================================ */
function initBackToTop() {
    const btn = document.querySelector('.footer-back-top');
    if (!btn) return;

    function handleBackToTopVisibility() {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    // Run once on init
    handleBackToTopVisibility();
    window.addEventListener('scroll', handleBackToTopVisibility, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ============================================================
   9. SKILL TAGS STAGGER
   When skills section enters viewport, staggers each .tag
   inside it with a 40ms delay between each tag.
   ============================================================ */
function initSkillTagsStagger() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    let hasRun = false;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasRun) {
                    hasRun = true;

                    const tags = skillsSection.querySelectorAll('.tag');

                    // Set all tags to hidden state initially
                    tags.forEach(tag => tag.classList.add('tag-hidden'));

                    // Stagger each tag in with 40ms delay between each
                    tags.forEach((tag, index) => {
                        setTimeout(() => {
                            tag.classList.remove('tag-hidden');
                            tag.classList.add('tag-visible');
                        }, index * 40);
                    });

                    observer.unobserve(skillsSection);
                }
            });
        },
        { threshold: 0.15 }
    );

    observer.observe(skillsSection);
}

/* ============================================================
   10. PROJECT CARDS STAGGER
   After projects.js renders the cards, re-runs scroll reveal
   so dynamically injected [data-animate] cards are observed.
   Called after a short delay to ensure DOM is ready.
   ============================================================ */
function initProjectCardsStagger() {
    // Small delay to ensure projects.js has finished rendering
    setTimeout(() => {
        const cards = document.querySelectorAll('.project-card[data-animate]');
        if (!cards.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        cards.forEach(card => observer.observe(card));
    }, 100);
}

/* ============================================================
   11. PERFORMANCE: THROTTLE SCROLL HANDLER
   ============================================================ */
function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

/* ============================================================
   12. CUSTOM CURSOR — Desktop only
   ============================================================ */
function initCustomCursor() {
    if (window.innerWidth <= 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Grow cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .project-card, .tag, .btn');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
}

/* ============================================================
   13. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        bar.style.width = progress + '%';
    }, { passive: true });
}

/* ============================================================
   14. CARD TILT EFFECT — Desktop only
   ============================================================ */
function initCardTilt() {
    if (window.innerWidth <= 768) return;

    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.transition = 'transform 0.1s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            card.style.transition = 'transform 0.4s ease';
        });
    });
}

/* ============================================================
   15. TYPEWRITER EFFECT — Hero title
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
            setTimeout(type, 60);
        }
    }

    // Start after hero animations complete
    setTimeout(type, 1000);
}

/* ============================================================
   16. INIT EVERYTHING ON DOM READY
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
    initCustomCursor();
    initScrollProgress();
    initTypewriter();
});

// Card tilt needs to run after projects are rendered
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initCardTilt, 500);
});