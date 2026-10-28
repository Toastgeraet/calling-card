(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  /* ------------------------------------------------------------------
     Farbschema (hell/dunkel), Auswahl wird lokal gemerkt
     ------------------------------------------------------------------ */
  var themeToggle = document.querySelector('.theme-toggle');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') || (prefersDark.matches ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ------------------------------------------------------------------
     Mobile Navigation
     ------------------------------------------------------------------ */
  var navToggle = document.querySelector('.nav-toggle');
  var navList = document.getElementById('nav-list');

  function setNav(open) {
    if (!navToggle || !navList) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navList.classList.toggle('is-open', open);
  }

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    navList.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setNav(false);
    });
  }

  /* ------------------------------------------------------------------
     Header-Rahmen beim Scrollen
     ------------------------------------------------------------------ */
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     Aktiven Navigationspunkt markieren & Sektionen einblenden
     ------------------------------------------------------------------ */
  if ('IntersectionObserver' in window) {
    var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    var linkById = {};
    navLinks.forEach(function (a) { linkById[a.getAttribute('href').slice(1)] = a; });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove('is-active'); });
        var link = linkById[entry.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (s) {
      sectionObserver.observe(s);
    });

    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.section-header, .skill-card, .service, .project, .step, .calc, .timeline-item, .values li')
      .forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      });
  }

  /* ------------------------------------------------------------------
     Zeitfresser-Rechner (läuft nur lokal im Browser)
     ------------------------------------------------------------------ */
  var calcForm = document.getElementById('calc-form');

  if (calcForm) {
    var HOURS_PER_DAY = 8;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var num = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 });
    var eur = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    var shareInput = calcForm.elements.share;
    var outputs = [
      { el: document.getElementById('calc-hours'), format: num },
      { el: document.getElementById('calc-days'), format: num },
      { el: document.getElementById('calc-cost'), format: eur },
      { el: document.getElementById('calc-saved-hours'), format: num },
      { el: document.getElementById('calc-saved-cost'), format: eur }
    ];

    function value(name) {
      var v = parseFloat(String(calcForm.elements[name].value).replace(',', '.'));
      return isFinite(v) && v > 0 ? v : 0;
    }

    // Zahl kurz zum neuen Wert hochzählen lassen
    function animateTo(out, target) {
      var from = out.current || 0;
      var start = null;
      cancelAnimationFrame(out.frame);
      if (reduceMotion || from === target) {
        out.current = target;
        out.el.textContent = out.format.format(target);
        return;
      }
      function tick(now) {
        if (start === null) start = now;
        var p = Math.min(1, (now - start) / 350);
        out.current = from + (target - from) * (1 - Math.pow(1 - p, 3));
        out.el.textContent = out.format.format(out.current);
        if (p < 1) out.frame = requestAnimationFrame(tick);
      }
      out.frame = requestAnimationFrame(tick);
    }

    function updateCalc() {
      var share = value('share') / 100;
      var hours = value('minutes') / 60 * value('count') * value('period') * value('people');
      var cost = hours * value('rate');
      var min = Number(shareInput.min), max = Number(shareInput.max);

      shareInput.style.setProperty('--fill', ((share * 100 - min) / (max - min) * 100) + '%');
      document.getElementById('calc-share-out').textContent = Math.round(share * 100) + ' %';

      [hours, hours / HOURS_PER_DAY, cost, hours * share, cost * share].forEach(function (v, i) {
        animateTo(outputs[i], v);
      });
    }

    // −/+ Buttons neben den Zahlenfeldern
    calcForm.addEventListener('click', function (e) {
      var btn = e.target.closest('.stepper-btn');
      if (!btn) return;
      var input = btn.parentNode.querySelector('input');
      var step = Number(input.step) || 1;
      var min = input.min === '' ? 0 : Number(input.min);
      var current = parseFloat(String(input.value).replace(',', '.')) || 0;
      var next = Math.max(min, Math.round((current + step * Number(btn.getAttribute('data-dir'))) / step) * step);
      input.value = next;
      updateCalc();
    });

    calcForm.addEventListener('input', updateCalc);
    calcForm.addEventListener('change', updateCalc);
    calcForm.addEventListener('submit', function (e) { e.preventDefault(); });
    updateCalc();
  }

  /* ------------------------------------------------------------------
     Platzhalter-Links nicht anspringen lassen
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[data-placeholder]').forEach(function (a) {
    a.setAttribute('aria-disabled', 'true');
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });

  /* ------------------------------------------------------------------
     Aktuelles Jahr im Footer
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
