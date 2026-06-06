import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { THUMBNAIL_EXTENSIONS } from '../../data/areas';
import { localize } from '../../data/localize';
import { Area } from '../../data/types';
import { useTranslation } from '../../i18n';
import Badge from '../ui/Badge';

interface AreaCardProps {
  area: Area;
}

const AreaCard = memo(function AreaCard({ area }: AreaCardProps) {
  const { t, lang } = useTranslation();

  return (
    <Link to={`/areas/${area.id}`} className="group relative block overflow-hidden border border-[rgba(27,52,51,0.08)] shadow-soft">
      <div className="absolute inset-0">
        <img
          src={area.image}
          alt={area.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(event) => {
            // Thumbnail values are extension-agnostic: if the current format is
            // missing on S3, fall back through the remaining THUMBNAIL_EXTENSIONS.
            const img = event.currentTarget;
            const next = Number(img.dataset.extIndex ?? '0') + 1;
            if (next < THUMBNAIL_EXTENSIONS.length) {
              img.dataset.extIndex = String(next);
              img.src = area.image.replace(/\.[a-z0-9]+$/i, `.${THUMBNAIL_EXTENSIONS[next]}`);
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(27,52,51,0.84)] via-[rgba(27,52,51,0.3)] to-transparent" />
      </div>
      <div className="relative flex min-h-[380px] flex-col justify-end p-7 text-amber-100">
        <Badge tone="light">{area.projectCount} {t('areaCard.projects')}</Badge>
        <h3 className="mt-4 text-4xl text-amber-100">{area.name}</h3>
        <p className="mt-2 text-sm uppercase tracking-editorial text-[rgba(255,255,255,0.78)]">{localize(area.tagline, lang)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-gold">
          {t('areaCard.exploreMarket')} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
});

export default AreaCard;
