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
    <article className="group relative block overflow-hidden border border-[rgba(27,52,51,0.08)] shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="absolute inset-0">
        {agent.photo ? (
          <img
            src={agent.photo}
            alt={`${agent.firstName} ${agent.lastName}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-full w-full bg-navy flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gold font-serif text-4xl text-navy">
              {initials}
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,36,35,0.88)] via-[rgba(12,36,35,0.2)] to-transparent" />
      </div>

      <div className="relative flex min-h-[380px] flex-col justify-end p-7">
        <h3 className="text-3xl text-amber-100 leading-none">
          {agent.firstName} <span className="block">{agent.lastName}</span>
        </h3>
        <p className="mt-2 text-sm uppercase tracking-editorial text-[rgba(255,255,255,0.78)]">{localize(agent.role, lang)}</p>
        <a
          className="mt-5 text-xs font-semibold uppercase tracking-editorial text-gold hover:text-amber-100"
          href={`mailto:hello@scattolinigroup.com?subject=Inquiry for ${agent.firstName} ${agent.lastName}`}
        >
          {t('agentCard.contact')}
        </a>
      </div>
    </article>
  );
});

export default AgentCard;
