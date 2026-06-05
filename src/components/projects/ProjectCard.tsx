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
    <article className="group flex h-full flex-col overflow-hidden border border-[rgba(27,52,51,0.08)] bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative h-80 overflow-hidden">
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={project.thumbnail || project.image} alt={project.name} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,52,51,0.68)] via-transparent to-transparent" />
        <div className="absolute left-5 top-5">
          <Badge>{project.areaName}</Badge>
        </div>
        <div className="absolute right-5 top-5">
          <Badge tone="light">{t(`projectDetail.statusLabels.${project.status}`)}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="editorial-label">{t(`projectTypes.${project.type}`)}</p>
        <h3 className="mt-3 text-3xl">{project.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{localize(project.tagline, lang)}</p>

        {/*<div className="mt-5 flex items-center justify-between border-y border-[rgba(27,52,51,0.08)] py-4 text-sm text-muted">*/}
        {/*  <div>*/}
        {/*    <p className="text-[11px] uppercase tracking-editorial">Price from</p>*/}
        {/*    <p className="mt-1 text-base font-medium text-navy">{project.priceFrom}</p>*/}
        {/*  </div>*/}
        {/*  <div className="text-right">*/}
        {/*    <p className="text-[11px] uppercase tracking-editorial">Amenities</p>*/}
        {/*    <p className="mt-1 text-base font-medium text-navy">{project.amenities.length}</p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <Link to={`/projects/${project.id}`} className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold">
          {t('projectCard.viewDetails')}
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
});

export default ProjectCard;
