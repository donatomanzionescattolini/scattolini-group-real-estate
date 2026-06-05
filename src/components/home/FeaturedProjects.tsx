import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { useTranslation } from '../../i18n';
import ProjectCard from '../projects/ProjectCard';
import SectionHeader from '../ui/SectionHeader';

export default function FeaturedProjects() {
  const { t } = useTranslation();

  return (
    <section className="bg-cream">
      <div className="site-container py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={t('featuredProjects.eyebrow')}
            title={t('featuredProjects.title')}
            description={t('featuredProjects.description')}
          />
          <Link to="/projects" className="text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold">
            {t('featuredProjects.viewAll')}
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.slice(0, 6).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
