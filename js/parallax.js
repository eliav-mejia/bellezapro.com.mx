/* Belleza Pro MX — parallax.js (v1.0.0)
   Moves elements with data-speed="0.1" (fraction of scroll) relative to the viewport centre.
   Off with prefers-reduced-motion and on small screens. */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.addEventListener('DOMContentLoaded', function () {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-speed]'));
    if (!els.length) return;
    var ticking = false;

    function update() {
      var mid = window.innerHeight / 2;
      var active = window.innerWidth > 900;
      els.forEach(function (el) {
        if (!active) { el.style.transform = ''; return; }
        var rect = el.parentElement.getBoundingClientRect();
        var offset = (rect.top + rect.height / 2 - mid) * parseFloat(el.getAttribute('data-speed'));
        el.style.transform = 'translate3d(0,' + offset.toFixed(1) + 'px,0)';
      });
      ticking = false;
    }
    function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    update();
  });
})();
