import { memo } from 'react';
import { Agent } from '../../data/types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = memo(function AgentCard({ agent }: AgentCardProps) {
  const initials = `${agent.firstName.charAt(0)}${agent.lastName.charAt(0)}`.toUpperCase();

  return (
    <article className="flex h-full flex-col items-start border border-[rgba(15,27,45,0.08)] bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card overflow-hidden">
      {/* Photo area */}
      <div className="relative w-full bg-cream" style={{ paddingBottom: '100%' }}>
        {agent.photo ? (
          <img
            src={agent.photo}
            alt={`${agent.firstName} ${agent.lastName}`}
            className="absolute inset-0 h-full w-full object-contain p-4 pb-0"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-cream">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold font-serif text-4xl text-navy">
              {initials}
            </div>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="flex flex-col p-6">
        <h3 className="text-3xl leading-none">
          {agent.firstName} <span className="block">{agent.lastName}</span>
        </h3>
        <p className="mt-3 text-sm uppercase tracking-editorial text-muted">{agent.role}</p>
        <a
          className="mt-6 text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold"
          href={`mailto:hello@scattolinigroup.com?subject=Inquiry for ${agent.firstName} ${agent.lastName}`}
        >
          Contact
        </a>
      </div>
    </article>
  );
});

export default AgentCard;
