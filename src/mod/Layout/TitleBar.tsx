import React, { useEffect, useState } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, ButtonProps, Divider, Flex, MenuProps } from 'antd';
//import { motion } from 'framer-motion'; // 引入 framer-motion
import { CloseIcon, ShrinkIcon } from "@/mod/svg";
import { Window } from '@tauri-apps/api/window'; // 引入 appWindow
import { getCurrentWebview } from '@tauri-apps/api/webview'; import Locale from './Locale';
;
const appWindow = new Window('main');
const isMax = await appWindow.isMaximized();
const Webview = await getCurrentWebview()
interface Props {
    locale?: string
}
let times: any = null
const items: MenuProps['items'] = [
    {
        label: 'Submit and continue',
        key: '1',
    },
];
const App: React.FC<Props> = () => {
    const [isMaximized, setIsMaximized] = useState(isMax);
    const TitleButton: ButtonProps[] = [
        {
            icon: <ShrinkIcon />,
            size: 'small',
            shape: "round",
            type: "text",
            onClick: e => {
                // @ts-ignore
                e.target?.blur()
                appWindow.minimize()
            }
        },
        {
            icon: isMaximized ? <FullscreenExitOutlined /> : <FullscreenOutlined />,
            size: 'small',
            shape: "round",
            type: "text",
            onClick: e => {
                // @ts-ignore
                e.target?.blur()
                appWindow.isMaximized().then((result) => {
                    if (result) {
                        appWindow.unmaximize()
                    } else {
                        appWindow.maximize()

                    }
                })
            }
        },
        {
            size: 'small',
            color: "danger",
            shape: "round",
            variant: "text",
            icon: <CloseIcon />,
            onClick: e => {
                // @ts-ignore
                e.target?.blur()
                appWindow.close()
            }
        }
    ]
    useEffect(() => {
        // 监听窗口大小变化
        clearTimeout(times)
        times = setTimeout(() => {
            appWindow.onResized(async () => {
                const isMinimized = await appWindow.isMinimized()
                setIsMaximized(await appWindow.isMaximized())
                if (isMinimized) {
                    Webview.hide()
                } else {
                    Webview.show()
                }
            });

        }, 500);

    }, [])


    return (
        <Flex
            gap="small"
            justify='space-between'
            align='center'
            data-tauri-drag-region
        >
            <div></div>

            <Flex align='center' gap={'small'}>
                <Locale />
                <Flex
                    className='ant-segmented ant-segmented-shape-round '
                    align='center'
                    style={{
                        minWidth: 110
                    }}
                >

                    {TitleButton.map((item, index) => (
                        <React.Fragment key={`fragment-${index}`}>
                            {index > 0 ?
                                <Divider
                                    style={{ marginInline: 2, marginBlock: 0 }}
                                    type='vertical' />
                                : null}
                            <Button
                                className='TitleBn'
                                {...item}
                            />
                        </React.Fragment>

                    ))}
                </Flex>

            </Flex>
        </Flex>
    );
}

export default App;
