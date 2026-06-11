import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { areas } from '../../data/areas';
import { projects } from '../../data/projects';
import { useTranslation } from '../../i18n';

const fieldClass =
  'w-full border border-cream/[0.22] bg-white/[0.06] px-4 py-3 text-sm text-cream outline-none transition placeholder:text-cream/[0.5] focus:border-gold';
const selectClass = `${fieldClass} appearance-none pr-9`;

export default function PropertyFinder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [areaId, setAreaId] = useState('all');
  const [projectId, setProjectId] = useState('all');

  // The property list shrinks/expands to follow the chosen area.
  const availableProjects = useMemo(() => {
    const pool = areaId === 'all' ? projects : projects.filter((project) => project.areaId === areaId);
    return [...pool].sort((a, b) => a.name.localeCompare(b.name));
  }, [areaId]);

  const handleAreaChange = (nextAreaId: string) => {
    setAreaId(nextAreaId);
    // Reset the property pick when it no longer belongs to the chosen area.
    if (projectId !== 'all' && nextAreaId !== 'all') {
      const stillVisible = projects.some((project) => project.id === projectId && project.areaId === nextAreaId);
      if (!stillVisible) setProjectId('all');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // A concrete property selection goes straight to its detail page.
    if (projectId !== 'all') {
      navigate(`/projects/${projectId}`);
      return;
    }
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (areaId !== 'all') params.set('area', areaId);
    const search = params.toString();
    navigate(search ? `/projects?${search}` : '/projects');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="hero-enter-item mt-10 grid gap-4 border border-cream/[0.18] bg-deep/[0.55] p-5 backdrop-blur-sm sm:grid-cols-[1.2fr_1fr_1fr_auto] sm:items-end"
    >
      <div>
        <label className="text-[10px] font-medium uppercase tracking-editorial text-gold" htmlFor="finder-query">
          {t('hero.finder.searchLabel')}
        </label>
        <div className="relative mt-2">
          <input
            id="finder-query"
            type="search"
            className={`${fieldClass} pl-9`}
            placeholder={t('hero.finder.searchPlaceholder')}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cream/[0.6]" />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-medium uppercase tracking-editorial text-gold" htmlFor="finder-area">
          {t('hero.finder.areaLabel')}
        </label>
        <div className="relative mt-2">
          <select
            id="finder-area"
            className={selectClass}
            value={areaId}
            onChange={(event) => handleAreaChange(event.target.value)}
          >
            <option className="text-charcoal" value="all">{t('projectFilter.allAreas')}</option>
            {areas.map((area) => (
              <option className="text-charcoal" key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream/[0.6]" />
        </div>
      </div>

      <div>
        <label className="text-[10px] font-medium uppercase tracking-editorial text-gold" htmlFor="finder-property">
          {t('hero.finder.propertyLabel')}
        </label>
        <div className="relative mt-2">
          <select
            id="finder-property"
            className={selectClass}
            value={projectId}
            onChange={(event) => setProjectId(event.target.value)}
          >
            <option className="text-charcoal" value="all">{t('hero.finder.allProperties')}</option>
            {availableProjects.map((project) => (
              <option className="text-charcoal" key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream/[0.6]" />
        </div>
      </div>

      <button type="submit" className="button-primary w-full sm:w-auto">
        {t('hero.finder.submit')} <ArrowRight size={16} />
      </button>
    </form>
  );
}
