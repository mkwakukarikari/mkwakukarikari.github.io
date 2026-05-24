/* gallery.js — lightbox for gallery page */
(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var img     = document.getElementById('lightbox-img');
  var caption = document.getElementById('lightbox-caption');
  var close   = document.getElementById('lightbox-close');
  var prev    = document.getElementById('lightbox-prev');
  var next    = document.getElementById('lightbox-next');

  var items = Array.from(document.querySelectorAll('.gallery-item'));
  var current = 0;

  function open(index) {
    current = index;
    var item = items[current];
    img.src = item.querySelector('img').src;
    caption.textContent = item.querySelector('figcaption').textContent;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showPrev() { open((current - 1 + items.length) % items.length); }
  function showNext() { open((current + 1) % items.length); }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () { open(i); });
  });

  close.addEventListener('click', closeLightbox);
  prev.addEventListener('click', showPrev);
  next.addEventListener('click', showNext);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}());
