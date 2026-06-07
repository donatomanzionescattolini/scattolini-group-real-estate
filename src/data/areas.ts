import { Area } from './types';

const S3_AREAS = 'https://pagina-mama.s3.amazonaws.com/assets2/areas';

function areaGallery(areaId: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${S3_AREAS}/${areaId}/carousel-${i + 1}.webp`);
}

/**
 * Banner file formats, tried in order at render time so an area banner resolves
 * regardless of which format is actually stored on S3 (webp/jpg/png/…).
 */
export const BANNER_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png'] as const;

/**
 * Builds an area's banner URL. The file extension is centralized here (and can
 * be resolved across BANNER_EXTENSIONS at render time), so individual Area
 * objects never hardcode an image format — keeping every value extension-agnostic.
 */
function areaBanner(id: string): string {
  return `${S3_AREAS}/${id}/banner.${BANNER_EXTENSIONS[0]}`;
}

/**
 * Thumbnail file formats, tried in order at render time so an area thumbnail
 * resolves regardless of which format is actually stored on S3 (webp/jpg/png/…).
 */
export const THUMBNAIL_EXTENSIONS = ['webp', 'jpg', 'jpeg', 'png'] as const;

/**
 * Builds an area's thumbnail URL. Like areaBanner, the extension is centralized
 * here so individual Area objects stay extension-agnostic.
 */
function areaThumbnail(id: string): string {
  return `${S3_AREAS}/${id}/thumbnail.${THUMBNAIL_EXTENSIONS[0]}`;
}

export const areas: Area[] = [
  {
    id: 'brickell',
    name: 'Brickell',
    tagline: { en: "Miami's Financial District", es: 'El Distrito Financiero de Miami' },
    description: {
      en: "Brickell is the financial powerhouse of Miami and all of South Florida. Its glittering skyline of towers, world-class dining, and cosmopolitan energy attract discerning residents and investors from around the globe. The iconic Brickell City Centre anchors a neighborhood that seamlessly blends business and luxury living.",
      es: 'Brickell es el motor financiero de Miami y de todo el Sur de Florida. Su deslumbrante horizonte de torres, su gastronomía de clase mundial y su energía cosmopolita atraen a residentes e inversores exigentes de todo el mundo. El icónico Brickell City Centre ancla un vecindario que combina a la perfección los negocios y la vida de lujo.',
    },
    image: areaThumbnail('brickell'),
    projectCount: 14,
    bannerImage: areaBanner('brickell'),
    gallery: areaGallery('brickell', 11),
  },
  {
    id: 'miami-beach',
    name: 'Miami Beach',
    tagline: { en: 'The Magic City Shoreline', es: 'La Costa de la Ciudad Mágica' },
    description: {
      en: "Miami Beach is where sun, sea, and sophistication converge. With Art Deco architecture, world-famous Ocean Drive, and pristine Atlantic shores, Miami Beach has long captivated high-net-worth buyers seeking a permanent address or a distinguished second home. Demand consistently outpaces supply, making every acquisition here a sound long-term investment.",
      es: 'Miami Beach es donde convergen el sol, el mar y la sofisticación. Con su arquitectura Art Decó, la mundialmente famosa Ocean Drive y sus prístinas costas atlánticas, Miami Beach ha cautivado durante mucho tiempo a compradores de alto poder adquisitivo que buscan una residencia permanente o una distinguida segunda vivienda. La demanda supera constantemente a la oferta, lo que convierte cada adquisición en una sólida inversión a largo plazo.',
    },
    image: areaThumbnail('miami-beach'),
    projectCount: 9,
    bannerImage: areaBanner('miami-beach'),
    gallery: areaGallery('miami-beach', 8),
  },
  {
    id: 'edgewater',
    name: 'Edgewater',
    tagline: { en: 'Bayfront Living Redefined', es: 'La Vida Frente a la Bahía Redefinida' },
    description: {
      en: "Edgewater is one of Miami's most dynamic residential corridors, stretching along Biscayne Bay north of downtown. Luxury towers with panoramic water views are transforming the skyline, while Wynwood's cultural energy lies just steps away. A rare blend of urban connectivity and serene waterfront living.",
      es: 'Edgewater es uno de los corredores residenciales más dinámicos de Miami, que se extiende a lo largo de la Bahía de Biscayne al norte del centro. Torres de lujo con vistas panorámicas al agua están transformando el horizonte, mientras la energía cultural de Wynwood se encuentra a pocos pasos. Una rara combinación de conectividad urbana y serena vida frente al agua.',
    },
    image: areaThumbnail('edgewater'),
    projectCount: 7,
    bannerImage: areaBanner('edgewater'),
    gallery: areaGallery('edgewater', 8),
  },
  {
    id: 'downtown',
    name: 'Downtown Miami',
    tagline: { en: 'The Heart of the City', es: 'El Corazón de la Ciudad' },
    description: {
      en: "Downtown Miami pulses with reinvention. From the newly completed World Center to iconic branded residences rising above Bayfront, this is where Miami's ambition is most visible. Residents enjoy front-row seats to the city's cultural renaissance, world-class dining, and the best sunset views on the bay.",
      es: 'El centro de Miami vibra con reinvención. Desde el recién terminado World Center hasta las icónicas residencias de marca que se elevan sobre Bayfront, es aquí donde la ambición de Miami es más visible. Los residentes disfrutan de un asiento de primera fila para el renacimiento cultural de la ciudad, su gastronomía de clase mundial y las mejores vistas del atardecer sobre la bahía.',
    },
    image: areaThumbnail('downtown'),
    projectCount: 7,
    bannerImage: areaBanner('downtown'),
    gallery: areaGallery('downtown', 8),
  },
  {
    id: 'coconut-grove',
    name: 'Coconut Grove',
    tagline: { en: "Miami's Oldest Neighborhood", es: 'El Vecindario Más Antiguo de Miami' },
    description: {
      en: "Coconut Grove — simply 'The Grove' to locals — is Miami's most charming and storied neighborhood. Lush canopied streets, a sparkling bayfront, chef-driven restaurants, and a bohemian spirit create an unmatched quality of life. From tycoons to artists, its A-list heritage makes every address here genuinely exclusive.",
      es: 'Coconut Grove —simplemente "The Grove" para los locales— es el vecindario más encantador y legendario de Miami. Sus frondosas calles arboladas, su resplandeciente costa, sus restaurantes de autor y su espíritu bohemio crean una calidad de vida inigualable. Desde magnates hasta artistas, su prestigioso legado hace que cada dirección aquí sea genuinamente exclusiva.',
    },
    image: areaThumbnail('coconut-grove'),
    projectCount: 2,
    bannerImage: areaBanner('coconut-grove'),
    gallery: areaGallery('coconut-grove', 6),
  },
  {
    id: 'coral-gables',
    name: 'Coral Gables',
    tagline: { en: 'The City Beautiful', es: 'La Ciudad Hermosa' },
    description: {
      en: "Coral Gables is an architectural masterpiece — a planned Mediterranean city of grand boulevards, coral-rock landmarks, and world-class institutions. Home to the University of Miami and the legendary Biltmore Hotel, its prestigious zip code has endured as one of South Florida's most coveted addresses for nearly a century.",
      es: 'Coral Gables es una obra maestra arquitectónica: una ciudad mediterránea planificada de grandes bulevares, monumentos de roca coralina e instituciones de clase mundial. Hogar de la Universidad de Miami y del legendario Hotel Biltmore, su prestigioso código postal ha perdurado como una de las direcciones más codiciadas del Sur de Florida durante casi un siglo.',
    },
    image: areaThumbnail('coral-gables'),
    projectCount: 3,
    bannerImage: areaBanner('coral-gables'),
    gallery: areaGallery('coral-gables', 6),
  },
  {
    id: 'sunny-isles',
    name: 'Sunny Isles Beach',
    tagline: { en: 'The Riviera of the South', es: 'La Riviera del Sur' },
    description: {
      en: "Often called the 'Riviera of South Florida,' Sunny Isles Beach is a barrier island city celebrated for its extraordinary ultra-luxury towers and pristine Atlantic beachfront. An internationally recognized enclave that draws discerning buyers from across the globe.",
      es: 'A menudo llamada la "Riviera del Sur de Florida", Sunny Isles Beach es una ciudad en una isla barrera célebre por sus extraordinarias torres de ultralujo y su prístina playa atlántica. Un enclave reconocido internacionalmente que atrae a compradores exigentes de todo el mundo.',
    },
    image: areaThumbnail('sunny-isles'),
    projectCount: 3,
    bannerImage: areaBanner('sunny-isles'),
    gallery: areaGallery('sunny-isles', 6),
  },
  {
    id: 'wynwood',
    name: 'Wynwood',
    tagline: { en: 'Art, Culture & Innovation', es: 'Arte, Cultura e Innovación' },
    description: {
      en: "Wynwood has transformed from a warehouse district into one of the most creatively charged neighborhoods in the world. Open-air galleries, acclaimed restaurants, and a thriving startup culture make it the epicenter of Miami's creative economy — and a compelling destination for a new generation of urban residents.",
      es: 'Wynwood se ha transformado de un distrito de almacenes en uno de los vecindarios con más carga creativa del mundo. Galerías al aire libre, restaurantes aclamados y una próspera cultura de startups lo convierten en el epicentro de la economía creativa de Miami, y en un destino atractivo para una nueva generación de residentes urbanos.',
    },
    image: areaThumbnail('wynwood'),
    projectCount: 1,
    bannerImage: areaBanner('wynwood'),
    gallery: areaGallery('wynwood', 6),
  },
  {
    id: 'bay-harbor',
    name: 'Bay Harbor Islands',
    tagline: { en: 'Intimate Island Living', es: 'Vida Insular Íntima' },
    description: {
      en: "Bay Harbor Islands is one of Miami-Dade's best-kept secrets — a tranquil, pedestrian-friendly twin-island community just minutes from Bal Harbour Shops and the beach. Boutique luxury developments and a genuine neighborhood feel make it a prized address for those seeking refinement without the bustle.",
      es: 'Bay Harbor Islands es uno de los secretos mejor guardados de Miami-Dade: una tranquila comunidad de dos islas, ideal para peatones, a pocos minutos de Bal Harbour Shops y la playa. Sus desarrollos de lujo boutique y su auténtico ambiente de vecindario la convierten en una dirección preciada para quienes buscan refinamiento sin el bullicio.',
    },
    image: areaThumbnail('bay-harbor'),
    projectCount: 4,
    bannerImage: areaBanner('bay-harbor'),
    gallery: areaGallery('bay-harbor', 6),
  },
  {
    id: 'midtown-miami',
    name: 'Midtown Miami',
    tagline: { en: 'The Design Hub', es: 'El Núcleo del Diseño' },
    description: {
      en: "Midtown Miami sits at the intersection of art, design, and urban living. Adjacent to Wynwood and the Design District, this walkable neighborhood offers modern residences, curated retail, and a cosmopolitan energy that draws residents who value connectivity and creative culture.",
      es: 'Midtown Miami se sitúa en la intersección del arte, el diseño y la vida urbana. Adyacente a Wynwood y al Design District, este vecindario peatonal ofrece residencias modernas, comercio curado y una energía cosmopolita que atrae a residentes que valoran la conectividad y la cultura creativa.',
    },
    image: areaThumbnail('midtown-miami'),
    projectCount: 4,
    bannerImage: areaBanner('midtown-miami'),
    gallery: areaGallery('midtown-miami', 6),
  },
  {
    id: 'north-bay-village',
    name: 'North Bay Village',
    tagline: { en: 'Island City Serenity', es: 'Serenidad de Ciudad Insular' },
    description: {
      en: "North Bay Village is a charming island city nestled in Biscayne Bay between Miami and Miami Beach. With direct waterfront access, a tight-knit community, and new luxury developments, it offers a peaceful residential experience just moments from the mainland.",
      es: 'North Bay Village es una encantadora ciudad insular ubicada en la Bahía de Biscayne entre Miami y Miami Beach. Con acceso directo al agua, una comunidad muy unida y nuevos desarrollos de lujo, ofrece una experiencia residencial apacible a solo minutos del continente.',
    },
    image: areaThumbnail('north-bay-village'),
    projectCount: 2,
    bannerImage: areaBanner('north-bay-village'),
    gallery: areaGallery('north-bay-village', 6),
  },
  {
    id: 'south-miami',
    name: 'South Miami',
    tagline: { en: 'Neighborhood Elegance', es: 'Elegancia de Vecindario' },
    description: {
      en: "South Miami is a tree-lined, family-friendly community with a small-town feel and a sophisticated lifestyle. Its walkable Sunset Drive district, excellent schools, and close-knit character make it one of the most livable and sought-after addresses in Miami-Dade.",
      es: 'South Miami es una comunidad arbolada y familiar con un ambiente de pueblo pequeño y un estilo de vida sofisticado. Su peatonal distrito de Sunset Drive, sus excelentes escuelas y su carácter cercano la convierten en una de las direcciones más habitables y solicitadas de Miami-Dade.',
    },
    image: areaThumbnail('south-miami'),
    projectCount: 0,
    bannerImage: areaBanner('south-miami'),
    gallery: areaGallery('south-miami', 6),
  },
  {
    id: 'homestead',
    name: 'Homestead',
    tagline: { en: 'Florida Living at Its Finest', es: 'La Vida en Florida en su Máxima Expresión' },
    description: {
      en: "Homestead offers an exceptional quality of life anchored by natural beauty — Everglades National Park, Biscayne Bay, and a thriving local community. New master-planned developments are bringing modern amenities and contemporary homes to this rapidly growing South Miami-Dade hub.",
      es: 'Homestead ofrece una calidad de vida excepcional anclada en la belleza natural: el Parque Nacional de los Everglades, la Bahía de Biscayne y una próspera comunidad local. Nuevos desarrollos planificados están trayendo amenidades modernas y viviendas contemporáneas a este centro de rápido crecimiento del sur de Miami-Dade.',
    },
    image: areaThumbnail('homestead'),
    projectCount: 5,
    bannerImage: areaBanner('homestead'),
    gallery: areaGallery('homestead', 6),
  },
  {
    id: 'pinecrest',
    name: 'Pinecrest',
    tagline: { en: 'Prestige & Privacy', es: 'Prestigio y Privacidad' },
    description: {
      en: "Pinecrest is synonymous with prestige — lush estate-sized lots, top-ranked schools, and a serene residential character that sets it apart in Miami-Dade. Often called 'the Beverly Hills of Miami,' its carefully curated housing stock appeals to the most discerning buyers.",
      es: 'Pinecrest es sinónimo de prestigio: frondosos lotes de tamaño señorial, escuelas de primer nivel y un sereno carácter residencial que la distingue en Miami-Dade. A menudo llamada "el Beverly Hills de Miami", su cuidada oferta de viviendas atrae a los compradores más exigentes.',
    },
    image: areaThumbnail('pinecrest'),
    projectCount: 3,
    bannerImage: areaBanner('pinecrest'),
    gallery: areaGallery('pinecrest', 6),
  },
  {
    id: 'doral',
    name: 'Doral',
    tagline: { en: 'Live, Work, Learn & Play', es: 'Vivir, Trabajar, Aprender y Disfrutar' },
    description: {
      en: "Doral's motto says it all. Strategically positioned near Miami International Airport with a thriving business ecosystem, world-class golf, diverse dining, and a large international community, Doral is one of Miami-Dade's fastest-growing and most dynamic cities.",
      es: 'El lema de Doral lo dice todo. Estratégicamente ubicada cerca del Aeropuerto Internacional de Miami, con un próspero ecosistema empresarial, golf de clase mundial, gastronomía diversa y una gran comunidad internacional, Doral es una de las ciudades de más rápido crecimiento y más dinámicas de Miami-Dade.',
    },
    image: areaThumbnail('doral'),
    projectCount: 0,
    bannerImage: areaBanner('doral'),
    gallery: areaGallery('doral', 6),
  },
  {
    id: 'hollywood',
    name: 'Hollywood',
    tagline: { en: 'The Broadwalk City', es: 'La Ciudad del Broadwalk' },
    description: {
      en: "Hollywood, Florida balances small-town charm with resort-style living. Its famous Broadwalk, pristine beaches, and a growing collection of luxury residences make it a top destination for buyers seeking beach proximity without the South Beach premium.",
      es: 'Hollywood, Florida, equilibra el encanto de un pueblo pequeño con un estilo de vida tipo resort. Su famoso Broadwalk, sus prístinas playas y una creciente colección de residencias de lujo la convierten en un destino preferido para compradores que buscan cercanía a la playa sin el sobreprecio de South Beach.',
    },
    image: areaThumbnail('hollywood'),
    projectCount: 3,
    bannerImage: areaBanner('hollywood'),
    gallery: areaGallery('hollywood', 6),
  },
  {
    id: 'aventura',
    name: 'Aventura',
    tagline: { en: 'Sophisticated Urban Living', es: 'Vida Urbana Sofisticada' },
    description: {
      en: "Aventura is a master-planned city that has grown into one of South Florida's most desirable addresses. Anchored by Aventura Mall — one of the largest shopping centers in the U.S. — and bordered by the Intracoastal Waterway, Aventura offers a polished, walkable lifestyle.",
      es: 'Aventura es una ciudad planificada que se ha convertido en una de las direcciones más deseadas del Sur de Florida. Anclada por Aventura Mall —uno de los centros comerciales más grandes de EE. UU.— y bordeada por el Intracoastal Waterway, Aventura ofrece un estilo de vida pulido y peatonal.',
    },
    image: areaThumbnail('aventura'),
    projectCount: 0,
    bannerImage: areaBanner('aventura'),
    gallery: areaGallery('aventura', 6),
  },
  {
    id: 'ft-lauderdale',
    name: 'Fort Lauderdale',
    tagline: { en: 'The Venice of America', es: 'La Venecia de América' },
    description: {
      en: "Fort Lauderdale's 165 miles of navigable waterways have earned it the title 'Venice of America.' From Las Olas Boulevard's upscale dining and boutiques to the pristine shoreline, Fort Lauderdale offers an elevated coastal lifestyle with exceptional value compared to Miami.",
      es: 'Las 165 millas de vías navegables de Fort Lauderdale le han valido el título de "Venecia de América". Desde la gastronomía y las boutiques de alto nivel de Las Olas Boulevard hasta la prístina costa, Fort Lauderdale ofrece un elevado estilo de vida costero con un valor excepcional en comparación con Miami.',
    },
    image: areaThumbnail('ft-lauderdale'),
    projectCount: 0,
    bannerImage: areaBanner('ft-lauderdale'),
    gallery: areaGallery('ft-lauderdale', 6),
  },
  {
    id: 'pompano-beach',
    name: 'Pompano Beach',
    tagline: { en: "Broward's Hidden Gem", es: 'La Joya Oculta de Broward' },
    description: {
      en: "Pompano Beach is Broward County's most exciting growth story. Its rapidly evolving beachfront, the acclaimed Pompano Beach Fishing Village, and a wave of new luxury developments are positioning it as the next great destination on Florida's Gold Coast.",
      es: 'Pompano Beach es la historia de crecimiento más emocionante del condado de Broward. Su costa en rápida evolución, la aclamada Pompano Beach Fishing Village y una ola de nuevos desarrollos de lujo la están posicionando como el próximo gran destino de la Gold Coast de Florida.',
    },
    image: areaThumbnail('pompano-beach'),
    projectCount: 2,
    bannerImage: areaBanner('pompano-beach'),
    gallery: areaGallery('pompano-beach', 6),
  },
  {
    id: 'west-palm-beach',
    name: 'West Palm Beach',
    tagline: { en: "Palm Beach County's Crown Jewel", es: 'La Joya de la Corona del Condado de Palm Beach' },
    description: {
      en: "West Palm Beach is Palm Beach County's vibrant cultural and commercial center. With its thriving arts scene, upscale dining on Clematis Street and CityPlace, and the glamour of nearby Palm Beach Island, it is one of Florida's most dynamic real estate markets.",
      es: 'West Palm Beach es el vibrante centro cultural y comercial del condado de Palm Beach. Con su próspera escena artística, su gastronomía de alto nivel en Clematis Street y CityPlace, y el glamour de la cercana Palm Beach Island, es uno de los mercados inmobiliarios más dinámicos de Florida.',
    },
    image: areaThumbnail('west-palm-beach'),
    projectCount: 1,
    bannerImage: areaBanner('west-palm-beach'),
    gallery: areaGallery('west-palm-beach', 6),
  },
  {
    id: 'orlando',
    name: 'Orlando',
    tagline: { en: 'Where Dreams Take Shape', es: 'Donde los Sueños Toman Forma' },
    description: {
      en: "Orlando is far more than theme parks — it is one of the fastest-growing metropolitan areas in the United States, with a booming economy, outstanding infrastructure, and a diverse real estate market offering everything from resort vacation homes to upscale urban residences.",
      es: 'Orlando es mucho más que parques temáticos: es una de las áreas metropolitanas de más rápido crecimiento de Estados Unidos, con una economía en auge, una infraestructura excepcional y un mercado inmobiliario diverso que ofrece desde casas de vacaciones tipo resort hasta residencias urbanas de alto nivel.',
    },
    image: areaThumbnail('orlando'),
    projectCount: 2,
    bannerImage: areaBanner('orlando'),
    gallery: areaGallery('orlando', 6),
  },
  {
    id: 'florida-city',
    name: 'Florida City',
    tagline: { en: 'Gateway to the Keys', es: 'La Puerta de Entrada a los Cayos' },
    description: {
      en: "Florida City is the southernmost city in Miami-Dade County and the gateway to the Florida Keys and Everglades. Its affordable new residential communities offer an exceptional lifestyle close to nature, with easy access to the greater South Miami corridor.",
      es: 'Florida City es la ciudad más al sur del condado de Miami-Dade y la puerta de entrada a los Cayos de Florida y los Everglades. Sus nuevas comunidades residenciales accesibles ofrecen un estilo de vida excepcional cerca de la naturaleza, con fácil acceso al corredor del sur de Miami.',
    },
    image: areaThumbnail('florida-city'),
    projectCount: 4,
    bannerImage: areaBanner('florida-city'),
    gallery: areaGallery('florida-city', 6),
  },
  {
    id: 'dania-beach',
    name: 'Dania Beach',
    tagline: { en: "Broward's Beachside Gem", es: 'La Joya Costera de Broward' },
    description: {
      en: "Dania Beach is Broward County's oldest city, now undergoing a vibrant renaissance. Its beachfront proximity, arts and antiques character, and proximity to Fort Lauderdale-Hollywood International Airport make it a compelling option for buyers and investors alike.",
      es: 'Dania Beach es la ciudad más antigua del condado de Broward, hoy en pleno y vibrante renacimiento. Su cercanía a la playa, su carácter de arte y antigüedades y su proximidad al Aeropuerto Internacional de Fort Lauderdale-Hollywood la convierten en una opción atractiva tanto para compradores como para inversores.',
    },
    image: areaThumbnail('dania-beach'),
    projectCount: 1,
    bannerImage: areaBanner('dania-beach'),
    gallery: areaGallery('dania-beach', 6),
  },
  {
    id: 'pembroke-pines',
    name: 'Pembroke Pines',
    tagline: { en: 'Suburban Sophistication', es: 'Sofisticación Suburbana' },
    description: {
      en: "Pembroke Pines is one of Broward County's most established and family-friendly cities. Excellent schools, diverse dining, accessible parks, and a well-planned suburban environment make it one of South Florida's most practical and livable communities.",
      es: 'Pembroke Pines es una de las ciudades más consolidadas y familiares del condado de Broward. Sus excelentes escuelas, su gastronomía diversa, sus accesibles parques y un entorno suburbano bien planificado la convierten en una de las comunidades más prácticas y habitables del Sur de Florida.',
    },
    image: areaThumbnail('pembroke-pines'),
    projectCount: 0,
    bannerImage: areaBanner('pembroke-pines'),
    gallery: areaGallery('pembroke-pines', 14),
  },
  {
    id: 'miami-design-district',
    name: 'Miami Design District',
    tagline: { en: 'Where Luxury Meets Art', es: 'Donde el Lujo se Encuentra con el Arte' },
    description: {
      en: "The Miami Design District is an internationally celebrated luxury shopping and cultural destination. Home to the world's finest fashion houses, cutting-edge galleries, and acclaimed restaurants, it represents the pinnacle of Miami's cultural renaissance and is emerging as a premier residential address.",
      es: 'El Miami Design District es un destino de compras de lujo y cultura célebre internacionalmente. Hogar de las casas de moda más prestigiosas del mundo, galerías de vanguardia y restaurantes aclamados, representa la cúspide del renacimiento cultural de Miami y emerge como una dirección residencial de primer nivel.',
    },
    image: areaThumbnail('miami-design-district'),
    projectCount: 1,
    bannerImage: areaBanner('miami-design-district'),
    gallery: areaGallery('miami-design-district', 6),
  },
  {
    id: 'miami-river',
    name: 'Miami River',
    tagline: { en: 'Waterfront Transformation', es: 'Transformación Frente al Agua' },
    description: {
      en: "The Miami River corridor is experiencing a remarkable transformation as world-class developers reimagine this historic waterfront with iconic luxury towers. Residents enjoy direct river access, sweeping bay views, and immediate connectivity to Brickell and Downtown.",
      es: 'El corredor del Miami River está experimentando una notable transformación a medida que desarrolladores de clase mundial reimaginan este histórico frente de agua con icónicas torres de lujo. Los residentes disfrutan de acceso directo al río, amplias vistas a la bahía y conectividad inmediata con Brickell y el centro.',
    },
    image: areaThumbnail('miami-river'),
    projectCount: 2,
    bannerImage: areaBanner('miami-river'),
    gallery: areaGallery('miami-river', 6),
  },
];
