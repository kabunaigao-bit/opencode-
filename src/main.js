import './styles/style.css';
import { t, getLang, setLang, onLangChange, translateStatic } from './i18n/index.js';

// ===== Image paths helper =====
const img = (name) => `/assets/images/${name}`;

const portfolioData = [
  {
    icon: '📖',
    categoryKey: 'introduce',
    title: 'Introduce',
    subtitle: '个人简介与专业定位',
    enTitle: 'Introduce',
    enSubtitle: 'Personal intro & professional positioning',
    images: [img('portfolio_02.png')],
  },
  {
    icon: '📋',
    categoryKey: 'content',
    title: 'Content',
    subtitle: '业务模块与往期方向',
    enTitle: 'Content',
    enSubtitle: 'Service modules & previous directions',
    images: [img('portfolio_03.png'), img('portfolio_04.png')],
  },
  {
    icon: '📱',
    categoryKey: 'social',
    title: '新媒体运营',
    subtitle: '小红书 · 视频号 · 微博 · 公众号',
    enTitle: 'Social Media Ops',
    enSubtitle: 'RED · Video Account · Weibo · WeChat Official',
    images: [
      img('portfolio_05.png'), img('portfolio_06.png'), img('portfolio_07.png'),
      img('portfolio_08.png'), img('portfolio_09.png'), img('portfolio_10.png'),
      img('portfolio_11.png'), img('portfolio_12.png'), img('portfolio_13.png'),
    ],
  },
  {
    icon: '✍️',
    categoryKey: 'brand',
    title: '品牌内容策划',
    subtitle: '品牌策略与内容规划',
    enTitle: 'Brand Content Strategy',
    enSubtitle: 'Brand strategy & content planning',
    images: [
      img('portfolio_15.png'), img('portfolio_16.png'),
      img('portfolio_17.png'), img('portfolio_18.png'),
    ],
  },
  {
    icon: '🎪',
    categoryKey: 'events',
    title: '品牌活动运营',
    subtitle: '线下/线上活动策划与执行',
    enTitle: 'Brand Event Ops',
    enSubtitle: 'Online/offline event planning & execution',
    images: [
      img('portfolio_20.png'), img('portfolio_21.png'), img('portfolio_22.png'),
      img('portfolio_23.png'), img('portfolio_24.png'), img('portfolio_25.png'),
    ],
  },
  {
    icon: '📈',
    categoryKey: 'ecom',
    title: '电商转化数据指标',
    subtitle: '增长数据与转化成果',
    enTitle: 'E-com Conversion Metrics',
    enSubtitle: 'Growth data & conversion results',
    images: [img('portfolio_27.png')],
  },
];

function renderHeroName() {
  const el = document.getElementById('heroName');
  if (!el) return;
  const lang = getLang();
  if (lang === 'zh') {
    el.innerHTML = '李 <span class="highlight">安</span> 然';
  } else {
    el.innerHTML = 'Li <span class="highlight">Anran</span>';
  }
}

function renderAboutStats() {
  const container = document.getElementById('aboutStats');
  if (!container) return;
  const stats = t('about.stats');
  container.innerHTML = stats
    .map(
      (s) => `
      <div class="stat">
        <span class="stat-number">${s.number}</span>
        <span class="stat-label">${s.label}</span>
      </div>
    `
    )
    .join('');
}

function renderTimeline() {
  const container = document.getElementById('timeline');
  if (!container) return;
  const list = t('experience.list');
  container.innerHTML = list
    .map(
      (item) => `
      <div class="timeline-item${item.current ? ' current' : ''}">
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-company">${item.company}</div>
        <div class="timeline-desc">${item.desc}</div>
        ${item.tags ? `<div class="timeline-tags">${item.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>` : ''}
      </div>
    `
    )
    .join('');
}

function renderPortfolio() {
  const container = document.getElementById('portfolioGrid');
  if (!container) return;
  const lang = getLang();

  container.innerHTML = portfolioData
    .map(
      (item) => `
      <div class="portfolio-block">
        <div class="portfolio-header">
          <div class="portfolio-icon">${item.icon}</div>
          <div>
            <h3 class="portfolio-title">${lang === 'zh' ? item.title : item.enTitle}</h3>
            <p class="portfolio-subtitle">${lang === 'zh' ? item.subtitle : item.enSubtitle}</p>
          </div>
        </div>
        <div class="portfolio-gallery">
          ${item.images
            .map(
              (src, i) => `
            <div class="gallery-item" data-src="${src}">
              <img src="${src}" alt="${item.title} ${i + 1}" loading="lazy" />
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `
    )
    .join('');

  // Lightbox click handler
  document.querySelectorAll('.gallery-item').forEach((el) => {
    el.addEventListener('click', () => {
      openLightbox(el.dataset.src);
    });
  });
}

function renderSkills() {
  const container = document.getElementById('skillsContent');
  if (!container) return;
  const categories = t('skills.categories');
  container.innerHTML = categories
    .map(
      (group) => `
      <div class="skill-category">
        <h3>${group.category}</h3>
        <div class="skill-items">
          ${group.items.map((item) => `<span class="skill-item">${item}</span>`).join('')}
        </div>
      </div>
    `
    )
    .join('');
}

// ===== Lightbox =====
function openLightbox(src) {
  const existing = document.querySelector('.lightbox');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img src="${src}" alt="portfolio" />
  `;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('lightbox-close')) {
      overlay.remove();
    }
  });
  document.body.appendChild(overlay);
}

function renderAll() {
  renderHeroName();
  renderAboutStats();
  renderTimeline();
  renderPortfolio();
  renderSkills();
  translateStatic();
}

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    nav?.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      nav?.classList.remove('open');
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = getLang() === 'zh' ? '感谢你的留言！李安然会尽快与你联系。' : 'Thank you! Serena will get back to you soon.';
    alert(msg);
    form.reset();
  });
}

function initLangToggle() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = getLang() === 'zh' ? 'en' : 'zh';
    setLang(next);
  });

  onLangChange((lang) => {
    btn.textContent = lang === 'zh' ? 'EN' : '中';
    renderAll();
  });
}

renderAll();
initMobileMenu();
initContactForm();
initLangToggle();
