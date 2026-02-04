const MODULE_OUTPUTS = {
  model: `
    <h3>模型系统</h3>
    <p>用于记录、验证、修正当前使用的认知与决策模型。</p>
  `,
  logs: `
    <h3>现实日志</h3>
    <p>用于追踪真实世界中的行动、反馈与偏差。</p>
  `,
  roadmap: `
    <h3>系统路线</h3>
    <p>描述系统的阶段性目标与长期演化方向。</p>
  `
};

const output = document.getElementById("output-content");

const systemData = {
  model: "当前模块：情绪模板分析系统已加载。",
  logs: "当前模块：现实验证日志系统运行中。",
  roadmap: "当前模块：系统升级路线图（3.0 架构）。"
};

function loadModule(key) {
  output.innerHTML = `<p>${systemData[key]}</p>`;
}

document.querySelectorAll("[data-module]").forEach(button => {
  button.addEventListener("click", () => {
    loadModule(button.dataset.module);
  });
});
