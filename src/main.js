import './styles/style.css';
import { t, getLang, setLang, onLangChange, translateStatic } from './i18n/index.js';

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

function renderProjects() {
  const container = document.getElementById('projectGrid');
  if (!container) return;
  const list = t('projects.list');
  container.innerHTML = list
    .map(
      (item) => `
      <div class="project-card">
        <div class="project-header">
          <div class="project-icon">${item.icon}</div>
          <div>
            <h3 class="project-title">${item.title}</h3>
            <div class="project-role">${item.role}</div>
          </div>
        </div>
        <p class="project-desc">${item.desc}</p>
        <div class="project-metrics">
          ${item.metrics.map((m) => `<div class="metric"><strong>${m.value}</strong> ${m.label}</div>`).join('')}
        </div>
        <div class="project-tags">
          ${item.tags.map((tag) => `<span>${tag}</span>`).join('')}
        </div>
      </div>
    `
    )
    .join('');
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

function renderAll() {
  renderHeroName();
  renderAboutStats();
  renderTimeline();
  renderProjects();
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
