/* Infografía · íconos de línea (Nimbus/Lucide 1.6) + reveal */
(function () {
  'use strict';
  const ICONS = {
    store: '<path d="M2 7l1.5-3.5A1 1 0 0 1 4.4 3h15.2a1 1 0 0 1 .9.5L22 7"/><path d="M4 7v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7"/><path d="M2 7a3 3 0 0 0 5 0 3 3 0 0 0 5 0 3 3 0 0 0 5 0 3 3 0 0 0 5 0"/>',
    dollar: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    card: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    truck: '<path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2"/><path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-2"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    trending: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8S13 3 16.5 3a2.5 2.5 0 0 1 0 5"/>',
    tools: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>'
  };
  function svg(name, size, sw) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.6) +
      '" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || '') + '</svg>';
  }
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    const name = el.getAttribute('data-icon');
    let size = 22, sw = 1.6;
    if (el.closest('.eyebrow') || el.closest('.tag')) { size = 15; }
    else if (el.closest('.btn-download')) { size = 16; sw = 2; }
    else if (el.closest('.btn-activate')) { size = 18; sw = 2; }
    else if (el.closest('.reason') || el.closest('.no-close') || el.closest('.ig-tool') || el.closest('.perk')) { size = 22; }
    el.innerHTML = svg(name, size, sw);
    el.style.display = 'inline-flex';
    el.style.alignItems = 'center';
  });

  // ── Descarga como PDF de una sola página (sin cortes) ──────────────────────
  window.downloadInfografia = function () {
    var poster = document.querySelector('.poster');
    if (!poster) { window.print(); return; }
    // Medir altura real del contenido y crear un @page del mismo alto
    // Sin multiplicador: print y screen renderizan al mismo tamaño ahora
    var h = Math.ceil(poster.scrollHeight) + 40;
    var styleId = 'ig-print-size';
    var prev = document.getElementById(styleId);
    if (prev) prev.parentNode.removeChild(prev);
    var st = document.createElement('style');
    st.id = styleId;
    // 620px de ancho (poster max-width 600px + márgenes laterales mínimos)
    st.textContent = '@page { size: 620px ' + h + 'px !important; margin: 0 !important; }';
    document.head.appendChild(st);
    window.print();
    // Limpiar después de imprimir
    setTimeout(function () {
      var el = document.getElementById(styleId);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, 4000);
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function showAll() { reveals.forEach(function (el) { el.classList.add('in'); }); }
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    requestAnimationFrame(function () {
      reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add('in');
      });
    });
    setTimeout(showAll, 1400);
  } else { showAll(); }
})();
