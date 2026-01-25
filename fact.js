// === 阅读结构感知系统 ===

const sections = document.querySelectorAll("details");

// 当前激活模块
let activeSection = null;

// 监听滚动，判断读到哪一块
window.addEventListener("scroll", () => {
  let current = null;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.35) {
      current = section;
    }
  });

  if (current && current !== activeSection) {
    if (activeSection) {
      activeSection.classList.remove("reading");
    }
    current.classList.add("reading");
    activeSection = current;
  }
});


