import React from 'react';
import { Card, Flex, Switch, Typography } from 'antd';
import { LocalStor } from '@/mod/locale_load';
import { AppDataStore } from '@/mod/store';
import { isWin11 } from '@/mod/ThemeConfig';
const { Text, Paragraph } = Typography;
const App: React.FC = () => {
    const { Local } = LocalStor()
    const iLocal = Local?.[location?.pathname]?.['part-3']
    const { devOption, setAppData } = AppDataStore()
    const devlist = [
        {
            key: "devtools",
            value: devOption?.devtools || false
        },
        {
            key: "effect",
            value: devOption?.effect || false,
            disabled: !isWin11
        }
    ]
    const onChange = (checked: boolean, key: string) => {
        setAppData({
            devOption: {
                ...devOption,
                [key]: checked,
            }
        })
    };
    return (
        <Flex gap={6} >
            {devlist.map((e, i) =>
                <Card key={e.key} style={{ width: 300 }} styles={{ body: { padding: '8px 16px' } }}>
                    <Flex gap={6} justify='space-between'>
                        <Text strong> {iLocal?.[i]?.title}</Text>
                        <Switch value={e.value} onChange={(err) => onChange(err, e.key)} disabled={e.disabled} />
                    </Flex>
                    <Paragraph style={{ paddingBlockStart: 12 }}>
                        {iLocal?.[i]?.description}
                    </Paragraph>
                </Card>
            )}
        </Flex>
    );
}

export default App;