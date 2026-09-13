import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useApp } from '../../context/AppContext';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'panel' | 'subtle' | 'pill' | 'active';
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'panel',
  hoverEffect = false,
  ...props
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  let baseStyle = '';
  if (variant === 'panel') {
    baseStyle = isDark
      ? 'bg-[#0f1422]/75 backdrop-blur-2xl border border-white/[0.09] shadow-2xl shadow-black/40'
      : 'bg-white/80 backdrop-blur-2xl border border-black/[0.08] shadow-xl shadow-slate-300/30';
  } else if (variant === 'subtle') {
    baseStyle = isDark
      ? 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.06]'
      : 'bg-black/[0.03] backdrop-blur-xl border border-black/[0.05]';
  } else if (variant === 'pill') {
    baseStyle = isDark
      ? 'bg-white/[0.08] backdrop-blur-xl border border-white/[0.12]'
      : 'bg-black/[0.05] backdrop-blur-xl border border-black/[0.08]';
  } else if (variant === 'active') {
    baseStyle = isDark
      ? 'bg-cyan-500/20 backdrop-blur-2xl border border-cyan-400/40 text-cyan-300 shadow-lg shadow-cyan-500/20'
      : 'bg-cyan-600/15 backdrop-blur-2xl border border-cyan-600/30 text-cyan-700 shadow-md shadow-cyan-600/10';
  }

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -2, transition: { duration: 0.2 } } : undefined}
      whileTap={hoverEffect ? { scale: 0.98 } : undefined}
      className={`rounded-2xl relative overflow-hidden ${baseStyle} ${className}`}
      {...props}
    >
      {/* Specular highlight at top */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export const GlassButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit';
}> = ({
  children,
  onClick,
  className = '',
  variant = 'secondary',
  size = 'md',
  disabled = false,
  type = 'button'
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  let variantStyle = '';
  if (variant === 'primary') {
    variantStyle = 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 border border-cyan-300/30 hover:brightness-110';
  } else if (variant === 'secondary') {
    variantStyle = isDark
      ? 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-100 border border-white/[0.12] backdrop-blur-xl'
      : 'bg-black/[0.05] hover:bg-black/[0.09] text-slate-800 border border-black/[0.08] backdrop-blur-xl';
  } else if (variant === 'ghost') {
    variantStyle = isDark
      ? 'hover:bg-white/[0.08] text-slate-300 hover:text-white'
      : 'hover:bg-black/[0.05] text-slate-600 hover:text-black';
  } else if (variant === 'danger') {
    variantStyle = 'bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30';
  }

  const sizeStyle = size === 'sm' ? 'px-3 py-1.5 text-xs' : size === 'lg' ? 'px-6 py-3 text-base' : 'px-4 py-2 text-sm';

  return (
    <motion.button
      type={type}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap ${sizeStyle} ${variantStyle} ${className}`}
    >
      {children}
    </motion.button>
  );
};
