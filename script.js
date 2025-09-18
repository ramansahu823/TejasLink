// State: theme, language, role, user
const state = {
  lang: localStorage.getItem('tl_lang') || 'en',
  theme: localStorage.getItem('tl_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  role: null,
  user: JSON.parse(localStorage.getItem('tl_user') || 'null')
};

// Translations
const t = { /* same t object from your code, no changes */ };

// Apply theme
function applyTheme() { /* same as your code */ }

// i18n rendering
function applyStaticI18n() { /* same as your code */ }

// Routing
const routes = { /* same routes object */ };
function navigate(path) { /* same as your code */ }
function render() { /* same as your code */ }

// Views
function renderHome() { /* same as your code */ }
function renderSignin(role) { /* same as your code */ }
function renderSignup(role) { /* same as your code */ }
function renderDashboard() { /* same as your code */ }

// Helpers
function escapeHtml(str) { /* same as your code */ }
function bindInteractions() { /* same as your code */ }

// Event listeners for header controls
document.getElementById('themeToggle').addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme();
});
document.getElementById('langSelect').addEventListener('change', (e) => {
  state.lang = e.target.value;
  localStorage.setItem('tl_lang', state.lang);
  applyStaticI18n();
  render();
});

// Init
applyTheme();
window.addEventListener('hashchange', render);
if (state.user) location.hash = '#
