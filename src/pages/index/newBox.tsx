import getNewInfo from "@/mod/http/new";
import NewsCard from "@/mod/NewsCard";
import { Empty, Flex, Typography } from "antd";
import { MacScrollbar } from "mac-scrollbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocalStorageState } from "ahooks";

export default () => {
    const [AppData, setAppData] = useLocalStorageState('Data-index', {
        defaultValue: {
            ShowNewBox: true,
        },

    });
    const [newData, setNewData] = useState<any[]>([]);
    const [showButton, setShowButton] = useState(false); // 控制按钮显示

    useEffect(() => {
        async function getNew() {
            const res = await getNewInfo(20);
            console.log("Fetched News:", res);
            setNewData(res.events || []);
        }
        getNew();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                position: "relative",
                height: 612,
            }}
            onMouseEnter={() => setShowButton(true)} // 鼠标移入新闻区域，显示按钮
            onMouseLeave={() => setShowButton(false)} // 鼠标移出新闻区域，隐藏按钮
        >
            {newData.length > 0 && (
                <MacScrollbar
                    style={{
                        height: 612,
                    }}
                    suppressScrollX>
                    {/* 新闻列表 */}
                    <motion.div
                        style={{
                            width: AppData?.ShowNewBox ? 0 : 326,
                            overflow: "hidden",
                            borderRadius: "8px",
                            transition: "width 0.5s ease-in-out",
                            marginInlineEnd: 8
                        }}
                    >

                        <Flex wrap gap={8}>
                            {newData.length === 0 ? (
                                <Flex align="center" style={{ height: 'auto' }} vertical>

                                    <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        styles={{ image: { height: 60 } }}
                                        description={
                                            <Typography.Text>
                                                无法载入新闻，建议开启Steam网络加速
                                            </Typography.Text>
                                        }
                                    >
                                    </Empty>
                                </Flex>
                            ) : (
                                newData.map((item: any, index) => {
                                    if (!item?.jsondata || item.event_type === 12) return null;
                                    //if (item.event_type !== 13 && item.event_type !== 28) return null;
                                    const jsondata = JSON.parse(item?.jsondata);
                                    const clanid = item.announcement_body.clanid;
                                    const imgurl = `https://clan.cloudflare.steamstatic.com/images/${clanid}/${jsondata?.localized_capsule_image[0]}`;
                                    const date = new Date(item?.announcement_body?.updatetime * 1000);
                                    const formattedDate = date.toLocaleDateString("zh-CN", {
                                        year: "numeric",
                                        month: "numeric",
                                        day: "numeric",
                                    });

                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 50 }} // Start slightly below
                                            animate={{ opacity: 1, y: 0 }} // Animate to original position
                                            transition={{
                                                type: "spring", // Use spring for elastic effect
                                                stiffness: 300, // Controls speed of the bounce
                                                damping: 25, // Controls how smooth the bounce is
                                                duration: 0.6, // Controls the overall duration
                                                delay: index * 0.2,
                                            }}
                                        >
                                            <NewsCard
                                                key={item.gid}
                                                gid={item.gid}
                                                type={item.event_type}
                                                title={item.announcement_body.headline}
                                                imageUrl={imgurl}
                                                summary={item.announcement_body.body}
                                                date={formattedDate}
                                            />
                                        </motion.div>
                                    );
                                })
                            )}
                        </Flex>
                    </motion.div>
                </MacScrollbar>
            )}

            <motion.div
                onClick={() => setAppData({ ShowNewBox: !AppData?.ShowNewBox })}
                onMouseEnter={() => setShowButton(true)} // 鼠标移入按钮，保持显示
                onMouseLeave={() => setShowButton(false)} // 鼠标移出按钮，隐藏
                style={{
                    position: "absolute",
                    left: AppData?.ShowNewBox ? -22 : -40, // 盒子收起时贴屏幕边缘
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    padding: "10px",
                    borderRadius: 8,
                    cursor: "pointer",
                    transition: "opacity 0.3s, left 0.3s",
                    opacity: showButton ? 1 : 0, // 默认隐藏，鼠标移入时显示
                    zIndex: 10,
                }}
                whileHover={{ scale: 1.1 }}
            >
                {AppData?.ShowNewBox ? "◀" : "▶"}
            </motion.div>

        </div>
    );
};
