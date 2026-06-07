import AgentCard from '../components/team/AgentCard';
import SectionHeader from '../components/ui/SectionHeader';
import { agents } from '../data/agents';
import { useTranslation } from '../i18n';

const TEAM_HERO_BG = 'https://pagina-mama.s3.amazonaws.com/assets2/asociados/backgroundImage.jpg';

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-section-bg">
      {/* Hero banner */}
      <div
        className="w-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${TEAM_HERO_BG})`,
          height: '480px',
        }}
      />

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
