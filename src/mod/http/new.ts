import { fetch } from '@tauri-apps/plugin-http';
import { appid } from '../dota2_init';
const appurl = "https://store.steampowered.com/events/ajaxgetpartnereventspageable"
export default async function getNewInfo(count?: number) {
    const url = `${appurl}/?clan_accountid=0&appid=${appid}&offset=0&count=${count || 10}&l=schinese`
    try {
        // 请求指定网站并获取响应文本
        const response = await fetch(url, { method: 'GET' });
        
        const json = await response.json(); // 获取 HTML 字符串
        return json
    } catch (error) {
        console.error("Error fetching data:", error,url);
        
        return {events:[{}]}
    }
}
