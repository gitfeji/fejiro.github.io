// Theme
const html = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

function toggleTheme() {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  function closeMenu() {
    menuOpen = false;
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  }

  function openMenu() {
    menuOpen = true;
    if (hamburger) {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    if (mobileMenu) {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => menuOpen ? closeMenu() : openMenu());
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (menuOpen && hamburger && mobileMenu &&
        !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });

  // Scroll reveal
  const els = document.querySelectorAll('.fade-up');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 90);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));

  // Active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (path.endsWith(href) || (href.includes('work') && path.includes('work')) ||
        (href.includes('about') && path.includes('about'))) {
      a.classList.add('active');
    }
  });

  // Nav shadow on scroll
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 30);
  }, { passive: true });
});
