/* Candle Night Piano — interactions.
   Translations live in i18n.js (window.CNP_I18N, 10 languages). */
(function () {
  'use strict';

  var I18N = window.CNP_I18N || {};
  // address assembled at runtime so it never appears verbatim in the source
  var EMAIL = atob('bGl0dXNwaWFub0BnbWFpbC5jb20=');
  var LANGS = ['es', 'en', 'fr', 'de', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  var currentLang = 'es';

  /* ---------------- i18n ---------------- */
  function applyLang(lang) {
    currentLang = I18N[lang] ? lang : 'en';
    var dict = I18N[currentLang];
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });

    var y = new Date().getFullYear();
    document.querySelectorAll('.yr').forEach(function (el) { el.textContent = y; });

    var cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = currentLang.toUpperCase();
    document.querySelectorAll('.lang-list [data-setlang]').forEach(function (b) {
      b.classList.toggle('current', b.getAttribute('data-setlang') === currentLang);
    });
    try { localStorage.setItem('cnp_lang', currentLang); } catch (e) {}
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('cnp_lang'); } catch (e) {}
    var lang = saved;
    if (!lang) {
      var nav = (navigator.language || 'en').toLowerCase();
      var code = nav.slice(0, 2);
      if (code === 'nb' || code === 'nn') code = 'no';
      lang = LANGS.indexOf(code) >= 0 ? code : 'en';
    }
    applyLang(lang);

    var toggle = document.getElementById('langToggle');
    var list = document.getElementById('langList');
    if (!toggle || !list) return;
    function close() { list.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = list.hidden;
      list.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    });
    list.querySelectorAll('[data-setlang]').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-setlang')); close(); });
    });
    document.addEventListener('click', function (e) {
      if (!list.hidden && !list.contains(e.target) && e.target !== toggle) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }

  /* ---------------- booking form (mailto composer) ---------------- */
  function initForm() {
    var form = document.getElementById('bookForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var dict = I18N[currentLang];
      var f = new FormData(form);
      var lines = [];
      var map = [['name', 'form_name'], ['date', 'form_date'], ['city', 'form_city'], ['type', 'form_type'], ['msg', 'form_msg']];
      map.forEach(function (m) {
        var v = (f.get(m[0]) || '').toString().trim();
        if (v) lines.push(dict[m[1]] + ': ' + v);
      });
      var body = lines.join('\n') + '\n\n— candlenightpiano.com';
      var href = 'mailto:' + EMAIL +
        '?subject=' + encodeURIComponent(dict.mail_subject) +
        '&body=' + encodeURIComponent(body);
      window.location.href = href;
    });
  }

  /* ---------------- email: click to reveal (anti-scraper) ---------------- */
  function initEmailReveal() {
    document.querySelectorAll('[data-emailreveal]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var a = document.createElement('a');
        a.href = 'mailto:' + EMAIL;
        a.textContent = EMAIL;
        a.className = btn.className.replace('email-reveal', 'email-revealed');
        btn.replaceWith(a);
      });
    });
  }

  /* ---------------- WhatsApp: copy username (link pending exact handle) ---------------- */
  function initWhatsApp() {
    var wa = document.getElementById('waBtn');
    var label = document.getElementById('waLabel');
    if (!wa || !label) return;
    wa.addEventListener('click', function (e) {
      e.preventDefault();
      var done = function () {
        label.textContent = I18N[currentLang].book_wa_copied;
        setTimeout(function () { label.textContent = I18N[currentLang].book_wa; }, 2600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('En_Litos').then(done, done);
      } else { done(); }
    });
  }

  /* ---------------- gallery lightbox ---------------- */
  function initGallery() {
    var acc = document.getElementById('galleryAcc');
    var lb = document.getElementById('lightbox');
    if (!acc || !lb) return;
    var panels = Array.prototype.slice.call(acc.querySelectorAll('.gpanel'));
    var img = document.getElementById('lbImg');
    var cap = document.getElementById('lbCap');
    var idx = 0;

    function show(i) {
      idx = (i + panels.length) % panels.length;
      var p = panels[idx];
      img.src = p.getAttribute('data-src');
      var fc = p.querySelector('figcaption');
      cap.textContent = fc ? fc.textContent : '';
      img.alt = cap.textContent;
    }
    function open(i) { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
    function close() { lb.hidden = true; document.body.style.overflow = ''; }

    panels.forEach(function (p, i) {
      p.addEventListener('click', function () { open(i); });
      p.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });
    document.getElementById('lbClose').addEventListener('click', close);
    document.getElementById('lbPrev').addEventListener('click', function () { show(idx - 1); });
    document.getElementById('lbNext').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
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

  /* ---------------- listen teaser ---------------- */
  function initListen() {
    var v = document.getElementById('teaser');
    var btn = document.getElementById('soundBtn');
    var label = document.getElementById('soundLabel');
    var ico = btn ? btn.querySelector('.sound-ico') : null;
    if (!v || !btn) return;
    btn.addEventListener('click', function () {
      if (v.muted) {
        v.muted = false;
        v.currentTime = 0;
        v.play();
        btn.setAttribute('aria-pressed', 'true');
        label.setAttribute('data-i18n', 'lis_sound_off');
        label.textContent = I18N[currentLang].lis_sound_off;
        if (ico) ico.innerHTML = '&#128263;';
      } else {
        v.muted = true;
        btn.setAttribute('aria-pressed', 'false');
        label.setAttribute('data-i18n', 'lis_sound_on');
        label.textContent = I18N[currentLang].lis_sound_on;
        if (ico) ico.innerHTML = '&#128266;';
      }
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

  /* ---------------- topbar ---------------- */
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
      if (heroBg) {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroBg.style.transform = 'scale(1.08) translateY(' + (y * 0.35) + 'px)';
        }
      }
      if (stage) {
        var rect = stage.getBoundingClientRect();
        var vh = window.innerHeight;
        var total = rect.height - vh;
        var scrolled = Math.min(Math.max(-rect.top, 0), total);
        var progress = total > 0 ? scrolled / total : 0;
        var idx = Math.min(count - 1, Math.floor(progress * count));
        if (rect.top > vh || rect.bottom < 0) {
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

  /* ---------------- artist double portrait ---------------- */
  function initArtistPhotos() {
    var box = document.querySelector('.artist-photos');
    if (!box) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;

    function swap() { box.classList.toggle('swap'); }
    function start() { if (!timer && !reduce) timer = setInterval(swap, 5000); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    // tap/click always swaps (also with reduced motion) and restarts the cycle
    box.addEventListener('click', function () { swap(); stop(); start(); });

    // only cycle while the section is on screen
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { e.isIntersecting ? start() : stop(); });
      }, { threshold: 0.25 }).observe(box);
    } else { start(); }
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

  /* ---------------- Europe coverage map (airline-route style) ---------------- */
  function initEuroMap() {
    var svg = document.getElementById('euromap');
    if (!svg) return;
    var NS = 'http://www.w3.org/2000/svg';
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var CITIES = [
      ['London', 51.51, -0.13, 1],
      ['Dublin', 53.35, -6.26, 1],
      ['Paris', 48.86, 2.35, 1],
      ['Brussels', 50.85, 4.35, 0],
      ['Amsterdam', 52.37, 4.90, 1],
      ['Berlin', 52.52, 13.40, 1],
      ['Munich', 48.14, 11.58, 0],
      ['Zurich', 47.37, 8.54, 0],
      ['Milan', 45.46, 9.19, 0],
      ['Rome', 41.90, 12.50, 1],
      ['Vienna', 48.21, 16.37, 1],
      ['Prague', 50.08, 14.44, 0],
      ['Budapest', 47.50, 19.04, 0],
      ['Warsaw', 52.23, 21.01, 0],
      ['Copenhagen', 55.68, 12.57, 1],
      ['Stockholm', 59.33, 18.06, 1],
      ['Oslo', 59.91, 10.75, 0],
      ['Lisbon', 38.72, -9.14, 1],
      ['Madrid', 40.42, -3.70, 0],
      ['Athens', 37.98, 23.73, 1]
    ];
    var BCN = { lat: 41.39, lon: 2.17 };

    function pt(lat, lon) {
      var x = (lon + 11) / 37 * 940 + 30;
      var y = (62 - lat) / 26.5 * 700 + 28;
      return [x, y];
    }
    function mk(tag, attrs) {
      var el = document.createElementNS(NS, tag);
      for (var k in attrs) el.setAttribute(k, attrs[k]);
      return el;
    }

    var seed = 42;
    function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
    var stars = mk('g', {});
    for (var s = 0; s < 70; s++) {
      stars.appendChild(mk('circle', {
        'class': 'star',
        cx: (rnd() * 960 + 20).toFixed(1),
        cy: (rnd() * 700 + 20).toFixed(1),
        r: (rnd() * 1.3 + 0.4).toFixed(2),
        opacity: (rnd() * 0.1 + 0.05).toFixed(3)
      }));
    }
    svg.appendChild(stars);

    var b = pt(BCN.lat, BCN.lon);
    var arcs = [], dots = [];

    var gArcs = mk('g', {});
    CITIES.forEach(function (c) {
      var p = pt(c[1], c[2]);
      var mx = (b[0] + p[0]) / 2, my = (b[1] + p[1]) / 2;
      var dx = p[0] - b[0], dy = p[1] - b[1];
      var dist = Math.sqrt(dx * dx + dy * dy);
      var nx = -dy / dist, ny = dx / dist;
      if (ny > 0) { nx = -nx; ny = -ny; }
      var k = dist * 0.22;
      var cx = mx + nx * k, cy = my + ny * k;
      var path = mk('path', { 'class': 'arc', d: 'M' + b[0].toFixed(1) + ',' + b[1].toFixed(1) + ' Q' + cx.toFixed(1) + ',' + cy.toFixed(1) + ' ' + p[0].toFixed(1) + ',' + p[1].toFixed(1) });
      gArcs.appendChild(path);
      arcs.push(path);
    });
    svg.appendChild(gArcs);

    var gCities = mk('g', {});
    CITIES.forEach(function (c) {
      var p = pt(c[1], c[2]);
      var dot = mk('circle', { 'class': 'citydot', cx: p[0].toFixed(1), cy: p[1].toFixed(1), r: c[3] ? 3.4 : 2.6, opacity: 0.9 });
      gCities.appendChild(dot);
      dots.push(dot);
      var westish = p[0] < 210;
      var label = mk('text', {
        'class': c[3] ? 'major' : 'minor',
        x: (westish ? p[0] - 8 : p[0] + 8).toFixed(1),
        y: (p[1] + 4).toFixed(1),
        'text-anchor': westish ? 'end' : 'start'
      });
      label.textContent = c[0];
      gCities.appendChild(label);
    });
    svg.appendChild(gCities);

    var gB = mk('g', {});
    if (!reduced) {
      var pulse = mk('circle', { cx: b[0], cy: b[1], r: 7, fill: 'none', stroke: '#f4cf8c', 'stroke-width': 1.4, opacity: 0.6 });
      var a1 = mk('animate', { attributeName: 'r', from: 7, to: 30, dur: '2.6s', repeatCount: 'indefinite' });
      var a2 = mk('animate', { attributeName: 'opacity', from: 0.6, to: 0, dur: '2.6s', repeatCount: 'indefinite' });
      pulse.appendChild(a1); pulse.appendChild(a2);
      gB.appendChild(pulse);
    }
    gB.appendChild(mk('circle', { cx: b[0], cy: b[1], r: 6, fill: '#f4cf8c' }));
    var bl = mk('text', { 'class': 'origin', x: b[0], y: b[1] + 26, 'text-anchor': 'middle' });
    bl.textContent = 'BARCELONA';
    gB.appendChild(bl);
    svg.appendChild(gB);

    var glowOuter = mk('circle', { r: 10, fill: '#f4cf8c', opacity: 0 });
    var glowInner = mk('circle', { r: 3.6, fill: '#fff2d8', opacity: 0 });
    svg.appendChild(glowOuter);
    svg.appendChild(glowInner);

    var drawn = false;
    function drawIn() {
      if (drawn) return; drawn = true;
      arcs.forEach(function (p, i) {
        var len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.getBoundingClientRect();
        p.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(.22,.61,.36,1) ' + (i * 70) + 'ms, opacity .7s, stroke-width .7s';
        p.style.strokeDashoffset = '0';
      });
      if (!reduced) setTimeout(startCycle, 1000);
    }
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { drawIn(); io.disconnect(); } });
      }, { threshold: 0.3 });
      io.observe(svg);
    } else { drawIn(); }

    var idx = -1, raf = null;
    function flyRoute(i) {
      var path = arcs[i], dot = dots[i];
      var len = path.getTotalLength();
      var t0 = null, DUR = 2000;
      path.classList.add('hot'); dot.classList.add('hot');
      glowOuter.setAttribute('opacity', 0.42);
      glowInner.setAttribute('opacity', 1);
      function step(ts) {
        if (!t0) t0 = ts;
        var t = Math.min((ts - t0) / DUR, 1);
        var e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        var pos = path.getPointAtLength(len * e);
        glowOuter.setAttribute('cx', pos.x); glowOuter.setAttribute('cy', pos.y);
        glowInner.setAttribute('cx', pos.x); glowInner.setAttribute('cy', pos.y);
        if (t < 1) { raf = requestAnimationFrame(step); }
        else {
          glowOuter.setAttribute('opacity', 0);
          glowInner.setAttribute('opacity', 0);
          setTimeout(function () { path.classList.remove('hot'); dot.classList.remove('hot'); }, 500);
        }
      }
      raf = requestAnimationFrame(step);
    }
    function startCycle() {
      var next = function () {
        if (document.hidden) return;
        idx = (idx + 1) % arcs.length;
        flyRoute(idx);
      };
      next();
      setInterval(next, 2600);
    }
  }

  /* ---------------- boot ---------------- */
  function boot() {
    initLang();
    initForm();
    initEmailReveal();
    initWhatsApp();
    initGallery();
    initPriceReveal();
    initListen();
    initReveals();
    initTopbar();
    initScrollFX();
    initArtistPhotos();
    initEmbers();
    initEuroMap();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else { boot(); }
})();
