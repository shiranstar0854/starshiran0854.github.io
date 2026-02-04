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
