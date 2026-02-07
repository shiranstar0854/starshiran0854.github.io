// ================================
// 模块模板
// ================================
const MODULE_OUTPUTS = {
  model: status => `
    <h3>模型系统</h3>
    <ul>
      <li>系统状态：${status.state}</li>
      <li>周期：${status.cycle}</li>
      <li>当前模块：model</li>
    </ul>
  `,
  logs: status => `
    <h3>现实日志</h3>
    <ul>
      <li>系统状态：${status.state}</li>
      <li>周期：${status.cycle}</li>
      <li>当前模块：logs</li>
    </ul>
  `,
  roadmap: status => `
    <h3>系统路线</h3>
    <p>当前版本：v3.0</p>
  `
};

// ================================
// DOM
// ================================
const output = document.getElementById("output-content");
const buttons = document.querySelectorAll("[data-module]");
const activeModuleText = document.getElementById("active-module");

// ================================
// 从后端获取系统状态
// ================================
async function fetchSystemStatus() {
  const res = await fetch("http://localhost:3000/api/status");
  if (!res.ok) throw new Error("接口异常");
  return res.json();
}

// ================================
// 加载模块（核心）
// ================================
async function loadModule(moduleKey) {
  try {
    output.classList.add("fade-out");

    const status = await fetchSystemStatus();

    activeModuleText.textContent = moduleKey;

    setTimeout(() => {
      output.innerHTML = MODULE_OUTPUTS[moduleKey](status);
      output.classList.remove("fade-out");
      output.classList.add("fade-in");
    }, 200);

  } catch (err) {
    output.innerHTML = "<p class='error'>系统错误：无法获取后端状态</p>";
    console.error(err);
  }
}

// ================================
// 事件绑定
// ================================
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadModule(btn.dataset.module);
  });
});

// ================================
// 初始化
// ================================
output.innerHTML = "<p class='idle'>System idle. Waiting for module input.</p>";
