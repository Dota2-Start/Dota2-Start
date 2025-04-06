import { CheckCard } from '@ant-design/pro-components';
import { DotaSource } from './opdata';
import { Dota2ArgsLite } from '@/mod/store';
import { LocalStor } from '@/mod/locale_load';
interface DotaSourceItem {
    value: string;
    title?: string;  // 可能存在 title
    description?: string;  // 添加 description 字段
    children?: DotaSourceItem[];  // 可能包含 children
  }
export default () => {
    const { args, setArgs } = Dota2ArgsLite(); // 从 Zustand 获取状态
    const { Local } = LocalStor(); // 从 LocalStor 获取语言数据
    const iLocal = Local?.option?.['part-1']; // 获取 Local 中的 option 数据

    // 确保 iLocal 存在
    if (!iLocal) return null;

    // 克隆 DotaSource 数据并进行语言匹配
    const updatedDotaSource: DotaSourceItem[] = DotaSource.map((item) => {
        const updatedItem: DotaSourceItem = { ...item }; // 克隆每个项
        updatedItem.title = iLocal?.[updatedItem.value]; // 更新 title
        updatedItem.description = iLocal?.[updatedItem.value + '_des']; // 更新 description

        // 更新 children 数据
        updatedItem.children = updatedItem.children?.map((child) => {
            const updatedChild: DotaSourceItem = { ...child }; // 克隆 child
            updatedChild.title = iLocal?.[updatedChild.value]; // 更新 child title
            updatedChild.description = iLocal?.[updatedChild.value + '_des']; // 更新 child description
            return updatedChild;
        });

        return updatedItem;
    });


    return (
        <CheckCard.Group
            style={{ width: '100%' }}
            multiple
            options={updatedDotaSource} // 使用更新后的 DotaSource
            value={args} // 当前选中的值
            onChange={setArgs} // 更新选中的值
        />
    );
};
