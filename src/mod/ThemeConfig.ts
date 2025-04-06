import { ThemeConfig, theme } from 'antd';


const useTheme = () => {
    let background = 'transparent';

    const themeConfig: ThemeConfig = {
        algorithm: theme.darkAlgorithm,
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
                siderBg: background,
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
            colorPrimary: '#fa511a',
            colorBgContainer: '#1c1c1cba',
        },
    };
    const antdToken = theme.getDesignToken(themeConfig);
    return { themeConfig, antdToken };
};

export { useTheme };
 