import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ThemePreset } from '../../types';
import {
  X,
  Palette,
  Sparkles,
  Sliders,
  Check,
  Sun,
  Moon,
  Droplets,
  Layers
} from 'lucide-react';

export const ThemeCustomizerModal: React.FC = () => {
  const {
    isThemeModalOpen,
    setIsThemeModalOpen,
    customTheme,
    setCustomTheme,
    setThemePreset,
    setThemeAccent,
    theme,
    toggleTheme,
    showToast
  } = useApp();

  const isDark = theme === 'dark';
  if (!isThemeModalOpen) return null;

  const presets: {
    id: ThemePreset;
    name: string;
    description: string;
    mode: 'dark' | 'light';
    color: string;
    bgPreview: string;
  }[] = [
    {
      id: 'obsidian',
      name: 'Liquid Obsidian',
      description: 'Midnight void with cyan specular refraction',
      mode: 'dark',
      color: '#06b6d4',
      bgPreview: 'from-[#0b0e17] via-[#0f1422] to-cyan-950'
    },
    {
      id: 'pearl',
      name: 'Pearl Crystal',
      description: 'Pristine frosted white glass with azure tint',
      mode: 'light',
      color: '#0284c7',
      bgPreview: 'from-slate-100 via-sky-50 to-white'
    },
    {
      id: 'emerald',
      name: 'Emerald Moss',
      description: 'Forest deep glass with mint luminescence',
      mode: 'dark',
      color: '#10b981',
      bgPreview: 'from-[#06140f] via-[#0a1f18] to-emerald-950'
    },
    {
      id: 'amethyst',
      name: 'Amethyst Aurora',
      description: 'Ultraviolet twilight with magenta glass shimmer',
      mode: 'dark',
      color: '#c084fc',
      bgPreview: 'from-[#110a1f] via-[#1a0f30] to-purple-950'
    },
    {
      id: 'sunset',
      name: 'Sunset Amber',
      description: 'Warm dusk with glowing coral reflection',
      mode: 'dark',
      color: '#f97316',
      bgPreview: 'from-[#190c0b] via-[#241311] to-orange-950'
    },
    {
      id: 'cyber',
      name: 'Titanium Monochrome',
      description: 'Pure aerospace grayscale liquid glass',
      mode: 'dark',
      color: '#94a3b8',
      bgPreview: 'from-[#111317] via-[#181c22] to-slate-900'
    }
  ];

  const accentColors = [
    { color: '#06b6d4', name: 'Electric Cyan' },
    { color: '#38bdf8', name: 'Sky Azure' },
    { color: '#10b981', name: 'Vivid Mint' },
    { color: '#22c55e', name: 'Neo Green' },
    { color: '#c084fc', name: 'Amethyst' },
    { color: '#ec4899', name: 'Neon Rose' },
    { color: '#f97316', name: 'Solar Amber' },
    { color: '#eab308', name: 'Pure Gold' },
    { color: '#94a3b8', name: 'Titanium' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-3 sm:p-4 overflow-y-auto">
        <div className="absolute inset-0" onClick={() => setIsThemeModalOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className={`relative z-10 w-full max-w-lg rounded-3xl p-5 sm:p-6 shadow-2xl border transition-all ${
            isDark
              ? 'bg-[#0f1422]/95 border-white/10 text-white shadow-black/90'
              : 'bg-white/95 border-black/10 text-slate-900 shadow-slate-300'
          }`}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: customTheme.accentColor }}
              >
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight">Liquid Glass Theme Studio</h2>
                <p className="text-[11px] text-slate-400">Custom refraction, presets, and specular styling</p>
              </div>
            </div>

            <button
              onClick={() => setIsThemeModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 my-4 max-h-[70vh] overflow-y-auto no-scrollbar pr-1">
            {/* Live Refraction Swatch Preview */}
            <div
              className={`relative p-3.5 rounded-2xl overflow-hidden border transition-all duration-300 ${
                isDark ? 'border-white/15' : 'border-black/10'
              }`}
              style={{
                background: isDark
                  ? `rgba(15, 20, 34, ${customTheme.glassOpacity})`
                  : `rgba(255, 255, 255, ${customTheme.glassOpacity})`,
                backdropFilter: `blur(${customTheme.glassBlur}px) saturate(190%)`,
                boxShadow: `0 12px 28px -10px ${customTheme.accentColor}35, inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)`
              }}
            >
              {/* Specular sheen line */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full animate-ping"
                    style={{ backgroundColor: customTheme.accentColor }}
                  />
                  <span className="text-xs font-bold font-['Syne'] tracking-wide">
                    youtin liquid preview
                  </span>
                </div>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${customTheme.accentColor}25`,
                    color: customTheme.accentColor,
                    border: `1px solid ${customTheme.accentColor}50`
                  }}
                >
                  {customTheme.accentName}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Refraction intensity: {customTheme.glassBlur}px blur • Opacity: {Math.round(customTheme.glassOpacity * 100)}%
              </p>
            </div>

            {/* Presets Grid */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Select Master Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map(preset => {
                  const isSelected = customTheme.preset === preset.id;

                  return (
                    <div
                      key={preset.id}
                      onClick={() => {
                        setThemePreset(preset.id);
                        showToast(`Theme preset set to ${preset.name}`, 'info');
                      }}
                      className={`p-2.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-cyan-400 bg-white/[0.08] shadow-md'
                          : 'border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-3.5 h-3.5 rounded-full"
                            style={{ backgroundColor: preset.color }}
                          />
                          <span className="font-bold text-xs">{preset.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{preset.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Accent Color Palette */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Custom Accent Tint
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {accentColors.map(ac => {
                  const isSelected = customTheme.accentColor === ac.color;
                  return (
                    <button
                      key={ac.color}
                      onClick={() => setThemeAccent(ac.color, ac.name)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                        isSelected ? 'ring-2 ring-white scale-110 shadow-lg' : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: ac.color }}
                      title={ac.name}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Glass Physics Sliders */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Glass Blur Density
                </span>
                <span className="font-mono text-cyan-300 font-bold">{customTheme.glassBlur}px</span>
              </div>
              <input
                type="range"
                min="16"
                max="40"
                step="2"
                value={customTheme.glassBlur}
                onChange={e =>
                  setCustomTheme(prev => ({ ...prev, glassBlur: Number(e.target.value) }))
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" /> Translucency Alpha
                </span>
                <span className="font-mono text-cyan-300 font-bold">
                  {Math.round(customTheme.glassOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={customTheme.glassOpacity}
                onChange={e =>
                  setCustomTheme(prev => ({ ...prev, glassOpacity: Number(e.target.value) }))
                }
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Base Light / Dark toggle */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Base Lighting Mode</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold cursor-pointer"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{isDark ? 'Obsidian Base' : 'Pearl Base'}</span>
              </button>
            </div>
          </div>

          {/* Footer Done button */}
          <div className="pt-3 border-t border-white/[0.08] flex justify-end">
            <button
              onClick={() => {
                setIsThemeModalOpen(false);
                showToast('Liquid glass theme applied', 'success');
              }}
              className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
            >
              Done & Save
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
