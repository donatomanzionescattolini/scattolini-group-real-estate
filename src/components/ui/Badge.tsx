import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'gold' | 'navy' | 'light';
}

const toneStyles = {
  gold: 'border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.12)] text-gold',
  navy: 'border border-[rgba(15,27,45,0.15)] bg-[rgba(15,27,45,0.06)] text-navy',
  light: 'border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.12)] text-white',
};

export default function Badge({ children, tone = 'gold' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] font-semibold uppercase tracking-editorial ${toneStyles[tone]}`}>
      {children}
    </span>
  );
}
