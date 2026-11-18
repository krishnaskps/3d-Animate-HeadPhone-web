# SONIQ PRO — Sound. Redefined.
### Award-Winning Cinematic 3D Scroll Experience

A luxury, scroll-driven interactive product showcase for the **SONIQ PRO** wireless headphone, built with **React**, **HTML5 Canvas**, and **Tailwind CSS**.

Featuring 300 sequential frames from a 10-second cinematic product video mapped frame-by-frame to user scroll progress with zero video playback.

---

## ✨ Features & Architecture

### 1. 300-Frame HTML5 Canvas Animation Sequence
- **Zero Video Playback**: Fully scroll-bound image sequence animation driven via HTML5 Canvas.
- **Aspect Ratio Preservation**: Responsive containment (`object-fit: contain` algorithm) ensuring the headphone is never stretched, distorted, or cropped across all viewports (Mobile, Tablet, Desktop, Ultra-Wide).
- **Sub-pixel Smooth Lerping**: `requestAnimationFrame` interpolation provides Apple-grade momentum and smooth scroll transition across all 300 frames.
- **Intelligent Preloader & HUD**: Tracks real-time asset loading with a percentage counter and frame scrubber.

### 2. Full-Screen Cinematic Hero Section
- Deep obsidian black background (`#050507`) with ambient radial illumination.
- Large elegant headline: **"SOUND. REDEFINED."**
- Subtitle: *"Experience sound beyond imagination."*
- Minimalist luxury navigation bar with brand logo **SONIQ**, smooth navigation anchors, and interactive ambient sound synthesizer.
- Animated **"EXPLORE THE HEADPHONES"** scroll indicator.

### 3. Synchronized Storytelling Scroll Stages
As the user scrolls down, elegant glassmorphic text overlays appear and disappear with smooth vertical drift:
1. **Stage 1 (Phase 01 // Vision)**:
   - *Headline:* "DESIGNED TO INSPIRE"
   - *Description:* "Every curve. Every detail. Crafted for perfection."
2. **Stage 2 (Phase 02 // Architecture)**:
   - *Headline:* "PRECISION IN EVERY DETAIL"
   - *Description:* "Discover the engineering behind exceptional comfort."
3. **Stage 3 (Phase 03 // Ergonomics)**:
   - *Headline:* "BUILT FOR COMFORT"
   - *Description:* "Premium cushioning meets an ergonomic design."
4. **Stage 4 (Phase 04 // Acoustics)**:
   - *Headline:* "ENGINEERED TO PERFORM"
   - *Description:* "Precision craftsmanship. Seamless functionality."
5. **Stage 5 (Phase 05 // Climax)**:
   - *Headline:* "FEEL EVERY MOMENT"
   - *Description:* "A new dimension of listening awaits."

### 4. Interactive Product Features
Deep dive into 6 architectural pillars featuring extracted high-detail frame photography:
- **Premium Ear Cushions**: Acoustic memory foam and breathable protein leather.
- **Adjustable Headband**: Brushed aerospace aluminum band with micro-ratchet detents.
- **Precision-Engineered Hinges**: Zero-play zinc alloy pivot mechanism with 110° swivel.
- **Ergonomic Over-Ear Design**: Weight-balanced 285g architecture with 12° angled drivers.
- **Premium Materials & Finishing**: Diamond-cut chamfers and anti-smudge oleophobic satin coating.
- **Intuitive Controls & Connectivity**: Capacitive touch gesture panel and Bluetooth 5.4 multipoint.

### 5. Interactive Audio Experience & Real-Time Waveform Visualizer
Switch between live acoustic profiles with real-time DSP harmonic waveform rendering:
- **Spatial Audio 360°** (Dynamic Head Tracking)
- **Active Noise Cancellation** (48dB Anti-Phase Isolation)
- **Adaptive Transparency** (Natural Passthrough)
- **Lossless Hi-Res Audio** (4Hz–45kHz with Custom 40mm Titanium Drivers)

### 6. Technical Specifications (Editable Placeholders)
Includes stylish cards for all 6 required parameters with a live **"Edit Placeholders"** engine:
- **Connectivity**: `[Bluetooth 5.4 / Multipoint / 20ms Latency / 3.5mm Analog Bypass]`
- **Battery Life**: `[Up to 60 Hours (ANC Off) / Up to 45 Hours (ANC On)]`
- **Charging**: `[USB-C Fast Charge — 10 min for 6 hours / 100% in 75 min]`
- **Audio Technology**: `[Custom 40mm Titanium Drivers / 4Hz–45kHz / Dual DSP / Hybrid ANC]`
- **Weight**: `[285 grams / 10.05 oz (Balanced Mass Distribution)]`
- **Compatibility**: `[iOS, macOS, Android, Windows, Linux, PlayStation & Switch]`

*Note: You can click "Edit Placeholders" right on the page to customize any specification or reset to defaults at any time!*

### 7. Final Call-to-Action & Customization Modal
- Headline: **"YOUR WORLD. YOUR SOUND."**
- Subtitle: *"Discover a new way to experience audio."*
- Interactive **"EXPLORE NOW"** button opening the flagship allocation modal with finish selector (*Obsidian Matte Black*, *Stellar Silver*, *Midnight Navy*), custom laser engraving, and order confirmation.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher, tested on Node v24)
- npm

### 1. Start the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:3000
```

### 2. Build for Production
```bash
npm run build
```

### 3. Preview Production Build
```bash
npm run preview
```

---

## 📁 Directory Structure
```
3D_Animate_Headphone/
├── public/
│   └── frames/                     # 300 sequential extracted frames (001 to 300)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Minimalist luxury nav with ambient audio toggle
│   │   ├── LoadingScreen.jsx       # 0-100% calibration progress screen
│   │   ├── CanvasScrollSequence.jsx# Pinned HTML5 Canvas 300-frame scroll engine
│   │   ├── ProductFeatures.jsx     # 6 architectural pillars with frame photography
│   │   ├── InteractiveAudioExp.jsx # Live DSP visualizer & audio mode switcher
│   │   ├── TechSpecs.jsx           # 6 specs with live edit engine & benchmarks
│   │   ├── FinalCTA.jsx            # Climax showcase & call to action
│   │   ├── ExploreModal.jsx        # Finish selector & custom engraving checkout
│   │   └── Footer.jsx              # Luxury brand footer
│   ├── App.jsx                     # Preloader, audio synth, and state orchestrator
│   ├── index.css                   # Glassmorphism, animations, dark luxury theme
│   └── main.jsx                    # React 18 mount point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```
