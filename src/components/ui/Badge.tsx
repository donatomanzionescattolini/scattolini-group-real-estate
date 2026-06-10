import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'gold' | 'navy' | 'light';
}

const toneStyles = {
  gold: 'border border-gold/[0.35] bg-gold/[0.12] text-gold',
  navy: 'border border-navy/[0.15] bg-navy/[0.06] text-navy',
  light: 'border border-white/[0.28] bg-white/[0.12] text-amber-100',
};

export default function Badge({ children, tone = 'gold' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-editorial ${toneStyles[tone]}`}>
      {children}
    </span>
  );
}
