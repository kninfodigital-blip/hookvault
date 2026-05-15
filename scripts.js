/* ==========================================================================
   Hook Vault V2 — Scripts (estructura QP)
   ========================================================================== */

// 1. Header sticky shadow
var header = document.querySelector('.site-header');
function handleScroll() {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

// 2. Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = this.getAttribute('href');
    if (id === '#') return;
    var el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      // Cerrar drawer si está abierto
      var drawer = document.getElementById('drawer');
      if (drawer && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }
  });
});

// 3. Animaciones de entrada (idénticas a QP: IntersectionObserver)
var animSections = document.querySelectorAll('.animate-section');
if ('IntersectionObserver' in window) {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate--shown');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  animSections.forEach(function (s) { obs.observe(s); });
} else {
  animSections.forEach(function (s) { s.classList.add('animate--shown'); });
}

// 4. Mobile drawer (menú lateral como QP)
var menuToggle = document.getElementById('menuToggle');
var drawer = document.getElementById('drawer');
var drawerOverlay = document.getElementById('drawerOverlay');
var drawerClose = document.getElementById('drawerClose');

function openDrawer() {
  drawer.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openDrawer);
if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
