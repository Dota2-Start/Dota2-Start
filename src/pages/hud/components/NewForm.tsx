import { LocalStor } from '@/mod/locale_load';
import { TaskListItem, TaskListStore } from '@/mod/store';
import { PlusOutlined } from '@ant-design/icons';
import {
    DrawerForm,
    ProForm,
    ProFormDigit,
    ProFormInstance,
    ProFormText,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { useEffect, useRef, useState } from 'react';


const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
//运算符处理
const safeEval = (expr: string): number | null => {
    try {
        // 限制非法字符，仅允许数字、括号和运算符
        if (/^[\d\s+\-*/().]+$/.test(expr)) {
            // 使用 Function 替代 eval，更可控
            // eslint-disable-next-line no-new-func
            const result = Function(`"use strict"; return (${expr})`)();
            if (typeof result === 'number' && !isNaN(result)) {
                return result;
            }
        }
    } catch {
        return null;
    }
    return null;
};

/**
 * 生成唯一的 8 位 ID
 */
const generateId = () => {
    let id: string;
    id = Math.floor(Math.random() * 1e8).toString().padStart(8, '0');
    return id;
}
export default () => {
    const { Local } = LocalStor()
    const iLocal = Local[location.pathname]
    const [form] = Form.useForm<TaskListItem>();
    const [editKey, setEditKey] = useState<number | null>(null);
    const [fromOpen, setFromOpen] = useState(false);
    const { args, setTask } = TaskListStore()
    useEffect(() => {
        if (typeof editKey !== 'number') {
            form?.resetFields()
        } else {
            form?.setFieldsValue(args[editKey])
        }

    }, [editKey, args])
    useEffect(() => {
        if (!fromOpen) {
            setEditKey(null)
        }
    }, [fromOpen])
    const fromFinish = async (values: TaskListItem) => {
        await waitTime(500);
        const data = args
        if (typeof editKey === 'number' && editKey >= 0) {
            data[editKey] = { ...data[editKey], ...values }
            setEditKey(null)
        } else {
            values.id = parseInt(generateId())
            data.push({ ...values, status: 0 })
        }
        setTask(data)
        message.success('Submission successful');
        setFromOpen(false)
        // Not returning will not close the modal
        return true;
    }
    const NewForm = () => (
        <DrawerForm<TaskListItem>
            form={form}
            title={(typeof editKey === 'number' && editKey >= 0) ? iLocal?.Table_Modify : iLocal?.Table_Add}
            onOpenChange={setFromOpen}
            open={fromOpen}
            resize={{
                onResize() {
                    console.log('resize!');
                },
                maxWidth: window.innerWidth * 0.8,
                minWidth: 300,
            }}
            trigger={
                <Button type="primary">
                    <PlusOutlined />
                    {iLocal?.Table_Add}
                </Button>
            }
            autoFocusFirstInput
            drawerProps={{
                destroyOnClose: true,
            }}
            submitTimeout={2000}
            onFinish={fromFinish}
        >
            <ProForm.Group>
                <ProFormText
                    name="name"
                    width="md"
                    label="任务名称"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                />
                <ProFormText
                    width="md"
                    name="describe"
                    label="任务描述"
                    placeholder="Please enter a name"
                />
            </ProForm.Group>
            <ProForm.Group >
                <ProFormText
                    width="md"
                    name="time"
                    label="任务时间 - 单位：秒"
                    placeholder="Please enter a name"
                    tooltip="支持运算符，如：4*60 = 4分钟"
                    rules={[
                        { required: true, message: '任务时间不能为空' },
                        {
                            validator: (_, value) => {
                                if (!value) return Promise.resolve(); // 空值交给 required 处理
                                const num = Number(value);
                                if (!isNaN(num) && isFinite(num)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('请输入有效的数字，或回车确认计算');
                            }
                        }
                    ]}
                    fieldProps={{
                        onBlur: (e) => {
                            const raw = e.target.value;
                            const val = safeEval(raw);
                            if (val !== null) {
                                form.setFieldsValue({ time: val });
                            }
                        },
                        onPressEnter: (e) => {
                            const raw = e.currentTarget.value;
                            const val = safeEval(raw);
                            if (val !== null) {
                                form.setFieldsValue({ time: val });
                            }
                        }
                    }}
                />
                <ProFormDigit
                    width="md"
                    name="offset"
                    label="任务时间偏移 - 单位：秒"
                    placeholder="Please enter a name"
                    tooltip="提前几秒执行提醒任务"
                />
            </ProForm.Group>
        </DrawerForm>
    )
    return {
        NewForm,
        setEditKey,
        setFromOpen
    }
};