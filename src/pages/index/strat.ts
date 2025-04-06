import { LocalStor } from "@/mod/locale_load";
import { invoke } from "@tauri-apps/api/core";
import { ArgsProps } from "antd/es/message/interface";
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
export const stratDota = async (dota2Path: string, megLocal: any, backCall: (err: boolean, e?: string) => void) => {

    let dota2_i = 0
    const DotaOld = (count?: number) => {
        setTimeout(async () => {
            const DotaServe: number = await invoke('start_monitoring', { exePath: dota2Path });
            let err = DotaServe > 0
            backCall(err)
            if (err) {
                if (typeof count === 'number') {
                    if (count > 10) {
                        backCall(false, megLocal?.timeout)
                        return
                    }
                    count++
                }
                DotaOld(count)
            }

        }, 2000);
    }
    const DotaServe: number = await invoke('start_monitoring', { exePath: dota2Path });
    if (DotaServe > 0) {
        DotaOld()
    } else {
        //dota2未启动，等待启动
        DotaOld(dota2_i)
    }

}