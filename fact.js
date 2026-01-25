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
// === 滚轮控制 details 展开/折叠 ===

let scrollTimeout = null;

// 获取所有 details
const allDetails = document.querySelectorAll("details");

// 当前激活索引
let currentIndex = 0;

// 初始展开第一个
allDetails.forEach((d, i) => i === 0 ? d.setAttribute("open", "") : d.removeAttribute("open"));

// 监听滚轮
window.addEventListener("wheel", (e) => {
  if (scrollTimeout) return; // 防止过快滚轮

  if (e.deltaY > 0) {
    // 向下滚动，展开下一个
    if (currentIndex < allDetails.length - 1) {
      allDetails[currentIndex].removeAttribute("open");
      currentIndex++;
      allDetails[currentIndex].setAttribute("open", "");
    }
  } else if (e.deltaY < 0) {
    // 向上滚动，展开上一个
    if (currentIndex > 0) {
      allDetails[currentIndex].removeAttribute("open");
      currentIndex--;
      allDetails[currentIndex].setAttribute("open", "");
    }
  }

  scrollTimeout = setTimeout(() => scrollTimeout = null, 200); // 200ms 节流
});



