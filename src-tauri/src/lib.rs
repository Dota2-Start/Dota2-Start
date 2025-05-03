// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod Local;
mod gsi;
mod steam;
use std::fs;
use std::path::Path;
use std::process::Command;
use std::sync::Mutex;
use steam::dota_finder::find_dota2_dir;
use steam::dota_finder::get_steam_path;
use steam::ProcessStatus;
use tauri::Manager;
use tauri_plugin_decorum::init as decorum;
use tauri_plugin_decorum::WebviewWindowExt;
use Local::language_file;
use Local::LocaleManager;

static PORT: Mutex<u16> = Mutex::new(3000);
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
/// 启动 GSI 服务器
#[tauri::command]
async fn gsi_server() {
    // 创建 GsiServer 实例
    let server = gsi::GsiServer::new();

    // 注册回调，处理接收到的 GameState 数据
    server.register_callback(|state| {
        println!("接收到游戏状态：{:#?}", state);
    });

    // 动态调整全局端口并启动服务器
    let final_port = {
        // 获取当前端口
        let port = {
            let port_guard = PORT.lock().unwrap();
            *port_guard
        };

        // 使用同步检测方式启动服务器
        let result = server.run_with_dynamic_port_sync(port);

        // 更新全局端口为检测成功后的端口
        {
            let mut port_guard = PORT.lock().unwrap();
            *port_guard = result;
        }
        result
    };

    println!("GSI 服务器最终启动端口为：{}", final_port);

    // 主进程其它逻辑（例如 Tauri 界面保持响应）
    loop {
        tokio::time::sleep(tokio::time::Duration::from_secs(10)).await;
        println!("主程序正常运行中...");
    }
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
            println!("进程状态: {} {}", exe_path, status.status);
            status.status // 直接返回状态码
        }
        Err(err) => {
            eprintln!("检测错误: {}", err);
            -1
        }
    }
}
#[tauri::command]
async fn copy_file_command(source: String, destination_dir: String) -> Result<String, String> {
    let source_path = Path::new(&source);

    // 检查源文件是否存在
    if !source_path.exists() {
        return Err(format!("源文件 '{}' 不存在。", source));
    }

    // 目标目录路径处理
    let destination_path = Path::new(&destination_dir);
    if !destination_path.exists() {
        return Err(format!("目标目录 '{}' 不存在。", destination_dir));
    }

    // 拼接目标文件路径
    let destination_file_path = destination_path.join(source_path.file_name().unwrap());

    // 确保路径字符串正确
    println!(
        "准备复制文件: 源路径: {:?}, 目标路径: {:?}",
        source_path, destination_file_path
    );

    // 执行文件复制操作
    match fs::copy(&source_path, &destination_file_path) {
        Ok(_) => Ok("".to_string()), // 复制成功，返回空字符串
        Err(e) => Err(format!("文件复制失败: {}", e)),
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
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(decorum())
        .setup(|app| {
            // Create a custom titlebar for main window
            // On Windows this will hide decoration and render custom window controls
            // On macOS it expects a hiddenTitle: true and titleBarStyle: overlay
            let main_window = app.get_webview_window("main").unwrap();
            main_window.create_overlay_titlebar().unwrap();

            #[cfg(target_os = "macos")]
            main_window.set_traffic_lights_inset(16.0, 20.0).unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            getDota_path,
            exists,
            open_exe,
            getsteam_path,
            start_monitoring,
            locale_load_i,
            locale_load,
            copy_file_command,
            gsi_server
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
