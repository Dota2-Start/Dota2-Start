import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Switch } from 'antd';
import newfrom from './NewForm';
import { TaskListItem, TaskListStore } from '@/mod/store';
import { LocalStor } from '@/mod/locale_load';

export default () => {
    const { args, setTask, remind, setRemind } = TaskListStore();
    const { NewForm, setEditKey, setFromOpen } = newfrom();
    const { Local } = LocalStor()
    const iLocal = Local?.[location.pathname]
    const dict = Local?.$dict
    const handleDelete = (id: number) => {
        const newData = args.filter(item => item.id !== id);
        setTask(newData);
    };
    const openForm = (record: TaskListItem) => {
        const id = args.findIndex(item => item.id === record.id);
        setEditKey(id)
        setFromOpen(true)
    }
    const columns: ProColumns<TaskListItem>[] = [
        {
            title: iLocal?.Table_Header?.[0],
            width: 80,
            dataIndex: 'name',

        },
        {
            title: iLocal?.Table_Header?.[1],
            width: 360,
            dataIndex: 'describe',
        },
        {
            title: iLocal?.Table_Header?.[2],
            dataIndex: 'time',
            width: 120,
            align: 'right',
        },
        {
            title: iLocal?.Table_Header?.[3],
            width: 80,
            dataIndex: 'status',
            initialValue: 0,
            valueEnum: {
                0: { text: '关闭', status: 'Default' },
                1: { text: '启动', status: 'Processing' },
            },
        },
        {
            title: iLocal?.Table_Header?.[4],
            width: 180,
            valueType: 'option',
            render: (_, record) => [
                <a key="edit" onClick={() => openForm(record)}>
                    {iLocal?.Table_option?.[0]}
                </a>,
                <Popconfirm
                    key="delete"
                    title="是否确认删除？"
                    description="一旦删除将无法恢复！"
                    onConfirm={() => handleDelete(record.id)}
                    okText="确认"
                    cancelText="取消"
                >
                    <a>{iLocal?.Table_option?.[1]}</a>
                </Popconfirm>,
            ],
        },
    ];

    return (
        <ProTable<TaskListItem>
            rowKey="id"
            pagination={{ showQuickJumper: true }}
            options={false}
            request={async () => {

                return Promise.resolve({
                    data: args,
                    success: true,
                });
            }}
            columns={columns}
            search={false}
            dateFormatter="string"
            columnsState={
                {
                    persistenceKey: 'pro-table-singe-HUD',
                    persistenceType: 'localStorage',
                }
            }
            toolbar={{
                title: iLocal?.Table_title,
                tooltip: iLocal?.Table_tooltip,
            }}
            toolBarRender={() => [
                <Space>
                    <span>{dict?.enable}</span>
                    <Switch value={remind} onChange={setRemind} />
                </Space>
                ,
                <Button key="log">查看日志</Button>,
                <NewForm />,
            ]}
        />
    );
};