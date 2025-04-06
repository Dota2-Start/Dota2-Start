import { create } from 'zustand';

export interface LocalType {
  Local: any;
  setLocal: (e: Partial<LocalType>) => void;
}

export const LocalStor = create<LocalType>((set) => ({
  Local: {},
  setLocal: (e) => {
    const processedLocal = processLanguageData(e);
    set({ Local: processedLocal });
  },
}));

// 替换文本中的自定义变量
function replaceTextVariables(text: string, variables: any): string {
  return text.replace(/{(.*?)}/g, (match, key) => {
    if (key in variables) {
      return variables[key]; // 替换为对应的变量
    } else if (key === '') {
      return variables.gameName || ''; // 如果是空的 {}，替换为 gameName
    }
    return match; // 如果没有找到对应的变量，保留原样
  });
}

// 处理语言数据中的所有文本字段
function processLanguageData(languageData: any): any {
  const variables = languageData['$'] || {}; // 获取语言数据中的变量集合

  const processData = (data: any) => {
    if (typeof data === 'string') {
      return replaceTextVariables(data, variables); // 替换字符串中的变量
    } else if (typeof data === 'object' && data !== null) {
      // 如果是对象，递归处理每个字段
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          data[key] = processData(data[key]);
        }
      }
    }
    return data;
  };

  // 返回处理后的数据
  return processData(languageData);
}