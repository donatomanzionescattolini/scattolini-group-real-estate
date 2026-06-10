import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectFilter from '../components/projects/ProjectFilter';
import SectionHeader from '../components/ui/SectionHeader';
import { areas } from '../data/areas';
import { projects } from '../data/projects';
import { useTranslation } from '../i18n';

export default function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();

  const activeAreaId = searchParams.get('area') ?? 'all';
  const activeType = searchParams.get('type') ?? 'all';
  const activeStatus = searchParams.get('status') ?? 'all';

  const areasWithProjects = useMemo(
    () => areas.filter((area) => projects.some((project) => project.areaId === area.id)),
    [],
  );

  const visibleProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      if (activeAreaId !== 'all' && project.areaId !== activeAreaId) return false;
      if (activeType !== 'all' && project.type !== activeType) return false;
      if (activeStatus !== 'all' && project.status !== activeStatus) return false;
      return true;
    });
    return [...filtered].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));
  }, [activeAreaId, activeType, activeStatus]);

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all') next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="bg-section-bg">
      <section className="site-container py-20">
        <SectionHeader
          eyebrow={t('projectsPage.eyebrow')}
          title={t('projectsPage.title')}
          description={t('projectsPage.description')}
        />

        <div className="mt-12">
          <ProjectFilter
            areas={areasWithProjects}
            activeAreaId={activeAreaId}
            onAreaChange={(areaId) => updateParam('area', areaId)}
            activeType={activeType}
            onTypeChange={(type) => updateParam('type', type)}
            activeStatus={activeStatus}
            onStatusChange={(status) => updateParam('status', status)}
          />
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-muted">
          <p>{visibleProjects.length} {t('projectsPage.developmentsCount')}</p>
          <p>{t('projectsPage.curatedFor')}</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
