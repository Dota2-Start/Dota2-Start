import { AppDataStore } from '@/mod/store';
import { invoke } from '@tauri-apps/api/core';
import { Input, Modal, notification } from 'antd';
import { OTPProps } from 'antd/es/input/OTP';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const { devMode, devOption, setAppData } = AppDataStore()
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange: OTPProps['onChange'] = (text) => {
        switch (text) {
            case 'STARTDEV':
                api.warning({
                    message: 'Start Dev Mode',
                    description: `Dev mode is ${devMode ? 'Disable' : 'Enabled'}`,
                    duration: 0,
                    placement: 'bottomRight',
                    key: 'devMode',
                });
                setAppData({ devMode: !devMode })
                handleCancel()
                break;
            case '':
                break;
            default:
                break;
        }
    };


    const sharedProps: OTPProps = {
        onChange,
    };
    useEffect(() => {
        const handleKeyDown = async (e: KeyboardEvent) => {
            // 检测 Windows/Linux 下的 Ctrl+F，或 macOS 下的 ⌘+F
            const isSearchShortcut =
                (e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F' || e.keyCode === 70);

            if (isSearchShortcut) {
                e.preventDefault();  // 阻止浏览器默认查找行为 :contentReference[oaicite:0]{index=0}
                showModal()
                // 在这里执行你的自定义逻辑，比如打开自定义搜索框
            }
            // Ctrl + Shift + [I | J | C | U]
            if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U','S'].includes(e.key.toUpperCase())) {
                e.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <>
            {contextHolder}
            <Modal
                title="Input command"
                width={380}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose
            >

                <Input.OTP length={8} variant="filled" {...sharedProps} />
            </Modal>
        </>

    );
};

export default App;
