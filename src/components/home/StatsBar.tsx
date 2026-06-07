import { useTranslation } from '../../i18n';

export default function StatsBar() {
  const { t } = useTranslation();

  const stats = [
    { value: '25+', label: t('stats.neighborhoods') },
    { value: '100+', label: t('stats.developments') },
    { value: '14', label: t('stats.expertAgents') },
    { value: '15+', label: t('stats.yearsOfExcellence') },
  ];

  return (
    <section className="relative z-10 -mt-10">
      <div className="site-container">
          <div className="grid gap-px overflow-hidden border border-[rgba(27,52,51,0.12)] bg-[rgba(27,52,51,0.12)] shadow-card md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[rgba(237,227,214,0.84)] px-6 py-8 text-center">
              <p className="font-serif text-4xl text-gold">{stat.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-editorial text-[rgba(27,52,51,0.68)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
