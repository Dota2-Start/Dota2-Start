import { Flex } from "antd";
import Bgvideo from "@/mod/bg-video";
import video, { VideoBackgroundProps } from "@/mod/http/video";
import { PlayDota } from "./PlayDota";
import NewBox from "./newBox";
import { motion } from "framer-motion";
import { StateCard } from "./StateCard";
import { LocalStor } from "@/mod/locale_load";
import { useEffect, useState } from "react";
import Updates from "../about/updates";
//const videoData = await video()
function App() {
  const { Local } = LocalStor()
  const iLocal = Local['/']
  const [videoData, setVideoData] = useState<VideoBackgroundProps>({ videoUrl: '', poster: 'video/mp4' });
  useEffect(() => {
    (async () => {
      const data = await video()
      setVideoData(data)
    })()
  }, [])
  return (
    <>
 
      <Bgvideo {...videoData}></Bgvideo>
      <motion.div
        key="anchor"
        style={{ minHeight: '60vh' }}
        initial={{ opacity: 0, y: 50 }} // Start slightly below
        animate={{ opacity: 1, y: 0 }} // Animate to original position
        transition={{
          type: "spring", // Use spring for elastic effect
          stiffness: 300, // Controls speed of the bounce
          damping: 25, // Controls how smooth the bounce is
          duration: 0.6, // Controls the overall duration
        }}
      >
        <Flex justify="space-between" about="center" style={{ overflow: 'hidden', height: '100%' }}>
          <StateCard />
          <Flex
            style={{
              width: '100%',
              height: 'auto',
              marginBlock: 0
            }}
            gap={8}
            vertical
            align="center"
            wrap="nowrap"
            justify="flex-end"
          >
            <Flex vertical align="center">
              <motion.span
                key={iLocal?.description}
                initial={{ opacity: 0, filter: "blur(5px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.5, }}
              >
                <h1 style={{ margin: 0 }}>{iLocal?.description + ' Dota2 Start'} </h1>
              </motion.span>
            </Flex>
            <PlayDota />
            <Updates />
          </Flex>

          <NewBox />
        </Flex>
      </motion.div>
    </>

  );
}

export default App;
