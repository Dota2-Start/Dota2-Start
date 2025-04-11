import React, {  } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, ButtonProps, Divider, Flex } from 'antd';
import { CloseIcon, ShrinkIcon } from "@/mod/svg";
import { Window } from '@tauri-apps/api/window'; // 引入 appWindow

import Locale from './Locale';
import { Appinfo } from '../store';

const appWindow = new Window('main');

interface Props {
    locale?: string
}

const App: React.FC<Props> = () => {
    // 设置状态来存储 isMaximized 和 Webview
    const { isMaximized } = Appinfo()

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
