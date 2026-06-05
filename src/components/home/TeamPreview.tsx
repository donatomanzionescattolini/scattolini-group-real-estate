import { Link } from 'react-router-dom';
import { agents } from '../../data/agents';
import { useTranslation } from '../../i18n';
import AgentCard from '../team/AgentCard';
import SectionHeader from '../ui/SectionHeader';

export default function TeamPreview() {
  const { t } = useTranslation();

  return (
    <section className="bg-cream">
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

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents.slice(0, 8).map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
