import { ArrowRight, ChevronDown } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { areas } from '../../data/areas';
import { PROJECT_STATUSES, PROJECT_TYPES } from '../../data/projectFilters';
import { useTranslation } from '../../i18n';

const selectClass =
  'w-full appearance-none border border-[rgba(237,227,214,0.22)] bg-[rgba(255,255,255,0.06)] px-4 py-3 pr-9 text-sm text-cream outline-none transition focus:border-gold';

export default function PropertyFinder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [areaId, setAreaId] = useState('all');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (areaId !== 'all') params.set('area', areaId);
    if (type !== 'all') params.set('type', type);
    if (status !== 'all') params.set('status', status);
    const query = params.toString();
    navigate(query ? `/projects?${query}` : '/projects');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hero-enter-item mt-10 grid gap-4 border border-[rgba(237,227,214,0.18)] bg-[rgba(12,36,35,0.55)] p-5 backdrop-blur-sm sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end"
    >
      <div>
        <label className="text-[10px] font-medium uppercase tracking-editorial text-gold" htmlFor="finder-area">
          {t('hero.finder.areaLabel')}
        </label>
        <div className="relative mt-2">
          <select
            id="finder-area"
            className={selectClass}
            value={areaId}
            onChange={(event) => setAreaId(event.target.value)}
          >
            <option className="text-charcoal" value="all">{t('projectFilter.allAreas')}</option>
            {areas.map((area) => (
              <option className="text-charcoal" key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream/60" />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-medium uppercase tracking-editorial text-gold" htmlFor="finder-type">
          {t('hero.finder.typeLabel')}
        </label>
        <div className="relative mt-2">
          <select
            id="finder-type"
            className={selectClass}
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option className="text-charcoal" value="all">{t('projectFilter.allTypes')}</option>
            {PROJECT_TYPES.map((projectType) => (
              <option className="text-charcoal" key={projectType} value={projectType}>{t(`projectTypes.${projectType}`)}</option>
            ))}
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream/60" />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-medium uppercase tracking-editorial text-gold" htmlFor="finder-status">
          {t('hero.finder.statusLabel')}
        </label>
        <div className="relative mt-2">
          <select
            id="finder-status"
            className={selectClass}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option className="text-charcoal" value="all">{t('projectFilter.allStatuses')}</option>
            {PROJECT_STATUSES.map((projectStatus) => (
              <option className="text-charcoal" key={projectStatus} value={projectStatus}>{t(`projectDetail.statusLabels.${projectStatus}`)}</option>
            ))}
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream/60" />
        </div>
      </div>

      <button type="submit" className="button-primary w-full sm:w-auto">
        {t('hero.finder.submit')} <ArrowRight size={16} />
      </button>
    </form>
  );
}
