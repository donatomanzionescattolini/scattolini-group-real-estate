import { useMemo, useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import SectionHeader from '../components/ui/SectionHeader';
import { areas } from '../data/areas';
import { projects } from '../data/projects';

export default function ProjectsPage() {
  const [activeAreaId, setActiveAreaId] = useState('all');

  const areasWithProjects = useMemo(
    () => areas.filter((area) => projects.some((project) => project.areaId === area.id)),
    [],
  );

  const visibleProjects = useMemo(() => {
    const filtered = activeAreaId === 'all' ? projects : projects.filter((project) => project.areaId === activeAreaId);
    return [...filtered].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));
  }, [activeAreaId]);

  return (
    <div className="bg-cream">
      <section className="site-container py-20">
        <SectionHeader
          eyebrow="Developments"
          title="All Developments"
          description="Browse our complete portfolio of South Florida and Florida developments, from branded icons to boutique residential launches."
        />

        <div className="mt-12 rounded-none border border-[rgba(15,27,45,0.08)] bg-white p-6 shadow-soft sm:p-8">
          <ProjectFilter areas={areasWithProjects} activeAreaId={activeAreaId} onChange={setActiveAreaId} />
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-muted">
          <p>{visibleProjects.length} developments</p>
          <p>Curated for South Florida luxury buyers and investors</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
