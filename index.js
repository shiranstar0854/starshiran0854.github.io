// 页面加载时，控制页面元素的显现
document.addEventListener('DOMContentLoaded', function () {
  // 获取所有的 .block 元素
  const blocks = document.querySelectorAll('.block');

  // 当页面滚动时触发
  window.addEventListener('scroll', function () {
    blocks.forEach(function (block) {
      if (isInViewport(block)) {
        block.classList.add('visible');
      }
    });
  });

  // 判断元素是否在视口中
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
});
