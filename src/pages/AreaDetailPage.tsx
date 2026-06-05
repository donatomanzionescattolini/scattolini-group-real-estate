import { Link, Navigate, useParams } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import Badge from '../components/ui/Badge';
import ImageGallery from '../components/ui/ImageGallery';
import { areas } from '../data/areas';
import { localize } from '../data/localize';
import { projects } from '../data/projects';
import { useTranslation } from '../i18n';

export default function AreaDetailPage() {
  const { areaId } = useParams();
  const area = areas.find((entry) => entry.id === areaId);
  const { t, lang } = useTranslation();

  if (!area) {
    return <Navigate to="/areas" replace />;
  }

  const areaProjects = projects.filter((project) => project.areaId === area.id);

  return (
    <div className="bg-white">
      <section className="relative isolate overflow-hidden bg-teal-950">
        <img src={area.image} alt={area.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,52,51,0.34),rgba(27,52,51,0.84))]" />
        <div className="site-container relative z-10 py-24 sm:py-32">
          <div className="max-w-3xl">
            <Badge tone="light">{area.projectCount} {t('areaDetail.projectsBadge')}</Badge>
            <h1 className="mt-6 text-5xl text-amber-100 sm:text-6xl">{area.name}</h1>
            <p className="mt-4 text-sm uppercase tracking-editorial text-[rgba(255,255,255,0.72)]">{localize(area.tagline, lang)}</p>
          </div>
        </div>
      </section>

      {/* Neighborhood Gallery */}
      {area.gallery && area.gallery.length > 0 && (
        <section className="site-container py-16">
          <p className="editorial-label">{t('areaDetail.gallery')}</p>
          <h2 className="mt-4 mb-8 text-4xl">{t('areaDetail.areaGallery')}</h2>
          <ImageGallery images={area.gallery} alt={area.name} />
        </section>
      )}

      <section className="site-container py-20">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.55fr]">
          <div>
            <p className="editorial-label">{t('areaDetail.marketOverview')}</p>
            <h2 className="mt-4 text-4xl">{t('areaDetail.whyBuyersWatch')} {area.name}</h2>
            <p className="mt-6 text-base leading-8 text-muted">{localize(area.description, lang)}</p>
          </div>
          <div className="panel-surface p-8">
            <p className="editorial-label">{t('areaDetail.atAGlance')}</p>
            <div className="mt-6 space-y-5 text-sm text-muted">
              <div className="flex items-center justify-between border-b border-[rgba(27,52,51,0.08)] pb-4">
                <span>{t('areaDetail.availableProjects')}</span>
                <span className="font-medium text-navy">{areaProjects.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[rgba(27,52,51,0.08)] pb-4">
                <span>{t('areaDetail.signatureCharacter')}</span>
                <span className="font-medium text-right text-navy">{localize(area.tagline, lang)}</span>
              </div>
              <div className="pt-2 text-xs uppercase tracking-editorial text-muted">
                {t('areaDetail.neighborhoodComparison')} <Link className="text-navy hover:text-gold" to="/contact">{t('areaDetail.speakWithTeam')}</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="editorial-label">{t('areaDetail.collection')}</p>
          <h2 className="mt-4 text-4xl">{t('areaDetail.projectsIn')} {area.name}</h2>

          {areaProjects.length > 0 ? (
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {areaProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="mt-10 border border-[rgba(27,52,51,0.08)] bg-cream p-10 shadow-soft">
              <p className="max-w-3xl text-base leading-8 text-muted">
                {t('areaDetail.expandingMarket')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
