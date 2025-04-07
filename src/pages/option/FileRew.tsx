import {
    ProCard,
} from '@ant-design/pro-components';
import { fileData } from './filedata';
import { LocalStor } from '@/mod/locale_load';
import { Tooltip, Button, Space, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { SwitchChangeEventHandler } from 'antd/es/switch';
export default () => {
    const { Local } = LocalStor()
    const iLocal = Local?.option?.['part-2']
    return (
        <>
            {
                fileData.map(item => (
                    <ProCard
                        title={iLocal?.[item.value]}
                        bordered
                        size='small'
                        extra={
                            <Space>
                                <Tooltip title={iLocal?.[item.value + '_tip']}>
                                    <Button
                                        size='small'
                                        icon={<InfoCircleOutlined />}
                                        type='text'
                                    ></Button>
                                </Tooltip>
                                <Switch
                                    onChange={item.onchange as unknown as SwitchChangeEventHandler}
                                />
                            </Space>
                        }
                        style={{ maxWidth: 300 }}
                    >
                        <div>{iLocal?.[item.value + '_des']}</div>
                    </ProCard>
                ))
            }
        </>
    );
};