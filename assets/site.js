(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  /* ---------- Highlights data ---------- */
  const yt = id => ({ img: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, href: `https://www.youtube.com/watch?v=${id}`, video: true });
  const local = f => ({ img: `images/milestones/${f}.jpg` });
  const highlights = [
    { date: ['Jun 2025','Haz 2025'], title: ['147K and counting.','147K ve büyüyor.'], text: ['Trial Reels and a new content strategy took Instagram from 29.7K to 147K+ — mostly organic.','Deneme Reels ve yeni içerik stratejisiyle Instagram 29.7K’dan 147K+’ya çıktı — büyük ölçüde organik.'], ...local('deneme-reels') },
    { date: ['May 2025','May 2025'], title: ['An AI music video.','Yapay zekâ ile müzik videosu.'], text: ['Lyrics inspired by AI, animation brought to life by our marketing team.','Sözleri yapay zekâdan ilham aldı, animasyonu pazarlama ekibimizle hayat buldu.'], ...yt('Isyan5myu0A') },
    { date: ['Apr 2025','Nis 2025'], title: ['#1 in Turkey.','Türkiye’nin 1 numarası.'], text: ['Gedik Yatırım became the best performing Instagram account in Turkey (BoomSocial).','Gedik Yatırım, Türkiye’nin en iyi performans gösteren Instagram hesabı oldu (BoomSocial).'], ...local('turkiyenin-en-iyisi') },
    { date: ['Mar 2025','Mar 2025'], title: ['100,000 people.','100.000 kişi.'], text: ['Our Instagram community crossed the 100K follower mark.','Instagram topluluğumuz 100 bin takipçi barajını aştı.'], ...local('100k-takipci') },
    { date: ['Dec 2024','Ara 2024'], title: ['#1 in Finance.','Finansta birinci.'], text: ['Top account in the finance category and #27 overall among Turkey’s Instagram accounts.','Türkiye’deki Instagram hesapları arasında finans kategorisinde 1., genelde 27. olduk.'], ...local('birincilik') },
    { date: ['2024','2024'], title: ['TikTok, 50K.','TikTok, 50K.'], text: ['Financial literacy meets trends: 50K+ followers and 17M+ views in a single month.','Finansal okuryazarlık trendlerle buluştu: 50K+ takipçi ve tek ayda 17M+ izlenme.'], ...local('tiktok-50k') },
    { date: ['Jun 2024','Haz 2024'], title: ['Fully organic.','Tamamen organik.'], text: ['A volleyball TikTok we produced reached 2.5M+ organic views.','Hazırladığımız voleybol temalı TikTok içeriği 2.5M+ organik izlenmeye ulaştı.'], ...yt('iL2wLL0MGf4') },
    { date: ['Apr 2024','Nis 2024'], title: ['Millions watching.','Milyonlar izliyor.'], text: ['A vertical series explaining technical analysis with Kıvanç Özbilgiç passed 1M+ views.','Kıvanç Özbilgiç ile teknik analizi anlattığımız dikey video serisi 1M+ izlenmeyi geçti.'], ...local('milyonlar-izliyor') },
    { date: ['Oct 2023','Eki 2023'], title: ['The most valuable paper.','En Değerli Kağıt.'], text: ['Our film for the Republic’s 100th anniversary passed 10M+ views.','Cumhuriyetimizin 100. yılı için hazırladığımız reklam filmi 10M+ izlenmeyi geçti.'], ...yt('cedKAph-6FA') },
    { date: ['Oct 2023','Eki 2023'], title: ['TikTok effect, 3rd place.','TikTok efekt yarışmasında 3.'], text: ['Placed third in TikTok’s effect contest for Republic Day.','TikTok’un 29 Ekim için düzenlediği efekt yarışmasında üçüncü oldum.'], ...local('tiktok-efekt') },
    { date: ['Mar 2022','Mar 2022'], title: ['FindHashTag.','FindHashTag.'], text: ['An ML tool that finds the best-fitting hashtags for social content.','Sosyal medya içeriklerine en uygun etiketleri makine öğrenmesiyle bulan bir araç.'], ...local('findhashtag') },
    { date: ['Sep 2020','Eyl 2020'], title: ['A family of 1,000.','1000 kişilik bir aile.'], text: ['Coding, design, WWDC and more — the TurkishKit community grew to 1,000 members.','Kodlama, tasarım, WWDC ve daha fazlası — TurkishKit topluluğu 1000 kişiye ulaştı.'], ...local('kocaman-bir-aile') },
    { date: ['May 2020','May 2020'], title: ['WWDC20.','WWDC20.'], text: ['Shapes: a Swift playground that breaks students’ prejudices about geometry.','Shapes: Öğrencilerin geometriye dair ön yargılarını yıkan bir Swift Playground projesi.'], ...yt('uN7Ea_Ihduw') },
    { date: ['Mar 2019','Mar 2019'], title: ['#EveryGirlCanCode','#HerKızKodlayabilir'], text: ['A Women’s Day coding event we hosted with future leaders.','Kadınlar Günü’ne özel düzenlediğimiz kodlama etkinliğinde geleceğin liderleriyle buluştuk.'], ...local('herkizkodlayabilir') },
  ];

  const rail = document.getElementById('rail');
  let lang = 'en';
  const L = () => (lang === 'tr' ? 1 : 0);
  const renderRail = () => { rail.innerHTML = highlights.map(h => {
    const tag = h.href ? 'a' : 'article';
    const attrs = h.href ? ` href="${h.href}" target="_blank" rel="noopener"` : '';
    return `<${tag} class="card"${attrs}>
      <div class="card-media"><img src="${h.img}" alt="" loading="lazy">${h.video ? '<span class="card-play" aria-hidden="true">▶</span>' : ''}</div>
      <div class="card-body"><div class="card-date">${h.date[L()]}</div><h3>${h.title[L()]}</h3><p>${h.text[L()]}</p></div>
    </${tag}>`;
  }).join(''); rail.scrollLeft = 0; };
  renderRail();

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
  let words = [];
  const splitLit = () => {
    lit.innerHTML = lit.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
    words = [...lit.querySelectorAll('.w')];
  };

  /* ---------- Language ---------- */
  const TR = window.I18N_TR;
  const enStore = new Map();
  const nodes = [...document.querySelectorAll('[data-i18n]')];
  nodes.forEach(n => enStore.set(n, n.innerHTML));
  const meta = { en: [document.title, document.querySelector('meta[name=description]').content],
                 tr: ['Berkin Ceylan', 'Selhan Berkin Ceylan — Kıdemli Sosyal Medya ve Influencer Pazarlama Uzmanı. Marka pazarlaması, influencer pazarlaması ve içerik üretici iş birlikleri.'] };
  const setLang = (next, save) => {
    lang = next === 'tr' ? 'tr' : 'en';
    nodes.forEach(n => { n.innerHTML = lang === 'tr' && TR[n.dataset.i18n] != null ? TR[n.dataset.i18n] : enStore.get(n); });
    root.lang = lang;
    document.title = meta[lang][0];
    document.querySelector('meta[name=description]').content = meta[lang][1];
    document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    renderRail(); updateRail(); splitLit();
    requestAnimationFrame(() => window.dispatchEvent(new Event('scroll')));
    if (save) { try { localStorage.setItem('lang', lang); } catch (e) {} }
  };
  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang, true)));
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved || 'en', false);

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
