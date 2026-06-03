import AreaCard from '../components/areas/AreaCard';
import SectionHeader from '../components/ui/SectionHeader';
import { areas } from '../data/areas';

export default function AreasPage() {
  return (
    <div className="bg-white">
      <section className="site-container py-20">
        <SectionHeader
          eyebrow="Markets"
          title="Explore Our Markets"
          description="A broad South Florida footprint spanning luxury urban cores, beachfront enclaves, legacy residential neighborhoods, and fast-growing lifestyle destinations."
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
