import React, { } from 'react';
import { Divider, Flex } from 'antd';

import Locale from './Locale';



interface Props {
    locale?: string
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const App: React.FC<Props> = ({ setLoading }) => {
    // 设置状态来存储 isMaximized 和 Webview
    //const { isMaximized } = Appinfo()
    return (
        <Flex
            gap="small"
            justify='space-between'
            align='center'
            data-tauri-drag-region
        >
            <div></div>
            <Flex align='center' gap={'small'}>
                <Locale setLoading={setLoading} />
                <Divider
                    style={{ marginInline: 2, marginBlock: 0 }}
                    type='vertical' />
                <Flex
                    className='ant-segmented ant-segmented-shape-round '
                    align='center'
                    style={{
                        minWidth: 126
                    }}
                >
                    <div />
                </Flex>

            </Flex>
        </Flex>
    );
}

export default App;
