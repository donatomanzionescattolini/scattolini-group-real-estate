import { areas } from '../../data/areas';
import AreaCard from '../areas/AreaCard';
import SectionHeader from '../ui/SectionHeader';

const spotlightAreas = ['brickell', 'miami-beach', 'edgewater', 'coral-gables', 'coconut-grove', 'sunny-isles', 'wynwood', 'downtown'];

export default function AreasShowcase() {
  const showcaseAreas = spotlightAreas
    .map((id) => areas.find((area) => area.id === id))
    .filter((area): area is NonNullable<typeof area> => Boolean(area));

  return (
    <section className="bg-cream py-24">
      <div className="site-container">
        <SectionHeader
          eyebrow="Markets"
          title="Explore South Florida"
          description="From the bayside skyline of Brickell to the legacy estates of Coral Gables, discover the markets shaping our editorial view of South Florida real estate."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {showcaseAreas.map((area) => (
            <AreaCard key={area.id} area={area} />
          ))}
        </div>
      </div>
    </section>
  );
}
