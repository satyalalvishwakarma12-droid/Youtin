import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, CheckCircle2, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none max-w-[90vw] sm:max-w-md w-full">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 450, damping: 30 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium shadow-2xl backdrop-blur-2xl border ${
              toast.type === 'privacy'
                ? isDark
                  ? 'bg-[#0f1d2e]/90 border-cyan-500/30 text-cyan-200 shadow-cyan-950/50'
                  : 'bg-cyan-50/95 border-cyan-300 text-cyan-900 shadow-cyan-200/40'
                : toast.type === 'success'
                ? isDark
                  ? 'bg-[#102419]/90 border-emerald-500/30 text-emerald-200 shadow-emerald-950/50'
                  : 'bg-emerald-50/95 border-emerald-300 text-emerald-900 shadow-emerald-200/40'
                : isDark
                ? 'bg-[#151a29]/90 border-white/10 text-slate-200 shadow-black/60'
                : 'bg-white/95 border-black/10 text-slate-800 shadow-slate-400/30'
            }`}
          >
            {toast.type === 'privacy' ? (
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
