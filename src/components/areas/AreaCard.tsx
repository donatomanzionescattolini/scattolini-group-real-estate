import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
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
    <Link to={`/areas/${area.id}`} className="group flex h-full flex-col overflow-hidden border border-[rgba(237,227,214,0.12)] bg-navy shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative h-80 overflow-hidden">
        <img src={area.image} alt={area.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,36,35,0.72)] via-transparent to-transparent" />
        <div className="absolute left-5 top-5">
          <Badge tone="light">{area.projectCount} {t('areaCard.projects')}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-3xl text-cream">{area.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[rgba(237,227,214,0.72)]">{localize(area.tagline, lang)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-gold group-hover:text-cream">
          {t('areaCard.exploreMarket')}
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
});

export default AreaCard;
