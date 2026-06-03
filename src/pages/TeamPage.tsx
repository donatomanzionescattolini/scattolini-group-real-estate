import AgentCard from '../components/team/AgentCard';
import SectionHeader from '../components/ui/SectionHeader';
import { agents } from '../data/agents';

export default function TeamPage() {
  return (
    <div className="bg-cream">
      <section className="site-container py-20">
        <SectionHeader
          eyebrow="Team"
          title="Meet Our Team"
          description="Scattolini Group is built on boutique service, cross-cultural fluency, and a collaborative office culture designed around relationships rather than volume."
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
