import AreaCard from '../components/areas/AreaCard';
import SectionHeader from '../components/ui/SectionHeader';
import { areas } from '../data/areas';
import { useTranslation } from '../i18n';

export default function AreasPage() {
  const { t } = useTranslation();

  return (
    <div className="bg-section-bg">
      <section className="site-container py-20">
        <SectionHeader
          eyebrow={t('areasPage.eyebrow')}
          title={t('areasPage.title')}
          description={t('areasPage.description')}
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {areas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
      </section>
    </div>
  );
}
