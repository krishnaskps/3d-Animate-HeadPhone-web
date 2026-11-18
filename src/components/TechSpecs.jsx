import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  Zap, 
  Cpu, 
  Scale, 
  Smartphone, 
  Edit3, 
  Check, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

const DEFAULT_SPECS = [
  {
    id: 'connectivity',
    title: 'Connectivity',
    value: '[Bluetooth 5.4 / Multipoint / 20ms Latency / 3.5mm Analog Bypass]',
    details: 'Supports simultaneous pairing with 2 devices. Range up to 30m / 100ft.',
    icon: Wifi,
    category: 'Wireless & I/O'
  },
  {
    id: 'battery',
    title: 'Battery Life',
    value: '[Up to 60 Hours (ANC Off) / Up to 45 Hours (ANC On)]',
    details: 'High-density 850mAh lithium-polymer acoustic energy cell.',
    icon: Battery,
    category: 'Power Management'
  },
  {
    id: 'charging',
    title: 'Charging',
    value: '[USB-C Fast Charge — 10 min charge for 6 hours playtime / 100% in 75 min]',
    details: 'Intelligent thermal regulation preserves battery health cycle over years.',
    icon: Zap,
    category: 'Rapid Charge'
  },
  {
    id: 'audio_tech',
    title: 'Audio Technology',
    value: '[Custom 40mm Titanium Drivers / 4Hz–45kHz / Dual DSP Engine / Hybrid ANC]',
    details: 'Acoustic impedance: 32 Ohms, THD < 0.05% at 1kHz 100dB SPL.',
    icon: Cpu,
    category: 'Transducers & DSP'
  },
  {
    id: 'weight',
    title: 'Weight',
    value: '[285 grams / 10.05 oz (Balanced Mass Distribution)]',
    details: 'Lightweight aerospace alloy skeleton engineered for zero-pinch comfort.',
    icon: Scale,
    category: 'Physical Dimensions'
  },
  {
    id: 'compatibility',
    title: 'Compatibility',
    value: '[iOS, macOS, Android, Windows, Linux, PlayStation & Nintendo Switch]',
    details: 'Universal AAC, SBC, LDAC, and aptX Adaptive codec support.',
    icon: Smartphone,
    category: 'Ecosystem Support'
  }
];

export default function TechSpecs() {
  const [specs, setSpecs] = useState(() => {
    const saved = localStorage.getItem('soniq_specs_custom');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_SPECS;
      }
    }
    return DEFAULT_SPECS;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempSpecs, setTempSpecs] = useState(specs);
  const [saveToast, setSaveToast] = useState(false);

  useEffect(() => {
    setTempSpecs(specs);
  }, [specs]);

  const handleFieldChange = (id, field, value) => {
    setTempSpecs(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = () => {
    setSpecs(tempSpecs);
    localStorage.setItem('soniq_specs_custom', JSON.stringify(tempSpecs));
    setIsEditing(false);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleReset = () => {
    setSpecs(DEFAULT_SPECS);
    setTempSpecs(DEFAULT_SPECS);
    localStorage.removeItem('soniq_specs_custom');
    setIsEditing(false);
  };

  return (
    <section id="specs" className="relative py-28 sm:py-36 bg-[#050507] text-white overflow-hidden border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        {/* Header and Edit Action Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-mono">
                System Calibration
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight uppercase text-white mb-4">
              TECHNICAL <br />
              <span className="text-gradient-silver">SPECIFICATIONS.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light flex items-center space-x-2">
              <Info className="w-4 h-4 text-neutral-500 shrink-0" />
              <span>
                All 6 required specifications are configured below as editable placeholders. Click "Edit Placeholders" to modify anytime.
              </span>
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center space-x-3 shrink-0">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Specifications</span>
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full border border-white/15 bg-white/5 text-neutral-300 font-medium text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Default</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 text-white font-medium text-xs uppercase tracking-wider transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Placeholders</span>
              </button>
            )}
          </div>
        </div>

        {/* Save confirmation toast */}
        {saveToast && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center space-x-2 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Specifications updated and persisted successfully!</span>
          </div>
        )}

        {/* Specifications 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isEditing ? tempSpecs : specs).map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`glass-card rounded-2xl p-6 sm:p-8 border transition-all duration-300 relative ${
                  isEditing
                    ? 'border-white/30 bg-white/[0.04]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-white">
                      <Icon className="w-5 h-5 text-neutral-200" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  {isEditing && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/10 border border-yellow-400/30 text-yellow-300">
                      EDITING
                    </span>
                  )}
                </div>

                {/* Primary Spec Value */}
                {isEditing ? (
                  <div className="space-y-3 mt-4">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 block mb-1">
                        SPECIFICATION PLACEHOLDER VALUE
                      </label>
                      <textarea
                        rows={2}
                        value={item.value}
                        onChange={(e) => handleFieldChange(item.id, 'value', e.target.value)}
                        className="w-full text-xs font-mono bg-black/60 border border-white/20 rounded-lg p-2.5 text-white focus:outline-none focus:border-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 block mb-1">
                        TECHNICAL NOTE / DETAIL
                      </label>
                      <input
                        type="text"
                        value={item.details}
                        onChange={(e) => handleFieldChange(item.id, 'details', e.target.value)}
                        className="w-full text-xs font-mono bg-black/60 border border-white/20 rounded-lg p-2 text-neutral-300 focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-4">
                    <div className="text-sm sm:text-base font-semibold text-white tracking-wide font-mono mb-2 text-glow">
                      {item.value}
                    </div>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cinematic Benchmark Comparison Table */}
        <div className="mt-16 glass-card rounded-3xl p-6 sm:p-10 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-tight text-white">
                Laboratory Audio Calibration Benchmarks
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Measured in anechoic acoustic test chamber at 1 kHz reference tone
              </p>
            </div>
            <div className="flex items-center space-x-2 font-mono text-xs text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>TEST PASSED 100%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">0.05%</div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase">Total Harmonic Distortion</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">4Hz - 45kHz</div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase">Frequency Range</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">-48 dB</div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase">Peak ANC Attenuation</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">20 ms</div>
              <div className="text-[11px] font-mono text-neutral-400 uppercase">Low-Latency Mode</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
