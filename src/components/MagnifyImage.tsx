import { useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

type MagnifyImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  zoom?: number;
  lensSize?: number;
};

export default function MagnifyImage({
  src,
  alt,
  className = "",
  imgClassName = "h-full w-full object-contain",
  zoom = 2.25,
  lensSize = 160,
}: MagnifyImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);

  const springConfig = { stiffness: 320, damping: 28, mass: 0.4 };
  const lensX = useSpring(x, springConfig);
  const lensY = useSpring(y, springConfig);
  const lensBgX = useSpring(bgX, springConfig);
  const lensBgY = useSpring(bgY, springConfig);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;

    const frameRect = frame.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const px = e.clientX - frameRect.left;
    const py = e.clientY - frameRect.top;
    x.set(px);
    y.set(py);

    const ix = e.clientX - imgRect.left;
    const iy = e.clientY - imgRect.top;
    const inside =
      ix >= 0 && iy >= 0 && ix <= imgRect.width && iy <= imgRect.height;

    if (inside) {
      const ratioX = ix / imgRect.width;
      const ratioY = iy / imgRect.height;
      const bgW = imgRect.width * zoom;
      const bgH = imgRect.height * zoom;
      bgX.set(-(ratioX * bgW - lensSize / 2));
      bgY.set(-(ratioY * bgH - lensSize / 2));
    }
  }

  return (
    <div
      ref={frameRef}
      className={`group relative cursor-zoom-in ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={handleMove}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${imgClassName} transition-all duration-500 ease-out ${
          active ? "scale-[1.02] brightness-90" : ""
        }`}
        draggable={false}
      />

      <AnimatePresence>
        {active && (
          <motion.div
            key="lens"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              x: lensX,
              y: lensY,
              width: lensSize,
              height: lensSize,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="pointer-events-none absolute left-0 top-0 z-10 rounded-full border-2 border-brand-cyan400/70 shadow-glow-cyan ring-1 ring-white/10 backdrop-blur-[1px]"
          >
            <motion.div
              style={{
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${zoom * 100}% ${zoom * 100}%`,
                backgroundPositionX: lensBgX,
                backgroundPositionY: lensBgY,
              }}
              className="h-full w-full rounded-full"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/15 via-transparent to-black/30 mix-blend-overlay" />
            <span className="pointer-events-none absolute -right-1 -bottom-1 h-6 w-1.5 rotate-45 rounded-full bg-brand-cyan400/80 shadow-glow-cyan" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
