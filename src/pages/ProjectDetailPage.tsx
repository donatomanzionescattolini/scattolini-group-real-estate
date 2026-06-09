import { ArrowRight, CalendarDays, Download, FileText, Layers3, Play } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import Badge from '../components/ui/Badge';
import ImageGallery from '../components/ui/ImageGallery';
import InquiryForm from '../components/ui/InquiryForm';
import { localize } from '../data/localize';
import { projects } from '../data/projects';
import { useTranslation } from '../i18n';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((entry) => entry.id === projectId);
  const { t, lang } = useTranslation();

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const relatedProjects = projects.filter((entry) => entry.areaId === project.areaId && entry.id !== project.id).slice(0, 3);

  const statusLabels: Record<string, string> = {
    'pre-construction': t('projectDetail.statusLabels.pre-construction'),
    'under-construction': t('projectDetail.statusLabels.under-construction'),
    completed: t('projectDetail.statusLabels.completed'),
  };

  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const hasVideo = Boolean(project.videoUrl);
  const hasDocs = Boolean(project.factsheetPdf || project.floorplansPdf);

  /**
   * Compute a clean two-tone (section-bg/white) rhythm that stays consistent across
   * every project, regardless of which optional sections (gallery/video/documents) render.
   * The hero + gallery + overview form a continuous light zone, and the remaining
   * sections alternate between white and section-bg to keep transitions gentle.
   */
  type SurfaceTone = 'section' | 'white';
  const tone: Record<'video' | 'documents' | 'related', SurfaceTone> = (() => {
    const result = {} as Record<'video' | 'documents' | 'related', SurfaceTone>;
    let prev: SurfaceTone = 'section'; // the overview/body zone above is always light
    for (const key of ['video', 'documents', 'related'] as const) {
      if (key === 'video' && !hasVideo) continue;
      if (key === 'documents' && !hasDocs) continue;
      prev = prev === 'section' ? 'white' : 'section';
      result[key] = prev;
    }
    return result;
  })();

  const sectionBg = (t: SurfaceTone) => (t === 'white' ? 'bg-white' : 'bg-section-bg');
  const headingClass = (t: SurfaceTone) => (t === 'white' ? 'text-navy' : '');
  const labelClass = (_t: SurfaceTone) => 'text-teal';

  return (
    <div className="bg-section-bg">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-section-bg">
        <img src={project.image} alt={project.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-deep/65" />
        <div className="site-container relative z-10 py-24 sm:py-32">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-editorial text-[rgba(237,227,214,0.72)]">
              <Link to="/" className="hover:text-gold">{t('projectDetail.breadcrumbHome')}</Link>
              <span>/</span>
              <Link to="/projects" className="hover:text-gold">{t('projectDetail.breadcrumbProjects')}</Link>
              <span>/</span>
              <Link to={`/areas/${project.areaId}`} className="hover:text-gold">{project.areaName}</Link>
              <span>/</span>
              <span className="text-gold">{project.name}</span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Badge tone="light">{project.areaName}</Badge>
              <Badge tone="light">{statusLabels[project.status]}</Badge>
            </div>
            <h1 className="mt-6 text-5xl text-cream sm:text-6xl">{project.name}</h1>
            <p className="mt-4 text-lg leading-8 text-[rgba(237,227,214,0.82)]">{localize(project.tagline, lang)}</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery — light, forms one continuous light zone with the overview below */}
      {hasGallery && (
        <section className="bg-section-bg py-16">
          <div className="site-container">
            <p className="editorial-label">{t('projectDetail.gallery')}</p>
            <h2 className="mt-4 mb-8 text-4xl">{t('projectDetail.photoGallery')}</h2>
            <ImageGallery images={project.gallery!} alt={project.name} />
          </div>
        </section>
      )}

      {/* Key Stats + Overview + Sidebar — clean white base */}
      <section className="bg-white">
        <div className="site-container py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="panel-surface p-5">
                  <CalendarDays className="text-gold" size={18} />
                  <p className="mt-4 text-xs uppercase tracking-editorial text-[rgba(237,227,214,0.7)]">{t('projectDetail.delivery')}</p>
                  <p className="mt-2 text-2xl text-cream">{project.completionYear === 'Now' ? t('projectDetail.deliveryNow') : project.completionYear}</p>
                </div>
                <div className="panel-surface p-5">
                  <Layers3 className="text-gold" size={18} />
                  <p className="mt-4 text-xs uppercase tracking-editorial text-[rgba(237,227,214,0.7)]">{t('projectDetail.scale')}</p>
                  <p className="mt-2 text-2xl text-cream">{project.units ? localize(project.units, lang) : null}</p>
                </div>
              </div>

              <div className="mt-12">
                <p className="editorial-label">{t('projectDetail.overview')}</p>
                <h2 className="mt-4 text-4xl">{t('projectDetail.closerLook')} {project.name}</h2>
                <p className="mt-6 max-w-4xl text-base leading-8 text-muted">{localize(project.description, lang)}</p>
              </div>

              {/* Amenities & Features — navy panel, cohesive with the stat & contact cards */}
              <div className="mt-12 rounded-xl bg-navy p-8">
                <div className="grid gap-10 lg:grid-cols-2">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('projectDetail.amenities')}</p>
                    <ul className="mt-6 space-y-4">
                      {project.amenities.map((amenity) => {
                        const label = localize(amenity, lang);
                        return (
                          <li key={label} className="border-b border-[rgba(237,227,214,0.14)] pb-4 text-sm text-[rgba(237,227,214,0.82)]">
                            {label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('projectDetail.residenceFeatures')}</p>
                    <ul className="mt-6 space-y-4">
                      {project.features.map((feature) => {
                        const label = localize(feature, lang);
                        return (
                          <li key={label} className="border-b border-[rgba(237,227,214,0.14)] pb-4 text-sm text-[rgba(237,227,214,0.82)]">
                            {label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="panel-surface p-8">
                <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('projectDetail.contactAbout')}</p>
                <h3 className="mt-4 text-3xl text-cream">{t('projectDetail.requestPresentation')}</h3>
                <div className="mt-6 space-y-4 border-y border-[rgba(237,227,214,0.15)] py-6 text-sm text-[rgba(237,227,214,0.7)]">
                  <div className="flex items-center justify-between">
                    <span>{t('projectDetail.market')}</span>
                    <span className="font-medium text-cream">{project.areaName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t('projectDetail.status')}</span>
                    <span className="font-medium text-cream">{statusLabels[project.status]}</span>
                  </div>
                </div>
                <InquiryForm compact theme="dark" defaultMessage={`${t('projectDetail.defaultMessage')} ${project.name}.`} submitLabel={t('projectDetail.inquireNow')} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Video — tone follows the alternating rhythm */}
      {hasVideo && (
        <section className={`${sectionBg(tone.video)} py-20`}>
          <div className="site-container">
            <p className={`text-[11px] font-medium uppercase tracking-editorial ${labelClass(tone.video)}`}>{t('projectDetail.video')}</p>
            <h2 className={`mt-4 mb-8 text-4xl ${headingClass(tone.video)}`}>{t('projectDetail.projectVideo')}</h2>
            <div className="relative overflow-hidden rounded-xl bg-[#0C2423] shadow-card" style={{ aspectRatio: '16/9' }}>
              <video
                className="h-full w-full object-cover"
                controls
                preload="metadata"
                poster={project.image}
              >
                {/* Video hosted on S3: assets2/desarrollos/{id}/video.mp4 */}
                <source src={project.videoUrl} type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity peer-paused:opacity-100">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(255,255,255,0.18)] backdrop-blur-sm">
                  <Play className="text-amber-100" size={28} fill="white" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Documents — tone follows the alternating rhythm */}
      {hasDocs && (
        <section className={`${sectionBg(tone.documents)} py-20`}>
          <div className="site-container">
            <p className={`text-[11px] font-medium uppercase tracking-editorial ${labelClass(tone.documents)}`}>{t('projectDetail.documents')}</p>
            <h2 className={`mt-4 mb-8 text-4xl ${headingClass(tone.documents)}`}>{project.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.factsheetPdf && (
                <a
                  href={project.factsheetPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-lg border border-[rgba(27,52,51,0.18)] bg-navy p-6 shadow-card transition hover:border-gold hover:shadow-card"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[rgba(237,227,214,0.12)] text-gold">
                    <FileText size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-cream">{t('projectDetail.factsheet')}</p>
                    <p className="mt-1 text-xs text-[rgba(237,227,214,0.7)]">{t('projectDetail.downloadFactsheet')}</p>
                  </div>
                  <Download size={16} className="shrink-0 text-[rgba(237,227,214,0.7)] transition group-hover:text-gold" />
                </a>
              )}
              {project.floorplansPdf && (
                <a
                  href={project.floorplansPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 rounded-lg border border-[rgba(27,52,51,0.18)] bg-navy p-6 shadow-card transition hover:border-gold hover:shadow-card"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[rgba(237,227,214,0.12)] text-gold">
                    <Layers3 size={22} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-cream">{t('projectDetail.floorplans')}</p>
                    <p className="mt-1 text-xs text-[rgba(237,227,214,0.7)]">{t('projectDetail.downloadFloorplans')}</p>
                  </div>
                  <Download size={16} className="shrink-0 text-[rgba(237,227,214,0.7)] transition group-hover:text-gold" />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects — tone follows the alternating rhythm */}
      <section className={`${sectionBg(tone.related)} py-20`}>
        <div className="site-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`text-[11px] font-medium uppercase tracking-editorial ${labelClass(tone.related)}`}>{t('projectDetail.relatedProperties')}</p>
              <h2 className={`mt-4 text-4xl ${headingClass(tone.related)}`}>{t('projectDetail.moreProjectsIn')} {project.areaName}</h2>
            </div>
            <Link to={`/areas/${project.areaId}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold">
              {t('projectDetail.exploreArea')} <ArrowRight size={14} />
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
