import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { localize } from '../../data/localize';
import { Project } from '../../data/types';
import { useTranslation } from '../../i18n';
import Badge from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  const { t, lang } = useTranslation();

  return (
    <article className="group relative block overflow-hidden border border-[rgba(27,52,51,0.08)] shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={project.thumbnail || project.image}
          alt={project.name}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,36,35,0.88)] via-[rgba(12,36,35,0.3)] to-transparent" />
      </div>

      <div className="relative flex min-h-[380px] flex-col justify-end p-7">
        <div className="flex items-center gap-2">
          <Badge>{project.areaName}</Badge>
          <Badge tone="light">{t(`projectDetail.statusLabels.${project.status}`)}</Badge>
        </div>
        <p className="mt-4 text-[11px] font-medium uppercase tracking-editorial text-gold">{t(`projectTypes.${project.type}`)}</p>
        <h3 className="mt-1 text-3xl text-white">{project.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[rgba(255,255,255,0.72)]">{localize(project.tagline, lang)}</p>
        <Link
          to={`/projects/${project.id}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-[#EDE3D6] hover:text-white"
        >
          {t('projectCard.viewDetails')} <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
});

export default ProjectCard;
