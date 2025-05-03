import React from 'react';
import { motion } from 'framer-motion';
import { Divider, Typography } from 'antd';
const { Title } = Typography;

interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, children }) => (
    <motion.div
        id={id}
        style={{ minHeight: '60vh', marginBottom: '2rem' }}
        initial={{ opacity: 0, y: 50 }}                // 初始状态：透明并下移 :contentReference[oaicite:1]{index=1}
        whileInView={{ opacity: 1, y: 0 }}              // 进入视口时：不透明并回到原位 :contentReference[oaicite:2]{index=2}
        viewport={{ once: true, amount: 0.3 }}          // 视口触发：30% 可见时触发，且仅触发一次 :contentReference[oaicite:3]{index=3}
        transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            duration: 0.6,
        }}
    >
        <Title level={4} style={{ margin: 0 }}>
            {title}
        </Title>
        <Divider />
        {children}
    </motion.div>
);

export default Section;
