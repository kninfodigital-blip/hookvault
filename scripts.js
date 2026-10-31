/* ==========================================================================
   Hook Vault — landing v4 · scripts (vanilla, sin librerías)
   1. Progreso de lectura y CTA pegajoso
   2. Revelado al hacer scroll y contador 5,000 → 3
   3. El celular del hero: los 3 primeros segundos de un Reel
   4. Malla animada del hero (canvas 2D, misma pieza que apknowin.com)
   5. El Selector en vivo (4 objetivos × 4 de los 12 negocios)
   6. Las 35 categorías en movimiento
   7. La baraja de los 10 ganchos gratis, con «Copiar»
   8. Días que quedan para los regalos (fecha fija: 31-12-2026)
   9. Medición: InitiateCheckout y Purchase al píxel de Hook Vault (Lemon.js)
   Con «reducir movimiento» no hay tecleo, ni malla, ni contadores: todo queda visible.
   ========================================================================== */

(function () {
  'use strict';

  var reducido = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var OBJETIVOS = {
    vean: 'Que te vean',
    guarden: 'Que te guarden',
    escriban: 'Que te escriban',
    compren: 'Que te compren'
  };

  // Ganchos adaptados de plantillas del Banco. [dice, en pantalla]
  var SELECTOR = {
    vean: {
      belleza: [
        ['El error número uno que hace que tu tinte dure la mitad.', 'Tu tinte dura la mitad por esto'],
        ['Nadie te cuenta esto antes de cortarte el fleco.', 'Antes de cortarte el fleco…'],
        ['Llevas años lavándote el cabello mal. Te explico por qué.', 'Te lavas el cabello mal (y no lo sabes)']
      ],
      impuestos: [
        ['Tu reembolso no es pequeño por mala suerte. Es por esto.', '¿Reembolso pequeño? Esta es la razón'],
        ['Casi nadie revisa esto antes de declarar, y eso les cuesta dinero.', 'Revisa esto antes de declarar'],
        ['La forma más rápida de que el IRS te mande una carta.', 'Así te llega una carta del IRS']
      ],
      casas: [
        ['El error número uno al buscar tu primera casa.', 'Error #1 al comprar tu primera casa'],
        ['Esta casa tiene un detalle que casi nadie ve en la visita.', '¿Lo ves? Casi nadie lo ve'],
        ['Si rentas, mira esto antes de firmar otro año.', 'Antes de renovar tu contrato…']
      ],
      comida: [
        ['La razón por la que tu salsa no sabe como la de tu abuela.', 'Por esto tu salsa no sabe igual'],
        ['Esto es lo que pasa en la cocina 10 minutos antes de abrir.', '10 minutos antes de abrir…'],
        ['Esto no te lo cuenta nadie: así hacemos las tortillas aquí.', 'Así hacemos las tortillas']
      ]
    },
    guarden: {
      belleza: [
        ['3 cosas que tienes que hacer después del tinte para que dure.', 'Guárdalo para tu próximo tinte'],
        ['Si tu cabello se esponja con la humedad, haz esto.', 'Cabello esponjado: haz esto'],
        ['La forma fácil de que tu fade se vea limpio dos semanas.', 'Fade limpio 2 semanas']
      ],
      impuestos: [
        ['Guarda este video: los 5 papeles que necesitas para declarar.', '5 papeles para declarar'],
        ['Si trabajas por tu cuenta, haz esto cada mes para no sufrir en abril.', '¿Trabajas por tu cuenta? Haz esto'],
        ['Arregla tu desorden de recibos en 3 pasos.', 'Recibos en orden: 3 pasos']
      ],
      casas: [
        ['Las 4 preguntas que tienes que hacer en cualquier visita a una casa.', '4 preguntas en cada visita'],
        ['Cómo saber cuánto puedes pagar por una casa, en 3 pasos.', '¿Cuánto puedes pagar por una casa?'],
        ['Si te negaron el préstamo, esto es lo primero que tienes que revisar.', '¿Te negaron el préstamo? Revisa esto']
      ],
      comida: [
        ['El truco para que el arroz no se pegue no es lo que crees.', 'Arroz que no se pega'],
        ['Guarda esta receta: la salsa verde de la casa en 5 minutos.', 'Salsa verde en 5 minutos'],
        ['Cómo recalentar tacos sin que queden duros.', 'Tacos recalentados como recién hechos']
      ]
    },
    escriban: {
      belleza: [
        ['Escríbeme “FOTO” y te digo qué corte le queda a tu cara.', 'Escríbeme FOTO'],
        ['¿Te pintas el cabello en casa? Cuéntame qué tinte usas y te digo si te conviene.', '¿Qué tinte usas?'],
        ['Si tu barba crece dispareja, no es tu culpa. Mándame una foto y te digo qué hacer.', '¿Barba dispareja?']
      ],
      impuestos: [
        ['¿Te llegó una carta del IRS y no la entiendes? Escríbeme “CARTA”.', '¿Carta del IRS? Escribe CARTA'],
        ['Cuéntame en los comentarios cuánto tiempo llevas sin declarar. Nadie te va a juzgar.', '¿Cuánto llevas sin declarar?'],
        ['Si no sabes si te conviene una LLC o seguir por tu cuenta, escríbeme y lo vemos.', '¿LLC o por tu cuenta?']
      ],
      casas: [
        ['Escríbeme tu código postal y te digo cómo se están moviendo los precios en tu zona.', 'Escribe tu código postal'],
        ['¿Rentas y crees que nunca vas a poder comprar? Cuéntame tu caso.', '¿Crees que nunca podrás comprar?'],
        ['Si te dijeron que necesitas un 20 % de pago inicial, espera. Escríbeme “CASA”.', '¿20 % de pago inicial? Escribe CASA']
      ],
      comida: [
        ['¿Qué platillo quieres que agreguemos al menú? Te leo en los comentarios.', 'Tú eliges el próximo platillo'],
        ['Escríbeme “MENÚ” y te mando las opciones para tu fiesta.', '¿Fiesta? Escribe MENÚ'],
        ['Dime en los comentarios con qué acompañas los tamales. Hay debate.', '¿Con qué los acompañas?']
      ]
    },
    compren: {
      belleza: [
        ['Así llegó su cabello. Así salió.', 'Antes y después de hoy'],
        ['Si te dijeron que el balayage no es para cabello oscuro, mira esto.', 'Balayage en cabello oscuro'],
        ['La gente no paga un corte. Paga por salir sintiéndose otra persona.', 'Agenda tu cita: enlace en el perfil']
      ],
      impuestos: [
        ['Lo que cuesta hacer tus impuestos con nosotros, explicado en 30 segundos.', 'Precio claro, sin sorpresas'],
        ['Cuando dices «lo hago yo y ya», esto es lo que te puede costar.', '¿Lo haces tú solo? Mira esto'],
        ['¿Qué pasa si sigues sin declarar? Te lo explico antes de que sea tarde.', '¿Y si no declaras?']
      ],
      casas: [
        ['Esta casa sale al mercado esta semana. Te la enseño antes que nadie.', 'Nueva esta semana: mírala primero'],
        ['¿Y si pagas de renta casi lo mismo que pagarías de hipoteca? Hagamos la cuenta.', 'Renta o hipoteca: la cuenta'],
        ['Nunca compres una casa por las fotos. Cómprala por esto.', 'Lo que no sale en las fotos']
      ],
      comida: [
        ['Este es el plato que más piden los viernes. Y hoy es viernes.', 'El favorito de los viernes'],
        ['Si nunca has probado la birria, empieza por aquí.', 'Tu primera birria, aquí'],
        ['Cuánto cuesta dar de comer a 20 personas con nosotros, en 30 segundos.', 'Fiesta para 20: el precio']
      ]
    }
  };

  // Los 10 gratis: texto exacto del Banco. [categoría, plantilla, ejemplo, psicología]
  var GRATIS = [
    ['Problema-Solución', 'No tienes problema de [X] — tienes problema de [causa real].', 'No tienes problema de contenido — tienes problema de mensaje.', 'Reencuadre de dolor.'],
    ['Problema-Solución', 'El error #1 que te mantiene en [problema].', 'El error #1 que te mantiene con bajo ingreso es cobrar barato.', 'Claridad de un solo error.'],
    ['Ventas y Persuasión', 'Tu precio no es muy alto, tu valor no es claro.', 'El mismo reloj de $1.000 parece barato si “salva vidas” vs “da la hora”.', 'Reencuadre valor vs coste.'],
    ['Problema-Solución', 'Si [síntoma], este es tu problema real.', 'Si tus posts reciben likes pero no comentarios, este es el real.', 'Síntoma → causa.'],
    ['Problema-Solución', 'Tu [problema] no es tu culpa — por esto.', 'Tus bajas vistas no son tu culpa — es el algoritmo.', 'Quita culpa → confianza.'],
    ['Ventas y Persuasión', 'Cuando la gente dice “me lo pienso”, están diciendo “aún no confío”.', 'Arregla la confianza, no presiones más.', 'Déficit de confianza.'],
    ['Problema-Solución', 'No necesitas [cosa asumida] para [meta].', 'No necesitas cámaras fancy para crear contenido.', 'Rompe expectativa — baja barreras.'],
    ['Problema-Solución', 'Si tuviera que empezar de cero, así arreglaría [problema].', 'Si tuviera que empezar de cero, así arreglaría las bajas ventas.', 'Autoridad por retrospectiva.'],
    ['Ventas y Persuasión', 'La gente no compra cuando te entiende. Compra cuando se siente entendida.', 'Un coach fitness vende más diciendo “sé cómo se siente estar estancado” que “mi programa tiene 50 entrenamientos”.', 'Disparador de empatía.'],
    ['Problema-Solución', 'El truco para resolver [problema] no es lo que crees.', 'El truco para resolver el bajo alcance no es más contenido — son mejores hooks.', 'Rompe expectativas.']
  ];

  var HERO = [
    ['vean', 'Que te vean · Impuestos', 'Tu reembolso no es pequeño por mala suerte. Es por esto.'],
    ['escriban', 'Que te escriban · Belleza', 'Escríbeme “FOTO” y te digo qué corte le queda a tu cara.'],
    ['compren', 'Que te compren · Comida', 'Este es el plato que más piden los viernes. Y hoy es viernes.']
  ];

  var CATEGORIAS = [
    'Productividad y Gestión del Tiempo', 'Productividad y Enfoque', 'Creación de Contenido y Creatividad',
    'Dinero, Riqueza y Negocios', 'Negocios y Emprendimiento', 'Marketing y Marca Personal', 'Curiosidad e Intriga',
    'Identificable y Punto de Vista', 'Identificable y Vida Cotidiana', 'Ventas y Persuasión', 'Cambios de Mentalidad',
    'Soluciones', 'FOMO y Urgencia', 'Curiosidad y Bucle Abierto', 'Educativos', 'Visión de Futuro y Aspiracional',
    'Estilo de Vida e Identificación', 'Motivacional e Inspiracional', 'Persuasión y Psicología de Ventas',
    'Prueba Social y Testimonios', 'Rompe-Objeciones y Rompe-Mitos', 'Salud y Fitness', 'Miedo y Urgencia',
    'Dinero y Finanzas', 'Casos de Estudio y Pruebas', 'Motivación y Mentalidad', 'Autoridad y Experiencia',
    'Identificables', 'Problema-Solución', 'Verdades Impactantes y Descubrimientos', 'Temas Tendencia y Actualidad',
    'Transformación e Historia de Éxito', 'Humor y Entretenimiento', 'Urgencia y Narrativa', 'Estilo de Vida y Hábitos Diarios'
  ];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  function crear(tag, clase, texto) {
    var el = document.createElement(tag);
    if (clase) el.className = clase;
    if (texto) el.textContent = texto;
    return el;
  }

  function dato(clase, etiqueta, texto) {
    var p = crear('p', clase);
    p.appendChild(crear('span', '', etiqueta));
    p.appendChild(document.createTextNode(' ' + texto));
    return p;
  }

  // Escribe un texto letra a letra; se cancela si llega otra orden para el mismo elemento
  function teclear(el, texto, ms, alTerminar) {
    var orden = (el._orden || 0) + 1; el._orden = orden;
    if (reducido) { el.textContent = texto; if (alTerminar) alTerminar(); return; }
    var t0 = 0;
    el.textContent = '';
    function paso(ahora) {
      if (el._orden !== orden) return;
      if (!t0) t0 = ahora;
      var n = Math.min(texto.length, Math.ceil((ahora - t0) / ms * texto.length));
      el.textContent = texto.slice(0, n);
      if (n < texto.length) requestAnimationFrame(paso); else if (alTerminar) alTerminar();
    }
    requestAnimationFrame(paso);
  }

  // ---------- 1. Progreso y CTA pegajoso ----------

  var barraProgreso = $('.progreso');
  var pegajoso = $('.pegajoso');
  var hero = $('.hero');
  var finesVisibles = 0, pasadoHero = false, pendiente = false;

  function pintarScroll() {
    pendiente = false;
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (barraProgreso) barraProgreso.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
  }
  addEventListener('scroll', function () { if (!pendiente) { pendiente = true; requestAnimationFrame(pintarScroll); } }, { passive: true });
  pintarScroll();

  function pintarPegajoso() { if (pegajoso) pegajoso.classList.toggle('on', pasadoHero && finesVisibles === 0); }
  if ('IntersectionObserver' in window) {
    if (hero) new IntersectionObserver(function (es) {
      pasadoHero = !es[0].isIntersecting && es[0].boundingClientRect.top < 0; pintarPegajoso();
    }, { threshold: 0 }).observe(hero);
    $$('[data-sticky-fin]').forEach(function (fin) {
      var dentro = false;
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting !== dentro) { dentro = es[0].isIntersecting; finesVisibles += dentro ? 1 : -1; pintarPegajoso(); }
      }, { threshold: 0.1 }).observe(fin);
    });
  }

  // ---------- 2. Revelado y contador ----------

  var cuenta = $('[data-cuenta]');
  var cuentaTexto = $('[data-cuenta-texto]');
  var formato = function (n) { return n.toLocaleString('en-US'); };

  function contar() {
    if (!cuenta || reducido) return;
    var desde = 5000, hasta = 3, dur = 1900, t0 = 0;
    cuentaTexto.textContent = 'ganchos';
    function paso(ahora) {
      if (!t0) t0 = ahora;
      var p = Math.min(1, (ahora - t0) / dur);
      var suave = 1 - Math.pow(1 - p, 4);
      cuenta.textContent = formato(Math.round(desde - (desde - hasta) * suave));
      if (p < 1) requestAnimationFrame(paso);
      else cuentaTexto.textContent = 'fichas para grabar hoy';
    }
    requestAnimationFrame(paso);
  }
  if (cuenta && !reducido) { cuenta.textContent = '5,000'; cuentaTexto.textContent = 'ganchos'; }

  var revelar = $$('.rv');
  if (!('IntersectionObserver' in window) || reducido) {
    revelar.forEach(function (el) { el.classList.add('in', 'hecho'); });
  } else {
    var obsRv = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add('in');
        obsRv.unobserve(el);
        if (el.hasAttribute('data-embudo')) setTimeout(contar, 250);
        setTimeout(function () { el.classList.add('hecho'); }, 900 + (parseInt(el.style.getPropertyValue('--d'), 10) || 0));
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revelar.forEach(function (el) {
      var hermanos = el.parentElement ? $$(':scope > .rv', el.parentElement) : [];
      var i = hermanos.indexOf(el);
      if (i > 0) el.style.setProperty('--d', (i % 4) * 90 + 'ms');
      obsRv.observe(el);
    });
  }

  // ---------- 3. El celular del hero ----------

  (function () {
    var chip = $('[data-chip]'), texto = $('[data-gancho]'), seg = $('[data-seg]'), barra = $('[data-barra]');
    if (!chip || !texto || reducido) return;
    var i = 0, vueltas = 0, MAX = HERO.length * 3;
    function uno() {
      if (vueltas >= MAX) return; // se queda quieto en el último gancho
      var h = HERO[i], t0 = 0;
      chip.textContent = h[1];
      chip.style.setProperty('--obj', 'var(--' + h[0] + ')');
      teclear(texto, h[2], 1500);
      function reloj(ahora) {
        if (!t0) t0 = ahora;
        var t = ahora - t0;
        barra.style.transform = 'scaleX(' + Math.min(1, t / 3000) + ')';
        seg.textContent = '0:0' + Math.min(3, Math.floor(t / 1000));
        if (t < 3000) requestAnimationFrame(reloj);
        else setTimeout(function () { i = (i + 1) % HERO.length; vueltas++; uno(); }, 1700);
      }
      requestAnimationFrame(reloj);
    }
    var empezar = function () { setTimeout(uno, 900); };
    if (document.readyState === 'complete') empezar(); else addEventListener('load', empezar, { once: true });
  })();

  // ---------- 4. Malla del hero (de apknowin.com, ≤ 3 KB) ----------

  (function iniciarMalla(canvas) {
    if (!canvas || reducido) return;
    if (navigator.connection && navigator.connection.saveData) return;
    var ctx = canvas.getContext('2d'); if (!ctx) return;
    var N = matchMedia('(max-width: 900px)').matches ? 10 : 16;
    var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    var w = 0, h = 0, t = 0, raf = 0, visible = true, ultimo = 0, listo = false;
    var pts = new Array((N + 1) * (N + 1));
    var NIVELES = 6, paths = [];
    function medir() { w = canvas.width = Math.floor(canvas.offsetWidth * DPR); h = canvas.height = Math.floor(canvas.offsetHeight * DPR); }
    function dibujar(ahora) {
      raf = 0;
      if (!visible || document.hidden) return;
      if (ahora - ultimo < 33) { raf = requestAnimationFrame(dibujar); return; }
      ultimo = ahora;
      ctx.clearRect(0, 0, w, h);
      t += 0.0055;
      var cx = w * 0.62, cy = h * 0.74, escala = Math.min(w, h) * 0.7;
      var c = Math.cos(t * 0.25), s = Math.sin(t * 0.25), i, j, k, p, q, nv;
      for (j = 0; j <= N; j++) for (i = 0; i <= N; i++) {
        var x = (i / N - 0.5) * 2, z = (j / N - 0.5) * 2;
        var y = Math.sin((i + j) * 0.38 * (16 / N) + t * 3.2) * 0.16 + Math.cos(i * 0.32 * (16 / N) - t * 2.4) * 0.1;
        var xr = x * c - z * s, zr = x * s + z * c, pr = 2.6 / (2.6 + zr);
        pts[j * (N + 1) + i] = { sx: cx + xr * escala * pr, sy: cy - y * escala * pr - zr * escala * 0.14 * pr, d: pr };
      }
      for (k = 0; k < NIVELES * 2; k++) paths[k] = new Path2D();
      for (j = 0; j <= N; j++) for (i = 0; i <= N; i++) {
        k = j * (N + 1) + i; p = pts[k];
        if (i < N) { q = pts[k + 1]; nv = Math.min(NIVELES - 1, Math.floor(Math.min(p.d, q.d) * NIVELES * 0.7)); paths[nv].moveTo(p.sx, p.sy); paths[nv].lineTo(q.sx, q.sy); }
        if (j < N) { q = pts[k + N + 1]; nv = Math.min(NIVELES - 1, Math.floor(Math.min(p.d, q.d) * NIVELES * 0.7)); paths[NIVELES + nv].moveTo(p.sx, p.sy); paths[NIVELES + nv].lineTo(q.sx, q.sy); }
      }
      ctx.lineWidth = DPR;
      for (k = 0; k < NIVELES; k++) {
        var a = (k + 1) / NIVELES;
        ctx.strokeStyle = 'rgba(25,184,255,' + (a * 0.42).toFixed(3) + ')'; ctx.stroke(paths[k]);
        ctx.strokeStyle = 'rgba(114,215,255,' + (a * 0.28).toFixed(3) + ')'; ctx.stroke(paths[NIVELES + k]);
      }
      raf = requestAnimationFrame(dibujar);
    }
    function arrancar() { if (listo && !raf && visible && !document.hidden) raf = requestAnimationFrame(dibujar); }
    medir();
    if ('ResizeObserver' in window) new ResizeObserver(function () { medir(); arrancar(); }).observe(canvas);
    document.addEventListener('visibilitychange', arrancar);
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; arrancar(); }, { threshold: 0.02 }).observe(canvas);
    function empezar() { listo = true; arrancar(); }
    function inicio() { if ('requestIdleCallback' in window) requestIdleCallback(empezar, { timeout: 1500 }); else setTimeout(empezar, 300); }
    if (document.readyState === 'complete') inicio(); else addEventListener('load', inicio, { once: true });
  })($('.hero__malla'));

  // ---------- 5. El Selector en vivo ----------

  var contFichas = document.getElementById('selectorFichas');
  var app = $('.app');
  var cmdObj = $('[data-cmd-obj]'), cmdNeg = $('[data-cmd-neg]');
  var estado = { objetivo: 'vean', negocio: 'belleza' };

  function pintarSelector() {
    var ganchos = SELECTOR[estado.objetivo][estado.negocio];
    if (cmdObj) teclear(cmdObj, '--objetivo ' + estado.objetivo, 350);
    if (cmdNeg) teclear(cmdNeg, '--negocio ' + estado.negocio, 350);
    if (app) app.style.setProperty('--obj-activo', 'var(--' + estado.objetivo + ')');
    contFichas.textContent = '';
    ganchos.forEach(function (g, n) {
      var ficha = crear('article', 'gancho es-nueva');
      ficha.style.setProperty('--obj', 'var(--' + estado.objetivo + ')');
      ficha.appendChild(crear('span', 'gancho__tag', OBJETIVOS[estado.objetivo]));
      var texto = crear('p', 'gancho__texto');
      var visible = crear('span');
      visible.setAttribute('aria-hidden', 'true');
      texto.appendChild(crear('span', 'v-oculto', '«' + g[0] + '»'));
      texto.appendChild(visible);
      ficha.appendChild(texto);
      ficha.appendChild(dato('gancho__pantalla', 'En pantalla:', g[1]));
      contFichas.appendChild(ficha);
      setTimeout(function () { teclear(visible, '«' + g[0] + '»', 700); }, n * 160);
    });
  }

  function enlazarGrupo(selector, clave) {
    var botones = $$(selector);
    botones.forEach(function (b) {
      b.addEventListener('click', function () {
        botones.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
        estado[clave] = b.getAttribute('data-' + clave);
        pintarSelector();
      });
    });
  }

  if (contFichas) {
    enlazarGrupo('.pestana[data-objetivo]', 'objetivo');
    enlazarGrupo('.chip[data-negocio]', 'negocio');
  }

  // ---------- 6. Las 35 categorías en movimiento ----------

  $$('[data-carril]').forEach(function (pista) {
    var mitad = pista.getAttribute('data-carril') === '0' ? CATEGORIAS.slice(0, 18) : CATEGORIAS.slice(18);
    // dos copias seguidas para que el bucle no corte
    mitad.concat(mitad).forEach(function (nombre) { pista.appendChild(crear('span', 'cat', nombre)); });
  });

  // ---------- 7. La baraja de los 10 gratis ----------

  var baraja = document.getElementById('baraja');
  var botonBaraja = document.getElementById('barajaSiguiente');
  var cuentaBaraja = document.getElementById('barajaCuenta');
  var inicio = 0;

  function copiar(texto, boton) {
    var hecho = function () {
      boton.textContent = 'Copiado ✓'; boton.classList.add('ok');
      setTimeout(function () { boton.textContent = 'Copiar'; boton.classList.remove('ok'); }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(hecho, function () {});
    } else {
      var area = crear('textarea'); area.value = texto; area.setAttribute('readonly', '');
      area.style.position = 'fixed'; area.style.opacity = '0';
      document.body.appendChild(area); area.select();
      try { document.execCommand('copy'); hecho(); } catch (e) { /* sin portapapeles */ }
      document.body.removeChild(area);
    }
  }

  function botonCopiar(texto) {
    var b = crear('button', 'copiar', 'Copiar');
    b.type = 'button';
    b.setAttribute('aria-label', 'Copiar la plantilla: ' + texto);
    b.addEventListener('click', function () { copiar(texto, b); });
    return b;
  }

  function pintarBaraja(animar) {
    baraja.textContent = '';
    var fin = Math.min(inicio + 3, GRATIS.length);
    for (var i = inicio; i < fin; i++) {
      var g = GRATIS[i];
      var ficha = crear('article', 'gratis' + (animar ? ' es-nueva' : ''));
      ficha.appendChild(crear('span', 'gratis__cat', g[0]));
      ficha.appendChild(crear('p', 'gratis__plantilla', '«' + g[1] + '»'));
      ficha.appendChild(dato('gratis__dato', 'Ejemplo:', g[2]));
      ficha.appendChild(dato('gratis__dato', 'Psicología:', g[3]));
      ficha.appendChild(botonCopiar(g[1]));
      baraja.appendChild(ficha);
    }
    cuentaBaraja.textContent = (inicio + 1) + (fin - inicio > 1 ? '-' + fin : '') + ' / ' + GRATIS.length;
    botonBaraja.textContent = fin >= GRATIS.length ? 'Volver a las 3 primeras' : 'Saca otras 3 fichas';
  }

  if (baraja && botonBaraja) {
    pintarBaraja(false);
    botonBaraja.addEventListener('click', function () {
      inicio = inicio + 3 >= GRATIS.length ? 0 : inicio + 3;
      pintarBaraja(true);
    });
  }

  // ---------- 8. Días que quedan para los regalos ----------

  (function () {
    var caja = $('[data-quedan]'); if (!caja) return;
    var fin = new Date(2027, 0, 1, 0, 0, 0); // termina al acabar el 31-12-2026 (hora del visitante)
    var dias = Math.ceil((fin - new Date()) / 86400000);
    if (dias <= 0) return;
    caja.querySelector('span').textContent = dias === 1 ? 'Hoy es el último día de los regalos' : 'Quedan ' + dias + ' días para los regalos';
    caja.hidden = false;
  })();

  // ---------- 9. Medición (píxel de Hook Vault) ----------

  function rastrear(evento, datos, opciones) {
    if (typeof window.fbq === 'function') window.fbq('track', evento, datos || {}, opciones || {});
  }

  $$('a.lemonsqueezy-button').forEach(function (a) {
    a.addEventListener('click', function () {
      rastrear('InitiateCheckout', { content_name: 'Hook Vault', value: 19.99, currency: 'USD' });
    });
  });

  var compraRegistrada = false;

  function alPagar(evento) {
    if (!evento || evento.event !== 'Checkout.Success' || compraRegistrada) return;
    compraRegistrada = true;
    var pedido = evento.data && evento.data.order && evento.data.order.data;
    var attrs = (pedido && pedido.attributes) || {};
    var valor = typeof attrs.total === 'number' ? attrs.total / 100 : 19.99;
    var moneda = attrs.currency || 'USD';
    var opciones = pedido && pedido.id ? { eventID: 'ls-order-' + pedido.id } : {};
    rastrear('Purchase', { content_name: 'Hook Vault', value: valor, currency: moneda }, opciones);
  }

  // lemon.js se inicia solo al cargar la página; después se registra el aviso de pago
  window.addEventListener('load', function () {
    if (!window.LemonSqueezy && typeof window.createLemonSqueezy === 'function') window.createLemonSqueezy();
    if (window.LemonSqueezy && typeof window.LemonSqueezy.Setup === 'function') {
      window.LemonSqueezy.Setup({ eventHandler: alPagar });
    }
  });
})();
