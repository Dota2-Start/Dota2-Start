import { CheckCard } from '@ant-design/pro-components';
import { DotaSource } from './opdata';
import { Dota2ArgsLite } from '@/mod/store';
import { LocalStor } from '@/mod/locale_load';
import { AnimatePresence, motion } from "framer-motion";
import { Cardbody, DotaSourceItem } from './Cardbody';
import { Flex, Tag, Typography } from 'antd';
import { Start_cmd } from '../../index/components/Start_cmd';
const { Text } = Typography;
export default () => {
    const { args, setArgs, replace, setReplace } = Dota2ArgsLite(); // 从 Zustand 获取状态
    const { Local } = LocalStor(); // 从 LocalStor 获取语言数据
    const iLocal = Local[location.pathname]?.['part-1']; // 获取 Local 中的 option 数据


    // 确保 iLocal 存在
    if (!iLocal) return null;

    // 克隆 DotaSource 数据并进行语言匹配
    const updatedDotaSource: DotaSourceItem[] = DotaSource.map((item) => {
        const updatedItem: DotaSourceItem = { ...item }; // 克隆每个项
        updatedItem.title = iLocal?.[updatedItem.value]; // 更新 title
        updatedItem.description = iLocal?.[updatedItem.value + '_des']; // 更新 description

        // 更新 children 数据
        updatedItem.children = updatedItem.children?.map((child) => {
            let updatedChild: DotaSourceItem = { ...child }; // 克隆 child
            updatedChild.title = iLocal?.[updatedChild.value]; // 更新 child title
            updatedChild.description = iLocal?.[updatedChild.value + '_des']; // 更新 child description
            updatedChild.description = Cardbody({ e: updatedChild, replace, setReplace })
            return updatedChild;
        });
        return updatedItem;
    });
    const StartCmd = Start_cmd(args, replace)
    console.log(StartCmd);

    return (
        <>
            <Flex gap="8px 0" wrap>
                <AnimatePresence>
                    {StartCmd.map((e, i) =>
                        <motion.p
                            key={i}
                            initial={{ opacity: 0, filter: "blur(5px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, filter: "blur(5px)" }}
                            transition={{
                                duration: 0.3,
                                delay: (i + 0.3) * 0.1,
                            }}
                            layout
                        >
                            <Text code >
                                {e}
                            </Text>
                        </motion.p>)
                    }
                </AnimatePresence>
            </Flex>
            <CheckCard.Group
                style={{ width: '100%' }}
                multiple
                options={updatedDotaSource} // 使用更新后的 DotaSource
                value={args} // 当前选中的值
                onChange={setArgs} // 更新选中的值
            /></>
    );
};
