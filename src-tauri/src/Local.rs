use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::path::Path;

// 定义语言条目结构
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LanguageEntry {
    pub value: String,
    pub label: String,
}

// 定义语言索引类型
pub type LanguageIndex = HashMap<String, LanguageEntry>;

// 语言管理器
pub struct LocaleManager {
    pub index: LanguageIndex,
}
pub fn language_file<P: AsRef<Path>>(path: P) -> Result<String, i32> {
    // 尝试读取文件内容
    match fs::read_to_string(&path) {
        Ok(content) => Ok(content), // 成功读取，返回文件内容
        Err(err) => {
            eprintln!("文件读取错误: {}", err);
            Err(1) // 返回错误代码 1，表示文件读取失败
        }
    }
}
impl LocaleManager {
    // 创建一个新的 LocaleManager 并加载语言文件
    pub fn new(locale_dir: &str) -> Result<Self, Box<dyn std::error::Error>> {
        let mut index = HashMap::new();
        let path = Path::new(locale_dir);

        // 遍历 locale 目录
        for entry in fs::read_dir(path)? {
            let entry = entry?;
            let path = entry.path();
            
            // 只处理 .json 文件
            if path.is_file() && path.extension().and_then(|s| s.to_str()) == Some("json") {
                // 提取语言代码（文件名不带扩展名）
                if let Some(file_name) = path.file_stem().and_then(|s| s.to_str()) {
                    // 读取文件内容
                    let content = fs::read_to_string(&path)?;
                    // 解析 JSON
                    let entry: LanguageEntry = serde_json::from_str(&content)?;
                    
                    // 添加到索引
                    index.insert(file_name.to_string(), entry);
                }
            }
        }

        Ok(Self { index })
    }

       // 获取整个语言索引的 JSON 文本表示
    pub fn get_index_json(&self) -> Result<String, Box<dyn std::error::Error>> {
        Ok(serde_json::to_string_pretty(&self.index)?)
    }
  
}

