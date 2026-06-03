import { Link } from 'react-router-dom';
import { featuredProjects } from '../../data/projects';
import ProjectCard from '../projects/ProjectCard';
import SectionHeader from '../ui/SectionHeader';

export default function FeaturedProjects() {
  return (
    <section className="site-container py-24">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeader
          eyebrow="Featured Collection"
          title="Our Featured Projects"
          description="A curated edit of South Florida addresses defining the next chapter of luxury living — from branded riverfront icons to ultra-private beachfront towers."
        />
        <Link to="/projects" className="text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold">
          View all developments
        </Link>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {featuredProjects.slice(0, 6).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
