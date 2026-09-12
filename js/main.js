document.documentElement.classList.add("js-ready");

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("mobile-open", !open);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("mobile-open");
    }),
  );
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Return to Home when the browser is refreshed
(function () {
  const navigation = performance.getEntriesByType("navigation")[0];
  const isRefresh = navigation && navigation.type === "reload";

  const currentPage = window.location.pathname;
  const currentHash = window.location.hash;

  const isHomePage =
    currentPage.endsWith("/") ||
    currentPage.endsWith("./");

  const isHomeSection =
    currentHash === "" ||
    currentHash === "#home";

  if (isRefresh && (!isHomePage || !isHomeSection)) {
    window.location.replace("./");
  }
})();
