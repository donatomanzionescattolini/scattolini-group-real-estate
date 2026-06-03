import AgentCard from '../components/team/AgentCard';
import SectionHeader from '../components/ui/SectionHeader';
import { agents } from '../data/agents';
import { useTranslation } from '../i18n';

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-cream">
      <section className="site-container py-20">
        <SectionHeader
          eyebrow={t('teamPage.eyebrow')}
          title={t('teamPage.title')}
          description={t('teamPage.description')}
          align="center"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
}
