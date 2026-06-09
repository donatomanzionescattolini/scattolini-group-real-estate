import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import { useTranslation } from '../../i18n';
import ProjectCard from '../projects/ProjectCard';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeader from '../ui/SectionHeader';

export default function FeaturedProjects() {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <div className="site-container py-24">
        <ScrollReveal>
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
        </ScrollReveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.slice(0, 6).map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 80}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
