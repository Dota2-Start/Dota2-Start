import React, { useEffect } from 'react';
import { Flex, Tag, Typography } from 'antd';
import { useLocation } from 'umi';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import routes from '@/mod/navigation/routes';
import { Appinfo } from '@/mod/store';
import { ReactComponent as Logosvg } from '@/assets/dota2.svg';

const { Title } = Typography;

function getLabelByKey(key: string) {
    const item = routes.find(menuItem => menuItem?.key === key);
    // @ts-ignore
    return item ? item?.label : null;
}
interface Props {
    loading: boolean;
}
const App: React.FC<Props> = ({ loading }) => {
    const { pathname } = useLocation();
    const { name, v } = Appinfo();
    useEffect(() => {
        const pagesName = getLabelByKey(pathname);
        const newTitle = name + (pagesName ? ` - ${pagesName}` : '');
        document.title = newTitle;
    }, [pathname]);

    return (
        <LayoutGroup>
            {/* 全屏加载动画 */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#1a1f26',
                            zIndex: 9999,
                            borderRadius: '0%', // 初始非圆形
                            overflow: 'hidden', // 保证 clipPath 起作用
                        }}
                        initial={{
                            opacity: 1,
                            clipPath: 'circle(100% at 50% 50%)'
                        }}

                        exit={{
                            clipPath: 'circle(0% at 0% 0%)',
                            opacity: 0,
                            transition: {
                                clipPath: { duration: 0.6, ease: 'easeInOut' },
                                opacity: { duration: 0.5, ease: "easeInOut" },
                            },
                        }}

                    >
                        <motion.div
                            layoutId="logo"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                        >
                            <Logosvg width={160} height={160} />

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* 正常头部 */}
            {!loading && (
                <Flex
                    align="center"
                    gap="small"
                    style={{
                        margin: "6px 8px",
                        pointerEvents: 'none',
                    }}
                >
                    <motion.div layoutId="logo">
                        <Logosvg className="logo" />
                    </motion.div>

                    <Title
                        level={5}
                        style={{
                            margin: 0,
                            maxWidth: 'calc(100vw - 222px)',
                        }}
                        ellipsis={true}
                    >
                        {name}
                    </Title>
                    {v?.beta && <Tag>Beta</Tag>}
                    {v?.alpha && <Tag color="red">Alpha</Tag>}
                </Flex>
            )}
        </LayoutGroup>
    );
};

export default App;
