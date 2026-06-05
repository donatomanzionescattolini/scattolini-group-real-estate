import { Link } from 'react-router-dom';
import { agents } from '../../data/agents';
import { localize } from '../../data/localize';
import { useTranslation } from '../../i18n';
import SectionHeader from '../ui/SectionHeader';

export default function TeamPreview() {
  const { t, lang } = useTranslation();

  return (
    <section className="bg-white">
      <div className="site-container py-24">
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
              <div key={agent.id} className="border border-[rgba(237,227,214,0.12)] bg-navy shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card overflow-hidden">
                {/* Photo */}
                <div className="relative w-full bg-section-bg" style={{ paddingBottom: '100%' }}>
                  {agent.photo ? (
                    <img
                      src={agent.photo}
                      alt={`${agent.firstName} ${agent.lastName}`}
                      className="absolute inset-0 h-full w-full object-contain p-2"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold font-serif text-xl text-navy">{initials}</div>
                    </div>
                  )}
                </div>
                {/* Name */}
                <div className="p-4">
                  <h3 className="text-xl leading-none text-cream">
                    {agent.firstName}
                    <span className="block">{agent.lastName}</span>
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-editorial text-[rgba(237,227,214,0.7)]">{localize(agent.role, lang)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
