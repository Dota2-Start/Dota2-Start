import { MouseEventHandler } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { MessageInstance } from 'antd/es/message/interface';
export interface FileDataList {
    value: string,
    disabled?: boolean
    btnText?: string
    onchange?: MouseEventHandler<HTMLElement>
}
export interface FileDataType {
    destinationPath: string,
    messageApi: MessageInstance
}
export type FileData = (e: FileDataType) => FileDataList[]
const megkey = "sa8ckpy"
async function copyFileExample({ destinationPath, messageApi }: FileDataType) {
    // 定义源文件和目标文件的路径
    messageApi.open({
        type: 'loading',
        content: '正在注入文件，请稍等...',
        duration: 0,
        key: megkey
    })
    const sourcePath = './gMod/pak01_dir.vpk';
    //destinationPath  += '\\pak01_dir.vpk';
    try {
        // 复制文件
        const err = await invoke('copy_file_command', { source: sourcePath, destinationDir: destinationPath });
        if (err) {
            console.error('文件复制失败:', destinationPath, err);
            messageApi.open({
                type: 'error',
                content: '文件注入失败！' + err,
                key: megkey
            })
            return false;
        } else {
            console.log('文件复制成功');
            messageApi.open({
                type: 'success',
                content: '文件注入成功！',
                key: megkey
            })
            return true;
        }
    } catch (error) {
        messageApi.open({
            type: 'error',
            content: '文件注入失败！' + error,
            key: megkey
        })
        return false;
    }
}

export const fileData: FileData = ({ destinationPath, messageApi }) => [
    {
        value: "cn-harmony",
        btnText: "注入",
        onchange: async () => copyFileExample({ destinationPath, messageApi })
    },

]
