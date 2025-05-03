import { WebviewWindow } from '@tauri-apps/api/webviewWindow'


export const newWebviewWindow = (key: string, url: string) => {
    const w = WebviewWindow.getByLabel(key)
    console.log(w);

    if (!w) {
        return
    }
    const webview = new WebviewWindow(key, {
        url: url,
        transparent: true,
        decorations: false,
        width: 400,
        height: 300,
        parent: 'main' // 如果需要指定父窗口
    })

    webview.once('tauri://created', () => {
        console.log('子 Webview 创建成功')
    })
    webview.once('tauri://error', (e) => {
        console.error('子 Webview 创建失败', e.payload)
    })

}
