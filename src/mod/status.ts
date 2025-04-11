import { invoke } from "@tauri-apps/api/core";
import { ArgsProps } from "antd/es/message/interface";
import { create } from "zustand";
const SteamKey = "start_start-204"
export const stratSteam = async (
    messageApi: (e: ArgsProps | string) => void,
    steamExt: string,
    args: string[],
    megLocal: any,
    backCall: (e: boolean) => void
) => {
    const steamOld = () => {
        setTimeout(async () => {
            const steamServe: number = await invoke('start_monitoring', { exePath: steamwebhelper });
            console.log('steamServe', steamwebhelper, steamServe);
            if (steamServe === 6) {
                //登录状态
                messageApi(
                    {
                        key: SteamKey,
                        content: megLocal?.logOn,
                        type: 'loading',
                        duration: 0
                    }
                )
                steamOld()
            } else if (steamServe > 6) {
                //steam启动成功
                messageApi(
                    {
                        key: SteamKey,
                        content: megLocal?.sstart,
                        type: 'success',
                        duration: 3
                    }
                )
                backCall(true)
            } else if (steamServe === 0) {
                messageApi(SteamKey)
                backCall(false)
            } else {
                messageApi(
                    {
                        key: SteamKey,
                        content: megLocal?.sloading,
                        type: 'loading',
                        duration: 0
                    }
                )
                steamOld()
                //循环检测
            }

        }, 1000);
    }
    const steamMain = `${steamExt}\\steam.exe`
    const steamwebhelper = `${steamExt}\\bin\\cef\\cef.win7x64\\steamwebhelper.exe`
    const steamCode: number = await invoke('start_monitoring', { exePath: steamwebhelper });
    //const path: string = await invoke('open_exe', { exePath: exe, args:args });
    console.log('检测进程状态', steamCode);
    messageApi(
        {
            key: SteamKey,
            content: (steamCode === 1 ? megLocal?.gameReady : megLocal?.sReady),
            type: 'loading',
            duration: 0
        }
    )
    //启动steam
    const steamStart = await invoke('open_exe', { exePath: steamMain, args: args });
    console.log('steamMain', steamMain, args);

    if (steamCode < 1) {
        if (steamStart === 0) {
            steamOld()
        } else {
            messageApi(
                {
                    key: SteamKey,
                    content: megLocal?.serror,
                    type: 'error',
                    duration: 2
                }
            )
            backCall(false)
        }
    } else {
        //启动steam
        steamOld()
    }

}
let dota2_err = -1
// 检测循环dota2进程状态
export const Dota2_detection = (
    dota2Path: string,
    backCall: (e: boolean,) => boolean
) => {
    dota2_err = -1
    const DotaOld = () => {
        setTimeout(async () => {
            const DotaServe: number = await invoke('start_monitoring', { exePath: dota2Path });
            const err = DotaServe > 0
            console.log(0, 'DotaServe', dota2Path);
            if (dota2_err != DotaServe) {
                const end = backCall(err)
                //如果返回true则终止检测
                if (end) return
                dota2_err = DotaServe
            }
            DotaOld()
        }, 2000);
    }
    DotaOld()
    return
}
// 检测dota2进程状态
export const stratDota = async (dota2Path: string) => {
    const DotaServe: number = await invoke('start_monitoring', { exePath: dota2Path });
    return DotaServe
}
export interface Dota2stateStoreType {
    Dota2State: boolean;
    setDota2State: (e: Dota2stateStoreType['Dota2State']) => void
}
export const Dota2stateStore = create<Dota2stateStoreType>((set) => ({
    Dota2State: false,
    setDota2State: (e) => set({ Dota2State: e }),
}))