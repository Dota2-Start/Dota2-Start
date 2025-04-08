import { defineAppConfig } from 'ice';
document.addEventListener('keydown', function (e) {
    if ((e.key === 'F5') || (e.ctrlKey && e.key === 'r')) {
            e.preventDefault(); // 禁止刷新
    }
  });
          document.addEventListener('contextmenu', function (e) {
    const target = e.target;
          // @ts-ignore 如果目标是 input 元素且没有被禁用，则允许右键菜单
          if (target.tagName.toLowerCase() === 'input' && !target.disabled) {
      return;
    }
          // 其它情况（非 input 或 input 处于禁用状态）都阻止右键菜单
          e.preventDefault();
  });
// App config, see https://v3.ice.work/docs/guide/basic/app
export default defineAppConfig(() => ({}));
