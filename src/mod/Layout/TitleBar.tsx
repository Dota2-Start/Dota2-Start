import React, { useEffect, useState } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, ButtonProps, Divider, Flex } from 'antd';
import { CloseIcon, ShrinkIcon } from "@/mod/svg";
import { Window } from '@tauri-apps/api/window'; // 引入 appWindow
import { getCurrentWebview } from '@tauri-apps/api/webview';
import Locale from './Locale';

const appWindow = new Window('main');

interface Props {
    locale?: string
}

let times: any = null

const App: React.FC<Props> = () => {
    // 设置状态来存储 isMaximized 和 Webview
    const [isMaximized, setIsMaximized] = useState<boolean | null>(null);
    const [webview, setWebview] = useState<any>(null);

    // 获取isMax和webview
    useEffect(() => {
        const fetchWindowData = async () => {
            const isMax = await appWindow.isMaximized();
            const Webview = await getCurrentWebview();

            setIsMaximized(isMax); // 更新最大化状态
            setWebview(Webview); // 设置Webview
        };

        fetchWindowData();
    }, []); // 只在组件加载时获取一次
    useEffect(() => {
        // 监听窗口大小变化
        clearTimeout(times);
        times = setTimeout(() => {
            appWindow.onResized(async () => {
                const isMinimized = await appWindow.isMinimized();
                setIsMaximized(await appWindow.isMaximized());
                if (isMinimized) {
                    webview.hide();
                } else {
                    webview.show();
                }
            });
        }, 500);

    }, [webview]); // 只有当 webview 改变时才重新执行
    // 如果没有获取到 isMax 和 Webview，不渲染界面
    if (isMaximized === null || webview === null) {
        return null; // 或者你可以显示一个加载状态
    }

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
                            {index > 0 ? (
                                <Divider
                                    style={{ marginInline: 2, marginBlock: 0 }}
                                    type='vertical' />
                            ) : null}
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
