import { Link, Navigate, useParams } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import Badge from '../components/ui/Badge';
import ImageGallery from '../components/ui/ImageGallery';
import { areas, BANNER_EXTENSIONS } from '../data/areas';
import { localize } from '../data/localize';
import { projects } from '../data/projects';
import { useTranslation } from '../i18n';

const MARKET_READ_KEYS = {
  pipelineStrong: 'areaDetail.marketRead.pipelineStrong',
  pipelineBalanced: 'areaDetail.marketRead.pipelineBalanced',
  pipelineEstablished: 'areaDetail.marketRead.pipelineEstablished',
} as const;

function getMarketReadKey(launchPipelineCount: number, deliveryReadyCount: number): keyof typeof MARKET_READ_KEYS {
  if (launchPipelineCount > deliveryReadyCount) {
    return 'areaDetail.marketRead.pipelineStrong';
  }

  if (launchPipelineCount === deliveryReadyCount) {
    return 'areaDetail.marketRead.pipelineBalanced';
  }

  return 'areaDetail.marketRead.pipelineEstablished';
}

export default function AreaDetailPage() {
  const { areaId } = useParams();
  const area = areas.find((entry) => entry.id === areaId);
  const { t, lang } = useTranslation();

  if (!area) {
    return <Navigate to="/areas" replace />;
  }

  const areaProjects = projects.filter((project) => project.areaId === area.id);
  const { launchPipelineCount, deliveryReadyCount } = areaProjects.reduce(
    (counts, project) => {
      if (project.status === 'completed') {
        counts.deliveryReadyCount += 1;
      } else {
        counts.launchPipelineCount += 1;
      }
      return counts;
    },
    { launchPipelineCount: 0, deliveryReadyCount: 0 },
  );
  const galleryCount = area.gallery?.length ?? 0;
  const marketReadKey = getMarketReadKey(launchPipelineCount, deliveryReadyCount);

  return (
    <div className="bg-section-bg">
      <section className="relative isolate overflow-hidden bg-deep">
        <img
          src={area.bannerImage}
          alt={area.name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            // Banner values are extension-agnostic: if the current format is
            // missing on S3, fall back through the remaining BANNER_EXTENSIONS.
            const img = event.currentTarget;
            const next = Number(img.dataset.extIndex ?? '0') + 1;
            if (next < BANNER_EXTENSIONS.length) {
              img.dataset.extIndex = String(next);
              img.src = area.bannerImage.replace(/\.[a-z0-9]+$/i, `.${BANNER_EXTENSIONS[next]}`);
            }
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,36,35,0.34),rgba(12,36,35,0.84))]" />
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

      <section className="bg-section-bg">
        <div className="site-container py-20">
        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.55fr]">
          <div>
            <p className="editorial-label">{t('areaDetail.marketOverview')}</p>
            <h2 className="mt-4 text-4xl">{t('areaDetail.whyBuyersWatch')} {area.name}</h2>
            <p className="mt-6 text-base leading-8 text-muted">{localize(area.description, lang)}</p>
          </div>
          <div className="panel-surface relative overflow-hidden p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(219,176,120,0.2),transparent_55%)]" />
            <div className="relative">
              <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('areaDetail.atAGlance')}</p>
              <p className="mt-3 text-sm leading-6 text-[rgba(237,227,214,0.78)]">{t('areaDetail.quickSnapshot')}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-[rgba(237,227,214,0.15)] bg-[rgba(12,36,35,0.28)] p-4">
                  <p className="text-[11px] uppercase tracking-editorial text-[rgba(237,227,214,0.72)]">{t('areaDetail.availableProjects')}</p>
                  <p className="mt-2 text-2xl text-cream">{areaProjects.length}</p>
                </div>
                <div className="rounded-xl border border-[rgba(237,227,214,0.15)] bg-[rgba(12,36,35,0.28)] p-4">
                  <p className="text-[11px] uppercase tracking-editorial text-[rgba(237,227,214,0.72)]">{t('areaDetail.launchPipeline')}</p>
                  <p className="mt-2 text-2xl text-cream">{launchPipelineCount}</p>
                </div>
                <div className="rounded-xl border border-[rgba(237,227,214,0.15)] bg-[rgba(12,36,35,0.28)] p-4">
                  <p className="text-[11px] uppercase tracking-editorial text-[rgba(237,227,214,0.72)]">{t('areaDetail.deliveryReady')}</p>
                  <p className="mt-2 text-2xl text-cream">{deliveryReadyCount}</p>
                </div>
                <div className="rounded-xl border border-[rgba(237,227,214,0.15)] bg-[rgba(12,36,35,0.28)] p-4">
                  <p className="text-[11px] uppercase tracking-editorial text-[rgba(237,227,214,0.72)]">{t('areaDetail.galleryMoments')}</p>
                  <p className="mt-2 text-2xl text-cream">{galleryCount}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-[rgba(237,227,214,0.15)] pt-5 text-sm text-[rgba(237,227,214,0.78)]">
                <div className="flex items-start justify-between gap-4">
                  <span>{t('areaDetail.signatureCharacter')}</span>
                  <span className="max-w-[180px] text-right font-medium text-cream">{localize(area.tagline, lang)}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span>{t('areaDetail.marketPulse')}</span>
                  <span className="max-w-[180px] text-right font-medium text-cream">{t(MARKET_READ_KEYS[marketReadKey])}</span>
                </div>
              </div>

              <div className="mt-6 text-xs uppercase tracking-editorial text-[rgba(237,227,214,0.7)]">
                {t('areaDetail.neighborhoodComparison')} <Link className="text-gold hover:text-cream" to="/contact">{t('areaDetail.speakWithTeam')}</Link>
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
            <div className="mt-10 border border-[rgba(237,227,214,0.12)] bg-navy p-10 shadow-card">
              <p className="max-w-3xl text-base leading-8 text-[rgba(237,227,214,0.78)]">
                {t('areaDetail.expandingMarket')}
              </p>
            </div>
          )}
        </div>
        </div>
      </section>
    </div>
  );
}
