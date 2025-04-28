import { Window as appwin } from '@tauri-apps/api/window'; // 引入 appWindow

declare global {
  interface Window {
    appWindow: appwin;
  }
}