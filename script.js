const navLinks = document.getElementById('navLinks'); // 👈 move to top

/* ===== Smooth scroll for in-page links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    navLinks.classList.remove('show');
  });
});

/* ===== Mobile hamburger toggle ===== */
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

/* ===== Dark Mode Toggle ===== */
const toggleBtn = document.getElementById("toggleMode");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.innerHTML = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

/* ===== Theme Toggle if present ===== */
const toggleTheme = document.getElementById("theme-toggle");
if (toggleTheme) {
  toggleTheme.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
  });
}

/* ===== Scroll animation using Intersection Observer (Repeats) ===== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const section = entry.target;

    if (entry.isIntersecting) {
      // Animate the section itself
      section.classList.add('active');

      // Re-trigger animations for child elements
      const animatedChildren = section.querySelectorAll('.left, .right, .fade');
      animatedChildren.forEach(el => {
        el.classList.remove('active');
        // Force reflow to restart animation
        void el.offsetWidth;
        el.classList.add('active');
      });
    } else {
      // Optional: Remove class when out of view to allow repeat
      section.classList.remove('active');
      const animatedChildren = section.querySelectorAll('.left, .right, .fade');
      animatedChildren.forEach(el => el.classList.remove('active'));
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.animate-on-scroll').forEach(section => {
  observer.observe(section);
});


