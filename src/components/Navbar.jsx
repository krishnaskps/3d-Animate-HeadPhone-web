import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenExplore, soundEnabled, setSoundEnabled }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Technology', href: '#technology' },
    { label: 'Design', href: '#design' },
    { label: 'Experience', href: '#experience' },
    { label: 'Specs', href: '#specs' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-4 sm:px-8">
      <div
        className={`max-w-7xl mx-auto rounded-full transition-all duration-500 px-6 py-3 flex items-center justify-between ${
          scrolled
            ? 'glass-pill bg-black/60 shadow-2xl shadow-black/80 border-white/10'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          className="group flex items-center space-x-2 text-white font-semibold tracking-widest text-lg sm:text-xl uppercase transition-opacity"
        >
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center bg-white/5 group-hover:border-white transition-colors">
            <div className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
          </div>
          <span className="tracking-[0.25em] font-bold text-glow">SONIQ</span>
          <span className="text-[10px] tracking-normal px-1.5 py-0.5 rounded-full border border-white/20 text-neutral-400 font-mono">
            PRO
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-400">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-white transition-colors duration-200 tracking-wide hover:scale-105 transform"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Ambient Sound Mode Simulator */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
              soundEnabled
                ? 'border-white/40 bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'border-white/10 bg-white/5 text-neutral-500 hover:text-neutral-300'
            }`}
            title={soundEnabled ? 'Ambient Audio On' : 'Ambient Audio Muted'}
            aria-label="Toggle ambient sound"
          >
            {soundEnabled ? (
              <div className="flex items-center space-x-0.5">
                <span className="w-0.5 h-3 bg-white animate-pulse" />
                <span className="w-0.5 h-4 bg-white animate-pulse" style={{ animationDelay: '0.15s' }} />
                <span className="w-0.5 h-2 bg-white animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* CTA Button */}
          <button
            onClick={onOpenExplore}
            className="group relative inline-flex items-center space-x-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-black bg-white hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] active:scale-95"
          >
            <span className="tracking-wider uppercase font-semibold">Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-6 glass-panel rounded-2xl border border-white/10 bg-black/90 backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col space-y-4 text-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-neutral-300 hover:text-white text-base py-2 tracking-wider uppercase font-medium border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExplore();
              }}
              className="w-full mt-4 py-3 rounded-xl bg-white text-black font-semibold text-sm tracking-wider uppercase"
            >
              Explore Soniq Pro
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
