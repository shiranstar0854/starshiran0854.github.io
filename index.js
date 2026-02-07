// ================================
// DOM 绑定
// ================================
const output = document.getElementById("output-content");
const buttons = document.querySelectorAll("[data-module]");
const activeModuleText = document.getElementById("active-module");

// ================================
// 加载模块（从后端获取）
// ================================
async function loadModule(moduleKey) {
  output.classList.add("fade-out");

  try {
    const res = await fetch(
      `http://localhost:3000/api/status?module=${moduleKey}`
    );

    if (!res.ok) throw new Error("API 请求失败");

    const data = await res.json();

    setTimeout(() => {
      output.innerHTML = data.content || "<p>无内容返回</p>";
      activeModuleText.textContent = data.activeModule || moduleKey;
      output.classList.remove("fade-out");
      output.classList.add("fade-in");
    }, 200);

  } catch (err) {
    output.innerHTML = `<p style="color:red">系统错误：${err.message}</p>`;
    output.classList.remove("fade-out");
  }
}

// ================================
// 按钮事件
// ================================
buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    loadModule(button.dataset.module);
  });
});

// ================================
// 初始化
// ================================
output.innerHTML =
  "<p class='idle'>System idle. Waiting for module input.</p>";
output.classList.add("fade-in");
