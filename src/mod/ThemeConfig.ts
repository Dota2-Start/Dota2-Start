import { ThemeConfig, theme } from 'antd';
import { Effect } from '@tauri-apps/api/window'; // 引入 appWindow
import { platform, version } from '@tauri-apps/plugin-os';
import { AppDataStore, AppDataType } from './store';
import { use } from 'framer-motion/client';
import { useEffect } from 'react';
async function isWindows11() {

    // 判断平台是否为 Windows
    if ((await platform()).toLowerCase() !== 'windows') {
        return false;
    }

    // 获取操作系统版本号，例如 "10.0.22000.1"
    const osVersion = await version();
    const parts = osVersion.split('.');
    console.log(parts, osVersion);
    // 检查版本号前三位是否符合条件，并判断构建号是否大于等于 22000
    if (parts.length >= 3 && parts[0] === '10' && parts[1] === '0') {
        const build = parseInt(parts[2], 10);
        return build >= 22000;
    }

    return false;
}

export const isWin11 = await isWindows11()
const useTheme = () => {
    const { devOption } = AppDataStore()
    useEffect(() => {
        if (isWin11) {
            setWindowBg(devOption?.effect ? "Acrylic" : "Default")
        }
    }, [devOption])
    let BgLayout = (isWin11 && devOption?.effect) ? 'transparent' : '#081600';
    const themeConfig: ThemeConfig = {
        algorithm: theme.darkAlgorithm,
        cssVar: true,
        components: {
            Divider: {
                colorSplit: '#83838329'
            },
            Segmented: {
                trackBg: '#87878745',
                itemSelectedBg: '#23232391',
            },
            Layout: {
                headerBg: '#1c1c1c8c',
                siderBg: 'transparent',
                headerHeight: 'auto',
                headerPadding: "4px"
            },
            Menu: {
                itemBg: 'transparent',
                activeBarBorderWidth: 0,
                borderRadius: 14,
                borderRadiusOuter: 16,
                colorBgLayout: 'transparent',
                colorBgBase: '#00000096',
                colorBorder: '#87878796',
                colorBgElevated: '#313131',
                colorBgSpotlight: '#313131',
            },
        },
        token: {
            colorPrimary: '#277700',
            colorBgContainer: '#1c1c1cba',
            colorBgLayout: BgLayout,
        },
    };
    const antdToken = theme.getDesignToken(themeConfig);
    return { themeConfig, antdToken };
};

export { useTheme };
export const setWindowBg = (bgEffect: AppDataType['winBgEffect']) => {
    const appWindow = window.appWindow

    if (bgEffect === 'Acrylic') {
        appWindow.setEffects({ effects: [Effect.Acrylic] })
    } else {
        appWindow.clearEffects()
    }

}