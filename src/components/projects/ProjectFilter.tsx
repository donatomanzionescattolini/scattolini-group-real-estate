import { Area } from '../../data/types';
import { useTranslation } from '../../i18n';

interface ProjectFilterProps {
  areas: Area[];
  activeAreaId: string;
  onChange: (areaId: string) => void;
}

export default function ProjectFilter({ areas, activeAreaId, onChange }: ProjectFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onChange('all')}
        className={`px-4 py-3 text-xs font-semibold uppercase tracking-editorial ${
          activeAreaId === 'all'
            ? 'bg-teal-950 text-amber-100 shadow-soft'
            : 'border border-[rgba(15,27,45,0.12)] bg-white text-muted hover:border-gold hover:text-navy'
        }`}
      >
        {t('projectFilter.allAreas')}
      </button>
      {areas.map((area) => (
        <button
          key={area.id}
          type="button"
          onClick={() => onChange(area.id)}
          className={`px-4 py-3 text-xs font-semibold uppercase tracking-editorial ${
            activeAreaId === area.id
              ? 'bg-teal-950 text-amber-100 shadow-soft'
              : 'border border-[rgba(15,27,45,0.12)] bg-white text-muted hover:border-gold hover:text-navy'
          }`}
        >
          {area.name}
        </button>
      ))}
    </div>
  );
}
