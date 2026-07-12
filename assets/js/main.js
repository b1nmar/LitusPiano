/* Candle Night Piano — interactions: i18n, scroll-driven stage, reveals, parallax */
(function () {
  'use strict';

  /* ---------------- i18n dictionary ---------------- */
  var I18N = {
    es: {
      nav_book: 'Reservar',
      nav_pricing: 'Tarifas',
      price_reveal_btn: 'Descubrir la tarifa',
      hero_over: 'Litus Piano presenta',
      hero_sub: '45 minutos que no vas a olvidar. Solo un piano, cientos de velas y la música que te toca el alma.',
      hero_cta: 'Reserva tu noche mágica',
      hero_scroll: 'Desliza para vivirlo',

      exp_eyebrow: 'La experiencia',
      exp_title: 'Una noche a la luz de las velas que se queda contigo para siempre',
      exp_lead: 'Apago las luces, enciendo las velas y me siento al piano. Durante 45 minutos desaparece el mundo: solo quedan las melodías que todos reconocemos, envueltas en una atmósfera íntima, cálida y absolutamente mágica.',
      exp_pill1: '45 minutos en directo',
      exp_pill2: 'Piezas conocidas',
      exp_pill3: 'Románticas y minimalistas',
      exp_pill4: 'Todo interpretado por mí',

      stage_1_t: 'Un espacio solo iluminado por velas',
      stage_1_b: 'Cientos de llamas, un piano y el silencio expectante antes de la primera nota.',
      stage_2_t: 'Solo el piano y tú',
      stage_2_b: 'Sin bandas, sin artificios. Yo, en directo, tejiendo cada melodía nota a nota.',
      stage_3_t: 'Una sala suspendida en la música',
      stage_3_b: 'El público contiene la respiración. Un momento que nadie olvida.',

      rep_eyebrow: 'El repertorio',
      rep_title: 'Del romanticismo clásico al minimalismo más íntimo',
      rep_lead: 'Las melodías que todo el mundo reconoce y nadie se cansa de escuchar, elegidas para emocionar desde el primer compás.',
      rep_chip_film: 'Bandas sonoras de cine',
      rep_chip_pop: 'Clásicos reinventados',

      gal_eyebrow: 'La atmósfera',
      gal_title: 'Así se siente una Candle Night',
      gal_note: 'Imágenes de actuaciones reales, tratadas artísticamente para preservar la privacidad de los asistentes.',

      occ_eyebrow: 'Perfecto para',
      occ_title: 'Convierte tu evento en algo inolvidable',
      occ_1_t: 'Bodas y aniversarios',
      occ_1_b: 'El momento romántico que vuestros invitados recordarán para siempre.',
      occ_2_t: 'Eventos privados y de empresa',
      occ_2_b: 'Una experiencia sofisticada que eleva cualquier velada corporativa.',
      occ_3_t: 'Hoteles y restaurantes',
      occ_3_b: 'Convierte una cena en una experiencia sensorial completa.',
      occ_4_t: 'Marcas de lujo',
      occ_4_b: 'Presentaciones y experiencias VIP con una banda sonora en directo.',

      price_eyebrow: 'Tarifa',
      price_title: 'Una experiencia irrepetible, a un precio que sorprende',
      price_plan: 'Candle Night Piano',
      price_unit: 'por actuación de 45 minutos',
      price_incl1: 'Actuación de piano en directo de 45 minutos',
      price_incl2: 'Repertorio a medida: piezas conocidas, románticas y minimalistas',
      price_incl3: 'Interpretado íntegramente por mí, en persona',
      price_note_title: 'La tarifa NO incluye:',
      price_note_body: 'Impuestos, desplazamientos, alojamiento ni los medios necesarios para el concierto (piano, velas, sala o escenario, sonido e iluminación), que corren a cargo del cliente.',
      price_cta: 'Quiero reservar mi noche',

      book_eyebrow: 'Reserva',
      book_title: 'Regala una noche que nadie olvidará',
      book_lead: 'Cuéntame la fecha, la ciudad y el tipo de evento. Te respondo personalmente con todos los detalles para hacerlo realidad.',
      book_email: 'Escríbeme por email',
      book_wa: 'WhatsApp: En_Litos',
      book_wa_copied: '¡Usuario copiado! Búscame en WhatsApp ✓',

      footer_legal: '© <span class="yr"></span> Litus Piano. Todos los derechos reservados.'
    },
    en: {
      nav_book: 'Book now',
      nav_pricing: 'Pricing',
      price_reveal_btn: 'Reveal the fee',
      hero_over: 'Litus Piano presents',
      hero_sub: '45 minutes you will never forget. Just a piano, hundreds of candles and the music that touches your soul.',
      hero_cta: 'Book your magical night',
      hero_scroll: 'Scroll to feel it',

      exp_eyebrow: 'The experience',
      exp_title: 'A candlelit night that stays with you forever',
      exp_lead: 'I dim the lights, light the candles and sit at the piano. For 45 minutes the world disappears: only the melodies we all recognise remain, wrapped in an intimate, warm and utterly magical atmosphere.',
      exp_pill1: '45 minutes live',
      exp_pill2: 'Well-known pieces',
      exp_pill3: 'Romantic & minimalist',
      exp_pill4: 'Every note played by me',

      stage_1_t: 'A room lit only by candlelight',
      stage_1_b: 'Hundreds of flames, a piano and the expectant silence before the first note.',
      stage_2_t: 'Just the piano and you',
      stage_2_b: 'No band, no gimmicks. Me, live, weaving every melody note by note.',
      stage_3_t: 'A room suspended in the music',
      stage_3_b: 'The audience holds its breath. A moment no one forgets.',

      rep_eyebrow: 'The repertoire',
      rep_title: 'From classical romanticism to the most intimate minimalism',
      rep_lead: 'The melodies everyone recognises and never tires of hearing, chosen to move you from the very first bar.',
      rep_chip_film: 'Film soundtracks',
      rep_chip_pop: 'Reimagined classics',

      gal_eyebrow: 'The atmosphere',
      gal_title: 'This is how a Candle Night feels',
      gal_note: 'Images from real performances, artistically treated to protect the privacy of the audience.',

      occ_eyebrow: 'Perfect for',
      occ_title: 'Turn your event into something unforgettable',
      occ_1_t: 'Weddings & anniversaries',
      occ_1_b: 'The romantic moment your guests will remember forever.',
      occ_2_t: 'Private & corporate events',
      occ_2_b: 'A sophisticated experience that elevates any evening.',
      occ_3_t: 'Hotels & restaurants',
      occ_3_b: 'Turn a dinner into a complete sensory experience.',
      occ_4_t: 'Luxury brands',
      occ_4_b: 'Launches and VIP experiences with a live soundtrack.',

      price_eyebrow: 'Pricing',
      price_title: 'A once-in-a-lifetime experience, at a price that surprises',
      price_plan: 'Candle Night Piano',
      price_unit: 'per 45-minute performance',
      price_incl1: '45-minute live piano performance',
      price_incl2: 'Tailored repertoire: well-known, romantic and minimalist pieces',
      price_incl3: 'Performed entirely by me, in person',
      price_note_title: 'The fee does NOT include:',
      price_note_body: 'Taxes, travel, accommodation or the resources needed for the concert (piano, candles, venue or stage, sound and lighting), which are provided by the client.',
      price_cta: 'I want to book my night',

      book_eyebrow: 'Booking',
      book_title: 'Gift a night no one will ever forget',
      book_lead: 'Tell me the date, the city and the type of event. I reply personally with everything you need to make it happen.',
      book_email: 'Email me',
      book_wa: 'WhatsApp: En_Litos',
      book_wa_copied: 'Username copied! Search me on WhatsApp ✓',

      footer_legal: '© <span class="yr"></span> Litus Piano. All rights reserved.'
    }
  };

  var MAIL = {
    es: {
      subject: 'Reserva Candle Night Piano',
      body: 'Hola Litus,\n\nMe gustaría reservar una actuación de Candle Night Piano.\n\nFecha:\nCiudad:\nTipo de evento:\n\n¡Gracias!'
    },
    en: {
      subject: 'Candle Night Piano booking',
      body: 'Hi Litus,\n\nI would like to book a Candle Night Piano performance.\n\nDate:\nCity:\nType of event:\n\nThank you!'
    }
  };

  var EMAIL = 'lituspiano@gmail.com';
  var WA_USER = 'En_Litos';
  var currentLang = 'es';

  function applyLang(lang) {
    currentLang = I18N[lang] ? lang : 'es';
    var dict = I18N[currentLang];
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    // year
    var y = new Date().getFullYear();
    document.querySelectorAll('.yr').forEach(function (el) { el.textContent = y; });

    // mail button
    var mail = document.getElementById('mailBtn');
    if (mail) {
      mail.href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent(MAIL[currentLang].subject) +
        '&body=' + encodeURIComponent(MAIL[currentLang].body);
    }
    try { localStorage.setItem('cnp_lang', currentLang); } catch (e) {}
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('cnp_lang'); } catch (e) {}
    var lang = saved || ((navigator.language || 'es').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');
    applyLang(lang);
  }

  /* ---------------- WhatsApp: copy username (no public username deep-link yet) ---------------- */
  function initWhatsApp() {
    var wa = document.getElementById('waBtn');
    if (!wa) return;
    wa.addEventListener('click', function (e) {
      e.preventDefault();
      var original = I18N[currentLang].book_wa;
      var done = function () {
        wa.textContent = I18N[currentLang].book_wa_copied;
        setTimeout(function () { wa.textContent = original; }, 2600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(WA_USER).then(done, done);
      } else {
        done();
      }
    });
  }

  /* ---------------- price reveal ---------------- */
  function initPriceReveal() {
    var btn = document.getElementById('revealPriceBtn');
    var val = document.getElementById('priceValue');
    if (!btn || !val) return;
    btn.addEventListener('click', function () {
      val.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
      btn.style.display = 'none';
    });
  }

  /* ---------------- reveal on scroll ---------------- */
  function initReveals() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- topbar background on scroll ---------------- */
  function initTopbar() {
    var bar = document.querySelector('.topbar');
    var onScroll = function () { bar.classList.toggle('scrolled', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- scroll-driven stage + hero parallax ---------------- */
  function initScrollFX() {
    var stage = document.getElementById('stage');
    var layers = Array.prototype.slice.call(document.querySelectorAll('.stage-layer'));
    var caps = Array.prototype.slice.call(document.querySelectorAll('.stage-caption'));
    var heroBg = document.querySelector('.hero-bg');
    var count = layers.length;
    var ticking = false;
    var lastIndex = -1;

    function setActive(idx) {
      if (idx === lastIndex) return;
      lastIndex = idx;
      layers.forEach(function (l, i) { l.classList.toggle('active', i === idx); });
      caps.forEach(function (c, i) { c.classList.toggle('active', i === idx); });
    }

    function update() {
      ticking = false;
      // hero parallax
      if (heroBg) {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroBg.style.transform = 'scale(1.08) translateY(' + (y * 0.35) + 'px)';
        }
      }
      // stage progress
      if (stage) {
        var rect = stage.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height - vh;
        var scrolled = Math.min(Math.max(-rect.top, 0), total);
        var progress = total > 0 ? scrolled / total : 0;
        var idx = Math.min(count - 1, Math.floor(progress * count));
        if (rect.top > vh || rect.bottom < 0) {
          // out of view: keep first chapter primed
          setActive(rect.top > 0 ? 0 : count - 1);
        } else {
          setActive(idx);
        }
      }
    }

    function onScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    setActive(0);
    update();
  }

  /* ---------------- floating embers ---------------- */
  function initEmbers() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var root = document.querySelector('.embers');
    if (!root) return;
    var n = window.innerWidth < 640 ? 10 : 18;
    for (var i = 0; i < n; i++) {
      var e = document.createElement('span');
      e.className = 'ember';
      var dur = 9 + Math.random() * 12;
      e.style.left = (Math.random() * 100) + 'vw';
      e.style.animationDuration = dur + 's';
      e.style.animationDelay = (-Math.random() * dur) + 's';
      var s = 2 + Math.random() * 4;
      e.style.width = e.style.height = s + 'px';
      e.style.opacity = 0.3 + Math.random() * 0.5;
      root.appendChild(e);
    }
  }

  /* ---------------- boot ---------------- */
  function boot() {
    initLang();
    initWhatsApp();
    initPriceReveal();
    initReveals();
    initTopbar();
    initScrollFX();
    initEmbers();

    var toggle = document.getElementById('langToggle');
    if (toggle) toggle.addEventListener('click', function () {
      applyLang(currentLang === 'es' ? 'en' : 'es');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
