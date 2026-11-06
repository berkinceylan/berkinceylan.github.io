(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ---------- Highlights data ---------- */
  const yt = id => ({ img: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, href: `https://www.youtube.com/watch?v=${id}`, video: true });
  const local = f => ({ img: `../images/milestones/${f}.jpg` });
  const highlights = [
    { date: 'Jun 2025', title: '147K and counting.', text: 'Trial Reels and sponsorship content took Instagram from 29.7K to 147K+ — mostly organic.', ...local('deneme-reels') },
    { date: 'May 2025', title: 'An AI music video.', text: 'Lyrics inspired by AI, animation brought to life by our marketing team.', ...yt('Isyan5myu0A') },
    { date: 'Apr 2025', title: '#1 in Turkey.', text: 'Gedik Yatırım became the best performing Instagram account in Turkey (BoomSocial).', ...local('turkiyenin-en-iyisi') },
    { date: 'Mar 2025', title: '100,000 people.', text: 'Our Instagram community crossed the 100K follower mark.', ...local('100k-takipci') },
    { date: 'Dec 2024', title: '#1 in Finance.', text: 'Top account in the finance category and #27 overall among Turkey’s Instagram accounts.', ...local('birincilik') },
    { date: '2024', title: 'TikTok, 50K.', text: 'Financial literacy meets trends: 50K+ followers and 17M+ views in a single month.', ...local('tiktok-50k') },
    { date: 'Jun 2024', title: 'Fully organic.', text: 'A TikTok from our volleyball sponsorship reached 2.5M+ organic views.', ...yt('iL2wLL0MGf4') },
    { date: 'Apr 2024', title: 'Millions watching.', text: 'A vertical series explaining technical analysis with Kıvanç Özbilgiç passed 1M+ views.', ...local('milyonlar-izliyor') },
    { date: 'Oct 2023', title: 'The most valuable paper.', text: 'Our film for the Republic’s 100th anniversary passed 10M+ views.', ...yt('cedKAph-6FA') },
    { date: 'Oct 2023', title: 'TikTok effect, 3rd place.', text: 'Placed third in TikTok’s effect contest for Republic Day.', ...local('tiktok-efekt') },
    { date: 'Mar 2022', title: 'FindHashTag.', text: 'An ML tool that finds the best-fitting hashtags for social content.', ...local('findhashtag') },
    { date: 'Sep 2020', title: 'A family of 1,000.', text: 'Coding, design, WWDC and more — the TurkishKit community grew to 1,000 members.', ...local('kocaman-bir-aile') },
    { date: 'May 2020', title: 'WWDC20.', text: 'Shapes: a Swift playground that breaks students’ prejudices about geometry.', ...yt('uN7Ea_Ihduw') },
    { date: 'Mar 2019', title: '#EveryGirlCanCode', text: 'A Women’s Day coding event we hosted with future leaders.', ...local('herkizkodlayabilir') },
  ];

  const rail = document.getElementById('rail');
  rail.innerHTML = highlights.map(h => {
    const tag = h.href ? 'a' : 'article';
    const attrs = h.href ? ` href="${h.href}" target="_blank" rel="noopener"` : '';
    return `<${tag} class="card"${attrs}>
      <div class="card-media"><img src="${h.img}" alt="" loading="lazy">${h.video ? '<span class="card-play" aria-hidden="true">▶</span>' : ''}</div>
      <div class="card-body"><div class="card-date">${h.date}</div><h3>${h.title}</h3><p>${h.text}</p></div>
    </${tag}>`;
  }).join('');

  const prev = document.getElementById('railPrev');
  const next = document.getElementById('railNext');
  const step = () => (rail.querySelector('.card')?.offsetWidth || 340) + 20;
  prev.addEventListener('click', () => rail.scrollBy({ left: -step() * 2, behavior: 'smooth' }));
  next.addEventListener('click', () => rail.scrollBy({ left: step() * 2, behavior: 'smooth' }));
  const updateRail = () => {
    prev.disabled = rail.scrollLeft < 8;
    next.disabled = rail.scrollLeft + rail.clientWidth > rail.scrollWidth - 8;
  };
  rail.addEventListener('scroll', updateRail, { passive: true });
  updateRail();

  /* ---------- Intro ---------- */
  const intro = document.getElementById('intro');
  let seen = false;
  try { seen = sessionStorage.getItem('introSeen') === '1'; } catch (e) {}

  const start = () => root.classList.add('ready');
  if (reduce || seen) {
    intro.classList.add('gone');
    start();
  } else {
    document.body.classList.add('locked');
    const finish = () => {
      if (intro.classList.contains('out')) return;
      intro.classList.add('out');
      document.body.classList.remove('locked');
      setTimeout(start, 250);
      setTimeout(() => intro.classList.add('gone'), 1300);
      try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}
    };
    setTimeout(finish, 2200);
    intro.addEventListener('click', finish);
    window.addEventListener('keydown', finish, { once: true });
  }

  /* ---------- Nav border ---------- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => nav.classList.toggle('scrolled', window.scrollY > 8);

  /* ---------- Count-up ---------- */
  const countUp = el => {
    const to = +el.dataset.to, suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = to + suffix; return; }
    const dur = 1600, t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * e) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      en.target.querySelectorAll('.count').forEach(countUp);
      io.unobserve(en.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });

  /* ---------- Scroll-lit statement ---------- */
  const lit = document.getElementById('lit');
  lit.innerHTML = lit.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  const words = [...lit.querySelectorAll('.w')];

  /* ---------- Hero image scale ---------- */
  const heroImg = document.getElementById('heroImg');

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      onScrollNav();
      if (reduce) return;
      const vh = window.innerHeight;

      const r = heroImg.parentElement.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      heroImg.style.transform = `scale(${1.12 - p * 0.12})`;

      const lr = lit.getBoundingClientRect();
      const lp = Math.min(1, Math.max(0, (vh * 0.85 - lr.top) / (lr.height + vh * 0.35)));
      const n = Math.round(lp * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < n));
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
})();
