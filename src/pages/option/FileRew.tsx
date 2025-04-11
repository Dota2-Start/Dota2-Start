import {
    ProCard,
} from '@ant-design/pro-components';
import { fileData } from './filedata';
import { LocalStor } from '@/mod/locale_load';
import { Tooltip, Button, Space, Switch, Result } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
export default () => {
    const { Local } = LocalStor()
    const iLocal = Local?.option?.['part-2']
    const validItems = fileData.filter(item => !item.disabled)
    if (validItems.length === 0) {
        return (
            <Result
                status="403"
                title="403"
                subTitle={Local?.$error?.['403']}
            />
        )
    }
    return (
        <>
            {
                fileData.map(item => (
                    item.disabled ? null :
                        <ProCard
                            key={item.value}
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
                                    <Button
                                        size='small'
                                        onClick={item?.onchange}
                                    >
                                        {item.btnText}
                                    </Button>

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