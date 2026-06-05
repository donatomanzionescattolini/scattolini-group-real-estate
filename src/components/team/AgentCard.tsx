import { memo } from 'react';
import { localize } from '../../data/localize';
import { Agent } from '../../data/types';
import { useTranslation } from '../../i18n';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = memo(function AgentCard({ agent }: AgentCardProps) {
  const { t, lang } = useTranslation();
  const initials = `${agent.firstName.charAt(0)}${agent.lastName.charAt(0)}`.toUpperCase();

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[rgba(27,52,51,0.08)] bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      {/* Square photo */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '100%' }}>
        {agent.photo ? (
          <img
            src={agent.photo}
            alt={`${agent.firstName} ${agent.lastName}`}
            className="absolute inset-0 h-full w-full object-contain bg-sand"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-sand">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold font-serif text-3xl text-navy">
              {initials}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-6">
        <p className="editorial-label">{localize(agent.role, lang)}</p>
        <h3 className="mt-3 text-3xl leading-none">
          {agent.firstName} <span className="block">{agent.lastName}</span>
        </h3>
        <a
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold"
          href={`mailto:hello@scattolinigroup.com?subject=Inquiry for ${agent.firstName} ${agent.lastName}`}
        >
          {t('agentCard.contact')}
        </a>
      </div>
    </article>
  );
});

export default AgentCard;
