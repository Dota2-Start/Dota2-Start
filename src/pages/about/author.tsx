import React, { useEffect, useState } from 'react';
import { Avatar, Tooltip } from 'antd';
import { ContributorService } from '@/mod/http/contributorService';
import { motion } from 'framer-motion';
export interface AuthorGtype {
    id: string
    avatarUrl: string
}
export const AuthorT: React.FC = () => {
    const [AvatarG, setAvatarG] = useState<AuthorGtype[]>();
    useEffect(() => {
        const service = new ContributorService();
        service.getContributors('ant-design', 'ant-design')
            .then(contributors => {
                setAvatarG(contributors);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    }, []);
    return (
        <>
            <Avatar.Group >
                {AvatarG?.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }} // Start slightly below
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            type: "spring", // Use spring for elastic effect
                            stiffness: 150, // Controls speed of the bounce
                            damping: 25, // Controls how smooth the bounce is
                            duration: 0.36, // Controls the overall duration
                            delay: index * 0.1,
                        }}
                    >
                        <Tooltip title={item.id} placement="top" >
                            <a href={`https://github.com/${item.id}`} target="_blank">
                                <Avatar src={item.avatarUrl} style={{ backgroundColor: '#e86e3d' }} >
                                    {item.id}
                                </Avatar>
                            </a>
                        </Tooltip>
                    </motion.div>
                ))}

            </Avatar.Group>

        </>
    );
}

