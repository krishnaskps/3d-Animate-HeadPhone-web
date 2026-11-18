import React, { useState } from 'react';
import { X, Check, Shield, Truck, Sparkles, ShoppingBag } from 'lucide-react';

export default function ExploreModal({ isOpen, onClose }) {
  const [selectedColor, setSelectedColor] = useState('obsidian');
  const [ordered, setOrdered] = useState(false);
  const [engraving, setEngraving] = useState('');

  if (!isOpen) return null;

  const colorways = [
    { id: 'obsidian', name: 'Obsidian Matte Black', hex: '#111113', frame: '/frames/ezgif-frame-300.jpg' },
    { id: 'silver', name: 'Stellar Aerospace Silver', hex: '#d4d4d8', frame: '/frames/ezgif-frame-200.jpg' },
    { id: 'navy', name: 'Midnight Deep Navy', hex: '#1e293b', frame: '/frames/ezgif-frame-060.jpg' },
  ];

  const activeColorway = colorways.find(c => c.id === selectedColor);

  const handleOrder = (e) => {
    e.preventDefault();
    setOrdered(true);
    setTimeout(() => {
      setOrdered(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl border border-white/20 bg-[#09090c] p-6 sm:p-10 text-white shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/15 transition-colors text-neutral-400 hover:text-white"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {ordered ? (
          <div className="py-16 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full border border-emerald-400/30 bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white mb-3">
              YOUR SOUND IS RESERVED.
            </h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
              Welcome to the SONIQ circle. Your allocation for <strong className="text-white">{activeColorway.name}</strong> has been confirmed with priority courier dispatch.
            </p>
            <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
              ORDER REF: #SNQ-{Math.floor(100000 + Math.random() * 900000)}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Product Visual */}
            <div className="md:col-span-6 text-center">
              <div className="relative aspect-square w-full rounded-2xl bg-black/60 border border-white/10 overflow-hidden mb-4 p-4 flex items-center justify-center">
                <img
                  src={activeColorway.frame}
                  alt={activeColorway.name}
                  className="w-full h-full object-contain transform transition-all duration-500"
                />
                <div className="absolute top-3 left-3 glass-pill px-3 py-0.5 text-[10px] font-mono text-neutral-300">
                  FLAGSHIP 2026 EDITION
                </div>
              </div>
              <div className="text-xs font-mono text-neutral-500">
                INCLUDES: HARD TRANSIT CASE • BRAIDED 3.5MM CABLE • FAST USB-C CABLE
              </div>
            </div>

            {/* Right Column: Customization & Checkout */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono text-neutral-400 mb-3">
                  <Sparkles className="w-3 h-3 text-white" />
                  <span>LIMITED FIRST ALLOCATION</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mb-2">
                  SONIQ PRO WIRELESS
                </h3>
                <p className="text-neutral-400 text-xs font-light mb-6">
                  Experience sound redefined with 40mm titanium transducers, 60-hour battery stamina, and 48dB active noise cancellation.
                </p>

                {/* Color Selector */}
                <div className="mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 flex justify-between">
                    <span>FINISH</span>
                    <span className="text-white font-medium">{activeColorway.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {colorways.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColor(c.id)}
                        className={`w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor === c.id
                            ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                            : 'border-white/20 opacity-60 hover:opacity-100'
                        }`}
                        title={c.name}
                      >
                        <div
                          className="w-full h-full rounded-full border border-white/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Laser Engraving */}
                <div className="mb-6">
                  <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                    COMPLIMENTARY LASER ENGRAVING (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    maxLength={14}
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value.toUpperCase())}
                    placeholder="E.G. YOUR INITIALS"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-white uppercase"
                  />
                </div>

                {/* Price Display */}
                <div className="flex items-baseline space-x-3 mb-6 pt-4 border-t border-white/10">
                  <span className="text-3xl font-bold font-mono text-white">$449</span>
                  <span className="text-xs font-mono text-neutral-500 line-through">$529</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                    SPECIAL LAUNCH ALLOCATION
                  </span>
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={handleOrder}
                className="w-full py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>CONFIRM ALLOCATION • $449</span>
              </button>

              <div className="mt-4 flex items-center justify-center space-x-4 text-[10px] font-mono text-neutral-500">
                <span className="flex items-center space-x-1">
                  <Truck className="w-3 h-3" />
                  <span>Free Express</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Shield className="w-3 h-3" />
                  <span>2-Yr Warranty</span>
                </span>
                <span>•</span>
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
