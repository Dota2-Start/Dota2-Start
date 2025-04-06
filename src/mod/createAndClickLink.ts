export function createAndClickLink(url: string): void {
  console.log("open link",url);
  
    // 创建一个虚拟的超链接元素
    const link = document.createElement('a');
    
    // 设置链接的 URL 和一些必要的属性
    link.href = url;
    link.target = '_blank';  // 可选：如果你希望它在新窗口打开
    
    // 将链接添加到 DOM 中（需要加入到文档中才能触发点击事件）
    document.body.appendChild(link);
    
    // 模拟点击这个链接
    link.click();
    
    // 移除该链接（销毁）
    document.body.removeChild(link);
  }

  