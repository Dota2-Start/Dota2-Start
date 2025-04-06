import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import type { AutoCompleteProps } from 'antd';
import { invoke } from '@tauri-apps/api/core';
import { AppDataStore } from '../store';


const Local_i: string = await invoke('locale_load_i');
const App: React.FC = () => {
    const { Language, setAppData } = AppDataStore()
    const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
    const setLanguage = (e: string) => {
        if(e === Language) return
        setAppData({ Language: e })
        setTimeout(() => {
            location.href = location.origin
        }, 1000);
    }

    useEffect(() => {
        try {
            let opdata: AutoCompleteProps['options'] = []
            const Local_Json = JSON.parse(Local_i);
            for (let key in Local_Json) {
                const item = {
                    label: Local_Json[key]?.label,
                    value: key,
                }
                opdata.push(item)
            }
            setOptions(opdata)
        } catch (error) {
            console.log(error)
        }

    }, [])
    const valueText = options?.find(item => item.value === Language)?.label

    return (
        <AutoComplete
            popupMatchSelectWidth={120}
            style={{ width: 120 }}
            options={options}
            onChange={setLanguage}
            variant="filled"
            value={valueText}
        >
        </AutoComplete>
    );
};

export default App;