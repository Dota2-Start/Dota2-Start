use std::path::Path;
use sysinfo::System;

#[derive(Debug, Clone)]
pub struct ProcessStatus {
    pub path: String,
    pub status: i32, // 0: 离线, 1: 在线
}

impl ProcessStatus {
    pub fn check_process(exe_path: &str) -> Result<Self, String> {
        let mut system = System::new();

        // 仅刷新进程的EXE路径信息
        system.refresh_processes(
            sysinfo::ProcessesToUpdate::All, // 使用 ProcessesToUpdate 枚举
            true,                            // 是否更新 EXE 路径
        );

        // 规范化目标路径
        let target_path = normalize_path(exe_path);

        // 统计匹配进程数量
        let count = system
            .processes()
            .values()
            .filter(|proc| {
                proc.exe()
                    .and_then(|p| p.to_str())
                    .map(|p| normalize_path(p) == target_path)
                    .unwrap_or(false)
            })
            .count();

        Ok(ProcessStatus {
            path: exe_path.to_string(),
            status: count as i32,
        })
    }
}

// Windows路径规范化处理
fn normalize_path(path: &str) -> String {
    Path::new(path)
        .to_string_lossy()
        .replace('/', "\\") // 统一分隔符
        .trim_end_matches('\\') // 移除尾部反斜杠
        .to_lowercase() // 统一小写
}
