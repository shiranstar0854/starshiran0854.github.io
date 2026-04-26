const yearNode = document.querySelector(".year");
const scrollBar = document.getElementById("scroll-bar");
const countNodes = Array.from(document.querySelectorAll("[data-count]"));
const revealNodes = Array.from(
  document.querySelectorAll(".hero, .signal, .feature, .gallery-card, .system, .timeline")
);
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanel = document.getElementById("tab-panel");

const tabContent = {
  principle: {
    title: "Design principle",
    copy:
      "This rewrite turns the page into a clear editorial console: strong hierarchy, fewer distractions, and surfaces that feel deliberate rather than generic.",
    points: [
      "Use one strong hero instead of many competing blocks.",
      "Keep copy short and let spacing do the heavy lifting.",
      "Treat every image as a framed asset, not a plain illustration."
    ]
  },
  motion: {
    title: "Motion system",
    copy:
      "Motion stays restrained: counters, hover lift, reveal transitions, and a thin scroll indicator. The page moves just enough to feel alive.",
    points: [
      "Animate on first view, not continuously.",
      "Use blur and glow only where they add depth.",
      "Respect reduced-motion preferences."
    ]
  },
  workflow: {
    title: "Implementation workflow",
    copy:
      "The homepage is now static-first and GitHub Pages friendly. No localhost API calls, no framework runtime, and no fragile build assumptions.",
    points: [
      "Replace backend-dependent widgets with static content.",
      "Group content into hero, gallery, and system sections.",
      "Use one JS file for lightweight behavior only."
    ]
  }
};

function renderTab(key) {
  const data = tabContent[key] || tabContent.principle;

  tabPanel.innerHTML = `
    <h3>${data.title}</h3>
    <p>${data.copy}</p>
    <ul>
      ${data.points.map((point) => `<li>${point}</li>`).join("")}
    </ul>
  `;

  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === key;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function animateNumber(node, target) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    node.textContent = target.toLocaleString();
    return;
  }

  const start = performance.now();
  const duration = 1100;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = Math.round(target * eased).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

function updateScrollBar() {
  if (!scrollBar) return;

  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
}

function setupReveal() {
  revealNodes.forEach((node) => node.classList.add("reveal"));

  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    setupCounters();
    return;
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
    {
      threshold: 0.16
    }
  );

  revealNodes.forEach((node) => observer.observe(node));
}

function setupCounters() {
  countNodes.forEach((node) => {
    const target = Number(node.dataset.count || 0);
    animateNumber(node, target);
  });
}

function setupTabs() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => renderTab(button.dataset.tab));
  });
}

function setupObservers() {
  const heroCounters = document.querySelector(".metric-row");

  if (!heroCounters) return setupCounters();

  if (!("IntersectionObserver" in window)) {
    setupCounters();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setupCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.25 }
  );

  observer.observe(heroCounters);
}

yearNode.textContent = String(new Date().getFullYear());
renderTab("principle");
setupTabs();
setupReveal();
setupObservers();
updateScrollBar();

window.addEventListener("scroll", updateScrollBar, { passive: true });
window.addEventListener("resize", updateScrollBar, { passive: true });
