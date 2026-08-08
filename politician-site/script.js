const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

function closeMenu() {
  menuButton?.classList.remove("is-open");
  mobileMenu?.classList.remove("is-open");
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "メニューを開く");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const opening = !menuButton.classList.contains("is-open");
  menuButton.classList.toggle("is-open", opening);
  mobileMenu?.classList.toggle("is-open", opening);
  menuButton.setAttribute("aria-expanded", String(opening));
  menuButton.setAttribute("aria-label", opening ? "メニューを閉じる" : "メニューを開く");
  document.body.classList.toggle("menu-open", opening);
});

mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.querySelector(".brand")?.addEventListener("click", closeMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

const root = document.documentElement;
const header = document.querySelector(".site-header");
const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 36);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
  root.classList.add("motion-ready");
} else {
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
      element.classList.add("is-visible");
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
  );

  revealElements
    .filter((element) => !element.classList.contains("is-visible"))
    .forEach((element) => revealObserver.observe(element));
  root.classList.add("motion-ready");
}
