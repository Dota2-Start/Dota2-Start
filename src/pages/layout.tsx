
import { Outlet } from 'ice';
import React, { useEffect } from 'react';
import { ConfigProvider, Flex, Layout } from 'antd';
import Navigation from '@/mod/navigation'
import "./style.less"
import { useTheme } from '@/mod/ThemeConfig';
import TitleBar from '@/mod/Layout/TitleBar'
import Logo from '@/mod/Layout/Logo';
import logoimg from '@/assets/dota2.svg'
import onTitleChange from "@/mod/TitleChange"
import 'mac-scrollbar/dist/mac-scrollbar.css';
import { MacScrollbar } from 'mac-scrollbar';
import { invoke } from '@tauri-apps/api/core';
import { AppDataStore } from '@/mod/store';
import { LocalStor } from '@/mod/locale_load';
const { Header, Content } = Layout;
const AppInit = {
  name: 'Dota2 Start',
  logo: <img className='logo' src={logoimg}></img>
}
let times: NodeJS.Timeout
const App: React.FC = () => {
  const { antdToken, themeConfig } = useTheme()
  const { colorBgContainer, colorBorder } = antdToken
  const { Language } = AppDataStore()
  const { setLocal } = LocalStor()
  useEffect(() => {
    const Locals = async () => {
      const LocalText: string = await invoke('locale_load', { key: Language });
      try {
        const json = JSON.parse(LocalText);
        setLocal(json)
      } catch (error) {
        console.log(error)
      }

    }
    clearTimeout(times)
    times = setTimeout(Locals, 500);

  }, [])
  //同步全局标题
  onTitleChange()

  return (
    <ConfigProvider
      theme={themeConfig}
    >
      <Layout
        className="drag-region"
      >
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
                <Logo {...AppInit} />
                <Navigation />
                <TitleBar />
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