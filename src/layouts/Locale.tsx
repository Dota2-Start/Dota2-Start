import React, { useEffect, useState } from 'react';
import { Badge, Button, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { invoke } from '@tauri-apps/api/core';
import { AppDataStore, navigatorlLanguage } from '@/mod/store';
import { GlobalOutlined } from '@ant-design/icons';

interface Props {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
const App: React.FC<Props> = ({ setLoading }) => {
    const { Language, setAppData } = AppDataStore()
    const [options, setOptions] = useState<MenuProps['items']>([]);
    const setLanguage = (e: string) => {
        if (e === Language) return
        setAppData({ Language: e })
        setLoading(true)
        setTimeout(() => {
            location.href = location.origin
        }, 980);
    }


    useEffect(() => {
        if (!Language) {
            setLanguage(navigatorlLanguage)
        }
        (async () => {
            try {
                let opdata: MenuProps['items'] = []
                const Local_i: string = await invoke('locale_load_i');
                const Local_Json = JSON.parse(Local_i);
                for (let key in Local_Json) {
                    const item = {
                        label: Local_Json[key]?.label,
                        key: key,
                        disabled: key === Language,
                        extra: key === Language ? <Badge status="success" /> : '',
                    }
                    opdata.push(item)
                }
                setOptions(opdata)
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

    return (
        <Dropdown
            arrow
            menu={{
                items: options,
                onClick: e => setLanguage(e.key),
            }}
        >
            <Button
                icon={<GlobalOutlined />}
                shape="circle"
                type='text'
            >
            </Button>
        </Dropdown>


    );
};

export default App;