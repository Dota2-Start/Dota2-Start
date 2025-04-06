import {
    ProCard,
    ProFormGroup,
    ProFormSwitch,
} from '@ant-design/pro-components';
import { fileData } from './filedata';
import { LocalStor } from '@/mod/locale_load';
export default () => {
    const { Local } = LocalStor()
    const iLocal = Local?.option?.['part-2']
    console.log(iLocal);
    
    return (
        <>
            {
                fileData.map(item => (
                    <ProCard
                        title={iLocal?.[item.value]}
                        bordered
                        extra={
                            <ProFormGroup>
                                <ProFormSwitch
                                    name="Enable"
                                    noStyle
                                />

                            </ProFormGroup>
                        }
                        style={{ maxWidth: 300 }}
                    >
                        <div>{iLocal?.[item.value+'_des']}</div>
                    </ProCard>
                ))
            }
        </>
    );
};