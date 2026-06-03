import { Agent } from '../../data/types';

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  const initials = `${agent.firstName.charAt(0)}${agent.lastName.charAt(0)}`.toUpperCase();

  return (
    <article className="flex h-full flex-col items-start border border-[rgba(15,27,45,0.08)] bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold font-serif text-2xl text-navy">{initials}</div>
      <h3 className="mt-6 text-3xl leading-none">
        {agent.firstName} <span className="block">{agent.lastName}</span>
      </h3>
      <p className="mt-3 text-sm uppercase tracking-editorial text-muted">{agent.role}</p>
      <a className="mt-6 text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold" href={`mailto:hello@scattolinigroup.com?subject=Inquiry for ${agent.firstName} ${agent.lastName}`}>
        Contact
      </a>
    </article>
  );
}
