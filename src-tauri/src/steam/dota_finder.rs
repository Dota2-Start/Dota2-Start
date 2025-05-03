// src/dota_finder.rs

use anyhow::{Context, Result};
use std::path::PathBuf;

#[cfg(target_os = "windows")]
use winreg::{enums::HKEY_LOCAL_MACHINE, RegKey};

/// 查找 Dota 2 安装目录的单一模块
pub fn find_dota2_dir() -> Result<PathBuf> {
    let steam_path = get_steam_path()?;
    let default_path = steam_path.join("steamapps/common/dota 2 beta");

    // 检查默认路径
    if default_path.exists() {
        return Ok(default_path);
    }

    // 检查其他库目录
    let library_file = steam_path.join("steamapps/libraryfolders.vdf");
    let content = std::fs::read_to_string(library_file)?;

    parse_library_paths(&content)?
        .into_iter()
        .map(|p| p.join("steamapps/common/dota 2 beta"))
        .find(|p| p.exists())
        .context("Dota 2 not found in any Steam library")
}

/// 获取 Steam 安装路径（平台相关）
pub fn get_steam_path() -> Result<PathBuf> {
    #[cfg(target_os = "windows")]
    {
        let reg_key = RegKey::predef(HKEY_LOCAL_MACHINE)
            .open_subkey("SOFTWARE\\WOW6432Node\\Valve\\Steam")?;
        reg_key
            .get_value::<String, _>("InstallPath")
            .map(PathBuf::from)
            .context("Failed to read Steam path from registry")
    }

    #[cfg(target_os = "linux")]
    {
        let path = dirs::home_dir()
            .context("Home directory not found")?
            .join(".local/share/Steam");
        check_path_exists(path)
    }

    #[cfg(target_os = "macos")]
    {
        let path = dirs::home_dir()
            .context("Home directory not found")?
            .join("Library/Application Support/Steam");
        check_path_exists(path)
    }
}

/// 解析 libraryfolders.vdf 文件
fn parse_library_paths(content: &str) -> Result<Vec<PathBuf>> {
    content
        .lines()
        .filter(|line| line.contains("\"path\""))
        .filter_map(|line| {
            line.split('"')
                .nth(3)
                .map(|s| s.replace("\\\\", "/"))
                .map(PathBuf::from)
        })
        .fold(Ok(vec![]), |acc: Result<Vec<_>>, path| {
            let mut paths = acc?;
            paths.push(path);
            Ok(paths)
        })
}

/// 检查路径是否存在（私有辅助函数）
fn check_path_exists(path: PathBuf) -> Result<PathBuf> {
    if path.exists() {
        Ok(path)
    } else {
        Err(anyhow::anyhow!("Path does not exist: {}", path.display()))
    }
}
