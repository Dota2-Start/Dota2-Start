import { Dota2ArgsLiteType } from '@/mod/store';
import { Slider, Space } from 'antd';
import { debounce } from 'lodash';
import { ReactNode } from 'react';
export interface ComponentProps {
    e: DotaSourceItem
    replace: Dota2ArgsLiteType['replace']
    setReplace: Dota2ArgsLiteType['setReplace']
}
export interface DotaSourceItem {
    value: string;
    title?: string;  // 可能存在 title
    description?: ReactNode;  // 添加 description 字段
    children?: DotaSourceItem[];  // 可能包含 children
}
// 将组件转为 React 函数组件
export const Cardbody = (es: ComponentProps) => {
    const { replace, setReplace, e } = es;
    const regex = /\{([^}]+)\}/;
    const match = regex.exec(e.value);
    let backDiv: React.ReactNode = null;
    if (match) {
        const content = match[1];
        const iValue = replace[content]
        // 防抖更新全局状态
        const debouncedUpdate = debounce((value: number) => {
            setReplace({ [content]: value });
        }, 300)


        switch (content) {
            case 'fps':
                backDiv = (
                    <Slider
                        defaultValue={iValue}
                        onChange={debouncedUpdate}
                        max={1000}
                        min={60}
                        tooltip={{ formatter: (v) => `${v} FPS` }}
                    />
                );
                break;
        }
    }

    return (
        <Space direction="vertical" style={{ marginInline: 8 }}>
            <span>{e.description}</span>
            {backDiv}
        </Space>
    );
}