import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Area } from '../../data/types';
import Badge from '../ui/Badge';

interface AreaCardProps {
  area: Area;
}

const AreaCard = memo(function AreaCard({ area }: AreaCardProps) {
  return (
    <Link to={`/areas/${area.id}`} className="group relative block overflow-hidden border border-[rgba(15,27,45,0.08)] shadow-soft">
      <div className="absolute inset-0">
        <img src={area.image} alt={area.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,27,45,0.84)] via-[rgba(15,27,45,0.3)] to-transparent" />
      </div>
      <div className="relative flex min-h-[380px] flex-col justify-end p-7 text-white">
        <Badge tone="light">{area.projectCount} projects</Badge>
        <h3 className="mt-4 text-4xl text-white">{area.name}</h3>
        <p className="mt-2 text-sm uppercase tracking-editorial text-[rgba(255,255,255,0.78)]">{area.tagline}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-gold">
          Explore Market <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
});

export default AreaCard;
