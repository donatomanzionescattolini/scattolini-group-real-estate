import { Link } from 'react-router-dom';
import { agents } from '../../data/agents';
import { useTranslation } from '../../i18n';
import SectionHeader from '../ui/SectionHeader';

export default function TeamPreview() {
  const { t } = useTranslation();

  return (
    <section className="site-container py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow={t('teamPreview.eyebrow')}
          title={t('teamPreview.title')}
          description={t('teamPreview.description')}
        />
        <Link to="/team" className="text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold">
          {t('teamPreview.meetAll')}
        </Link>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {agents.slice(0, 10).map((agent) => {
          const initials = `${agent.firstName.charAt(0)}${agent.lastName.charAt(0)}`.toUpperCase();
          return (
            <div key={agent.id} className="border border-[rgba(15,27,45,0.08)] bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold font-serif text-xl text-navy">{initials}</div>
              <h3 className="mt-5 text-2xl leading-none">
                {agent.firstName}
                <span className="block">{agent.lastName}</span>
              </h3>
              <p className="mt-2 text-xs uppercase tracking-editorial text-muted">{agent.role}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
