import { ArrowRight, CalendarDays, Layers3, Sparkles } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import Badge from '../components/ui/Badge';
import InquiryForm from '../components/ui/InquiryForm';
import { projects } from '../data/projects';

const statusLabel = {
  'pre-construction': 'Pre-Construction',
  'under-construction': 'Under Construction',
  completed: 'Completed',
} as const;

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((entry) => entry.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = projects.filter((entry) => entry.areaId === project.areaId && entry.id !== project.id).slice(0, 3);

  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-navy">
        <img src={project.image} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,27,45,0.36),rgba(15,27,45,0.82))]" />
        <div className="site-container relative z-10 py-24 sm:py-32">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.72)]">
              <Link to="/" className="hover:text-gold">Home</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-gold">Projects</Link>
              <span>/</span>
              <Link to={`/areas/${project.areaId}`} className="hover:text-gold">{project.areaName}</Link>
              <span>/</span>
              <span className="text-gold">{project.name}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge tone="light">{project.areaName}</Badge>
              <Badge tone="light">{statusLabel[project.status]}</Badge>
            </div>
            <h1 className="mt-6 text-5xl text-white sm:text-6xl">{project.name}</h1>
            <p className="mt-4 text-lg leading-8 text-[rgba(255,255,255,0.78)]">{project.tagline}</p>
          </div>
        </div>
      </section>

      <section className="site-container py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="panel-surface p-5">
                <CalendarDays className="text-gold" size={18} />
                <p className="mt-4 text-xs uppercase tracking-editorial text-muted">Delivery</p>
                <p className="mt-2 text-2xl text-navy">{project.completionYear}</p>
              </div>
              <div className="panel-surface p-5">
                <Layers3 className="text-gold" size={18} />
                <p className="mt-4 text-xs uppercase tracking-editorial text-muted">Scale</p>
                <p className="mt-2 text-2xl text-navy">{project.units}</p>
              </div>
              <div className="panel-surface p-5">
                <Sparkles className="text-gold" size={18} />
                <p className="mt-4 text-xs uppercase tracking-editorial text-muted">Price From</p>
                <p className="mt-2 text-2xl text-navy">{project.priceFrom}</p>
              </div>
            </div>

            <div className="mt-12">
              <p className="editorial-label">Overview</p>
              <h2 className="mt-4 text-4xl">A closer look at {project.name}</h2>
              <p className="mt-6 max-w-4xl text-base leading-8 text-muted">{project.description}</p>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <p className="editorial-label">Amenities</p>
                <ul className="mt-6 space-y-4">
                  {project.amenities.map((amenity) => (
                    <li key={amenity} className="border-b border-[rgba(15,27,45,0.08)] pb-4 text-sm text-charcoal">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="editorial-label">Residence Features</p>
                <ul className="mt-6 space-y-4">
                  {project.features.map((feature) => (
                    <li key={feature} className="border-b border-[rgba(15,27,45,0.08)] pb-4 text-sm text-charcoal">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="panel-surface p-8">
              <p className="editorial-label">Contact About This Property</p>
              <h3 className="mt-4 text-3xl">Request a private presentation</h3>
              <div className="mt-6 space-y-4 border-y border-[rgba(15,27,45,0.08)] py-6 text-sm text-muted">
                <div className="flex items-center justify-between">
                  <span>Market</span>
                  <span className="font-medium text-navy">{project.areaName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <span className="font-medium text-navy">{statusLabel[project.status]}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Price</span>
                  <span className="font-medium text-navy">{project.priceFrom}</span>
                </div>
              </div>
              <InquiryForm compact defaultMessage={`I would like more information about ${project.name}.`} submitLabel="Inquire Now" />
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="site-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-label">Related Properties</p>
              <h2 className="mt-4 text-4xl">More projects in {project.areaName}</h2>
            </div>
            <Link to={`/areas/${project.areaId}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold">
              Explore this area <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {relatedProjects.map((relatedProject) => (
              <ProjectCard key={relatedProject.id} project={relatedProject} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
