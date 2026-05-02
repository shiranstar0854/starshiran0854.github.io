# Shiran Star

一个静态优先的个人认知系统站点，部署目标是 GitHub Pages 和自定义域名 `0854937.xyz`。

## 页面结构

- `index.html`：站点首页和系统总览。
- `model.html`：认知模型库。
- `records.html`：模型调用后的验证记录。
- `fact.html`：事实、假设、边界和待验证问题。
- `style.css`：全站视觉系统和响应式布局。
- `index.js`：滚动进度、数字动画、筛选、tab 和账本聚焦交互。

## 本地预览

这个仓库不依赖构建工具，可以直接打开 `index.html`。如果需要更接近线上环境，建议在仓库根目录启动一个静态服务器：

```powershell
python -m http.server 8080
```

然后访问 `http://localhost:8080`。

## 发布说明

- GitHub Pages 默认分支应使用 `main`。
- 自定义域名由 `CNAME` 指向 `0854937.xyz`。
- 每次新增页面后，同步更新 `sitemap.xml` 和页面内的 canonical 地址。

## 维护原则

- 模型内容只放在 `model.html`，验证结果只放在 `records.html`，事实约束只放在 `fact.html`。
- 图片资源应确认页面实际引用后再提交，避免 GitHub Pages 仓库膨胀。
- 新增交互时保持无构建、无框架、可降级。
