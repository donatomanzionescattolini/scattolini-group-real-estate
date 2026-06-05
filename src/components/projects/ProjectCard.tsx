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
    <article className="group relative h-full overflow-hidden border border-[rgba(27,52,51,0.08)] shadow-soft">
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={project.thumbnail || project.image} alt={project.name} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,36,35,0.82)] via-[rgba(12,36,35,0.4)] to-transparent" />
      </div>

      <div className="relative flex min-h-[380px] flex-col p-7 text-cream">
        <div className="flex items-start justify-between gap-3">
          <Badge>{project.areaName}</Badge>
          <Badge tone="light">{t(`projectDetail.statusLabels.${project.status}`)}</Badge>
        </div>

        <div className="mt-auto">
          <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t(`projectTypes.${project.type}`)}</p>
          <h3 className="mt-3 text-3xl text-cream">{project.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[rgba(237,227,214,0.78)]">{localize(project.tagline, lang)}</p>

          <Link to={`/projects/${project.id}`} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-gold hover:text-cream">
            {t('projectCard.viewDetails')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
});

export default ProjectCard;
