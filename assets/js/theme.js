// ===== THEME TOGGLE SCRIPT =====

// Select the toggle button
const toggleBtn = document.querySelector('.theme-toggle');

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);
updateToggleButton(currentTheme);

// Listen for toggle clicks
toggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  theme = theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateToggleButton(theme);
});

// Update the button icon/text
function updateToggleButton(theme) {
  toggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}
