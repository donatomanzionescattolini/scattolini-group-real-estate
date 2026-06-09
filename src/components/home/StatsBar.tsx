import { useRef } from 'react';
import { companyStats } from '../../data/stats';
import { useCountUp } from '../../hooks/useCountUp';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useTranslation } from '../../i18n';

function StatCell({ value, suffix, label, animate }: { value: number; suffix: string; label: string; animate: boolean }) {
  const count = useCountUp(value, { enabled: animate });

  return (
    <div className="bg-[rgba(12,36,35,0.78)] px-6 py-8 text-center">
      <p className="font-serif text-4xl text-gold tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-xs font-medium uppercase tracking-editorial text-[rgba(237,227,214,0.78)]">{label}</p>
    </div>
  );
}

export default function StatsBar() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const visible = useScrollReveal(ref);

  const stats = [
    { id: 'neighborhoods', value: companyStats.neighborhoods, suffix: '+', label: t('stats.neighborhoods') },
    { id: 'developments', value: companyStats.developments, suffix: '+', label: t('stats.developments') },
    { id: 'agents', value: companyStats.agents, suffix: '', label: t('stats.expertAgents') },
    { id: 'years', value: companyStats.yearsOfExcellence, suffix: '+', label: t('stats.yearsOfExcellence') },
  ];

  return (
    <section ref={ref} className="relative z-20 -mt-14 pb-4">
      <div className="site-container">
        <div
          className={`grid gap-px overflow-hidden rounded-2xl border border-[rgba(237,227,214,0.2)] bg-[rgba(237,227,214,0.12)] shadow-card backdrop-blur-sm transition duration-700 md:grid-cols-4 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {stats.map((stat) => (
            <StatCell
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              animate={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
