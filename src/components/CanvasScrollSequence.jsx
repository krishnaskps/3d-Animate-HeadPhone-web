import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, Sparkles, Compass, Disc, Sliders } from 'lucide-react';

export default function CanvasScrollSequence({ images, onLoaded }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Smooth lerp frame tracking
  const targetFrameRef = useRef(0);
  const renderedFrameRef = useRef(0);
  const animationFrameIdRef = useRef(null);

  // High-DPI canvas setup & image rendering
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Graceful fallback for frame bounds
    const safeIndex = Math.max(0, Math.min(images.length - 1, Math.round(frameIndex)));
    const img = images[safeIndex];

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback: search nearest loaded frame
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Deep black base
    ctx.fillStyle = '#050507';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Calculate aspect ratio containment (DO NOT STRETCH OR DISTORT)
    const imgRatio = img.width / img.height;
    const screenRatio = displayWidth / displayHeight;

    let drawWidth, drawHeight;

    // Contain with responsive sizing
    if (screenRatio > imgRatio) {
      // Screen is wider than image
      drawHeight = Math.min(displayHeight * 0.88, 720);
      drawWidth = drawHeight * imgRatio;
    } else {
      // Screen is narrower (tablets / mobile)
      drawWidth = Math.min(displayWidth * 0.94, 640);
      drawHeight = drawWidth / imgRatio;
    }

    const drawX = (displayWidth - drawWidth) / 2;
    const drawY = (displayHeight - drawHeight) / 2;

    // Subtle atmospheric glow behind the headphones
    const gradient = ctx.createRadialGradient(
      displayWidth / 2,
      displayHeight / 2,
      10,
      displayWidth / 2,
      displayHeight / 2,
      Math.max(drawWidth, drawHeight) * 0.7
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
    gradient.addColorStop(0.5, 'rgba(200, 200, 210, 0.015)');
    gradient.addColorStop(1, 'rgba(5, 5, 7, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Draw the headphone image frame
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    ctx.restore();
  }, [images]);

  // Animation frame loop with smooth lerping (Apple-like momentum)
  useEffect(() => {
    let active = true;

    const loop = () => {
      if (!active) return;

      const diff = targetFrameRef.current - renderedFrameRef.current;
      if (Math.abs(diff) > 0.01) {
        // Smooth lerp easing factor
        renderedFrameRef.current += diff * 0.18;
        renderFrame(renderedFrameRef.current);
        setCurrentFrame(Math.min(300, Math.max(1, Math.round(renderedFrameRef.current + 1))));
      }

      animationFrameIdRef.current = requestAnimationFrame(loop);
    };

    animationFrameIdRef.current = requestAnimationFrame(loop);

    return () => {
      active = false;
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderFrame]);

  // Scroll handler calculating precise 0.0 -> 1.0 progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);
      targetFrameRef.current = progress * (images.length - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => renderFrame(renderedFrameRef.current));
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => renderFrame(renderedFrameRef.current));
    };
  }, [images.length, renderFrame]);

  // Initial draw
  useEffect(() => {
    if (images.length > 0) {
      renderFrame(0);
    }
  }, [images, renderFrame]);

  // Helper for text stages smooth opacity and translateY
  const getStageStyle = (start, peakStart, peakEnd, end) => {
    let opacity = 0;
    let translateY = 20;

    if (scrollProgress >= start && scrollProgress <= end) {
      if (scrollProgress < peakStart) {
        // Fade in
        const t = (scrollProgress - start) / (peakStart - start);
        opacity = t;
        translateY = 20 * (1 - t);
      } else if (scrollProgress <= peakEnd) {
        // Peak full visibility
        opacity = 1;
        translateY = 0;
      } else {
        // Fade out
        const t = (scrollProgress - peakEnd) / (end - peakEnd);
        opacity = 1 - t;
        translateY = -20 * t;
      }
    } else if (scrollProgress > end) {
      opacity = 0;
      translateY = -25;
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0)`,
      pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      visibility: opacity > 0.01 ? 'visible' : 'hidden',
    };
  };

  // Stage styles mapping
  // Hero: 0.0 to 0.12
  const heroStyle = getStageStyle(0, 0, 0.08, 0.14);
  // Stage 1: 0.16 to 0.30
  const stage1Style = getStageStyle(0.16, 0.20, 0.26, 0.31);
  // Stage 2: 0.33 to 0.47
  const stage2Style = getStageStyle(0.33, 0.37, 0.43, 0.48);
  // Stage 3: 0.50 to 0.64
  const stage3Style = getStageStyle(0.50, 0.54, 0.60, 0.65);
  // Stage 4: 0.67 to 0.81
  const stage4Style = getStageStyle(0.67, 0.71, 0.77, 0.82);
  // Stage 5: 0.84 to 0.99
  const stage5Style = getStageStyle(0.84, 0.88, 0.95, 1.0);

  const handleManualScrub = (e) => {
    const val = parseFloat(e.target.value);
    const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
    const newScrollTop = containerRef.current.offsetTop + val * totalScrollable;
    window.scrollTo({
      top: newScrollTop,
      behavior: 'auto',
    });
  };

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative w-full bg-[#050507]"
      style={{ height: '550vh' }}
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Canvas for 300-Frame Image Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Ambient Top & Bottom Vignettes */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050507] via-[#050507]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050507] via-[#050507]/70 to-transparent pointer-events-none" />

        {/* ======================================================== */}
        {/* SECTION 2: HERO OVERLAY (Headline: SOUND. REDEFINED.)   */}
        {/* ======================================================== */}
        <div
          style={heroStyle}
          className="absolute inset-0 z-20 flex flex-col justify-between items-center px-6 py-24 sm:py-28 text-center transition-all duration-300"
        >
          {/* Subtle top badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-mono">
              The Next Evolution in Sound
            </span>
          </div>

          {/* Main Hero Typography */}
          <div className="max-w-4xl mx-auto mt-4 sm:mt-12">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white mb-4 leading-none text-glow uppercase">
              SOUND. <br />
              <span className="text-gradient-silver">REDEFINED.</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-neutral-400 font-light max-w-2xl mx-auto tracking-wide">
              Experience sound beyond imagination.
            </p>
          </div>

          {/* Stylish Scroll Indicator */}
          <div className="flex flex-col items-center space-y-3 cursor-pointer group mb-2">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-neutral-400 group-hover:text-white transition-colors font-medium">
              EXPLORE THE HEADPHONES
            </span>
            <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center p-1 group-hover:border-white transition-colors">
              <div className="w-1 h-2 rounded-full bg-white animate-bounce" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 3: STAGE TEXT OVERLAYS                          */}
        {/* ======================================================== */}

        {/* STAGE 1: DESIGNED TO INSPIRE */}
        <div
          style={stage1Style}
          className="absolute inset-0 z-20 flex items-center justify-start max-w-6xl mx-auto px-8 sm:px-16 pointer-events-none"
        >
          <div className="max-w-md p-8 rounded-3xl glass-card backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>Phase 01 // Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-4 leading-tight">
              DESIGNED TO <br />
              <span className="text-gradient-silver">INSPIRE</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Every curve. Every detail. Crafted for perfection.
            </p>
          </div>
        </div>

        {/* STAGE 2: PRECISION IN EVERY DETAIL */}
        <div
          style={stage2Style}
          className="absolute inset-0 z-20 flex items-center justify-end max-w-6xl mx-auto px-8 sm:px-16 pointer-events-none"
        >
          <div className="max-w-md p-8 rounded-3xl glass-card backdrop-blur-xl border border-white/10 shadow-2xl text-right">
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2 flex items-center justify-end space-x-2">
              <span>Phase 02 // Architecture</span>
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-4 leading-tight">
              PRECISION IN <br />
              <span className="text-gradient-silver">EVERY DETAIL</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Discover the engineering behind exceptional comfort.
            </p>
          </div>
        </div>

        {/* STAGE 3: BUILT FOR COMFORT */}
        <div
          style={stage3Style}
          className="absolute inset-0 z-20 flex items-center justify-start max-w-6xl mx-auto px-8 sm:px-16 pointer-events-none"
        >
          <div className="max-w-md p-8 rounded-3xl glass-card backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>Phase 03 // Ergonomics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-4 leading-tight">
              BUILT FOR <br />
              <span className="text-gradient-silver">COMFORT</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Premium cushioning meets an ergonomic design.
            </p>
          </div>
        </div>

        {/* STAGE 4: ENGINEERED TO PERFORM */}
        <div
          style={stage4Style}
          className="absolute inset-0 z-20 flex items-center justify-end max-w-6xl mx-auto px-8 sm:px-16 pointer-events-none"
        >
          <div className="max-w-md p-8 rounded-3xl glass-card backdrop-blur-xl border border-white/10 shadow-2xl text-right">
            <div className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2 flex items-center justify-end space-x-2">
              <span>Phase 04 // Acoustics</span>
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase mb-4 leading-tight">
              ENGINEERED TO <br />
              <span className="text-gradient-silver">PERFORM</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
              Precision craftsmanship. Seamless functionality.
            </p>
          </div>
        </div>

        {/* STAGE 5: FEEL EVERY MOMENT */}
        <div
          style={stage5Style}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 text-center pointer-events-none"
        >
          <div className="p-8 sm:p-12 rounded-3xl glass-card backdrop-blur-xl border border-white/10 shadow-2xl max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 mb-4">
              <Disc className="w-3.5 h-3.5 text-white animate-spin" />
              <span className="text-[11px] uppercase font-mono tracking-widest text-neutral-300">
                Phase 05 // Climax
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white uppercase mb-4 leading-none">
              FEEL EVERY <br />
              <span className="text-gradient-silver">MOMENT</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-lg mx-auto mb-6">
              A new dimension of listening awaits.
            </p>
            <div className="inline-block text-xs uppercase tracking-widest text-neutral-400 font-mono">
              Scroll down to explore features & specifications ↓
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM HUD / SCENE METRICS (CINEMA CONTROL)             */}
        {/* ======================================================== */}
        <div className="absolute bottom-6 inset-x-6 sm:inset-x-12 z-30 flex items-center justify-between text-xs font-mono text-neutral-500 pointer-events-none">
          {/* Frame Number display */}
          <div className="flex items-center space-x-3 glass-pill px-4 py-2 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-300 font-bold">
              FRAME {String(currentFrame).padStart(3, '0')}
            </span>
            <span className="text-neutral-600">/ 300</span>
          </div>

          {/* Scrubber slider bar */}
          <div className="hidden sm:flex items-center space-x-3 glass-pill px-5 py-2 pointer-events-auto">
            <Sliders className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[10px] uppercase tracking-wider text-neutral-400">Scrub Sequence</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={scrollProgress}
              onChange={handleManualScrub}
              className="w-28 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>

          {/* Status info */}
          <div className="hidden md:flex items-center space-x-4 text-[11px]">
            <span className="text-neutral-400">300 SEQUENTIAL FRAMES</span>
            <span className="text-neutral-600">|</span>
            <span className="text-neutral-400">40MM TITANIUM DRIVER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
