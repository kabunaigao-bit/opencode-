import zh from './zh.js';
import en from './en.js';

const locales = { zh, en };
let currentLang = 'zh';
let listeners = [];

function init() {
  const saved = localStorage.getItem('lang');
  if (saved === 'en' || saved === 'zh') {
    currentLang = saved;
  }
}

function t(key) {
  const keys = key.split('.');
  let val = locales[currentLang];
  for (const k of keys) {
    val = val?.[k];
  }
  return val ?? key;
}

function getLang() {
  return currentLang;
}

function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('lang', lang);
  listeners.forEach((fn) => fn(lang));
}

function onLangChange(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((f) => f !== fn);
  };
}

function translateStatic() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    const translation = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = translation;
    } else {
      el.textContent = translation;
    }
  });
}

init();

export { t, getLang, setLang, onLangChange, translateStatic };
