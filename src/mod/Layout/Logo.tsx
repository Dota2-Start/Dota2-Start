/* eslint-disable react/no-array-index-key */
import React, { ReactNode, useEffect } from 'react';
import { Flex, Tag, Typography } from 'antd';
import { useLocation } from 'ice';
import routes from "@/mod/navigation/routes"
import { Appinfo } from '../store';
const { Title } = Typography;
export interface LogoProps {
    logo: ReactNode
}
function getLabelByKey(key) {
    const item = routes.find(menuItem => menuItem?.key === key);
    // @ts-ignore
    return item ? item?.label : null;
}
const App: React.FC<LogoProps> = ({ logo }) => {
    const { pathname } = useLocation();
    const { name, v } = Appinfo()
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
            {v?.beta && <Tag >Beta</Tag>}
            {v?.alpha && <Tag color="red">Alpha</Tag>}
        </Flex>
    );
};

export default App;