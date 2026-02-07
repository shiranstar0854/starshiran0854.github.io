// ================================
// 全局系统状态（由后端驱动）
// ================================
let SYSTEM_STATUS = {
  activeModule: "none",
  cycle: "Unknown",
  state: "UNKNOWN"
};

// ================================
// 模块渲染模板
// ================================
const MODULE_OUTPUTS = {
  model: status => `
    <h3>模型系统</h3>
    <ul>
      <li>当前模型：情绪模板分析</li>
      <li>系统状态：${status.state}</li>
      <li>验证周期：${status.cycle}</li>
    </ul>
  `,
  logs: status => `
    <h3>现实日志</h3>
    <ul>
      <li>系统状态：${status.state}</li>
      <li>最近动作：系统 3.0 构建</li>
    </ul>
  `,
  roadmap: () => `
    <h3>系统路线</h3>
    <ol>
      <li>v3.0：系统重建</li>
      <li>v3.1：Notion 数据接入</li>
      <li>v4.0：自动修正闭环</li>
    </ol>
  `
};

// ================================
// DOM 绑定
// ================================
const output = document.getElementById("output-content");
const buttons = document.querySelectorAll("[data-module]");
const activeModuleText = document.getElementById("active-module");

// ================================
// 启动时加载系统状态
// ================================
async function fetchSystemStatus() {
  try {
    const res = await fetch("http://localhost:3000/api/status");
    SYSTEM_STATUS = await res.json();
    activeModuleText.textContent = SYSTEM_STATUS.activeModule;
  } catch (err) {
    output.innerHTML = "<p class='error'>无法连接系统后端</p>";
    console.error(err);
  }
}

// ================================
// 模块加载（纯渲染）
// ================================
function loadModule(key) {
  if (!MODULE_OUTPUTS[key]) return;

  SYSTEM_STATUS.activeModule = key;
  activeModuleText.textContent = key;

  output.classList.remove("fade-in");
  output.classList.add("fade-out");

  setTimeout(() => {
    output.innerHTML = MODULE_OUTPUTS[key](SYSTEM_STATUS);
    output.classList.remove("fade-out");
    output.classList.add("fade-in");
  }, 200);
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
(async function init() {
  await fetchSystemStatus();
  output.innerHTML = "<p class='idle'>System ready.</p>";
  output.classList.add("fade-in");
})();
