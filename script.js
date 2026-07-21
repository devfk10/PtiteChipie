// P'tite Chipie — interactions

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero slider ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots button');
  let current = 0;
  let timer;

  function goTo(index){
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }

  function restartTimer(){
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  if (slides.length){
    goTo(0);
    restartTimer();
    document.querySelector('.hero-arrow.next')?.addEventListener('click', () => { next(); restartTimer(); });
    document.querySelector('.hero-arrow.prev')?.addEventListener('click', () => { prev(); restartTimer(); });
    dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); restartTimer(); }));
  }

  /* ---------- Language selector ---------- */
  const langSelect = document.querySelector('.lang-select');
  if (langSelect){
    const btn = langSelect.querySelector('button');
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      langSelect.classList.toggle('open');
    });
    document.addEventListener('click', () => langSelect.classList.remove('open'));
    langSelect.querySelectorAll('li a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        btn.querySelector('.lang-current').textContent = a.textContent;
        langSelect.classList.remove('open');
      });
    });
  }

  /* ---------- Quantity stepper (product page) ---------- */
  document.querySelectorAll('.qty-stepper').forEach(stepper => {
    const input = stepper.querySelector('input');
    stepper.querySelector('.minus').addEventListener('click', () => {
      input.value = Math.max(1, parseInt(input.value || '1', 10) - 1);
    });
    stepper.querySelector('.plus').addEventListener('click', () => {
      input.value = parseInt(input.value || '1', 10) + 1;
    });
  });

  /* ---------- Sticky add-to-cart bar ---------- */
  const stickyBar = document.querySelector('.pdp-sticky-bar');
  const addToCartMain = document.querySelector('.pdp-info .add-to-cart');
  if (stickyBar && addToCartMain){
    const observer = new IntersectionObserver(([entry]) => {
      stickyBar.classList.toggle('visible', !entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(addToCartMain);
  }

  /* ---------- Gallery thumbnails (product page) ---------- */
  const mainImg = document.querySelector('.pdp-gallery-main img');
  document.querySelectorAll('.pdp-thumbs button').forEach(thumb => {
    thumb.addEventListener('click', () => {
      document.querySelectorAll('.pdp-thumbs button').forEach(b => b.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImg) mainImg.src = thumb.querySelector('img').src;
    });
  });

  /* ---------- Cart counter demo ---------- */
  document.querySelectorAll('.add-to-cart, .product-quickadd').forEach(btn => {
    btn.addEventListener('click', () => {
      const counters = document.querySelectorAll('.cart-count');
      counters.forEach(c => c.textContent = (parseInt(c.textContent || '0', 10) + 1));
    });
  });

  /* ---------- Wishlist toggle ---------- */
  document.querySelectorAll('.product-wishlist, .wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');
      const svg = btn.querySelector('svg');
      if (svg) svg.style.fill = btn.classList.contains('active') ? 'currentColor' : 'none';
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length){
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Button ripple ---------- */
  document.querySelectorAll('.btn, .add-to-cart, .footer-newsletter button, .strip-form button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

});
