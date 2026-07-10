/* =========================================================
   MUHAMMED SALIH & FATHIMATH RISHANA — WEDDING INVITATION
   Vanilla JS · GSAP · Lenis · AOS
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     0. WEDDING DATE (edit here to change countdown target)
  --------------------------------------------------------- */
  const WEDDING_DATE = new Date('2026-07-19T12:00:00');

  /* ---------------------------------------------------------
     1. SMOOTH SCROLL — Lenis
  --------------------------------------------------------- */
  let lenis;
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.gsap && window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    lenis.stop(); /* locked until the guest opens the invitation */
  }

  /* ---------------------------------------------------------
     1b. MUSIC PLAYER REFS (setup here so opening the invitation
         can trigger autoplay — wiring for the toggle button is
         further down in section 9)
  --------------------------------------------------------- */
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;

  function setMusicPlaying(playing) {
    isPlaying = playing;
    musicToggle.classList.toggle('playing', isPlaying);
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicToggle.innerHTML = isPlaying
      ? '<i class="fa-solid fa-pause"></i>'
      : '<i class="fa-solid fa-music"></i>';
  }

  /* ---------------------------------------------------------
     2. INTRO LOADER — closed cover screen, opens on click
  --------------------------------------------------------- */
  const loader = document.getElementById('loader');
  const loaderLines = loader.querySelectorAll('[data-loader-line]');
  const openBtn = document.getElementById('openInvitation');

  if (window.gsap) {
    gsap.to(loaderLines, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.9,
      ease: 'power2.out',
      stagger: 0.25,
      delay: 0.3,
      onComplete: () => openBtn?.classList.add('ready'),
    });
  } else {
    loaderLines.forEach(el => el.style.opacity = 1);
    openBtn?.classList.add('ready');
  }

  document.body.style.overflow = 'hidden';
  document.body.classList.add('invitation-closed');

  const openInvitation = () => {
    loader.classList.add('hide');
    document.body.classList.remove('invitation-closed');
    document.body.classList.add('invitation-open');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
    bgMusic.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false));
    setTimeout(() => { loader.style.display = 'none'; }, 1100);
  };
  openBtn?.addEventListener('click', openInvitation);

  /* ---------------------------------------------------------
     3. AOS — scroll reveal
  --------------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
    window.addEventListener('load', () => AOS.refresh());
  }

  /* ---------------------------------------------------------
     4. NAVBAR — glass on scroll + mobile toggle + active link
  --------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkEls = document.querySelectorAll('[data-nav]');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const y = window.scrollY || window.pageYOffset;
    navbar.classList.toggle('scrolled', y > 60);
    backToTop.classList.toggle('show', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  const sections = document.querySelectorAll('main section[id]');
  const setActiveLink = () => {
    let current = sections[0]?.id;
    const y = (window.scrollY || window.pageYOffset) + 140;
    sections.forEach(sec => { if (y >= sec.offsetTop) current = sec.id; });
    navLinkEls.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  const viewDetailsBtn = document.getElementById('viewDetailsBtn');
  viewDetailsBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#details');
    if (lenis && target) {
      lenis.scrollTo(target, { offset: -20, duration: 1.4 });
    } else {
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* ---------------------------------------------------------
     6. LIVE COUNTDOWN
  --------------------------------------------------------- */
  const cd = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };
  let prevVals = { days: '', hours: '', minutes: '', seconds: '' };

  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const now = new Date();
    let diff = WEDDING_DATE - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const vals = { days: pad(days), hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };

    Object.keys(vals).forEach(key => {
      if (vals[key] !== prevVals[key] && cd[key]) {
        cd[key].textContent = vals[key];
        cd[key].classList.remove('flip');
        void cd[key].offsetWidth; /* restart animation */
        cd[key].classList.add('flip');
      }
    });
    prevVals = vals;
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------------------------------------------------------
     7. LAZY LOAD GALLERY IMAGES
  --------------------------------------------------------- */
  const lazyImages = document.querySelectorAll('img.lazy');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.addEventListener('load', () => img.classList.add('loaded'));
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '150px 0px' });
    lazyImages.forEach(img => io.observe(img));
  } else {
    lazyImages.forEach(img => { img.src = img.dataset.src; img.classList.add('loaded'); });
  }

  /* ---------------------------------------------------------
     8. GALLERY LIGHTBOX
  --------------------------------------------------------- */
  const masonryItems = Array.from(document.querySelectorAll('.masonry-item'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const img = masonryItems[index].querySelector('img');
    lightboxImg.src = img.dataset.src || img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function showRelative(delta) {
    currentIndex = (currentIndex + delta + masonryItems.length) % masonryItems.length;
    openLightbox(currentIndex);
  }

  masonryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => showRelative(-1));
  lightboxNext.addEventListener('click', () => showRelative(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
  });

  /* ---------------------------------------------------------
     9. FLOATING MUSIC PLAYER (autoplay starts once invitation opens;
        this button lets guests pause/resume)
  --------------------------------------------------------- */
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      setMusicPlaying(false);
    } else {
      bgMusic.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  });

  /* ---------------------------------------------------------
     10. AMBIENT FLOATING PARTICLES (soft gold bokeh)
  --------------------------------------------------------- */
  const particleField = document.getElementById('particles');
  const PARTICLE_COUNT = window.innerWidth < 700 ? 14 : 26;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 14 + 12}s`;
    p.style.animationDelay = `${Math.random() * 14}s`;
    particleField.appendChild(p);
  }

  /* ---------------------------------------------------------
     11. MOUSE PARALLAX ON HERO
  --------------------------------------------------------- */
  const heroImg = document.querySelector('.hero-img');
  const hero = document.querySelector('.hero');
  if (heroImg && hero && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 14;
      const y = (e.clientY / h - 0.5) * 14;
      if (window.gsap) {
        gsap.to(heroImg, { x, y, duration: 1.1, ease: 'power2.out', overwrite: 'auto' });
      }
    });
  }

  /* ---------------------------------------------------------
     12. GSAP SCROLL-TRIGGERED SIGNATURE MOTION (gold dividers)
  --------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.gold-divider').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0, opacity: 0 }, {
        scaleX: 1, opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }

});
