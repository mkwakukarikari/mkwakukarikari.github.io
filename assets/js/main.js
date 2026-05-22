// Page loader — waits for both page load and a minimum display time
(function () {
  var start = Date.now();
  var MIN_DISPLAY = 1200; // ms

  function hideLoader() {
    var loader = document.getElementById('page-loader');
    if (!loader) return;
    var elapsed = Date.now() - start;
    var remaining = MIN_DISPLAY - elapsed;
    setTimeout(function () {
      loader.classList.add('hidden');
    }, Math.max(0, remaining));
  }

  window.addEventListener('load', hideLoader);
}());

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    // Close nav when a link is tapped (mobile)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });

    // Close nav when tapping outside
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
      }
    });
  }

  // Update copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
