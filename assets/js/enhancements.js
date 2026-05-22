/* ============================================
   enhancements.js — Modern polish layer
   REVERT: delete this file and remove the
   <script> tag from each page's </body>.
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------------
     Reading progress bar
     ------------------------------------------------ */
  var bar = document.getElementById('progress-bar');
  if (bar) {
    function updateBar() {
      var scrolled = window.scrollY || document.documentElement.scrollTop;
      var total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });
  }

  /* ------------------------------------------------
     Navbar — glass on scroll
     ------------------------------------------------ */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    function updateNavbar() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
    window.addEventListener('scroll', updateNavbar, { passive: true });
  }

  /* ------------------------------------------------
     Page fade-in — fires when loader hides
     ------------------------------------------------ */
  var loader = document.getElementById('page-loader');
  if (loader) {
    var mo = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        if (loader.classList.contains('hidden')) {
          // Double rAF ensures the transition actually fires
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              document.body.classList.add('page-ready');
            });
          });
          mo.disconnect();
        }
      });
    });
    mo.observe(loader, { attributes: true, attributeFilter: ['class'] });
  } else {
    document.body.classList.add('page-ready');
  }

  /* ------------------------------------------------
     Scroll-reveal — only below the fold on load
     ------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    if (!('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll(
      '.section, .pub-item, .cv-item, .talk-item, .news-list li, .skill-group'
    );
    if (!targets.length) return;

    var vh = window.innerHeight;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top >= vh) {
        el.classList.add('reveal');
        observer.observe(el);
      }
    });
  });

  /* ------------------------------------------------
     Cite buttons — copy APA citation to clipboard
     ------------------------------------------------ */
  (function () {
    var toast = document.createElement('div');
    toast.className = 'cite-toast';
    toast.textContent = 'Citation copied!';
    document.body.appendChild(toast);
    var timer;

    document.querySelectorAll('.btn-cite').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var article = btn.closest('[data-cite]');
        if (!article) return;
        navigator.clipboard.writeText(article.dataset.cite).then(function () {
          clearTimeout(timer);
          toast.classList.add('show');
          timer = setTimeout(function () { toast.classList.remove('show'); }, 2200);
        });
      });
    });
  }());

  /* ------------------------------------------------
     Back-to-top button
     ------------------------------------------------ */
  var btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', function () {
      btt.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    btt.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}());
