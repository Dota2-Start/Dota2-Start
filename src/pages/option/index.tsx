import React from 'react';
import { Anchor, Col, Divider, Row, Typography } from 'antd';
import Startop from './components/start';
import FileRew from './components/FileRew';
import { AnchorContainer, AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import { motion } from 'framer-motion';
import { LocalStor } from '@/mod/locale_load';

const { Title } = Typography;

const App: React.FC = () => {
    const { Local } = LocalStor()
    const iLocal = Local[location.pathname]

    const anchorData = [
        {
            key: 'part-1',
            href: '#part-1',
            title: iLocal?.anchor?.['part-1'],
            children: <Startop />,
        },
        {
            key: 'part-2',
            href: '#part-2',
            title: iLocal?.anchor?.['part-2'],
            children: <FileRew />,
        },
    ];

    return (
        <Row>
            <div className='video-background'
                style={{
                    backgroundImage: 'url(https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg)',
                }}
            />
            <Col flex="200px">
                <motion.div
                    style={{
                        position: 'fixed', // 保证 motion.div 也悬浮
                    }}
                    key="anchor"
                    initial={{ opacity: 0, x: -260, y: -80 }} // Start slightly below
                    animate={{ opacity: 1, x: 0, y: -80 }} // Animate to original position
                    transition={{
                        type: "spring", // Use spring for elastic effect
                        stiffness: 300, // Controls speed of the bounce
                        damping: 25, // Controls how smooth the bounce is
                        duration: 0.6, // Controls the overall duration
                    }}
                >
                    <Anchor
                        affix
                        offsetTop={90}
                        replace
                        showInkInFixed
                        items={anchorData as unknown as AnchorLinkItemProps[]}
                        getContainer={() => document.querySelector(".scroll-container") as AnchorContainer}


                    />
                </motion.div>
            </Col>
            <Col flex="1" style={{ marginTop: 18 }}>
                {anchorData.map((item, index) => (
                    <motion.div
                        key={item.key}
                        id={item.key}
                        style={{ minHeight: '60vh' }}
                        initial={{ opacity: 0, y: 50 }} // Start slightly below
                        animate={{ opacity: 1, y: 0 }} // Animate to original position
                        transition={{
                            type: "spring", // Use spring for elastic effect
                            stiffness: 300, // Controls speed of the bounce
                            damping: 25, // Controls how smooth the bounce is
                            duration: 0.6, // Controls the overall duration
                            delay: (index + 1) * 0.2,
                        }}
                    >
                        <Title level={4} style={{ margin: 0 }}>
                            {item.title}
                        </Title>
                        <Divider />
                        {item?.children}
                    </motion.div>
                ))}
            </Col>
        </Row>
    );
};

export default App;
