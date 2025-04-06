import React, { useEffect } from 'react';
import { Badge, Card, Flex } from 'antd';
import { Dota2File } from '@/mod/store';
import { invoke } from '@tauri-apps/api/core';
import { LocalStor } from '@/mod/locale_load';

export const StateCard: React.FC = () => {
    const { path, isExe, setDota2File } = Dota2File()
    const { Local } = LocalStor()
    const iLocal = Local['/']
    useEffect(() => {
        const getDota_path = async () => {
            const path: string = await invoke('getDota_path');
            console.log(path);
            setDota2File({ path: path.replaceAll('/', '\\') })
            const Dota2Exe = `${path}\\game\\bin\\win64\\dota2.exe`
            setDota2File({ exe: Dota2Exe })
            const path_exists: boolean = await invoke('exists', { path: Dota2Exe });
            setDota2File({ isExe: path_exists })
            const steam_path: string = await invoke('getsteam_path');
            console.log('steam_path', steam_path);
            setDota2File({ steamExt: steam_path })
        }
        getDota_path()
    }, [])
    return (
        <Card
            className='vague'
            variant="borderless"
            style={{
                width: "auto",
                height: "auto",
                position: "absolute",
            }}
            styles={{
                body: { padding: 16 }

            }}
        >
            <Flex vertical gap={8}>
                <p ><Badge status={path ? "success" : "error"} style={{ marginInlineEnd: 8 }} /> {iLocal?.stateCord?.[0]} </p>
                <p><Badge status={isExe ? "success" : "error"} style={{ marginInlineEnd: 8 }} /> {iLocal?.stateCord?.[1]} </p>
            </Flex>

        </Card>
    );
}
