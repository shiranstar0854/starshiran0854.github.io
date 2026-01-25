// records.js
// 目的：轻量交互 + 阅读节奏控制，不干扰思考

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (detail.open) {
      detail.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

