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

  // El Selector real (selector_negocios.csv): 4 de los 12 negocios, 3 ganchos por objetivo. [dice, en pantalla, sin salir a cámara]
  var SELECTOR = {
    "vean": {
      "belleza": [
        [
          "Nadie viene por un corte; viene a salir sintiéndose otra persona.",
          "No es un corte, es cómo sales",
          true
        ],
        [
          "Los clientes que piden «solo las puntitas» me hacen reír.",
          "Cuando piden solo las puntitas",
          false
        ],
        [
          "Si te vas a decolorar en casa, estás a un paso del desastre.",
          "Decolorar en casa: un paso del desastre",
          true
        ]
      ],
      "impuestos": [
        [
          "Declarar con el primo que sabe de impuestos se siente seguro, pero es peligroso.",
          "¿Quién te prepara los impuestos?",
          true
        ],
        [
          "Después de [años] años preparando impuestos, esto es lo que nadie te cuenta.",
          "[años] años preparando impuestos",
          false
        ],
        [
          "No tienes un problema de impuestos, tienes un problema de recibos.",
          "Tu problema no son los impuestos",
          true
        ]
      ],
      "casas": [
        [
          "Todo el que renta conoce este dolor: pagar cada mes y nada es tuyo.",
          "Pagas cada mes y nada es tuyo",
          true
        ],
        [
          "Mis clientes me repiten la misma frase antes de comprar su primera casa…",
          "La frase que todos me dicen",
          true
        ],
        [
          "Creer que necesitas un pago inicial enorme para comprar casa es un mito.",
          "El mito del pago inicial",
          true
        ]
      ],
      "comida": [
        [
          "Si un viernes a mediodía en esta cocina no es caos, ¿qué es?",
          "Viernes a mediodía en la cocina",
          true
        ],
        [
          "POV: llega un pedido de [número] tacos justo cuando íbamos a cerrar.",
          "La lucha es real",
          true
        ],
        [
          "El mayor mito de la comida mexicana es que todo tiene que picar.",
          "No, no todo pica",
          true
        ]
      ]
    },
    "guarden": {
      "belleza": [
        [
          "Esta es la verdadera razón de que tu rubio se ponga anaranjado.",
          "Por qué tu rubio se pone naranja",
          false
        ],
        [
          "Lo que necesitas saber antes de decolorarte el pelo.",
          "Antes de decolorarte, mira esto",
          true
        ],
        [
          "Esto es lo único que necesitas saber sobre el champú morado.",
          "Champú morado: lo único que importa",
          true
        ]
      ],
      "impuestos": [
        [
          "Si te cansaste de buscar recibos a última hora, prueba esto desde hoy.",
          "Adiós a buscar recibos en abril",
          true
        ],
        [
          "Este es el consejo de impuestos que le doy a mi propia familia.",
          "Lo que le digo a mi familia",
          false
        ],
        [
          "Te dejo una guía fácil de qué papeles traer a tu cita de impuestos.",
          "Qué papeles traer a tu cita",
          true
        ]
      ],
      "casas": [
        [
          "Si estás pensando en comprar tu primera casa, mira esto primero.",
          "Antes de comprar tu primera casa",
          true
        ],
        [
          "Comparé rentar y comprar en [ciudad] para que tú no tengas que hacerlo.",
          "Rentar o comprar en [ciudad]",
          true
        ],
        [
          "Cómo preparar tu casa para venderla en 3 pasos simples.",
          "Lista para vender en 3 pasos",
          true
        ]
      ],
      "comida": [
        [
          "Si has intentado hacer tortillas en casa y se te rompen, es por esto.",
          "Tortillas que no se rompen",
          true
        ],
        [
          "Por esto tu salsa casera no sabe como la de la taquería.",
          "El secreto está en el comal",
          true
        ],
        [
          "Guía a prueba de errores para calcular cuántos tacos pedir para tu fiesta.",
          "¿Cuántos tacos por invitado?",
          true
        ]
      ]
    },
    "escriban": {
      "belleza": [
        [
          "Si el precio no importara, ¿qué te harías en el pelo mañana mismo?",
          "Sin pensar en precio, ¿qué te harías?",
          true
        ],
        [
          "Sé honesto: tú también te has cortado el fleco en casa, ¿verdad?",
          "¿Tú también te cortaste el fleco?",
          false
        ],
        [
          "¿Por qué los tutoriales dicen «diez minutos» y el peinado te toma una hora?",
          "Tutorial: 10 minutos. Tú: una hora",
          true
        ]
      ],
      "impuestos": [
        [
          "Te están mintiendo con eso de que a todos les toca reembolso grande; escríbeme DUDA.",
          "¿Reembolso grande para todos? No",
          false
        ],
        [
          "El mito de que con ITIN no se puede declarar hace daño, ¿tú lo creías?",
          "Con ITIN sí se declara",
          true
        ],
        [
          "¿Tú también tienes recibos regados en la guantera o soy solo yo?",
          "¿Recibos en la guantera?",
          true
        ]
      ],
      "casas": [
        [
          "Dime en los comentarios qué te impide comprar tu casa ahora mismo.",
          "¿Qué te impide comprar casa?",
          true
        ],
        [
          "Como agente de bienes raíces, esta es mi opinión sobre rentar toda la vida.",
          "Rentar toda la vida: ¿qué opinas?",
          false
        ],
        [
          "¿Solo a ti te pasa o la casa que te gusta siempre se vende primero?",
          "¿También te pasa? Cuéntame abajo",
          false
        ]
      ],
      "comida": [
        [
          "Resolvamos este debate de una vez por todas: ¿salsa verde o roja?",
          "¿Verde o roja? Vota abajo",
          false
        ],
        [
          "Dime que eres fan de los tacos sin decirme que eres fan de los tacos.",
          "Te leo en los comentarios",
          true
        ],
        [
          "No mientas, tú también te comiste el pan dulce en el carro.",
          "Confiesa en los comentarios",
          false
        ]
      ]
    },
    "compren": {
      "belleza": [
        [
          "Arreglar un tinte que salió mal es más fácil de lo que crees.",
          "¿Tinte que salió mal? Tiene arreglo",
          true
        ],
        [
          "Cuando mis clientas salen de aquí y empiezan a presumir su pelo…",
          "Cuando salen presumiendo su pelo",
          true
        ],
        [
          "No te duermas: me quedan [número] citas para este sábado.",
          "Quedan [número] citas este sábado",
          true
        ]
      ],
      "impuestos": [
        [
          "La fecha límite del IRS no se mueve, ¿y tú cuándo te mueves?",
          "Aparta tu cita antes del [fecha]",
          true
        ],
        [
          "Esperar a abril no hace tus impuestos más fáciles, solo más apurados.",
          "Esperar no lo hace más fácil",
          true
        ],
        [
          "No me lo creas a mí, mira lo que me escribió [nombre] después de declarar.",
          "Lo dice [nombre], no yo",
          true
        ]
      ],
      "casas": [
        [
          "Si crees que ya se te pasó el tiempo de comprar casa, puede que no.",
          "¿Ya es tarde para comprar?",
          false
        ],
        [
          "Si tu renta sube cada año, no tienes por qué vivir con eso.",
          "¿Tu renta sube cada año?",
          true
        ],
        [
          "Si quieres tener tus propias llaves en la mano, empieza aquí.",
          "Tus propias llaves empiezan aquí",
          true
        ]
      ],
      "comida": [
        [
          "El [platillo de temporada] no vuelve hasta el año que viene.",
          "Solo por temporada",
          true
        ],
        [
          "El platillo que no puedo dejar de comer, y eso que lo cocino yo.",
          "Mi favorito: [platillo]",
          false
        ],
        [
          "Pero no tengo tiempo de cocinar para la fiesta…",
          "Tú celebras, nosotros cocinamos",
          true
        ]
      ]
    }
  };

  // Los 10 gratis (tarea 4.1): fichas de «Los 100 ganchos listos para grabar»
  var GRATIS = [
    {
      "n": "008",
      "obj": "vean",
      "sin": true,
      "dices": "No es tu culpa que [tu problema]. Te explico por qué.",
      "pantalla": "No es tu culpa",
      "toma": "Debajo del texto, primero el problema tal como se ve (una mano peinando un pelo esponjado frente al espejo, un celular lleno de avisos) y luego un primer plano de lo que de verdad lo causa, como la plancha demasiado caliente o las notificaciones.",
      "porque": "Quitarle la culpa a alguien lo alivia y lo pone de tu lado antes de que digas nada más.",
      "ej": [
        [
          "Salón de belleza",
          "No es tu culpa que tu pelo se esponje. Te explico por qué."
        ],
        [
          "Coach",
          "No es tu culpa que no te alcance el tiempo. Te explico por qué."
        ]
      ]
    },
    {
      "n": "010",
      "obj": "vean",
      "sin": true,
      "dices": "POV: crees que [tu servicio] es fácil… hasta que lo intentas.",
      "pantalla": "Parecía fácil en YouTube",
      "toma": "Debajo del texto, un intento casero que sale mal a propósito (un fleco chueco, unos tamales desbaratados) y al final el resultado bien hecho por ti.",
      "porque": "Todos hemos querido hacerlo solos y nos salió mal; reírse de eso une y de paso muestra por qué vale la pena tu trabajo.",
      "ej": [
        [
          "Salón de belleza",
          "POV: crees que cortarte el fleco es fácil… hasta que lo intentas."
        ],
        [
          "Comida",
          "POV: crees que hacer tamales es fácil… hasta que lo intentas."
        ]
      ]
    },
    {
      "n": "013",
      "obj": "vean",
      "sin": true,
      "dices": "La pregunta que le hago a cada [cliente] el primer día.",
      "pantalla": "Siempre pregunto esto primero",
      "toma": "Debajo del texto, la pregunta escrita a mano en una libreta o en tu hoja de registro, con un acercamiento lento palabra por palabra.",
      "porque": "Todos quieren saber cómo piensa un profesional por dentro, y una pregunta concreta hace que quien mira se la conteste a sí mismo.",
      "ej": [
        [
          "Entrenador personal",
          "La pregunta que le hago a cada alumno el primer día de entrenamiento."
        ],
        [
          "Abogados",
          "La pregunta que le hago a cada cliente en la primera consulta."
        ]
      ]
    },
    {
      "n": "026",
      "obj": "guarden",
      "sin": false,
      "dices": "Ojalá alguien me hubiera dicho esto antes de [comprar lo que vendes].",
      "pantalla": "Lo que nadie te avisa",
      "toma": "Grábate de cerca, como en una videollamada, y al decir «esto» acércate un poco más a la cámara, como quien cuenta un secreto.",
      "porque": "Hablas como alguien que estuvo en el lugar de tu cliente, y a nadie le gusta enterarse tarde de lo que pudo saber antes.",
      "ej": [
        [
          "Bienes raíces",
          "Ojalá alguien me hubiera dicho esto antes de comprar mi primera casa."
        ],
        [
          "Autos",
          "Ojalá alguien me hubiera dicho esto antes de financiar mi primer carro."
        ]
      ]
    },
    {
      "n": "048",
      "obj": "guarden",
      "sin": false,
      "dices": "¿Vas a contratar a un [profesional]? Empieza por hacerle estas preguntas.",
      "pantalla": "Pregúntale esto antes de contratar",
      "toma": "Cuenta con los dedos frente a la cámara al decir «estas preguntas», como si ya fueras a enumerarlas una por una.",
      "porque": "Le das al cliente una lista para no dejarse engañar, y la guarda hasta el día que tenga que contratar.",
      "ej": [
        [
          "Remodelación",
          "¿Vas a contratar a un contratista? Empieza por hacerle estas preguntas."
        ],
        [
          "Abogados",
          "¿Vas a contratar a un abogado de inmigración? Empieza por hacerle estas preguntas."
        ]
      ]
    },
    {
      "n": "051",
      "obj": "escriban",
      "sin": true,
      "dices": "Dime si te suena: «la otra semana voy» y llevas meses sin [tu servicio].",
      "pantalla": "¿Te suena? Dímelo abajo",
      "toma": "Debajo del texto: graba la pantalla del celular posponiendo un recordatorio varias veces y corta a tu local listo, con todo preparado para atender.",
      "porque": "Todos tenemos esa excusa, y al reconocerla la gente contesta que a ella le pasa igual.",
      "ej": [
        [
          "Consultorio médico",
          "Dime si te suena: «la otra semana voy» y llevas meses sin hacerte un chequeo."
        ],
        [
          "Taller de autos",
          "Dime si te suena: «la otra semana voy» y llevas meses sin cambiar el aceite."
        ]
      ]
    },
    {
      "n": "075",
      "obj": "escriban",
      "sin": true,
      "dices": "¿Cuánto tiempo crees que nos tomó [este trabajo]? Escribe tu apuesta en los comentarios.",
      "pantalla": "Adivina cuánto tiempo nos tomó",
      "toma": "Debajo del texto: el antes y el después con un corte rápido o en pantalla dividida, sin mostrar cuánto tardaste, y deja la respuesta para fijarla después en los comentarios.",
      "porque": "Adivinar es un juego y todos quieren acertar, así que dejan su apuesta para ver si ganaron.",
      "ej": [
        [
          "Entrenador personal",
          "¿Cuánto tiempo crees que nos tomó lograr esta sentadilla? Escribe tu apuesta en los comentarios."
        ],
        [
          "Remodelación",
          "¿Cuánto tiempo crees que nos tomó esta cocina? Escribe tu apuesta en los comentarios."
        ]
      ]
    },
    {
      "n": "078",
      "obj": "compren",
      "sin": true,
      "dices": "Aquí el antes y después de [este trabajo]. Fíjate en [el detalle].",
      "pantalla": "Antes y después: [tu servicio]",
      "toma": "Foto o video del antes a pantalla completa, corte seco al después tomado desde el mismo ángulo y, al final, un acercamiento lento al detalle.",
      "porque": "Ver el cambio con tus propios ojos convence más que cualquier explicación.",
      "ej": [
        [
          "Barbería",
          "Aquí el antes y después de este desvanecido. Fíjate en la línea de la nuca."
        ],
        [
          "Remodelación",
          "Aquí el antes y después de este baño. Fíjate en las juntas del azulejo."
        ]
      ]
    },
    {
      "n": "082",
      "obj": "compren",
      "sin": true,
      "dices": "[Tu servicio] no es un lujo. Es mantenimiento.",
      "pantalla": "No es un lujo. Es mantenimiento.",
      "toma": "Tomas cortas y limpias del servicio en marcha (manos trabajando, herramientas, detalles) y, al final, la persona saliendo lista para su día.",
      "porque": "Quita la culpa de gastar en uno mismo y lo convierte en cuidar algo que ya tienes.",
      "ej": [
        [
          "Clínica dental",
          "Tu limpieza dental no es un lujo. Es mantenimiento."
        ],
        [
          "Entrenador personal",
          "Entrenar con alguien que te corrija no es un lujo. Es mantenimiento."
        ]
      ]
    },
    {
      "n": "079",
      "obj": "compren",
      "sin": false,
      "dices": "Ese [detalle pequeño] que ignoras hoy se vuelve [problema grande] mañana.",
      "pantalla": "Pequeño hoy, caro mañana",
      "toma": "Acerca el celular al detalle (la grieta, la pieza gastada, la carta sin abrir) y señálalo con el dedo mientras lo dices.",
      "porque": "Ver un problema chico que tú también tienes da ganas de resolverlo antes de que crezca.",
      "ej": [
        [
          "Taller mecánico",
          "Ese ruidito al frenar que ignoras hoy se vuelve un arreglo caro mañana."
        ],
        [
          "Preparador de impuestos",
          "Esa carta del IRS que ignoras hoy se vuelve un problema grande mañana."
        ]
      ]
    }
  ];

  var HERO = [
    [
      "vean",
      "Que te vean · Impuestos",
      "No tienes un problema de impuestos, tienes un problema de recibos."
    ],
    [
      "escriban",
      "Que te escriban · Comida",
      "Resolvamos este debate de una vez por todas: ¿salsa verde o roja?"
    ],
    [
      "compren",
      "Que te compren · Bienes raíces",
      "Si tu renta sube cada año, no tienes por qué vivir con eso."
    ]
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

  // «…» por fuera y “…” por dentro, como pide la ortografía
  function comillas(texto) { return '«' + texto.replace(/«/g, '“').replace(/»/g, '”') + '»'; }

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
      if (g[2]) ficha.appendChild(crear('span', 'gancho__sin', 'Sin salir a cámara'));
      var texto = crear('p', 'gancho__texto');
      var visible = crear('span');
      visible.setAttribute('aria-hidden', 'true');
      texto.appendChild(crear('span', 'v-oculto', comillas(g[0])));
      texto.appendChild(visible);
      ficha.appendChild(texto);
      ficha.appendChild(dato('gancho__pantalla', 'En pantalla:', g[1]));
      contFichas.appendChild(ficha);
      setTimeout(function () { teclear(visible, comillas(g[0]), 700); }, n * 160);
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
      ficha.style.setProperty('--obj', 'var(--' + g.obj + ')');
      ficha.appendChild(crear('span', 'gratis__cat', 'Nº ' + g.n + ' · ' + OBJETIVOS[g.obj] + (g.sin ? ' · Sin salir a cámara' : '')));
      ficha.appendChild(crear('p', 'gratis__plantilla', comillas(g.dices)));
      ficha.appendChild(dato('gratis__pantalla', 'En pantalla:', g.pantalla));
      ficha.appendChild(dato('gratis__dato', 'En la toma:', g.toma));
      ficha.appendChild(dato('gratis__dato', 'Por qué funciona:', g.porque));
      var ejemplos = crear('div', 'gratis__ejemplos');
      ejemplos.appendChild(crear('span', '', 'Así queda en un negocio:'));
      g.ej.forEach(function (x) { var linea = crear('p'); linea.appendChild(crear('b', '', x[0] + ':')); linea.appendChild(document.createTextNode(' ' + x[1])); ejemplos.appendChild(linea); });
      ficha.appendChild(ejemplos);
      ficha.appendChild(botonCopiar(g.dices));
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
    var fin = new Date(Date.UTC(2027, 0, 1, 5, 0, 0)); // 31-12-2026 a las 23:59, hora del Este de EE. UU. (Términos §4)
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
