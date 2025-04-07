import { SwitchProps } from 'antd';
export interface FileData {
    value: string,
    onchange: (e: SwitchProps['onChange']) => void
}
export const fileData: FileData[] = [
    {
        value: "cn-harmony",
        onchange: (e) => {
            console.log(e)
        }
    },

]
