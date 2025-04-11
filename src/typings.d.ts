import { Window as appwin } from '@tauri-apps/api/window'; // 引入 appWindow
declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module '*.png' {
  const value: any;
  export = value;
}
declare global {
  interface Window {
    appWindow: appwin;
  }
}