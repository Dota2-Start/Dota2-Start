import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Typography } from 'antd';
import { removeBBCodeTags } from './removeBBCodeTags';
import { appid, steamUrl } from '../dota2_init';
import {createAndClickLink} from '@/mod/createAndClickLink';
const { Paragraph } = Typography;

export interface NewsCardProps {
  imageUrl: string;
  title: string;
  date: string;
  summary: string;
  gid: string
}

// 让容器悬浮时向上移动，避免标题超出
const containerVariants: Variants = {
  initial: { height: 70, y: 0 },
  hover: { height: 130, y: 0 },
};

const textVariants: Variants = {
  initial: { y: 0 },
  hover: { y: 0 },
};

const summaryVariants: Variants = {
  initial: { opacity: 0 },
  hover: { opacity: 1 },
};

const NewsCard: React.FC<NewsCardProps> = ({ imageUrl, title, date, summary, gid }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="news-card"
      style={{
        width: 320,
        height: 196,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => createAndClickLink(`${steamUrl}/news/app/${appid}/view/${gid}`)}
    >
      {/* 文本内容容器，默认靠底部，悬浮时高度扩展并整体上移 */}
      <motion.div
        className="content-container"
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}

        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '8px 16px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* 标题和日期 */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate={isHovered ? 'hover' : 'initial'}
          transition={{ duration: 0.3 }}
        >
          <h3 style={{ margin: 0, fontSize: '18px' }}>{title}</h3>
          <p style={{ margin: '4px 0 0', fontSize: '14px' }}>{date}</p>
        </motion.div>
        {/* 简介 */}
        <motion.div
          variants={summaryVariants}
          initial="initial"
          animate={isHovered ? 'hover' : 'initial'}
          transition={{ duration: 0.3 }}
          style={{ marginTop: '4px' }}
        >
          <Paragraph ellipsis={{ rows: 3, expandable: false }} style={{ margin: 0 }}>
            {summary ? removeBBCodeTags(summary) : ''}
          </Paragraph>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NewsCard;
