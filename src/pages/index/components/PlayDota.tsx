import { Dota2ArgsLite, Dota2File } from "@/mod/store";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { Button, message } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArgsProps } from "antd/es/message/interface";
const DotaKey = "start_start-104"
import { LocalStor } from "@/mod/locale_load";
import { Dota2stateStore, stratSteam } from "@/mod/status";
import { Start_cmd } from "./Start_cmd";

export const PlayDota = () => {
    const { Local } = LocalStor()
    const iLocal = Local[location.pathname]
    const megLocal = Local?.$ShowMeg
    const { isExe, steamExt } = Dota2File();
    const { args, replace } = Dota2ArgsLite()
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const [ButtonText, setButtonText] = useState(iLocal?.startBtn);
    const [messageApi, contextHolder] = message.useMessage();
    const [ButtonDisabled, setButtonDisabled] = useState(true);
    const { Dota2State, setDota2State } = Dota2stateStore()
    useEffect(() => {
        if (Dota2State) {
            Dota2ok()
        } else {
            initializeBtn()
        }
    }, [Dota2State, iLocal])

    const Shake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500); // 500ms 后恢复正常
    }
    const initializeBtn = () => {
        setButtonText(iLocal?.startBtn)
        Shake()
        setButtonDisabled(false)
        setLoading(false)
    };
    const Dota2ok = () => {
        setButtonText(iLocal?.service)
        ShowMeg(DotaKey)
        setButtonDisabled(true)
        setLoading(false)
        /*  setTimeout(() => {
             appWindow.minimize()
         }, 3000); */
    }

    message.config({
        top: 100,
    })
    const ShowMeg: (e: ArgsProps | string) => void =
        (e) => {
            if (typeof e === "string") {
                messageApi.destroy(e)
                return
            }
            messageApi.open(
                {
                    key: DotaKey,
                    ...e
                }
            )
        }
    const handleStartGame = () => {
        setDota2State(false)
        setLoading(true);
        // 模拟游戏启动失败（可以根据实际逻辑来判断是否失败）
        if (!isExe) {
            // 如果未找到 exe 文件，触发抖动动画

        } else {
            const steamArgs = Start_cmd(args, replace, true)
            stratSteam(ShowMeg, steamExt, steamArgs, megLocal, (e) => {
                if (e) {
                    ShowMeg(
                        {
                            content: megLocal?.loading,
                            type: 'success',
                            duration: 3
                        }
                    )

                    setDota2State(true)
                    //Dota2ok()
                } else {
                    ShowMeg(
                        {
                            content: megLocal?.sNotStarted,
                            type: 'error',
                            duration: 3
                        }
                    )
                    initializeBtn()
                }
            })
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 550 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {contextHolder}
            <motion.div
                animate={{
                    x: shake ? [0, -10, 10, -10, 10, 0] : 0, // 添加抖动动画
                }}
                transition={{ duration: 0.8 }}
                whileHover={{
                    scale: 1.1, // 鼠标悬浮时放大
                    transition: { duration: 0.3 },
                }}
            >
                <HappyProvider>
                    <Button
                        className="vague"
                        color="default"
                        variant="outlined"
                        size="large"
                        onClick={handleStartGame}
                        loading={!isExe || loading}
                        disabled={ButtonDisabled}
                        style={{
                            paddingBlock: 26,
                            paddingInline: 38,
                            borderRadius: 26,
                        }}
                    >
                        <motion.span
                            key={ButtonText} // 每次ButtonText改变时触发动画
                            initial={{ opacity: 0, filter: "blur(5px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.5, }}
                        >
                            {ButtonText}
                        </motion.span>
                    </Button>
                </HappyProvider>
            </motion.div>

        </motion.div>
    );
};
