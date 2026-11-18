// Site-wide behaviour: translucent nav, mega menu, mobile sheet, reveal, counters, timeline.
document.documentElement.classList.remove('no-js');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav = document.querySelector('.nav');

// Scroll edge effect on nav (only when content actually sits under it)
const onScroll = () => nav && nav.classList.toggle('is-scrolled', scrollY > 4);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Nav colour follows the section under it (dark sections → ink material)
if (nav) {
  const inkSections = [...document.querySelectorAll('[data-nav="ink"]')];
  if (inkSections.length) {
    const update = () => {
      const y = nav.offsetHeight / 2;
      const over = inkSections.some((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      nav.classList.toggle('nav--ink', over);
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }
}

// Mega menu: open on pointer-down/hover instantly, close with a small grace period
document.querySelectorAll('.has-mega').forEach((item) => {
  const trigger = item.querySelector('[aria-expanded]');
  let closeTimer;
  const open = () => { clearTimeout(closeTimer); item.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
  const close = () => { closeTimer = setTimeout(() => { item.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); }, 120); };
  item.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') open(); });
  item.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') close(); });
  trigger.addEventListener('click', () => (item.classList.contains('is-open') ? close() : open()));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); trigger.focus(); } });
});

// Mobile sheet
const toggle = document.querySelector('.nav-toggle');
const sheet = document.querySelector('.sheet');
if (toggle && sheet) {
  toggle.addEventListener('click', () => {
    const open = !sheet.classList.contains('is-open');
    sheet.classList.toggle('is-open', open);
    nav.classList.toggle('is-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    sheet.inert = !open;
  });
  sheet.inert = true;
}

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-visible'));
}

// Count-up numbers (critically damped feel: ease-out, no overshoot)
const counters = document.querySelectorAll('[data-count]');
const fmt = new Intl.NumberFormat('tr-TR');
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const el = e.target;
    const end = parseFloat(el.dataset.count);
    const raw = el.dataset.raw === 'true';
    if (reduceMotion) { el.textContent = raw ? end : fmt.format(end); return; }
    const dur = 1400; const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      const v = Math.round(end * eased);
      el.textContent = raw ? v : fmt.format(v);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}, { threshold: 0.4 });
counters.forEach((c) => countIO.observe(c));

// Timeline scroll buttons
document.querySelectorAll('[data-scroller]').forEach((wrap) => {
  const track = wrap.querySelector('.timeline');
  wrap.querySelectorAll('[data-dir]').forEach((b) => b.addEventListener('click', () => {
    const card = track.querySelector('.card');
    const w = card ? card.getBoundingClientRect().width + 18 : 320;
    track.scrollBy({ left: Number(b.dataset.dir) * w, behavior: reduceMotion ? 'auto' : 'smooth' });
  }));
});
