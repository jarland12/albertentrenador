/* ── TAB SWITCHING ── */
document.querySelectorAll('.day-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const day = tab.dataset.day;
    document.querySelectorAll('.day-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.day-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const target = document.querySelector(`.day-panel[data-day="${day}"]`);
    if (target) {
      target.classList.add('active');
      const tabBar = document.querySelector('.day-tabs-wrap');
      const offset = tabBar ? tabBar.offsetHeight : 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── STATS COUNTER ── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const startVal = parseFloat(el.dataset.start) || 0;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const startTime = performance.now();
  const isFloat = target % 1 !== 0 || startVal % 1 !== 0;

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = startVal + eased * (target - startVal);
    el.textContent = prefix + (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = prefix + target + suffix;
  }
  requestAnimationFrame(update);
}

/* ── INTERSECTION OBSERVER ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.dataset.target !== undefined) animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .stat-num[data-target], .progress-bar-fill').forEach(el => observer.observe(el));

/* ── SMOOTH SCROLL FOR ANCHORS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

/* ── CARDIO TOGGLE ── */
document.querySelectorAll('.cardio-header').forEach(header => {
  header.addEventListener('click', e => {
    e.stopPropagation();
    const clickedOpt = header.closest('.cardio-opt');
    const isOpen = clickedOpt.classList.contains('open');
    document.querySelectorAll('.cardio-opt').forEach(opt => opt.classList.remove('open'));
    if (!isOpen) {
      clickedOpt.classList.add('open');
      clickedOpt.style.boxShadow = '0 0 40px rgba(255,0,68,0.6)';
      setTimeout(() => clickedOpt.style.boxShadow = '', 300);
    }
  });
});
