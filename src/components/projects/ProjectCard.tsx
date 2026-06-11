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
    <article className="group relative block overflow-hidden border border-navy/[0.08] shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-card">
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
          src={project.thumbnail || project.image}
          alt={project.name}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/[0.88] via-deep/[0.3] to-transparent transition duration-500 group-hover:from-deep/[0.92]" />
        {project.priceFrom ? (
          <div className="absolute right-4 top-4">
            <Badge tone="gold">{t('projectCard.priceFrom')} {project.priceFrom}</Badge>
          </div>
        ) : null}
      </div>

      <div className="relative flex min-h-[400px] flex-col justify-end p-7">
        <div className="flex items-center gap-2">
          <Badge>{project.areaName}</Badge>
          <Badge tone="light">{t(`projectDetail.statusLabels.${project.status}`)}</Badge>
        </div>
        <div className="mt-5 h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
        <p className="mt-4 text-[11px] font-medium uppercase tracking-editorial text-gold">{t(`projectTypes.${project.type}`)}</p>
        <h3 className="mt-1 text-3xl text-white">{project.name}</h3>
        <p className="mt-2 text-sm leading-6 text-white/[0.72]">{localize(project.tagline, lang)}</p>
        {project.completionYear ? (
          <p className="mt-2 text-xs uppercase tracking-editorial text-white/[0.55]">
            {t('projectDetail.delivery')} · {project.completionYear}
          </p>
        ) : null}
        <Link
          to={`/projects/${project.id}`}
          className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-[#EDE3D6] hover:text-white"
        >
          <span className="link-underline">{t('projectCard.viewDetails')}</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
});

export default ProjectCard;
