import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import smokeVideo from '../assets/video/smoke-bg.mp4';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.62, 0.84]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{ scale, transformOrigin: 'center center' }}
        className="w-full h-full object-cover will-change-transform"
        src={smokeVideo}
      />
      <motion.div
        className="absolute inset-0 bg-bg"
        style={{ opacity: overlayOpacity }}
      />
      {/* Watermark cover */}
      <div className="absolute bottom-0 right-0 w-[260px] h-[60px] bg-bg z-[2]" />
    </div>
  );
}
