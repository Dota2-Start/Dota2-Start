//解析steam格式文本

export function removeBBCodeTags(text: string): string {
    const data = removeImgTags(text)
    return data.replace(/\[.*?\]/g, '');
}

function removeImgTags(text: string): string {
    return text.replace(/\[img\](.*?)\[\/img\]/gi, ''); // 删除 [img] 标签及其中的内容
  }