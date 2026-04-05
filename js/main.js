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
  const btn = document.getElementById('theme-btn');
  if (btn) btn.addEventListener('click', toggleTheme);

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

  // Active nav
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
    if (nav) nav.style.boxShadow = window.scrollY > 30 ? '0 4px 30px rgba(0,0,0,0.3)' : 'none';
  });
});
