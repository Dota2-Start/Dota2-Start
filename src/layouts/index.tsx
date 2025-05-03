

import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Flex, Layout } from 'antd';
import Navigation from '@/mod/navigation'
import { Window } from '@tauri-apps/api/window'; // 引入 appWindow
import "./style.less"
import { useTheme } from '@/mod/ThemeConfig';
import TitleBar from './TitleBar'
import Logo from './Logo';
import onTitleChange from "@/mod/TitleChange"
import 'mac-scrollbar/dist/mac-scrollbar.css';
import { MacScrollbar } from 'mac-scrollbar';
import { invoke } from '@tauri-apps/api/core';
import { AppDataStore, Appinfo, Dota2File, navigatorlLanguage } from '@/mod/store';
import { LocalStor } from '@/mod/locale_load';
import { getVersion } from '@tauri-apps/api/app';
import { parseVersion } from '@/mod/V_analysis';
import { Dota2_detection, Dota2stateStore } from '@/mod/status';
import { windowEvent } from '../pages/windowEvent';
import { Outlet, useLocation } from 'umi';
import Cmdinput from './cmdinput';
// antd 语言包初始化
const locals = localStorage.getItem('Dota2Start-local-AppData') || '{}'
const jsonLocal = JSON.parse(locals)
const formattedKey = (jsonLocal?.state?.Language || navigatorlLanguage).replace('-', '_');
const antdLocal = (await import(`antd/es/locale/${formattedKey}.js`)).default;
// 初始化语言包 END
const { Header, Content } = Layout;
//newWebviewWindow('start-Hud','/hudwindow')

document.addEventListener('keydown', function (e) {
  if ((e.key === 'F5') || (e.ctrlKey && e.key === 'r')) {
    e.preventDefault(); // 禁止刷新
  }
});
document.addEventListener('contextmenu', function (e) {
  const target = e.target;
  // @ts-ignore 如果目标是 input 元素且没有被禁用，则允许右键菜单
  if (target.tagName.toLowerCase() === 'input' && !target.disabled) {
    return;
  }
  // 其它情况（非 input 或 input 处于禁用状态）都阻止右键菜单
  e.preventDefault();
});
window.appWindow = new Window('main');
let times: NodeJS.Timeout
const App: React.FC = () => {
  const { antdToken, themeConfig } = useTheme()
  const { colorBgContainer, colorBorder } = antdToken
  const { Language } = AppDataStore()
  const { setLocal, Local } = LocalStor()
  const { setAppinfo } = Appinfo()
  const { setDota2State } = Dota2stateStore()
  const { exe } = Dota2File();
  const { isMinimized } = windowEvent()
  const location = useLocation();
  const locationRef = useRef(location);
  const isMinimi = useRef(isMinimized);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const Locals = async () => {
      const Locali: string = await invoke('locale_load_i');
      try {
        const LocalList = JSON.parse(Locali);
        const L_i = LocalList?.[Language]?.label ? Language : 'en-US'
        const LocalText: string = await invoke('locale_load', { key: L_i });
        const json = JSON.parse(LocalText);
        setLocal(json)
      } catch (error) {
      }
      const version = await getVersion();
      setAppinfo({ v: parseVersion(version) })

    }
    clearTimeout(times)
    times = setTimeout(Locals, 500);
  }, [])
  useEffect(() => {
    if (!Local?.label) return
    setTimeout(() =>
      setLoading(false)
      , 660);
  }, [Local])
  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  useEffect(() => {
    isMinimi.current = isMinimized;
  }, [isMinimized]);
  useEffect(() => {
    if (!exe) return
    Dota2_detection(exe, err => {
      setDota2State(err)
      const pathname = locationRef.current.pathname
      const end = pathname !== '/'
     
      return end || isMinimi.current
    })
  }, [exe, location, isMinimized])
  //同步全局标题
  onTitleChange()

  return (
    <ConfigProvider
      theme={themeConfig}
      locale={antdLocal}
    >
      <Layout
        className="drag-region"
      >
        <Cmdinput />
        <Content>
          <div
            style={{
              height: "100vh",
              background: colorBgContainer,
              transform: 'scale(1)',
            }}
          >
 
            <Header
              className='HeaderAx vague'
              data-tauri-drag-region
              style={{
                borderBottom: `1px solid ${colorBorder}`
              }}
            >
              <Flex justify='space-between' data-tauri-drag-region>
                <Logo loading={loading} />
                <Navigation />
                <TitleBar setLoading={setLoading} />
              </Flex>
            </Header>
            <MacScrollbar
              skin="dark"
              className='scroll-container'
              suppressScrollX>
              <div
                style={{
                  padding: 16,
                  height: "calc(100vh - 52px)",
                  marginTop: 50,
                }}
              >

                <Outlet />
              </div>
            </MacScrollbar>
          </div>
        </Content>
      </Layout>
    </ConfigProvider >
  );
};

export default App;