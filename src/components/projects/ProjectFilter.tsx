import { ReactNode } from 'react';
import { Search } from 'lucide-react';
import { Area } from '../../data/types';
import { useTranslation } from '../../i18n';

interface ProjectFilterProps {
  areas: Area[];
  activeAreaId: string;
  onAreaChange: (areaId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-editorial ${
        active
          ? 'bg-navy text-amber-100 shadow-card'
          : 'border border-navy/[0.25] bg-transparent text-muted hover:border-gold hover:text-navy'
      }`}
    >
      {children}
    </button>
  );
}

export default function ProjectFilter({ areas, activeAreaId, onAreaChange, searchQuery, onSearchChange }: ProjectFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      <div className="relative max-w-md">
        <input
          type="search"
          className="input-field pl-10"
          placeholder={t('projectFilter.searchPlaceholder')}
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
      </div>
      <div className="flex flex-wrap gap-3">
        <FilterPill active={activeAreaId === 'all'} onClick={() => onAreaChange('all')}>
          {t('projectFilter.allAreas')}
        </FilterPill>
        {areas.map((area) => (
          <FilterPill key={area.id} active={activeAreaId === area.id} onClick={() => onAreaChange(area.id)}>
            {area.name}
          </FilterPill>
        ))}
      </div>
    </div>
  );
}
