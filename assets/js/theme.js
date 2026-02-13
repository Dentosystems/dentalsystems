// Initialize theme
const getStoredTheme = () => localStorage.getItem('theme');
const setStoredTheme = theme => localStorage.setItem('theme', theme);

const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setTheme = theme => {
    document.documentElement.setAttribute('data-theme', theme);
    setStoredTheme(theme);
    updateToggleButton(theme);
};

const updateToggleButton = theme => {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
};

// Toggle theme function
window.toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
};

// Set theme on load
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".theme-toggle");
  const root = document.documentElement;

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", function () {
    const currentTheme = root.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
});

