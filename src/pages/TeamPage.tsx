import AgentCard from '../components/team/AgentCard';
import SectionHeader from '../components/ui/SectionHeader';
import { agents } from '../data/agents';
import { useTranslation } from '../i18n';

const TEAM_GROUP_PHOTO = 'https://pagina-mama.s3.amazonaws.com/assets2/asociados/asociados2.png';

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-section-bg">
      {/* Group photo banner */}
      <div className="w-full bg-deep flex items-center justify-center">
        <img
          src={TEAM_GROUP_PHOTO}
          alt="Scattolini Group Team"
          className="w-full object-contain"
          style={{ maxHeight: '480px' }}
        />
      </div>

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
