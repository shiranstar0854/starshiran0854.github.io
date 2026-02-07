// ================================
// 后端系统状态
// ================================
let SYSTEM_STATUS = {
  activeModule: "None",
  cycle: "Week 1",
  state: "RUNNING"
};

// ================================
// 模块内容定义（模板）
// ================================
const MODULE_OUTPUTS = {
  model: status => `
    <h3>模型系统</h3>
    <p>用于记录、验证、修正当前使用的认知与决策模型。</p>
    <ul>
      <li>当前模型：情绪模板分析</li>
      <li>系统状态：${status.state}</li>
      <li>验证周期：${status.cycle}</li>
    </ul>
  `,
  logs: status => `
    <h3>现实日志</h3>
    <p>用于追踪真实世界中的行动、反馈与偏差。</p>
    <ul>
      <li>最近行动：内容系统 3.0 构建</li>
      <li>系统状态：${status.state}</li>
      <li>偏差记录：暂无</li>
    </ul>
  `,
  roadmap: status => `
    <h3>系统路线</h3>
    <p>描述系统的阶段性目标与长期演化方向。</p>
    <ol>
      <li>v3.0：系统重建（当前）</li>
      <li>v3.1：数据驱动与可视化</li>
      <li>v4.0：自动反馈与修正闭环</li>
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
// 从后端加载系统状态
// ================================
async function loadSystemStatus() {
  try {
    const res = await fetch("http://localhost:3000/api/status");
    SYSTEM_STATUS = await res.json();
  } catch (err) {
    console.error("无法加载系统状态", err);
  }
}

// ================================
// 带动画的模块加载（状态驱动）
// ================================
async function loadModule(moduleKey) {
  if (!MODULE_OUTPUTS[moduleKey]) {
    output.innerHTML = "<p>模块不存在。</p>";
    return;
  }

  // 更新系统状态
  SYSTEM_STATUS.activeModule = moduleKey;
  activeModuleText.textContent = moduleKey;

  // 动画：淡出
  output.classList.add("fade-out");
  output.classList.remove("fade-in");

  setTimeout(() => {
    output.innerHTML = MODULE_OUTPUTS[moduleKey](SYSTEM_STATUS);
    output.classList.remove("fade-out");
    output.classList.add("fade-in");
  }, 200);
}
const activeModuleText = document.getElementById("active-module");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const moduleKey = button.dataset.module;

    // 1. 移除所有激活态
    buttons.forEach(btn => btn.classList.remove("active"));

    // 2. 设置当前激活按钮
    button.classList.add("active");

    // 3. 更新系统状态栏
    activeModuleText.textContent = moduleKey;

    // 4. 加载模块内容
    loadModule(moduleKey);
  });
});

});

// ================================
// 系统初始化
// ================================
(async function initSystem() {
  await loadSystemStatus();
  activeModuleText.textContent = SYSTEM_STATUS.activeModule;
  output.innerHTML = "<p class='idle'>System idle. Waiting for module input.</p>";
  output.classList.add("fade-in");
})();

