import { VideoBackgroundProps } from '@/mod/http/video';
import React, { useEffect, useState } from 'react';



const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl, poster }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // 页面加载完后，触发视频播放
    const video = document.getElementById('background-video') as HTMLVideoElement;
    if (video) {
      video.oncanplaythrough = () => setIsLoaded(true);
    }
  }, []);
  console.log("poster",poster,"videoUrl",videoUrl);

  return (
    <div className='video-background'>
      <video
        id="background-video"
        src={videoUrl}
        poster={poster}
        autoPlay
        muted
        loop
        preload="auto"
        style={{ 
          objectFit: 'cover', // 保持视频比例填充整个容器
        }}
      />
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#fff',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          Loading...
        </div>
      )}

    </div>
  );
};

export default VideoBackground;
