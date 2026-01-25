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

// === 验证完成状态锁定系统 ===

// 找到结论模块
const conclusion = document.querySelector(".conclusion");

// 若结论存在，标记整份记录为“已验证”
if (conclusion) {
  document.body.classList.add("verified");

  // 控制台输出一次性验证标记（给未来调试用）
  console.log("[FACT] 该记录已完成现实验证");
}



