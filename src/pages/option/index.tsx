import React from 'react';
import { Anchor, Col, Row } from 'antd';
import Startop from './components/start';
import FileRew from './components/FileRew';
import { AnchorContainer, AnchorLinkItemProps } from 'antd/es/anchor/Anchor';
import { motion } from 'framer-motion';
import { LocalStor } from '@/mod/locale_load';
import Section from './components/Section';
import DevPage from './components/developer';
import { AppDataStore } from '@/mod/store';
import { isWin11 } from '@/mod/ThemeConfig';

const App: React.FC = () => {
    const { devMode } = AppDataStore()
    const { Local } = LocalStor()
    const iLocal = Local?.[location.pathname]
    const { devOption } = AppDataStore()
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
        ...(devMode
            ? [{
                key: 'part-3',
                href: '#part-3',
                title: iLocal?.anchor?.['part-3'],
                children: <DevPage />,
            }]
            : [])
    ];

    return (
        <Row>
            {(isWin11 && devOption?.effect) ? null : <div className='video-background'
                style={{
                    backgroundImage: 'url(https://cdn.akamai.steamstatic.com/apps/dota2/images/dota_react/backgrounds/greyfade.jpg)',
                }}
            />
            }
            <Col flex="200px">
                <motion.div
                    style={{
                        position: 'fixed', // 保证 motion.div 也悬浮
                        width: 160,
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
                {anchorData.map(item => (
                    <Section key={item.key} id={item.key} title={item.title}>
                        {item.children}
                    </Section>
                ))}
            </Col>
        </Row>
    );
};

export default App;
