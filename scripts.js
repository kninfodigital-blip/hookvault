/* ==========================================================================
   Hook Vault — landing v3 · scripts
   1. El Selector en vivo (demostración: 4 objetivos × 4 de los 12 negocios)
   2. La baraja de los 10 ganchos gratis (de 3 en 3)
   3. Medición: InitiateCheckout y Purchase al píxel de Hook Vault (Lemon.js)
   ========================================================================== */

(function () {
  'use strict';

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

  // ---------- 1. El Selector en vivo ----------

  var contFichas = document.getElementById('selectorFichas');
  var estado = { objetivo: 'vean', negocio: 'belleza' };

  function pintarSelector() {
    var ganchos = SELECTOR[estado.objetivo][estado.negocio];
    contFichas.textContent = '';
    ganchos.forEach(function (g) {
      var ficha = crear('article', 'ficha es-nueva');
      ficha.style.setProperty('--tinta', 'var(--' + estado.objetivo + ')');
      ficha.appendChild(crear('span', 'ficha__pestana', OBJETIVOS[estado.objetivo]));
      ficha.appendChild(crear('p', 'ficha__gancho', '«' + g[0] + '»'));
      ficha.appendChild(dato('ficha__pantalla', 'En pantalla:', g[1]));
      contFichas.appendChild(ficha);
    });
  }

  function enlazarGrupo(selector, clave) {
    var botones = document.querySelectorAll(selector);
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

  // ---------- 2. La baraja de los 10 gratis ----------

  var baraja = document.getElementById('baraja');
  var botonBaraja = document.getElementById('barajaSiguiente');
  var cuenta = document.getElementById('barajaCuenta');
  var inicio = 0;

  function pintarBaraja() {
    baraja.textContent = '';
    var fin = Math.min(inicio + 3, GRATIS.length);
    for (var i = inicio; i < fin; i++) {
      var g = GRATIS[i];
      var ficha = crear('article', 'ficha ficha--banco es-nueva');
      ficha.appendChild(crear('span', 'ficha__pestana', g[0]));
      ficha.appendChild(crear('p', 'ficha__gancho', '«' + g[1] + '»'));
      ficha.appendChild(dato('ficha__dato', 'Ejemplo:', g[2]));
      ficha.appendChild(dato('ficha__dato', 'Psicología:', g[3]));
      baraja.appendChild(ficha);
    }
    cuenta.textContent = (inicio + 1) + (fin - inicio > 1 ? '-' + fin : '') + ' / ' + GRATIS.length;
    botonBaraja.textContent = fin >= GRATIS.length ? 'Volver a las 3 primeras' : 'Saca otras 3 fichas';
  }

  if (baraja && botonBaraja) {
    botonBaraja.addEventListener('click', function () {
      inicio = inicio + 3 >= GRATIS.length ? 0 : inicio + 3;
      pintarBaraja();
    });
  }

  // ---------- 3. Medición (píxel de Hook Vault) ----------

  function rastrear(evento, datos, opciones) {
    if (typeof window.fbq === 'function') window.fbq('track', evento, datos || {}, opciones || {});
  }

  document.querySelectorAll('a.lemonsqueezy-button').forEach(function (a) {
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
