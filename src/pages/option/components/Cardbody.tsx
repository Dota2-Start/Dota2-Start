import { Dota2ArgsLiteType } from '@/mod/store';
import { InputNumber, Slider, Space } from 'antd';
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
function parseResolution(args: string) {
    const regex = /-(\w+)\s+(\d+)/g;

    const result: Record<string, string> = {};
    let match;

    while ((match = regex.exec(args)) !== null) {
        const key = match[1]; // 'w'
        const value = match[2]; // '1924'
        result[key] = value;
    } 
    return result
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
        const debouncedUpdate = debounce((value: any) => {
            setReplace({ ...replace, [content]: value });
        }, 300)


        switch (content) {
            case 'fps':
                backDiv = (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Slider
                            defaultValue={iValue}
                            onChange={debouncedUpdate}
                            max={1000}
                            min={60}
                            tooltip={{ formatter: (v) => `${v} FPS` }}
                        />
                    </div>
                );

                break;
            case 'ppi':
                const result = parseResolution(iValue);
                let newjson = result;
                const onPpi = (type: 'w' | 'h', value: number | null) => {
                    newjson = {
                        ...newjson,
                        [type]: value,
                    }
                    debouncedUpdate(`-w ${newjson.w} -h ${newjson.h}`)
                }
                backDiv = (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Space >
                            <InputNumber
                                size="small"
                                min={100}
                                max={100000}
                                defaultValue={newjson.w || 1920}
                                onChange={ev => onPpi('w', ev)}
                            />
                            *
                            <InputNumber
                                size="small"
                                min={100}
                                max={100000}
                                defaultValue={newjson.h || 1080}
                                onChange={ev => onPpi('h', ev)}
                            />
                        </Space>
                    </div>
                )
                break
        }
    }

    return (
        <Space
            direction="vertical"
            onClick={backDiv ? e => e.stopPropagation() : undefined}
            style={{ marginInline: 8 }}>
            <span>{e.description}</span>
            {backDiv}
        </Space>
    );
}