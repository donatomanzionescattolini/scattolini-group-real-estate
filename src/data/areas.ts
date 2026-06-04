import { Area } from './types';

const S3_AREAS = 'https://pagina-mama.s3.amazonaws.com/assets2/areas';

function areaGallery(areaId: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${S3_AREAS}/${areaId}/gallery/image (${i + 1}).jpg`);
}

export const areas: Area[] = [
  {
    id: 'brickell',
    name: 'Brickell',
    tagline: "Miami's Financial District",
    description:
      "Brickell is the financial powerhouse of Miami and all of South Florida. Its glittering skyline of towers, world-class dining, and cosmopolitan energy attract discerning residents and investors from around the globe. The iconic Brickell City Centre anchors a neighborhood that seamlessly blends business and luxury living.",
    image: `${S3_AREAS}/brickell/thumbnail.webp`,
    projectCount: 14,
    gallery: areaGallery('brickell', 8),
  },
  {
    id: 'miami-beach',
    name: 'Miami Beach',
    tagline: 'The Magic City Shoreline',
    description:
      "Miami Beach is where sun, sea, and sophistication converge. With Art Deco architecture, world-famous Ocean Drive, and pristine Atlantic shores, Miami Beach has long captivated high-net-worth buyers seeking a permanent address or a distinguished second home. Demand consistently outpaces supply, making every acquisition here a sound long-term investment.",
    image: `${S3_AREAS}/miami-beach/thumbnail.webp`,
    projectCount: 9,
    gallery: areaGallery('miami-beach', 8),
  },
  {
    id: 'edgewater',
    name: 'Edgewater',
    tagline: 'Bayfront Living Redefined',
    description:
      "Edgewater is one of Miami's most dynamic residential corridors, stretching along Biscayne Bay north of downtown. Luxury towers with panoramic water views are transforming the skyline, while Wynwood's cultural energy lies just steps away. A rare blend of urban connectivity and serene waterfront living.",
    image: `${S3_AREAS}/edgewater/thumbnail.webp`,
    projectCount: 7,
    gallery: areaGallery('edgewater', 8),
  },
  {
    id: 'downtown',
    name: 'Downtown Miami',
    tagline: 'The Heart of the City',
    description:
      "Downtown Miami pulses with reinvention. From the newly completed World Center to iconic branded residences rising above Bayfront, this is where Miami's ambition is most visible. Residents enjoy front-row seats to the city's cultural renaissance, world-class dining, and the best sunset views on the bay.",
    image: `${S3_AREAS}/downtown/thumbnail.webp`,
    projectCount: 7,
    gallery: areaGallery('downtown', 8),
  },
  {
    id: 'coconut-grove',
    name: 'Coconut Grove',
    tagline: "Miami's Oldest Neighborhood",
    description:
      "Coconut Grove — simply 'The Grove' to locals — is Miami's most charming and storied neighborhood. Lush canopied streets, a sparkling bayfront, chef-driven restaurants, and a bohemian spirit create an unmatched quality of life. From tycoons to artists, its A-list heritage makes every address here genuinely exclusive.",
    image: `${S3_AREAS}/coconut-grove/thumbnail.webp`,
    projectCount: 2,
    gallery: areaGallery('coconut-grove', 6),
  },
  {
    id: 'coral-gables',
    name: 'Coral Gables',
    tagline: 'The City Beautiful',
    description:
      "Coral Gables is an architectural masterpiece — a planned Mediterranean city of grand boulevards, coral-rock landmarks, and world-class institutions. Home to the University of Miami and the legendary Biltmore Hotel, its prestigious zip code has endured as one of South Florida's most coveted addresses for nearly a century.",
    image: `${S3_AREAS}/coral-gables/thumbnail.webp`,
    projectCount: 3,
    gallery: areaGallery('coral-gables', 6),
  },
  {
    id: 'sunny-isles',
    name: 'Sunny Isles Beach',
    tagline: 'The Riviera of the South',
    description:
      "Often called the 'Riviera of South Florida,' Sunny Isles Beach is a barrier island city celebrated for its extraordinary ultra-luxury towers and pristine Atlantic beachfront. An internationally recognized enclave that draws discerning buyers from across the globe.",
    image: `${S3_AREAS}/sunny-isles/thumbnail.webp`,
    projectCount: 3,
    gallery: areaGallery('sunny-isles', 6),
  },
  {
    id: 'wynwood',
    name: 'Wynwood',
    tagline: 'Art, Culture & Innovation',
    description:
      "Wynwood has transformed from a warehouse district into one of the most creatively charged neighborhoods in the world. Open-air galleries, acclaimed restaurants, and a thriving startup culture make it the epicenter of Miami's creative economy — and a compelling destination for a new generation of urban residents.",
    image: `${S3_AREAS}/wynwood/thumbnail.webp`,
    projectCount: 1,
    gallery: areaGallery('wynwood', 6),
  },
  {
    id: 'bay-harbor',
    name: 'Bay Harbor Islands',
    tagline: 'Intimate Island Living',
    description:
      "Bay Harbor Islands is one of Miami-Dade's best-kept secrets — a tranquil, pedestrian-friendly twin-island community just minutes from Bal Harbour Shops and the beach. Boutique luxury developments and a genuine neighborhood feel make it a prized address for those seeking refinement without the bustle.",
    image: `${S3_AREAS}/bay-harbor/thumbnail.webp`,
    projectCount: 4,
    gallery: areaGallery('bay-harbor', 6),
  },
  {
    id: 'midtown-miami',
    name: 'Midtown Miami',
    tagline: 'The Design Hub',
    description:
      "Midtown Miami sits at the intersection of art, design, and urban living. Adjacent to Wynwood and the Design District, this walkable neighborhood offers modern residences, curated retail, and a cosmopolitan energy that draws residents who value connectivity and creative culture.",
    image: `${S3_AREAS}/midtown-miami/thumbnail.webp`,
    projectCount: 4,
    gallery: areaGallery('midtown-miami', 6),
  },
  {
    id: 'north-bay-village',
    name: 'North Bay Village',
    tagline: 'Island City Serenity',
    description:
      "North Bay Village is a charming island city nestled in Biscayne Bay between Miami and Miami Beach. With direct waterfront access, a tight-knit community, and new luxury developments, it offers a peaceful residential experience just moments from the mainland.",
    image: `${S3_AREAS}/north-bay-village/thumbnail.webp`,
    projectCount: 2,
    gallery: areaGallery('north-bay-village', 6),
  },
  {
    id: 'south-miami',
    name: 'South Miami',
    tagline: 'Neighborhood Elegance',
    description:
      "South Miami is a tree-lined, family-friendly community with a small-town feel and a sophisticated lifestyle. Its walkable Sunset Drive district, excellent schools, and close-knit character make it one of the most livable and sought-after addresses in Miami-Dade.",
    image: `${S3_AREAS}/south-miami/thumbnail.webp`,
    projectCount: 0,
    gallery: areaGallery('south-miami', 6),
  },
  {
    id: 'homestead',
    name: 'Homestead',
    tagline: 'Florida Living at Its Finest',
    description:
      "Homestead offers an exceptional quality of life anchored by natural beauty — Everglades National Park, Biscayne Bay, and a thriving local community. New master-planned developments are bringing modern amenities and contemporary homes to this rapidly growing South Miami-Dade hub.",
    image: `${S3_AREAS}/homestead/thumbnail.webp`,
    projectCount: 5,
    gallery: areaGallery('homestead', 6),
  },
  {
    id: 'pinecrest',
    name: 'Pinecrest',
    tagline: 'Prestige & Privacy',
    description:
      "Pinecrest is synonymous with prestige — lush estate-sized lots, top-ranked schools, and a serene residential character that sets it apart in Miami-Dade. Often called 'the Beverly Hills of Miami,' its carefully curated housing stock appeals to the most discerning buyers.",
    image: `${S3_AREAS}/pinecrest/thumbnail.webp`,
    projectCount: 3,
    gallery: areaGallery('pinecrest', 6),
  },
  {
    id: 'doral',
    name: 'Doral',
    tagline: 'Live, Work, Learn & Play',
    description:
      "Doral's motto says it all. Strategically positioned near Miami International Airport with a thriving business ecosystem, world-class golf, diverse dining, and a large international community, Doral is one of Miami-Dade's fastest-growing and most dynamic cities.",
    image: `${S3_AREAS}/doral/thumbnail.webp`,
    projectCount: 0,
    gallery: areaGallery('doral', 6),
  },
  {
    id: 'hollywood',
    name: 'Hollywood',
    tagline: 'The Broadwalk City',
    description:
      "Hollywood, Florida balances small-town charm with resort-style living. Its famous Broadwalk, pristine beaches, and a growing collection of luxury residences make it a top destination for buyers seeking beach proximity without the South Beach premium.",
    image: `${S3_AREAS}/hollywood/thumbnail.webp`,
    projectCount: 3,
    gallery: areaGallery('hollywood', 6),
  },
  {
    id: 'aventura',
    name: 'Aventura',
    tagline: 'Sophisticated Urban Living',
    description:
      "Aventura is a master-planned city that has grown into one of South Florida's most desirable addresses. Anchored by Aventura Mall — one of the largest shopping centers in the U.S. — and bordered by the Intracoastal Waterway, Aventura offers a polished, walkable lifestyle.",
    image: `${S3_AREAS}/aventura/thumbnail.webp`,
    projectCount: 0,
    gallery: areaGallery('aventura', 6),
  },
  {
    id: 'ft-lauderdale',
    name: 'Fort Lauderdale',
    tagline: 'The Venice of America',
    description:
      "Fort Lauderdale's 165 miles of navigable waterways have earned it the title 'Venice of America.' From Las Olas Boulevard's upscale dining and boutiques to the pristine shoreline, Fort Lauderdale offers an elevated coastal lifestyle with exceptional value compared to Miami.",
    image: `${S3_AREAS}/ft-lauderdale/thumbnail.webp`,
    projectCount: 0,
    gallery: areaGallery('ft-lauderdale', 6),
  },
  {
    id: 'pompano-beach',
    name: 'Pompano Beach',
    tagline: "Broward's Hidden Gem",
    description:
      "Pompano Beach is Broward County's most exciting growth story. Its rapidly evolving beachfront, the acclaimed Pompano Beach Fishing Village, and a wave of new luxury developments are positioning it as the next great destination on Florida's Gold Coast.",
    image: `${S3_AREAS}/pompano-beach/thumbnail.webp`,
    projectCount: 2,
    gallery: areaGallery('pompano-beach', 6),
  },
  {
    id: 'west-palm-beach',
    name: 'West Palm Beach',
    tagline: "Palm Beach County's Crown Jewel",
    description:
      "West Palm Beach is Palm Beach County's vibrant cultural and commercial center. With its thriving arts scene, upscale dining on Clematis Street and CityPlace, and the glamour of nearby Palm Beach Island, it is one of Florida's most dynamic real estate markets.",
    image: `${S3_AREAS}/west-palm-beach/thumbnail.webp`,
    projectCount: 1,
    gallery: areaGallery('west-palm-beach', 6),
  },
  {
    id: 'orlando',
    name: 'Orlando',
    tagline: 'Where Dreams Take Shape',
    description:
      "Orlando is far more than theme parks — it is one of the fastest-growing metropolitan areas in the United States, with a booming economy, outstanding infrastructure, and a diverse real estate market offering everything from resort vacation homes to upscale urban residences.",
    image: `${S3_AREAS}/orlando/thumbnail.webp`,
    projectCount: 2,
    gallery: areaGallery('orlando', 6),
  },
  {
    id: 'florida-city',
    name: 'Florida City',
    tagline: 'Gateway to the Keys',
    description:
      "Florida City is the southernmost city in Miami-Dade County and the gateway to the Florida Keys and Everglades. Its affordable new residential communities offer an exceptional lifestyle close to nature, with easy access to the greater South Miami corridor.",
    image: `${S3_AREAS}/florida-city/thumbnail.webp`,
    projectCount: 4,
    gallery: areaGallery('florida-city', 6),
  },
  {
    id: 'dania-beach',
    name: 'Dania Beach',
    tagline: "Broward's Beachside Gem",
    description:
      "Dania Beach is Broward County's oldest city, now undergoing a vibrant renaissance. Its beachfront proximity, arts and antiques character, and proximity to Fort Lauderdale-Hollywood International Airport make it a compelling option for buyers and investors alike.",
    image: `${S3_AREAS}/dania-beach/thumbnail.webp`,
    projectCount: 1,
    gallery: areaGallery('dania-beach', 6),
  },
  {
    id: 'pembroke-pines',
    name: 'Pembroke Pines',
    tagline: 'Suburban Sophistication',
    description:
      "Pembroke Pines is one of Broward County's most established and family-friendly cities. Excellent schools, diverse dining, accessible parks, and a well-planned suburban environment make it one of South Florida's most practical and livable communities.",
    image: `${S3_AREAS}/pembroke-pines/thumbnail.webp`,
    projectCount: 0,
    gallery: areaGallery('pembroke-pines', 6),
  },
  {
    id: 'miami-design-district',
    name: 'Miami Design District',
    tagline: 'Where Luxury Meets Art',
    description:
      "The Miami Design District is an internationally celebrated luxury shopping and cultural destination. Home to the world's finest fashion houses, cutting-edge galleries, and acclaimed restaurants, it represents the pinnacle of Miami's cultural renaissance and is emerging as a premier residential address.",
    image: `${S3_AREAS}/miami-design-district/thumbnail.webp`,
    projectCount: 1,
    gallery: areaGallery('miami-design-district', 6),
  },
  {
    id: 'miami-river',
    name: 'Miami River',
    tagline: 'Waterfront Transformation',
    description:
      "The Miami River corridor is experiencing a remarkable transformation as world-class developers reimagine this historic waterfront with iconic luxury towers. Residents enjoy direct river access, sweeping bay views, and immediate connectivity to Brickell and Downtown.",
    image: `${S3_AREAS}/miami-river/thumbnail.webp`,
    projectCount: 2,
    gallery: areaGallery('miami-river', 6),
  },
];
