import React, {  } from 'react';
import { Card, Typography, Descriptions, Tag, Space, Button } from 'antd';
import { GithubOutlined, GlobalOutlined } from '@ant-design/icons';
import { UserProtocol } from '../protocol';
import { MacScrollbar } from 'mac-scrollbar';
import UpDatebtn from './updates'
import { LocalStor } from '@/mod/locale_load';
import { AuthorT } from './author';
import { motion } from 'framer-motion';
import { VersionInfo } from '@/mod/V_analysis';
import { Appinfo } from '@/mod/store';
import { createAndClickLink } from '@/mod/createAndClickLink';

const { Title, Paragraph, Link } = Typography;

// 程序信息类型
interface ProgramInfo {
    name: string;
    version: VersionInfo;
    license: string;
    copyright: string;
    description: string;
    website: string;
    repository: string;

}


const AboutProgramPage: React.FC = () => {
    const { Local } = LocalStor()
    const about = Local?.about
    const { v, name } = Appinfo()
    const programData: ProgramInfo = {
        name: name,
        version: v,
        license: 'GNU General Public License v3.0',
        copyright: '© 2025 Made with love by TuyangJs',
        description: about?.description,
        website: 'https://dota2.com',
        repository: 'https://github.com/Dota2-Start/Dota2-Start',

    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Start slightly below
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring", // Use spring for elastic effect
                stiffness: 150, // Controls speed of the bounce
                damping: 25, // Controls how smooth the bounce is
                duration: 0.36, // Controls the overall duration 
            }}
            style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}
        >
            <Card title={about?.title} >
                {/* 基础信息区块 */}
                <Descriptions
                    title={<Title level={4}>{programData.name}</Title>}
                    column={1}
                    bordered
                >
                    <Descriptions.Item label={about?.version}>
                        <Space>
                            {
                                programData.version?.beta && <Tag color="gold">Beta.{programData.version.beta}</Tag>
                            }
                            {
                                programData.version?.alpha && <Tag color="red">Alpha.{programData.version.alpha}</Tag>
                            }
                            {programData.version.version}

                            <UpDatebtn />
                        </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label={about?.copyright}>
                        {programData.copyright}
                    </Descriptions.Item>
                    <Descriptions.Item label={about?.author}>
                        <AuthorT />
                    </Descriptions.Item>
                    <Descriptions.Item label={about?.license}>
                        <Link href={`${programData.repository}/blob/master/LICENSE`} target="_blank">
                            {programData.license}
                        </Link>
                    </Descriptions.Item>
                </Descriptions>

                {/* 程序描述 */}
                <Paragraph style={{ marginTop: 24 }}>
                    <Title level={5}>{about?.blurbTitle}</Title>
                    {programData.description}
                </Paragraph>


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
                        onClick={() => createAndClickLink(programData.website)}
                    >
                        {about?.BtnA}
                    </Button>
                    <Button
                        icon={<GithubOutlined />}
                        onClick={() =>createAndClickLink(programData.repository)}
                    >
                        {about?.BtnB}
                    </Button>
                </Space>
            </Card>
        </motion.div>
    );
};

export default AboutProgramPage;