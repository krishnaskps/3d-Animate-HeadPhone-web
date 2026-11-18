import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CanvasScrollSequence from './components/CanvasScrollSequence';
import ProductFeatures from './components/ProductFeatures';
import InteractiveAudioExp from './components/InteractiveAudioExp';
import TechSpecs from './components/TechSpecs';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ExploreModal from './components/ExploreModal';

const TOTAL_FRAMES = 300;

export default function App() {
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Web Audio ambient synthesizer reference
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Preload all 300 sequential image frames
  useEffect(() => {
    let mounted = true;
    const loadedImages = new Array(TOTAL_FRAMES);
    let count = 0;

    // Load key frames first for instant responsiveness, then fill remaining
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const padIndex = String(i).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${padIndex}.jpg`;

      img.onload = () => {
        if (!mounted) return;
        loadedImages[i - 1] = img;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setImages(loadedImages);
          // Smooth pause so the user can appreciate the 100% calibration
          setTimeout(() => {
            if (mounted) setIsLoading(false);
          }, 400);
        }
      };

      img.onerror = () => {
        if (!mounted) return;
        console.warn(`Frame ${padIndex} failed to load, applying fallback.`);
        // Graceful fallback to first frame if any frame fails
        loadedImages[i - 1] = loadedImages[0] || img;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setImages(loadedImages);
          setTimeout(() => {
            if (mounted) setIsLoading(false);
          }, 400);
        }
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Ambient sound synthesizer using Web Audio API
  useEffect(() => {
    if (soundEnabled) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Create warm analog ambient drone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note 55Hz deep sub

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110, ctx.currentTime); // A2 harmonic 110Hz

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 1.5);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        gainNodeRef.current = { gain, osc1, osc2, ctx };
      } catch (err) {
        console.log('Web Audio not supported or blocked:', err);
      }
    } else {
      if (gainNodeRef.current) {
        try {
          const { gain, osc1, osc2, ctx } = gainNodeRef.current;
          gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
          setTimeout(() => {
            osc1.stop();
            osc2.stop();
            gainNodeRef.current = null;
          }, 600);
        } catch (e) {
          gainNodeRef.current = null;
        }
      }
    }

    return () => {
      if (gainNodeRef.current) {
        try {
          gainNodeRef.current.osc1.stop();
          gainNodeRef.current.osc2.stop();
        } catch (e) {}
      }
    };
  }, [soundEnabled]);

  const loadingPercentage = (loadedCount / TOTAL_FRAMES) * 100;

  return (
    <div className="relative min-h-screen bg-[#050507] text-white selection:bg-white/20 selection:text-white">
      {/* Loading Screen Overlay */}
      {isLoading && (
        <LoadingScreen
          progress={loadingPercentage}
          total={TOTAL_FRAMES}
          loadedCount={loadedCount}
        />
      )}

      {/* Persistent Minimalist Luxury Navbar */}
      <Navbar
        onOpenExplore={() => setExploreModalOpen(true)}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Experience: HTML Canvas 300-Frame Scroll Sequence */}
      <main>
        {images.length > 0 && (
          <CanvasScrollSequence
            images={images}
            onLoaded={() => setIsLoading(false)}
          />
        )}

        {/* Section 4: Product Features */}
        <ProductFeatures
          onOpenExplore={() => setExploreModalOpen(true)}
        />

        {/* Sensory Soundstage & Live DSP Waveform Visualizer */}
        <InteractiveAudioExp
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
        />

        {/* Section 5: Technical Specifications (Editable Placeholders) */}
        <TechSpecs />

        {/* Section 6: Final Call to Action */}
        <FinalCTA
          onOpenExplore={() => setExploreModalOpen(true)}
        />
      </main>

      {/* Luxury Brand Footer */}
      <Footer />

      {/* Explore / Order Modal */}
      <ExploreModal
        isOpen={exploreModalOpen}
        onClose={() => setExploreModalOpen(false)}
      />
    </div>
  );
}
