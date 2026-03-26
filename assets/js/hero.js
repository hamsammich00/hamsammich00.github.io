
(function () {
  'use strict';

  /* ── Config — edit these to match your site ────────────── */
  const CONFIG = {
    name: 'Your Name',
    tagline: 'Homelab Engineer',        // shown under the name
    projectsHref: '#projects',          // or '/posts' etc.
    aboutHref: '/about',
    typewriterPhrases: [
      'running Proxmox on bare metal',
      'containerising everything with Docker',
      'breaking things in Linux',
      'self-hosting so I own my data',
      'documenting the chaos',
      'learning in public',
    ],
    tags: [
      { label: 'proxmox',    accent: false },
      { label: 'docker',     accent: true  },
      { label: 'linux',      accent: false },
      { label: 'bare-metal', accent: false },
      { label: 'self-hosted',accent: true  },
    ],
    // Particle network settings
    particleCount: 55,      // increase for denser network
    connectionDist: 130,    // px — max distance to draw an edge
    particleSpeed: 0.28,    // base speed (units/frame)
    nodeColor: 'rgba(88,166,255,',    // RGBA prefix — opacity appended
    edgeColor: 'rgba(56,139,253,',    // RGBA prefix
  };
  /* ──────────────────────────────────────────────────────── */

  /* ── Build DOM ──────────────────────────────────────────── */
  function buildHero() {
    const hero = document.getElementById('homelab-hero');
    if (!hero) return;

    hero.innerHTML = `
      <canvas id="hero-canvas"></canvas>

      <div id="hero-terminal">
        <div class="hero-titlebar">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
          <span class="hero-titlebar-label">bash — 80×24</span>
        </div>
        <div class="hero-body">
          <div class="hero-prompt hero-animate-in">
            <span class="hero-prompt-path">~/homelab</span>
            <span class="hero-prompt-symbol">$</span>
          </div>
          <h1 id="hero-name" class="hero-animate-in">${CONFIG.name}</h1>
          <div class="hero-typewriter-row hero-animate-in">
            <span class="hero-tw-prefix"># &nbsp;</span>
            <span id="hero-typewriter"></span><span id="hero-cursor"></span>
          </div>
          <div class="hero-tags hero-animate-in">
            ${CONFIG.tags.map(t =>
              `<span class="hero-tag${t.accent ? ' accent' : ''}">${t.label}</span>`
            ).join('')}
          </div>
          <div class="hero-cta hero-animate-in">
            <a href="${CONFIG.projectsHref}" class="hero-btn hero-btn-primary">view projects →</a>
            <a href="${CONFIG.aboutHref}"    class="hero-btn hero-btn-secondary">about me</a>
          </div>
        </div>
      </div>

      <div id="hero-scroll-hint">
        <span>scroll</span>
        <div class="hero-scroll-chevron"></div>
      </div>
    `;

    initCanvas();
    initTypewriter();
  }

  /* ── Particle canvas ────────────────────────────────────── */
  function initCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, nodes = [], raf;

    function resize() {
      const hero = document.getElementById('homelab-hero');
      W = canvas.width  = hero.offsetWidth;
      H = canvas.height = hero.offsetHeight;
    }

    function rand(a, b) { return a + Math.random() * (b - a); }

    function spawnNodes() {
      nodes = [];
      // Slightly more nodes for a richer network feel
      const count = Math.max(
        CONFIG.particleCount,
        Math.floor(W * H / 7000)
      );
      for (let i = 0; i < count; i++) {
        nodes.push({
          x:  rand(0, W),
          y:  rand(0, H),
          vx: rand(-CONFIG.particleSpeed, CONFIG.particleSpeed),
          vy: rand(-CONFIG.particleSpeed, CONFIG.particleSpeed),
          r:  rand(1.5, 2.8),
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;

        // Edges to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const b  = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONFIG.connectionDist) {
            const alpha = (1 - d / CONFIG.connectionDist) * 0.4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = CONFIG.edgeColor + alpha + ')';
            ctx.lineWidth   = 0.7;
            ctx.stroke();
          }
        }

        // Node dot
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.nodeColor + '0.75)';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    spawnNodes();
    draw();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        cancelAnimationFrame(raf);
        resize();
        spawnNodes();
        draw();
      }, 150);
    });

    // Pause animation when tab is hidden to save resources
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        draw();
      }
    });
  }

  /* ── Typewriter ─────────────────────────────────────────── */
  function initTypewriter() {
    const el     = document.getElementById('hero-typewriter');
    if (!el) return;
    const phrases = CONFIG.typewriterPhrases;
    let pi = 0, ci = 0, deleting = false, wait = 0;

    function tick() {
      const phrase = phrases[pi];

      if (wait > 0) { wait--; setTimeout(tick, 50); return; }

      if (!deleting) {
        el.textContent = phrase.slice(0, ci + 1);
        ci++;
        if (ci === phrase.length) { deleting = true; wait = 45; }
        setTimeout(tick, 72);
      } else {
        el.textContent = phrase.slice(0, ci - 1);
        ci--;
        if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; wait = 10; }
        setTimeout(tick, 36);
      }
    }

    // Small delay so it starts after the terminal fades in
    setTimeout(tick, 700);
  }

  /* ── Scroll-reveal ──────────────────────────────────────── */
  function initScrollReveal() {
    // Add .hero-reveal to Chirpy's post cards and section headings
    const targets = document.querySelectorAll(
      '.post-preview, .card, article.post, ' +
      '.page-heading + *, h2.post-list-heading, ' +
      'ul.post-list > li'
    );

    if (!targets.length) return;

    targets.forEach(el => el.classList.add('hero-reveal'));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(el => io.observe(el));
  }

  /* ── Smooth-scroll for the "view projects" button ───────── */
  function initSmoothScroll() {
    const btn = document.querySelector('.hero-btn-primary');
    if (!btn) return;
    const href = btn.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    btn.addEventListener('click', e => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* ── Hide scroll hint after first scroll ───────────────── */
  function initScrollHint() {
    const hint = document.getElementById('hero-scroll-hint');
    if (!hint) return;
    window.addEventListener('scroll', () => {
      hint.style.opacity = '0';
      hint.style.transition = 'opacity 0.4s';
    }, { once: true });
  }

  /* ── Init ───────────────────────────────────────────────── */
  function init() {
    buildHero();
    initScrollReveal();
    initSmoothScroll();
    initScrollHint();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
