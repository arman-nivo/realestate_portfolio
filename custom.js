
  function toggleMenu() {
    document.getElementById('mobileMenu').classList.toggle('open');
  }

  /* ── VIDEO MODAL ── */
  const VIDEO_ID = 'BU_s5NhMLvc';

  function openVideo() {
    const modal   = document.getElementById('videoModal');
    const iframe  = document.getElementById('videoIframe');
    iframe.src    = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    const modal  = document.getElementById('videoModal');
    const iframe = document.getElementById('videoIframe');
    modal.classList.remove('open');
    iframe.src   = '';                     // stop video
    document.body.style.overflow = '';
  }

  function closeVideoOnBg(e) {
    if (e.target === document.getElementById('videoModal')) closeVideo();
  }

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeVideo();
  });

  const TOTAL     = 3;
  let   current   = 0;
  let   animating = false;
  let   timer;

  const slideEls = Array.from({length: TOTAL}, (_, i) => document.getElementById('slide-' + i));
  const textEls  = Array.from({length: TOTAL}, (_, i) => document.getElementById('text-'  + i));
  const dotEls   = Array.from(document.querySelectorAll('.dot'));

  /* ── helpers ── */
  function setTextHidden(el) {
    el.style.transition = 'none';
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
  }
  function setTextVisible(el, delay) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
      el.style.opacity    = '1';
      el.style.transform  = 'translateY(0)';
    }));
  }
  function setTextExit(el) {
    el.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
  }

  /* ── init: all hidden, show slide 0 text ── */
  textEls.forEach(setTextHidden);
  setTextVisible(textEls[0], 200);

  /* ── main transition ── */
  function goTo(n, dir) {
    const next = ((n % TOTAL) + TOTAL) % TOTAL;
    if (next === current || animating) return;
    animating = true;

    const outIdx = current;
    const inIdx  = next;
    if (dir === undefined) dir = inIdx > outIdx ? 'next' : 'prev';

    const outSlide = slideEls[outIdx];
    const inSlide  = slideEls[inIdx];

    /* 1 ── position incoming slide off-screen */
    inSlide.style.transition = 'none';
    inSlide.style.transform  = dir === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
    inSlide.style.zIndex     = '3';
    outSlide.style.zIndex    = '2';

    /* 2 ── text: exit current */
    setTextExit(textEls[outIdx]);

    /* 3 ── after one paint, slide both panels simultaneously */
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const ease = 'cubic-bezier(0.77, 0, 0.175, 1)';
      const dur  = '0.9s';

      /* incoming → centre */
      inSlide.style.transition = `transform ${dur} ${ease}`;
      inSlide.style.transform  = 'translateX(0)';

      /* outgoing → opposite side */
      outSlide.style.transition = `transform ${dur} ${ease}`;
      outSlide.style.transform  = dir === 'next' ? 'translateX(-100%)' : 'translateX(100%)';

      /* update dots */
      dotEls[outIdx].classList.remove('active');
      dotEls[inIdx].classList.add('active');
      current = inIdx;

      /* 4 ── after slide lands: show new text, reset old slide */
      setTimeout(() => {
        /* show new text (rise from bottom) */
        setTextHidden(textEls[inIdx]);
        setTextVisible(textEls[inIdx], 80);

        /* reset old slide back off-screen quietly */
        outSlide.style.transition = 'none';
        outSlide.style.transform  = dir === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
        outSlide.style.zIndex     = '1';
        inSlide.style.zIndex      = '2';

        /* restart Ken Burns on incoming */
        const bg = inSlide.querySelector('.slide-bg');
        bg.style.animation = 'none';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          bg.style.animation = '';
        }));

        animating = false;
      }, 920);
    }));

    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1, 'next'), 5500);
  }

  /* dot clicks */
  dotEls.forEach((dot, i) => {
    dot.addEventListener('click', () => goTo(i, i > current ? 'next' : 'prev'));
  });

  resetTimer();
