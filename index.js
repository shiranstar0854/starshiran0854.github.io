const MODULES = {
  synthesis: {
    title: "认知综合台 / Synthesis",
    subtitle: "将输入事实、主观感受和目标约束聚合为可行动命题。",
    summary:
      "你当前最优先处理的不是任务量，而是任务序。先把今日关键战场缩减到一个变量，再求推进效率。",
    stats: {
      "主问题": "战略扩散",
      "当前约束": "注意力碎片",
      "行动锚点": "90 分钟深度输出"
    }
  },
  execution: {
    title: "执行引擎 / Execution",
    subtitle: "把认知结论转化为可验证的动作，避免空转。",
    summary:
      "建议进入 30-10-30 节奏：30 分钟主任务，10 分钟复盘，30 分钟再迭代，保持输出闭环。",
    stats: {
      "执行模式": "单线程冲刺",
      "阻抗来源": "上下文切换",
      "即时动作": "关闭非必要窗口"
    }
  },
  correction: {
    title: "修正回路 / Correction",
    subtitle: "通过证据回收和偏差校准，让系统持续进化。",
    summary:
      "你需要把“情绪波动”改写为“信号监测”。波动不是失败，是过载的预警指标。",
    stats: {
      "偏差类型": "目标膨胀",
      "触发情境": "多任务并行",
      "修正机制": "每 2 小时策略复盘"
    }
  }
};

const SUGGESTIONS = [
  "把当前行动拆成 3 个 20 分钟可完成单元，并立即执行第一单元。",
  "将今天所有任务按“价值 x 紧迫”重排，砍掉底部 30% 任务。",
  "写下一个最坏结果，再写三条可控策略，降低决策焦虑。",
  "用一句话定义今日胜利标准，并对照它过滤所有临时请求。"
];

const moduleContainer = document.getElementById("module-buttons");
const outputPanel = document.getElementById("output-panel");
const activeTitle = document.getElementById("active-title");
const activeSubtitle = document.getElementById("active-subtitle");
const timelineList = document.getElementById("timeline-list");
const focusCard = document.getElementById("focus-card");
const rhythmGrid = document.getElementById("rhythm-grid");
const logs = document.getElementById("logs");

const metricStability = document.getElementById("metric-stability");
const metricClarity = document.getElementById("metric-clarity");
const metricLatency = document.getElementById("metric-latency");
const nextStepButton = document.getElementById("next-step");
const clock = document.getElementById("clock");

let activeKey = "synthesis";

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function log(message, level = "INFO") {
  const now = new Date().toLocaleTimeString("zh-CN", { hour12: false });
  const row = document.createElement("div");
  row.textContent = `[${now}] ${level} ${message}`;
  logs.prepend(row);
}

function renderModules() {
  moduleContainer.innerHTML = "";
  Object.entries(MODULES).forEach(([key, module]) => {
    const btn = document.createElement("button");
    btn.className = `module-btn ${key === activeKey ? "active" : ""}`;
    btn.textContent = module.title;
    btn.addEventListener("click", () => {
      activeKey = key;
      renderModules();
      renderActiveModule();
      log(`切换模块 -> ${module.title}`);
    });
    moduleContainer.appendChild(btn);
  });
}

function renderActiveModule() {
  const module = MODULES[activeKey];
  activeTitle.textContent = module.title;
  activeSubtitle.textContent = module.subtitle;

  const kv = Object.entries(module.stats)
    .map(
      ([k, v]) =>
        `<div class="kv-item"><small>${k}</small><div>${v}</div></div>`
    )
    .join("");

  outputPanel.innerHTML = `
    <strong>系统判断：</strong>
    <p>${module.summary}</p>
    <div class="kv-grid">${kv}</div>
  `;

  const stability = 85 + Math.floor(Math.random() * 10);
  const clarity = 78 + Math.floor(Math.random() * 16);
  const latency = 90 + Math.floor(Math.random() * 120);

  metricStability.textContent = `${stability}%`;
  metricClarity.textContent = `${clarity}%`;
  metricLatency.textContent = `${latency} ms`;

  const focus =
    activeKey === "synthesis"
      ? "今天只允许一个主目标：输出一个高质量、可交付结果。"
      : activeKey === "execution"
        ? "你最需要守住的是执行节奏，不是任务数量。"
        : "每次情绪上升都做一次证据记录，改情绪为数据。";

  focusCard.innerHTML = `<h3>Focus Directive</h3><p>${focus}</p>`;

  timelineList.innerHTML = [
    "识别：定义当前主矛盾",
    "决策：选择最小可执行动作",
    "推进：进入 30 分钟单线程输出",
    "校准：复盘结果并更新策略"
  ]
    .map(
      (item, index) =>
        `<article class="timeline-item"><strong>T+${index + 1}</strong><p>${item}</p></article>`
    )
    .join("");
}

function renderRhythm() {
  rhythmGrid.innerHTML = "";
  const states = ["high", "mid", "high", "low", "mid", "high", "mid", "low"];
  states.forEach(state => {
    const block = document.createElement("div");
    block.className = `rhythm-block ${state}`;
    rhythmGrid.appendChild(block);
  });
}

nextStepButton.addEventListener("click", () => {
  const pick = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
  log(`生成建议 -> ${pick}`, "ACTION");
  outputPanel.insertAdjacentHTML(
    "beforeend",
    `<p><strong>下一步建议：</strong>${pick}</p>`
  );
});

updateClock();
setInterval(updateClock, 1000 * 20);
renderModules();
renderActiveModule();
renderRhythm();
log("系统初始化完成");
