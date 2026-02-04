// ================================
// 模块内容定义
// ================================
const MODULE_OUTPUTS = {
  model: `
    <h3>模型系统</h3>
    <p>用于记录、验证、修正当前使用的认知与决策模型。</p>
    <ul>
      <li>当前模型：情绪模板分析</li>
      <li>状态：已加载</li>
      <li>验证轮次：1</li>
    </ul>
  `,
  logs: `
    <h3>现实日志</h3>
    <p>用于追踪真实世界中的行动、反馈与偏差。</p>
    <ul>
      <li>最近行动：内容系统 3.0 构建</li>
      <li>反馈状态：收集中</li>
      <li>偏差记录：暂无</li>
    </ul>
  `,
  roadmap: `
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

// ================================
// 带动画的模块加载
// ================================
function loadModule(moduleKey) {
  if (!MODULE_OUTPUTS[moduleKey]) {
    output.innerHTML = "<p>模块不存在。</p>";
    return;
  }

  // 先淡出
  output.classList.add("fade-out");
  output.classList.remove("fade-in");

  setTimeout(() => {
    output.innerHTML = MODULE_OUTPUTS[moduleKey];

    // 再淡入
    output.classList.remove("fade-out");
    output.classList.add("fade-in");
  }, 200); // 与 CSS transition 时间匹配
}

// ================================
// 事件监听
// ================================
buttons.forEach(button => {
  button.addEventListener("click", () => {
    loadModule(button.dataset.module);
  });
});

// ================================
// 初始状态
// ================================
output.innerHTML = "<p>请选择一个系统模块以加载。</p>";
output.classList.add("fade-in");
