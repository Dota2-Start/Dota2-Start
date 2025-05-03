import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'umi';
import routes from './routes';
import './index.less';
import { motion } from 'framer-motion';
import { LocalStor } from '../locale_load';
export interface NavProps {
  onChange?: (key: string, e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}
const Nav: React.FC<NavProps> = ({ onChange }) => {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { Local } = LocalStor();

  // 只在开发环境加载 '/hud'
  const isDev = process.env.NODE_ENV === 'development';

  // 移动 indicator 到指定元素的位置
  const moveIndicator = (element: HTMLElement | null) => {
    if (element && indicatorRef.current && navRef.current) {
      const rect = element.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();
      const left = rect.left - navRect.left;
      const width = rect.width;
      indicatorRef.current.style.left = `${left + width / 2 - 15}px`;
    }
  };

  useEffect(() => {
    // 路由变化时定位到激活链接
    const activeLink = navRef.current?.querySelector('a.active') as HTMLElement;
    moveIndicator(activeLink);
  }, [location]);

  return (
    <nav className="nav" ref={navRef}>
      {routes
        .filter(item => item?.key !== '/hud' || isDev)
        .map((item, i) => (
          <Link
            key={item?.key}
            to={item?.key as string}
            onClick={e => {
              if (onChange) onChange(item?.key as string, e);
            }}
            className={location.pathname === item?.key ? 'active' : ''}
            onMouseEnter={e => moveIndicator(e.currentTarget)}
            onMouseLeave={(e) => {
              const activeLink = navRef.current?.querySelector('a.active') as HTMLElement;
              moveIndicator(activeLink);
            }}
          >
            <motion.span
              initial={{ opacity: 0, filter: 'blur(5px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.5, delay: i * 0.3 }}
            >
              {Local?.navigation?.[item?.key as string]}
            </motion.span>
          </Link>
        ))}
      <div id="indicator" ref={indicatorRef}></div>
    </nav>
  );
};

export default Nav;