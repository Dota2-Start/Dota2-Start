import { SwitchProps } from 'antd';
export interface FileData {
    value: string,
    disabled?: boolean
    onchange: (e: SwitchProps['onChange']) => void
}
export const fileData: FileData[] = [
    {
        value: "cn-harmony",
        disabled: true,
        onchange: (e) => {
            console.log(e)
        }
    },

]
