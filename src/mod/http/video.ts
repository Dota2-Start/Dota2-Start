import { fetch } from '@tauri-apps/plugin-http';
export interface VideoBackgroundProps {
    videoUrl: string;  // 视频 URL
    poster: string;    // 视频封面图 URL
}
export default async function getVideoInfo() {
    try {
        // 请求指定网站并获取响应文本
        const response = await fetch("https://www.dota2.com.cn/", { method: 'GET' });
        const html = await response.text(); // 获取 HTML 字符串

        // 创建 DOMParser 对象，解析 HTML 字符串
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // 查找 div.banner-bg 中的 video 标签
        const videoElement = doc.querySelector("div.banner-bg video.banner-vidio-bg");
        if (!videoElement) {
            throw new Error("未找到目标视频标签");
        }

        // 提取视频封面地址
        const poster = videoElement.getAttribute("poster");

        // 提取视频地址
        const sourceElement = videoElement.querySelector("source");
        const videoUrl = sourceElement ? sourceElement.getAttribute("src") : null;
        // 返回提取的结果
        return {
            poster,
            videoUrl
        } as VideoBackgroundProps;
    } catch (error) {
        console.error("解析失败：", error);
        return {
            poster:"",
            videoUrl:""
        } 
    }
}
