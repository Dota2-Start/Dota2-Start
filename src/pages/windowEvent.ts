import { useEffect, useState } from "react";
import { getCurrentWebview } from '@tauri-apps/api/webview';
import { Appinfo } from "@/mod/store";
let times: any = null
export const windowEvent = () => {
    const appWindow = window.appWindow
    const [isMinimized, setisMinimized] = useState<boolean>(false);
    const [webview, setWebview] = useState<any>(null);
    const { setAppinfo } = Appinfo()
    useEffect(() => {
        // 监听窗口大小变化
        clearTimeout(times);
        times = setTimeout(() => {
            appWindow.onResized(async () => {
                const isMinimized = await appWindow.isMinimized();
                const isMaximized = await appWindow.isMaximized()
                setAppinfo({ isMaximized });
                setisMinimized(isMinimized)
                if (isMinimized) {
                    webview.hide();
                } else {
                    webview.show();
                }
            });
        }, 500);

    }, [webview]); // 只有当 webview 改变时才重新执行

    useEffect(() => {
        const fetchWindowData = async () => {
            const isMaximized = await appWindow.isMaximized();
            const Webview = await getCurrentWebview();
            setAppinfo({ isMaximized });
            setWebview(Webview); // 设置Webview
        };

        fetchWindowData();
    }, []); // 只在组件加载时获取一次
    return { isMinimized }
}