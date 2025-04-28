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
    const [form] = Form.useForm<{ name: string; company: string }>();
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
            data.push({...values,status:0})
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
                        {
                            required: true,
                        },
                    ]}
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