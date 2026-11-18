import React from 'react';
import { ArrowUp, Headphones, Github, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030304] text-neutral-400 text-xs border-t border-white/10 pt-16 pb-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 text-white font-bold tracking-[0.25em] text-lg uppercase mb-4">
              <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center bg-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <span>SONIQ</span>
            </div>
            <p className="text-neutral-400 font-light leading-relaxed max-w-sm mb-6">
              Acoustic engineering elevated to fine art. Crafted with passion, mathematical precision, and zero compromise for audiophiles and creators worldwide.
            </p>
            <div className="flex items-center space-x-4 text-neutral-400">
              <a href="#hero" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white transition-colors">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#hero" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#hero" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white transition-colors">
                <Youtube className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Explore</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#hero" className="hover:text-white transition-colors">SONIQ Pro Overview</a></li>
              <li><a href="#technology" className="hover:text-white transition-colors">Titanium Drivers</a></li>
              <li><a href="#design" className="hover:text-white transition-colors">Acoustic Ergonomics</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Spatial Audio 360°</a></li>
              <li><a href="#specs" className="hover:text-white transition-colors">Technical Specs</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Support</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#hero" className="hover:text-white transition-colors">Order Status</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">SONIQ Care 2-Yr Warranty</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Firmware Updates</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Replacement Cushions</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">User Manual PDF</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-4">Company</h4>
            <ul className="space-y-2.5 font-light">
              <li><a href="#hero" className="hover:text-white transition-colors">Acoustic Lab</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Sustainability</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Press Inquiries</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#hero" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div className="text-neutral-500">
            © 2026 SONIQ Acoustics Inc. All rights reserved. Designed for pure sound.
          </div>

          <div className="flex items-center space-x-6">
            <a href="#hero" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#hero" className="hover:text-white transition-colors">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 text-neutral-300 hover:text-white transition-colors ml-4"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
