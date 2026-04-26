const yearNode = document.querySelector(".year");
const scrollBar = document.getElementById("scroll-bar");
const countNodes = Array.from(document.querySelectorAll("[data-count]"));
const revealNodes = Array.from(
  document.querySelectorAll(
    ".hero, .signal, .feature, .gallery-card, .system, .timeline, .info-card, .bento-card, .stat-card, details"
  )
);
const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanel = document.getElementById("tab-panel");
const filterGroups = Array.from(document.querySelectorAll("[data-filter-group]"));
const ledgerDetails = Array.from(document.querySelectorAll("[data-ledger-item]"));

const tabContent = {
  principle: {
    title: "设计原则",
    copy:
      "把页面当作一份可阅读的认知系统：层级清楚、干扰更少、每一块内容都知道自己在回答什么问题。",
    points: [
      "用一个强主视觉承接全站叙事，减少互相竞争的模块。",
      "保留足够留白，让结构本身承担节奏。",
      "把图片当作被框住的证据，而不是普通装饰。"
    ]
  },
  threshold: {
    title: "触发阈值",
    copy:
      "只有当输入足够明确、场景足够稳定时，模型才进入调用状态；否则先停留在观察层，不急于给出结论。",
    points: [
      "信息不清楚时，先记录事实，不急着建模。",
      "情绪过高时，先延迟反应，不急着回应。",
      "成本与收益未明时，先保留问题，不急着站位。"
    ]
  },
  retire: {
    title: "退场条件",
    copy:
      "当某个模型无法解释新的现实，或开始用解释遮盖事实时，它就应该退场，而不是继续自证。",
    points: [
      "边界被现实击穿。",
      "模型开始替代事实本身。",
      "复审后仍然无法提升判断质量。"
    ]
  }
};

function renderTab(key) {
  if (!tabPanel) return;

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

function setupFilters() {
  filterGroups.forEach((group) => {
    const buttons = Array.from(group.querySelectorAll("[data-filter]"));
    const targetName = group.dataset.filterGroup;
    const items = Array.from(document.querySelectorAll(`[data-filterable="${targetName}"]`));

    if (!buttons.length || !items.length) return;

    const applyFilter = (value) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.filter === value;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });

      items.forEach((item) => {
        const tags = (item.dataset.tags || "")
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
        const show = value === "all" || tags.includes(value);
        item.hidden = !show;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
    });

    const initial = buttons.find((button) => button.classList.contains("active"))?.dataset.filter || "all";
    applyFilter(initial);
  });
}

function setupLedgerFocus() {
  if (!ledgerDetails.length) return;

  if (!ledgerDetails.some((node) => node.open) && ledgerDetails[0]) {
    ledgerDetails[0].open = true;
  }

  if (!("IntersectionObserver" in window)) {
    ledgerDetails.forEach((node, index) => {
      if (index === 0) node.classList.add("reading");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("reading", entry.isIntersecting);
      });
    },
    { threshold: 0.42 }
  );

  ledgerDetails.forEach((node) => observer.observe(node));
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

if (tabPanel && tabButtons.length) {
  renderTab("principle");
  setupTabs();
}

setupFilters();
setupReveal();
setupObservers();
setupLedgerFocus();
updateScrollBar();

window.addEventListener("scroll", updateScrollBar, { passive: true });
window.addEventListener("resize", updateScrollBar, { passive: true });
