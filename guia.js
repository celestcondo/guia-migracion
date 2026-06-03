/* ─────────────────────────────────────────────────────────
   Guía de Migración · interacción
   ───────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Icons (Lucide-style, stroke 1.5) ──────────────────── */
  const ICONS = {
    dollar: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    card: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    truck: '<path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2"/><path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-2"/><circle cx="7.5" cy="18.5" r="2.5"/><circle cx="17.5" cy="18.5" r="2.5"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    mega: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    share: '<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/>'
  };
  function svg(name, size) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONS[name] || '') + '</svg>';
  }
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    const name = el.getAttribute('data-icon');
    let size = 18;
    if (el.closest('.vlabel') || el.classList.contains('ic-inline')) size = 16;
    else if (el.classList.contains('ic') && el.closest('.tool')) size = 22;
    else if (el.classList.contains('ic') && el.closest('.share-card')) size = 22;
    el.innerHTML = svg(name, size);
    if (el.classList.contains('ic-inline')) {
      el.style.display = 'inline-flex';
      el.style.color = 'var(--ns-nimbus-blue)';
    }
  });

  /* ── Platform comparison data ──────────────────────────── */
  const PLATFORMS = {
    shopify: {
      name: 'Shopify', cells: {
        costo: { claim: 'Desde USD 20/mes + apps en USD', detail: 'Con cada devaluación el costo sube. El costo real puede duplicarse.', chip: 'Sube con el dólar' },
        pagos: { claim: 'Requiere apps de terceros en AR', detail: 'Sin checkout localizado ni cuotas automáticas argentinas.', chip: 'Sin cuotas locales' },
        logistica: { claim: 'Sin integración nativa con correos AR', detail: 'Necesita apps o desarrollos adicionales para OCA y Andreani.', chip: 'Apps extra' },
        soporte: { claim: 'Chatbot global en inglés', detail: 'Sin equipo dedicado para Argentina ni conocimiento de AFIP.', chip: 'En inglés' },
        marketing: { claim: 'Klaviyo y similares: USD adicionales', detail: 'No incluidos. Cada herramienta de marketing se paga aparte.', chip: 'Costo aparte' },
        apps: { claim: '+6.000 apps globales (muchas en USD)', detail: 'Las integraciones argentinas requieren apps pagas o desarrollo custom.', chip: 'Muchas en USD' }
      }
    },
    woo: {
      name: 'WooCommerce', cells: {
        costo: { claim: 'El plugin es gratis, el resto no', detail: 'Pagás hosting, certificado SSL, plugins premium y mantenimiento — costos que se acumulan, varios en USD.', chip: 'Costos ocultos' },
        pagos: { claim: 'Pagos vía plugins de terceros', detail: 'Conectar Mercado Pago y cuotas es configuración manual y mantenimiento propio.', chip: 'Configuración manual' },
        logistica: { claim: 'Sin envíos nativos en AR', detail: 'Cada correo necesita un plugin que instalás, configurás y mantenés vos.', chip: 'Plugin por correo' },
        soporte: { claim: 'Sin soporte oficial', detail: 'Dependés de foros, la comunidad o de pagarle a un desarrollador cuando algo se rompe.', chip: 'Sin respaldo' },
        marketing: { claim: 'Email y automatizaciones por plugins', detail: 'Funciones repartidas en extensiones de terceros, muchas pagas en USD.', chip: 'Plugins pagos' },
        apps: { claim: 'Miles de plugins, toda la responsabilidad es tuya', detail: 'Actualizaciones, seguridad y compatibilidad corren por tu cuenta. Un plugin roto puede tirar la tienda.', chip: 'Vos lo mantenés' }
      }
    },
    empretienda: {
      name: 'Empretienda', cells: {
        costo: { claim: 'Planes en pesos, ecosistema más chico', detail: 'Precio local, pero con menos herramientas incluidas y un ecosistema más limitado.', chip: 'Menos incluido' },
        pagos: { claim: 'Medios locales, sin solución propia', detail: 'Tiene medios de pago locales, pero sin el ahorro y el checkout optimizado de Pago Nube.', chip: 'Sin Pago Nube' },
        logistica: { claim: 'Integraciones de envío acotadas', detail: 'Cobertura de correos más limitada frente a Envío Nube.', chip: 'Cobertura menor' },
        soporte: { claim: 'Soporte local, equipo más chico', detail: 'Hay soporte, pero con un equipo y una cobertura mucho menores.', chip: 'Equipo chico' },
        marketing: { claim: 'Sin suite de marketing nativa', detail: 'No hay una herramienta de email y automatizaciones comparable a Marketing Nube.', chip: 'Sin Marketing Nube' },
        apps: { claim: 'Catálogo de apps reducido', detail: 'Menos apps e integraciones locales para hacer crecer la tienda.', chip: 'Menos integraciones' }
      }
    },
    tiendanegocio: {
      name: 'Tienda Negocio', cells: {
        costo: { claim: 'Atado a las reglas del marketplace', detail: 'Comisiones y condiciones que no controlás, sumadas al costo de vender en una plataforma de terceros.', chip: 'Comisiones' },
        pagos: { claim: 'Pagos limitados al marketplace', detail: 'Sin un checkout propio optimizado ni control sobre la experiencia de cobro.', chip: 'Sin checkout propio' },
        logistica: { claim: 'Logística del marketplace', detail: 'Dependés del esquema de envíos de la plataforma, con poca flexibilidad de correos.', chip: 'Poco flexible' },
        soporte: { claim: 'Soporte genérico', detail: 'Atención pensada para el marketplace, no para hacer crecer tu tienda independiente.', chip: 'Genérico' },
        marketing: { claim: 'Sin herramientas de marca propias', detail: 'No hay forma de construir una marca propia con email y automatizaciones.', chip: 'Sin marca propia' },
        apps: { claim: 'Personalización muy limitada', detail: 'Es como alquilar un local: poco control, casi sin apps ni integraciones propias.', chip: 'Local alquilado' }
      }
    }
  };

  const cmpPlat = document.getElementById('cmpPlat');
  const sharePlat = document.getElementById('sharePlat');
  const versus = document.getElementById('versus');
  const platGrid = document.getElementById('platGrid');

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function render(key) {
    const data = PLATFORMS[key];
    if (!data) return;
    if (cmpPlat) cmpPlat.textContent = data.name;
    if (sharePlat) sharePlat.textContent = data.name;

    versus.querySelectorAll('.vrow').forEach(function (row) {
      const rk = row.getAttribute('data-key');
      const cell = row.querySelector('[data-cell]');
      const c = data.cells[rk];
      if (!cell || !c) return;
      cell.innerHTML =
        '<span class="who"><span class="dotmark">✕</span> ' + escapeHtml(data.name) + '</span>' +
        '<span class="claim">' + escapeHtml(c.claim) + '</span>' +
        '<span class="detail">' + escapeHtml(c.detail) + '</span>' +
        '<span class="chip">' + escapeHtml(c.chip) + '</span>';
    });

    // subtle fade-in on the competitor column
    versus.querySelectorAll('.vcell--rival').forEach(function (cell) {
      cell.style.animation = 'none';
      // force reflow then re-apply
      void cell.offsetWidth;
      cell.style.transition = 'opacity 240ms ease';
      cell.style.opacity = '0';
      requestAnimationFrame(function () { cell.style.opacity = '1'; });
    });
  }

  if (platGrid) {
    platGrid.addEventListener('click', function (e) {
      const btn = e.target.closest('.plat');
      if (!btn) return;
      platGrid.querySelectorAll('.plat').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      render(btn.getAttribute('data-plat'));
    });
  }

  // initial render
  render('shopify');

  /* ── Reveal on scroll ──────────────────────────────────── */
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
    // Failsafe 1: reveal anything already in/above the viewport on load
    requestAnimationFrame(function () {
      reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.95) el.classList.add('in');
      });
    });
    // Failsafe 2: never leave content gated if IO doesn't fire
    setTimeout(showAll, 1400);
  } else {
    showAll();
  }
})();
