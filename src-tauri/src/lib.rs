// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod Local;
mod steam;
use std::path::Path;
use std::process::Command;
use steam::dota_finder::find_dota2_dir;
use steam::dota_finder::get_steam_path;
use steam::ProcessStatus;
use Local::language_file;
use Local::LocaleManager;
#[tauri::command]
fn locale_load_i() -> String {
    // 使用 match 来处理 Result 类型
    let manager = match LocaleManager::new("./locale") {
        Ok(manager) => manager, // 成功时返回 manager
        Err(e) => {
            eprintln!("Failed to load locale: {}", e); // 失败时打印错误信息
            return "Error loading locale".to_string(); // 返回错误信息
        }
    };

    let index_json = manager.get_index_json().unwrap_or_else(|e| {
        eprintln!("Error getting index JSON: {}", e); // 如果 get_index_json 失败，打印错误信息
        "{}".to_string() // 返回一个空的 JSON 字符串
    });

    println!("语言索引:\n{}", index_json);
    index_json
}
#[tauri::command]
fn locale_load(key: &str) -> String {
    let path = format!("locale/{}.json", key);
    match language_file(&path) {
        Ok(content) => content,
        Err(1) => format!("错误: 无法读取文件 '{}'", path),
        _ => format!("未知错误"),
    }
}
#[tauri::command]
fn getsteam_path() -> String {
    let steam_path = get_steam_path().expect("Failed to find Steam directory");
    format!("{}", steam_path.display())
}
#[tauri::command]
fn getDota_path() -> String {
    let dota_path = find_dota2_dir().expect("Failed to find Dota 2 directory");
    format!("{}", dota_path.display())
}
#[tauri::command]
fn start_monitoring(exe_path: &str) -> i32 {
    match ProcessStatus::check_process(exe_path) {
        Ok(status) => {
            println!("进程状态: {}", status.status);
            status.status // 直接返回状态码
        }
        Err(err) => {
            eprintln!("检测错误: {}", err);
            -1
        }
    }
}

#[tauri::command]
fn exists(path: &str) -> bool {
    let path = Path::new(path);
    path.exists() // 返回布尔值
}

#[tauri::command]
fn open_exe(exe_path: &str, args: Vec<String>) -> i32 {
    println!("{:?}", args);
    match Command::new(exe_path).args(&args).spawn() {
        Ok(_) => 0,  // 启动成功，返回0
        Err(_) => 1, // 启动失败，返回1
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            getDota_path,
            exists,
            open_exe,
            getsteam_path,
            start_monitoring,
            locale_load_i,
            locale_load
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
