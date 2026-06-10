import { ReactNode } from 'react';
import { PROJECT_STATUSES, PROJECT_TYPES } from '../../data/projectFilters';
import { Area } from '../../data/types';
import { useTranslation } from '../../i18n';

interface ProjectFilterProps {
  areas: Area[];
  activeAreaId: string;
  onAreaChange: (areaId: string) => void;
  activeType: string;
  onTypeChange: (type: string) => void;
  activeStatus: string;
  onStatusChange: (status: string) => void;
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

export default function ProjectFilter({
  areas,
  activeAreaId,
  onAreaChange,
  activeType,
  onTypeChange,
  activeStatus,
  onStatusChange,
}: ProjectFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
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
      <div className="flex flex-wrap gap-3">
        <FilterPill active={activeType === 'all'} onClick={() => onTypeChange('all')}>
          {t('projectFilter.allTypes')}
        </FilterPill>
        {PROJECT_TYPES.map((type) => (
          <FilterPill key={type} active={activeType === type} onClick={() => onTypeChange(type)}>
            {t(`projectTypes.${type}`)}
          </FilterPill>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <FilterPill active={activeStatus === 'all'} onClick={() => onStatusChange('all')}>
          {t('projectFilter.allStatuses')}
        </FilterPill>
        {PROJECT_STATUSES.map((status) => (
          <FilterPill key={status} active={activeStatus === status} onClick={() => onStatusChange(status)}>
            {t(`projectDetail.statusLabels.${status}`)}
          </FilterPill>
        ))}
      </div>
    </div>
  );
}
