import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Maximize2, 
  ShieldCheck, 
  Radio, 
  Cpu, 
  Sliders, 
  CheckCircle2, 
  Volume2,
  ChevronRight
} from 'lucide-react';

export default function ProductFeatures({ onOpenExplore }) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'cushions',
      title: 'Premium Ear Cushions',
      subtitle: 'Acoustic Memory Foam & Protein Leather',
      description:
        'Engineered with dual-density high resilience memory foam wrapped in ultra-soft breathable protein leather. Conforms gently to the anatomy of your ears for complete acoustic seal and fatigue-free listening across 12+ hour sessions.',
      image: '/frames/ezgif-frame-120.jpg',
      stat: '0.00%',
      statLabel: 'Acoustic Leakage',
      highlight: 'Dual-Layer Isolation',
      specs: [
        'Slow-rebound acoustic memory foam core',
        'Hypoallergenic micro-perforated leatherette',
        'Magnetic snap-on replaceable modular system',
        'Pressure-distributing elliptical cavity'
      ]
    },
    {
      id: 'headband',
      title: 'Adjustable Headband',
      subtitle: 'Brushed Aerospace Aluminum Architecture',
      description:
        'A continuous brushed aircraft-grade aluminum band with laser-etched micro-ratchet adjustment detents. Delivers calibrated clamping force that stays firmly balanced without generating focal vertex tension.',
      image: '/frames/ezgif-frame-200.jpg',
      stat: '18 Detents',
      statLabel: 'Micro-calibrated Fit',
      highlight: 'Aerospace Grade 6061',
      specs: [
        'Laser-engraved metric positioning guides',
        'Tension-relieving silicon inner bridge',
        'Torsion-tested up to 50,000 continuous flexes',
        'Seamless hidden slider rail integration'
      ]
    },
    {
      id: 'hinges',
      title: 'Precision-Engineered Hinges',
      subtitle: 'Zero-Tolerance Zinc Alloy Joint',
      description:
        'Precision cast and diamond-milled metal hinges enable smooth 110-degree inward rotation and flat folding. Every rotation delivers fluid, dampened mechanical resistance reminiscent of luxury timepiece bezels.',
      image: '/frames/ezgif-frame-180.jpg',
      stat: '110°',
      statLabel: 'Fluid Axis Swivel',
      highlight: 'Zero-Play Pivot',
      specs: [
        'Teflon-coated self-lubricating pivot bushings',
        'Silent friction-dampened motion curve',
        'Fold-flat profile for ultra-compact transit',
        'Corrosion-resistant satin anodized coating'
      ]
    },
    {
      id: 'ergonomics',
      title: 'Ergonomic Over-Ear Design',
      subtitle: 'Weight-Balanced 285g Form Factor',
      description:
        'Engineered after scanning thousands of distinct ear profiles to construct the ideal chamber geometry. Angled 12° drivers fire sound directly down the ear canal, minimizing phase distortion and elevating natural imaging.',
      image: '/frames/ezgif-frame-060.jpg',
      stat: '285g',
      statLabel: 'Featherlight Equilibrium',
      highlight: '12° Angled Soundstage',
      specs: [
        'Golden-ratio mass distribution across skull bridge',
        'Extra clearance prevents pinna cartilage friction',
        'Optimized for eyeglass wearers without seal degradation',
        'Passive air-venting acoustic pressure relief'
      ]
    },
    {
      id: 'materials',
      title: 'Premium Materials & Finishing',
      subtitle: 'Tactile Excellence at Every Touchpoint',
      description:
        'A stunning blend of blasted anodized aluminum, scratch-resistant matte polymers, and diamond-cut chamfered edges. Designed to resist fingerprint smudge while reflecting light with sublime understated sophistication.',
      image: '/frames/ezgif-frame-001.jpg',
      stat: '9H',
      statLabel: 'Surface Hardness',
      highlight: 'Anti-Smudge Oleophobic',
      specs: [
        'Diamond-cut high-sheen perimeter bevels',
        'Satin-matte scratch-resistant composite chassis',
        'Sustainably sourced recyclable aluminum alloy',
        'Precision laser-etched serial micro-detailing'
      ]
    },
    {
      id: 'controls',
      title: 'Intuitive Controls & Connectivity',
      subtitle: 'Capacitive Gesture Surface & Dynamic Crown',
      description:
        'Seamless interaction without opening your phone. Glide your finger on the touch-sensitive ear cup for volume, swipe for track skipping, or press the dedicated tactile metal button to toggle between active noise cancellation and spatial transparency.',
      image: '/frames/ezgif-frame-290.jpg',
      stat: 'Bluetooth 5.4',
      statLabel: 'Ultra-low 20ms Latency',
      highlight: 'Multipoint Quick-Pair',
      specs: [
        'Capacitive swipe-and-tap glass gesture panel',
        'Multi-point pairing to two devices simultaneously',
        'Wear detection automatically pauses on ear removal',
        'Lossless USB-C & 3.5mm analog direct bypass'
      ]
    }
  ];

  return (
    <section id="technology" className="relative py-28 sm:py-36 bg-[#050507] text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-4">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
              Engineering Masterpiece
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase text-white mb-6">
            EVERY DETAIL. <br />
            <span className="text-gradient-silver">OBSESSIVELY HONED.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            From aerospace metallurgy to custom memory-cushion polymers, each facet of SONIQ PRO has been engineered for uncompromising sonic fidelity and supreme all-day luxury.
          </p>
        </div>

        {/* Feature Interactive Showcase (Split Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          {/* Left Column: Feature Selector Buttons */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            {features.map((feat, idx) => {
              const isActive = activeFeature === idx;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(idx)}
                  className={`text-left p-5 sm:p-6 rounded-2xl transition-all duration-300 relative group overflow-hidden border ${
                    isActive
                      ? 'glass-pill bg-white/[0.08] border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Active highlight bar */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white rounded-r-full shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono tracking-wider text-neutral-500 uppercase">
                      0{idx + 1} // {feat.highlight}
                    </span>
                    <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-full border ${
                      isActive ? 'border-white/30 text-white bg-white/10' : 'border-white/10 text-neutral-500'
                    }`}>
                      {feat.stat}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold uppercase tracking-tight transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                  }`}>
                    {feat.title}
                  </h3>

                  <p className="text-xs text-neutral-500 line-clamp-1 mt-1 font-light">
                    {feat.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Hero Spotlight of the Active Feature */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-10 border border-white/15 relative overflow-hidden group">
              {/* Image Container with Cinematic Frame from sequence */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-black/60 mb-8 border border-white/10 shadow-2xl">
                <img
                  src={features[activeFeature].image}
                  alt={features[activeFeature].title}
                  className="w-full h-full object-contain transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 glass-pill px-3 py-1 text-xs font-mono text-neutral-300">
                  REAL FRAME CINEMATIC CAPTURE
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-mono">
                  <div>
                    <div className="text-neutral-400">BENCHMARK</div>
                    <div className="text-white text-base font-bold">{features[activeFeature].stat}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-neutral-400">MEASUREMENT</div>
                    <div className="text-neutral-200">{features[activeFeature].statLabel}</div>
                  </div>
                </div>
              </div>

              {/* Title & Detailed Breakdown */}
              <div>
                <h4 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-2">
                  {features[activeFeature].title}
                </h4>
                <div className="text-sm text-neutral-400 font-mono mb-4">
                  {features[activeFeature].subtitle}
                </div>
                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-6">
                  {features[activeFeature].description}
                </p>

                {/* Specifications Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10">
                  {features[activeFeature].specs.map((spec, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-neutral-300 font-light">
                      <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6-Card Overview Grid */}
        <div id="design" className="mt-24 pt-16 border-t border-white/10">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
              The 6 Pillars of Soniq Architecture
            </h3>
            <p className="text-sm text-neutral-400 mt-2">
              Every millimeter calculated for acoustic transparency and structural endurance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveFeature(idx)}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black/50 mb-4 border border-white/10">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 glass-pill text-[10px] px-2 py-0.5 font-mono text-neutral-300">
                      #{idx + 1}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold uppercase text-white mb-1 group-hover:text-glow transition-all">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="text-white font-semibold">{item.stat}</span>
                  <span className="group-hover:translate-x-1 transition-transform inline-flex items-center text-neutral-300">
                    Inspect <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
