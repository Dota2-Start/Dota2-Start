
import { Outlet } from 'ice';
import React, { useEffect, useState } from 'react';
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
import { AppDataStore, Appinfo, Dota2File } from '@/mod/store';
import { LocalStor } from '@/mod/locale_load';
import { getVersion } from '@tauri-apps/api/app';
import { parseVersion } from '@/mod/V_analysis';
import { Dota2_detection, Dota2stateStore } from '@/mod/status';
const { Header, Content } = Layout;
const AppInit = {
  logo: <img className='logo' src={logoimg}></img>
}

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

let times: NodeJS.Timeout
const App: React.FC = () => {
  const { antdToken, themeConfig } = useTheme()
  const { colorBgContainer, colorBorder } = antdToken
  const { Language } = AppDataStore()
  const { setLocal } = LocalStor()
  const { setAppinfo } = Appinfo()
  const { setDota2State } = Dota2stateStore()
  const { exe } = Dota2File();

  useEffect(() => {
    const Locals = async () => {
      const LocalText: string = await invoke('locale_load', { key: Language });
      try {
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
    if (!exe) return
    Dota2_detection(exe, err => {
      setDota2State(err)
      return exe !== ''
    })
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