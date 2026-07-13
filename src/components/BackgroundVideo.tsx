import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import smokeVideo from '../assets/video/smoke-bg.mp4';

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  // Baseline zoom of 1.3 crops the source footage's corner watermark out of
  // view at every viewport aspect ratio (verified against its pixel bounds);
  // the scroll-driven zoom keeps the same 0.15 delta on top of that.
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1.45]);
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
    </div>
  );
}
