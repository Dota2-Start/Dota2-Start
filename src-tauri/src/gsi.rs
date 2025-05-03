use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};
use warp::Filter;

// 定义 GameState 数据结构
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GameState {
    pub game_time: f32,
    pub players: Vec<Player>,
    pub map: MapInfo,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Player {
    pub id: u32,
    pub name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MapInfo {
    pub name: String,
}

// 定义 GsiServer 模块
pub struct GsiServer {
    callbacks: Arc<Mutex<Vec<Box<dyn Fn(&GameState) + Send + Sync>>>>,
}

impl GsiServer {
    /// 创建新的 GsiServer 实例
    pub fn new() -> Self {
        Self {
            callbacks: Arc::new(Mutex::new(Vec::new())),
        }
    }

    /// 注册状态更新回调
    pub fn register_callback<F>(&self, callback: F)
    where
        F: Fn(&GameState) + Send + Sync + 'static,
    {
        self.callbacks.lock().unwrap().push(Box::new(callback));
    }

    /// 同步运行服务器，动态调整端口并返回实际使用的端口号
    pub fn run_with_dynamic_port_sync(&self, starting_port: u16) -> u16 {
        let mut port = starting_port;
        loop {
            let callbacks = self.callbacks.clone();
            let route = warp::post()
                .and(warp::path::end())
                .and(warp::body::json())
                .map(move |state: GameState| {
                    for cb in callbacks.lock().unwrap().iter() {
                        cb(&state);
                    }
                    warp::reply::with_status("GameState received", warp::http::StatusCode::OK)
                });

            // 注意，此处返回的元组，第一个元素为 SocketAddr，第二个元素为服务 Future。
            let server_result = warp::serve(route).try_bind_ephemeral(([0, 0, 0, 0], port));
            if let Ok((bound_addr, _server_future)) = server_result {
                // 使用 bound_addr.port() 从 SocketAddr 中获取 u16 类型的端口号
                println!("GSI 服务器已成功启动，监听端口: {}", bound_addr.port());
                return bound_addr.port();
            } else {
                println!("端口 {} 被占用，尝试使用端口 {}...", port, port + 1);
                port += 1;
            }
        }
    }
}
