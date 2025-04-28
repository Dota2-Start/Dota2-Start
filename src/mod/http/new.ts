import { fetch } from '@tauri-apps/plugin-http';
import { appid } from '../dota2_init';
import { invoke } from '@tauri-apps/api/core';
const appurl = "https://store.steampowered.com/events/ajaxgetpartnereventspageable"
export default async function getNewInfo(count: number, Local: string) {
    const Locali: string = await invoke('locale_load_i');
    let localName = 'english';
    try {
        const LocalList = JSON.parse(Locali);
        localName = LocalList?.[Local]?.value || 'english';
    } catch (error) {

    }
    console.log();
    
    const url = `${appurl}/?clan_accountid=0&appid=${appid}&offset=0&count=${count || 10}&l=${localName}`
    try {
        // 请求指定网站并获取响应文本
        const response = await fetch(url, { method: 'GET' });

        const json = await response.json(); // 获取 HTML 字符串
        return json
    } catch (error) {
        console.error("Error fetching data:", error, url);

        return { events: [{}] }
    }
}
