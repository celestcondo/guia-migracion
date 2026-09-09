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
        logistica: { claim: 'Sin integración nativa con correos AR', detail: 'Necesita apps o desarrollos adicionales.', chip: 'Apps extra' },
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
        costo: { claim: 'Planes más baratos, pero sin herramientas para crecer', detail: 'Sin Pago Nube, Envío Nube ni suite de marketing incluidos. Tiendanube incluye todo lo que necesitás para escalar desde el primer día.', chip: 'Sin herramientas de escala' },
        pagos: { claim: 'Sin solución de pago propia', detail: 'Tienda Negocio no tiene un checkout nativo optimizado. Pago Nube tiene todos los medios argentinos integrados y el checkout es 3x más rápido.', chip: 'Sin Pago Nube' },
        logistica: { claim: 'Integraciones de envío más básicas', detail: 'Sin el alcance de Envío Nube (Andreani, Correo Argentino y más).', chip: 'Cobertura menor' },
        soporte: { claim: 'Soporte local, equipo más chico', detail: 'Hay soporte, pero con un equipo y una cobertura mucho menores.', chip: 'Soporte básico' },
        marketing: { claim: 'Sin integración nativa con Meta ni Google Shopping', detail: 'Tienda Negocio no tiene Marketing Nube ni conexión nativa con las principales plataformas de publicidad.', chip: 'Sin Marketing Nube' },
        apps: { claim: 'Ecosistema de apps muy limitado', detail: 'Sin el ecosistema de +200 apps locales (Xubio, Colppy, MELI, Facebook, Google) que tiene Tiendanube.', chip: 'Menos integraciones' }
      }
    }
  };

  /* ── Infografia URLs per platform ──────────────────────── */
  const INFOGRAFIA_URLS = {
    shopify:      'https://guia-migracion.vercel.app/infografia-migracion-shopify.html',
    woo:          'https://guia-migracion.vercel.app/infografia-migracion-woocommerce.html',
    empretienda:  'https://guia-migracion.vercel.app/infografia-migracion-empretienda.html',
    tiendanegocio:'https://guia-migracion.vercel.app/infografia-migracion-tiendanegocio.html'
  };

  /* ── Objections per platform ────────────────────────── */
  const OBJECTIONS = {
    shopify: [
      { title: '"Ya tengo todo configurado, no me conviene moverme"', quote: '"Me llevó meses configurar todo, no quiero empezar desde cero."', resps: ['Entiendo, y es válido proteger el trabajo que ya hiciste. La buena noticia es que <b>no empezás de cero</b>. Con Automágico o LitExtension, tu catálogo completo — productos, fotos, variaciones, precios — migra automáticamente vía API. No es copiar y pegar, es una importación automática. Lo que ya armaste se mueve con vos.', 'Las configuraciones de envío y pago son más simples en Tiendanube porque Pago Nube y Envío Nube ya están integrados — no hay que configurar APIs de terceros.'], tip: null },
      { title: '"Tengo miedo de perder datos o que se caigan mis ventas"', quote: '"¿Y si algo sale mal durante la migración? ¿Pierdo ventas?"', resps: ['No perdés nada porque el proceso es <b>en paralelo</b>. Las dos tiendas existen al mismo tiempo. Vos migrás el catálogo, configurás la nueva tienda, la probás al 100%, y recién cuando estás seguro redirigís el dominio. Shopify sigue activo mientras tanto. LitExtension hasta migra el historial de órdenes y los datos de clientes.'], tip: '<b>Dato clave:</b> El proceso es más rápido y seguro de lo que parece. La tienda en Shopify no se toca hasta que vos lo decidís.' },
      { title: '"Shopify tiene muchas más apps e integraciones"', quote: '"Shopify tiene miles de apps, Tiendanube parece limitado."', resps: ['Shopify tiene más apps globales, sí. Pero el 80% de lo que necesitás para vender en Argentina está <b>nativo en Tiendanube</b>, sin apps de pago adicionales: Pago Nube, Envío Nube, Marketing Nube, integración con Mercado Libre, Facebook, Google, ERPs locales como Xubio y Colppy. En Shopify, cada una de esas integraciones es una app que se paga en dólares por separado.'], tip: 'Preguntale qué apps usa en Shopify. Probablemente el <b>80% ya existe gratis o incluida</b> en el plan de Tiendanube.' },
      { title: '"¿No es complicado migrar? Parece mucho trabajo"', quote: '"Suena complejo, no tengo tiempo para eso."', resps: ['Tiene sentido que parezca complejo, pero no lo es. Con Automágico el catálogo se migra en minutos, automáticamente. Lo que lleva tiempo es la configuración inicial de la tienda nueva (diseño, dominio, medios de pago), pero eso es un proceso de pocas horas — no semanas. Además, si te sumás a la red de especialistas, podemos hacer esto juntos para tus clientes.'], tip: 'Podés ofrecerle al cliente hacer la migración por él, como un <b>servicio técnico aparte</b>. Es una oportunidad de ingreso adicional más allá de la comisión.' }
    ],
    woo: [
      { title: '"Ya tengo todo configurado, no me conviene moverme"', quote: '"Me llevó tiempo armarlo todo, no quiero empezar desde cero."', resps: ['Entiendo, y es válido. La buena noticia es que <b>no empezás de cero</b>. Con Automágico o LitExtension, tu catálogo completo migra automáticamente. Lo que ya armaste se mueve con vos.', 'Además, en Tiendanube no hay que mantener plugins ni gestionar actualizaciones. Pago Nube, Envío Nube y soporte vienen integrados — sin que vos tengas que encargarte de que no se rompa nada.'], tip: null },
      { title: '"Tengo miedo de perder datos o que se caigan mis ventas"', quote: '"¿Y si algo sale mal durante la migración? ¿Pierdo ventas?"', resps: ['No perdés nada porque el proceso es <b>en paralelo</b>. WooCommerce sigue activo mientras armás la nueva tienda. Vos migrás el catálogo, la probás al 100%, y recién cuando estás seguro redirigís el dominio. LitExtension migra productos, clientes e historial de órdenes completo.'], tip: '<b>Dato clave:</b> La migración desde WooCommerce es una de las más simples — el catálogo migra automáticamente vía API con Automágico.' },
      { title: '"WooCommerce es gratis, ¿por qué pagar por Tiendanube?"', quote: '"El plugin de WooCommerce no cuesta nada, Tiendanube tiene un costo mensual."', resps: ['WooCommerce es gratis de instalar, pero no de usar. Necesitás hosting (desde USD 10/mes), certificado SSL, plugins para medios de pago argentinos, plugins para cada correo y actualizaciones constantes. Gran parte se paga en dólares, y si algo se rompe, el soporte es tuyo. En Tiendanube, todo está incluido en un precio fijo en pesos: hosting, SSL, Pago Nube, Envío Nube y soporte 24/7.'], tip: 'Hacé la cuenta del costo real de WooCommerce: hosting + SSL + plugins premium. La mayoría de los clientes se sorprenden cuando lo calculan.' },
      { title: '"¿No es complicado migrar? Parece mucho trabajo"', quote: '"Suena complejo, no tengo tiempo para eso."', resps: ['Con Automágico el catálogo se migra en minutos, automáticamente. Lo que lleva tiempo es la configuración inicial (diseño, dominio, medios de pago), pero eso es pocas horas — no semanas. Y a diferencia de WooCommerce, en Tiendanube no hay plugins que mantener después.'], tip: 'Podés ofrecerle al cliente hacer la migración por él, como un <b>servicio técnico aparte</b>. Es una oportunidad de ingreso adicional más allá de la comisión.' }
    ],
    empretienda: [
      { title: '"Ya tengo todo configurado, no me conviene moverme"', quote: '"Mi tienda funciona bien, no quiero tocar lo que anda."', resps: ['Si vende bien ahora, es el mejor momento para dar el salto — antes de que el volumen haga el cambio más difícil. La buena noticia es que <b>no empezás de cero</b>: tu catálogo completo migra automáticamente con Automágico. Lo que ya armaste se mueve con vos.', 'Lo que cambia es el ecosistema al que accedés: Pago Nube (21,6% de ahorro en procesamiento), Envío Nube (16% más barato), Marketing Nube y +200 apps locales.'], tip: null },
      { title: '"Tengo miedo de perder datos o que se caigan mis ventas"', quote: '"¿Y si algo sale mal durante la migración? ¿Pierdo ventas?"', resps: ['No perdés nada porque el proceso es <b>en paralelo</b>. Empretienda sigue activa mientras armás la nueva tienda. Vos migrás el catálogo, la probás al 100%, y recién cuando estás seguro redirigís el dominio.'], tip: '<b>Caso real:</b> CeCe Piume migró de Empretienda en un día y no perdió ni una venta. El proceso es más rápido y seguro de lo que parece.' },
      { title: '"Empretienda está bien para lo que necesito ahora"', quote: '"Vendo, no tengo problemas, ¿para qué cambiar?"', resps: ['Si está funcionando, ese es justamente el mejor momento para escalar. Empretienda cubre lo básico, pero sin Pago Nube (21,6% de ahorro en cada transacción), sin Envío Nube y sin el ecosistema de +200 apps locales. A medida que crecés, cada una de esas herramientas se vuelve crítica para competir. Tiendanube está construido para acompañarte desde el inicio hasta el escalado.'], tip: '<b>Para usar con este cliente:</b> CeCe Piume migró de Empretienda en un día, sin perder una venta, y accedió a herramientas que antes no tenía.' },
      { title: '"¿No es complicado migrar? Parece mucho trabajo"', quote: '"Suena complejo, no tengo tiempo para eso."', resps: ['Con Automágico el catálogo se migra en minutos, automáticamente. Lo que lleva tiempo es la configuración inicial (diseño, dominio, medios de pago), pero eso es pocas horas — no semanas. Además, si te sumás a la red de especialistas, podemos hacer esto juntos para tus clientes.'], tip: 'Podés ofrecerle al cliente hacer la migración por él, como un <b>servicio técnico aparte</b>. Es una oportunidad de ingreso adicional más allá de la comisión.' }
    ],
    tiendanegocio: [
      { title: '"Ya tengo todo configurado, no me conviene moverme"', quote: '"Ya armé mi tienda, no quiero empezar de nuevo."', resps: ['Entiendo, y es válido. La buena noticia es que <b>no empezás de cero</b>. Con Automágico, tu catálogo completo migra automáticamente. Lo que ya armaste se mueve con vos.', 'Lo que cambia es a lo que accedés: Pago Nube, Envío Nube, Marketing Nube e integración nativa con Meta y Google Shopping. Todo eso no está disponible en Tienda Negocio.'], tip: null },
      { title: '"Tengo miedo de perder datos o que se caigan mis ventas"', quote: '"¿Y si algo sale mal durante la migración? ¿Pierdo ventas?"', resps: ['No perdés nada porque el proceso es <b>en paralelo</b>. Tu tienda en Tienda Negocio sigue activa mientras armás la nueva. Vos migrás el catálogo, la probás al 100%, y recién cuando estás seguro redirigís el dominio. LitExtension migra productos, clientes e historial de órdenes completo.'], tip: '<b>Dato clave:</b> El proceso es más rápido y seguro de lo que parece — nada se pierde.' },
      { title: '"Tienda Negocio es más barata, no me conviene pagar más"', quote: '"Tienda Negocio me cuesta menos por mes, ¿qué me da Tiendanube que justifique el precio?"', resps: ['Tiene lógica cuestionar el costo. Pero la pregunta real es qué perdés quedándote: sin Pago Nube, pagás de más en cada transacción (21,6% más en procesamiento). Sin Envío Nube, tus envíos cuestan 16% más que el promedio. Sin Meta y Google Shopping nativos, perdés visibilidad y ventas. En la mayoría de los casos, las herramientas de Tiendanube se pagan solas desde el primer mes.'], tip: 'Hacé el cálculo con el cliente: ¿cuántas ventas hace por mes? Con el ahorro de Pago Nube y Envío Nube, la diferencia de precio suele cubrirse fácilmente.' },
      { title: '"¿No es complicado migrar? Parece mucho trabajo"', quote: '"Suena complejo, no tengo tiempo para eso."', resps: ['Con Automágico el catálogo se migra en minutos, automáticamente. Lo que lleva tiempo es la configuración inicial (diseño, dominio, medios de pago), pero eso es pocas horas — no semanas. Además, si te sumás a la red de especialistas, podemos hacer esto juntos para tus clientes.'], tip: 'Podés ofrecerle al cliente hacer la migración por él, como un <b>servicio técnico aparte</b>. Es una oportunidad de ingreso adicional más allá de la comisión.' }
    ]
  };

  const cmpPlat = document.getElementById('cmpPlat');
  const sharePlat = document.getElementById('sharePlat');
  const versus = document.getElementById('versus');
  const platGrid = document.getElementById('platGrid');
  const objList = document.querySelector('#objeciones .obj-list');

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function render(key) {
    const data = PLATFORMS[key];
    if (!data) return;
    if (cmpPlat) cmpPlat.textContent = data.name;
    if (sharePlat) sharePlat.textContent = data.name;

    // Update the share-card button href to the platform-specific infografia
    var shareBtn = document.querySelector('.share-card .btn-inverse');
    if (shareBtn && INFOGRAFIA_URLS[key]) shareBtn.href = INFOGRAFIA_URLS[key];

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

    // Update objections for the selected platform
    if (objList && OBJECTIONS[key]) {
      var objs = OBJECTIONS[key];
      objList.innerHTML = objs.map(function (obj, i) {
        var respsHtml = obj.resps.map(function (r) { return '<p class="resp">' + r + '</p>'; }).join('');
        var tipHtml = obj.tip ? '<div class="tip">' + obj.tip + '</div>' : '';
        return '<details class="obj reveal in' + (i === 0 ? ' open' : '') + '">' +
          '<summary>' +
          '<span class="onum">' + (i + 1) + '</span>' +
          '<span class="otitle">' + escapeHtml(obj.title) + '</span>' +
          '<span class="ochevron">+</span>' +
          '</summary>' +
          '<div class="obody">' +
          '<p class="quote">' + obj.quote + '</p>' +
          respsHtml + tipHtml +
          '</div></details>';
      }).join('');
    }

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
