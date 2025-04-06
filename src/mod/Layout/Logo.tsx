/* eslint-disable react/no-array-index-key */
import React, { ReactNode, useEffect, useState } from 'react';
import { Flex, Typography } from 'antd';
import { useLocation } from 'ice';
import { Window } from '@tauri-apps/api/window';
import routes from "@/mod/navigation/routes"
const { Text, Title } = Typography;
export interface LogoProps {
    name: ReactNode
    logo: ReactNode
}
function getLabelByKey(key) {
    const item = routes.find(menuItem => menuItem?.key === key);
    // @ts-ignore
    return item ? item?.label : null;
}
const App: React.FC<LogoProps> = ({ name, logo }) => {
    const { pathname } = useLocation();
    useEffect(() => {
        const pagesName = getLabelByKey(pathname)
        const newTitle = name + (pagesName ? ` - ${pagesName}` : "")
        document.title = newTitle
    }, [pathname]);

    return (
        <Flex align='center' gap={'small'}
            style={{
                margin: 8,
                pointerEvents: 'none'
            }}
        >
            {logo}

            <Title
                level={5}
                style={{
                    margin: 0,
                    maxWidth: 'calc(100vw - 222px)'
                }}
                ellipsis={true}
            >
                {name}
            </Title>

        </Flex>
    );
};

export default App;