import { SwitchProps } from 'antd';
import { MouseEventHandler } from 'react';
export interface FileData {
    value: string,
    disabled?: boolean
    btnText?: string
    onchange?: MouseEventHandler<HTMLElement>
}
export const fileData: FileData[] = [
    {
        value: "cn-harmony",
        btnText:"注入",
        onchange:  (e) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    console.log(e);
                    resolve(); // 延迟结束后解析 Promise
                }, 1000);
            });
        }
    },

]
