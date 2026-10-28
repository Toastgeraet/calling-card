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

    document.querySelectorAll('.section-header, .skill-card, .service, .project, .timeline-item, .values li')
      .forEach(function (el) {
        el.classList.add('reveal');
        revealObserver.observe(el);
      });
  }

  /* ------------------------------------------------------------------
     Projektfilter
     ------------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projects = document.querySelectorAll('.project');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      filterButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      projects.forEach(function (p) {
        var tags = (p.getAttribute('data-tags') || '').split(/\s+/);
        p.hidden = filter !== 'all' && tags.indexOf(filter) === -1;
      });
    });
  });

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
