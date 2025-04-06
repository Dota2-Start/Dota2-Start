import React from 'react';
import { Card, Typography, Descriptions, Tag, Collapse, Space, Button } from 'antd';
import { GithubOutlined, GlobalOutlined } from '@ant-design/icons';
import { getVersion } from '@tauri-apps/api/app';
import { UserProtocol } from '../protocol';
import { MacScrollbar } from 'mac-scrollbar';
import UpDatebtn from './updates'
import { LocalStor } from '@/mod/locale_load';

const { Title, Paragraph, Link } = Typography;
const { Panel } = Collapse;

// 程序信息类型
interface ProgramInfo {
    name: string;
    version: string;
    license: string;
    copyright: string;
    description: string;
    website: string;
    repository: string;
    updateHistory: {
        version: string;
        date: string;
        changes: string[];
    }[];
}
const version = await getVersion();

const AboutProgramPage: React.FC = () => {
    const { Local } = LocalStor()
    const about = Local?.about
    const programData: ProgramInfo = {
        name: 'Dota 2 Start',
        version: version,
        license: 'GNU General Public License v3.0',
        copyright: '© 2025 Tuyang',
        description: about?.description,
        website: 'https://dota2.com',
        repository: 'https://github.com/dota2-launcher',
        updateHistory: [
            {
                version: '2.3.4',
                date: '2024-02-25',
                changes: [
                    '新增 Vulkan 渲染支持',
                    '优化内存占用表现',
                    '修复已知崩溃问题'
                ]
            },
            {
                version: '2.3.3',
                date: '2024-02-18',
                changes: [
                    '改进网络连接稳定性',
                    '更新翻译文件',
                    '新增性能监控面板'
                ]
            }
        ]
    };
    return (
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
            <Card title={about?.title} >
                {/* 基础信息区块 */}
                <Descriptions
                    title={<Title level={4}>{programData.name}</Title>}
                    column={1}
                    bordered
                >
                    <Descriptions.Item label={about?.version}>
                        <Space>
                            <Tag color="blue">{programData.version} </Tag>
                            <UpDatebtn />
                        </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label={about?.copyright}>
                        {programData.copyright}
                    </Descriptions.Item>
                    <Descriptions.Item label={about?.license}>
                        <Link href={programData.repository} target="_blank">
                            {programData.license}
                        </Link>
                    </Descriptions.Item>
                </Descriptions>

                {/* 程序描述 */}
                <Paragraph style={{ marginTop: 24 }}>
                    <Title level={5}>{about?.blurbTitle}</Title>
                    {programData.description}
                </Paragraph>

                {/* 版本更新历史 */}
                <Collapse ghost defaultActiveKey={['current-version']}>
                    <Panel
                        header="版本更新历史"
                        key="update-history"
                        extra={`共 ${programData.updateHistory.length} 个版本`}
                    >
                        {programData.updateHistory.map((update, index) => (
                            <div key={update.version} style={{ marginBottom: 16 }}>
                                <Space>
                                    <Tag color={index === 0 ? 'green' : 'default'}>
                                        {update.version}
                                    </Tag>
                                    <span style={{ color: '#666' }}>{update.date}</span>
                                </Space>
                                <ul style={{ marginTop: 8, marginLeft: 24 }}>
                                    {update.changes.map((change, i) => (
                                        <li key={i}>{change}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Panel>
                </Collapse>

                {/* 完整协议内容 */}
                <Card
                    title={about?.UserAgreement}
                    style={{ marginTop: 24, }}
                    styles={{
                        body: {
                        }
                    }}
                >
                    <MacScrollbar
                        skin="dark"
                        className='scroll-container'
                        style={{
                            height: '50vh'
                        }}
                        suppressScrollX>
                        <UserProtocol />
                    </MacScrollbar>
                </Card>

                {/* 操作按钮 */}
                <Space style={{ marginTop: 24 }}>
                    <Button
                        type="primary"
                        icon={<GlobalOutlined />}
                        onClick={() => window.open(programData.website)}
                    >
                        {about?.BtnA}
                    </Button>
                    <Button
                        icon={<GithubOutlined />}
                        onClick={() => window.open(programData.repository)}
                    >
                        {about?.BtnB}
                    </Button>
                </Space>
            </Card>
        </div>
    );
};

export default AboutProgramPage;