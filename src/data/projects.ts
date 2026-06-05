import { LocaleString, Project } from './types';

type ProjectSeed = Omit<Project, 'description' | 'amenities' | 'features' | 'image' | 'floors' | 'units' | 'completionYear'>;

const beachAreas = new Set([
  'miami-beach',
  'sunny-isles',
  'hollywood',
  'pompano-beach',
  'dania-beach',
  'bay-harbor',
  'north-bay-village',
  'west-palm-beach',
]);

const amenityProfiles: Record<Project['type'], string[]> = {
  luxury: ['Infinity pool', 'Concierge', 'Fitness center', 'Spa', 'Valet parking', 'Residents lounge'],
  residential: ['Pool deck', 'Fitness studio', 'Co-working lounge', 'Children\'s playroom', 'Pet spa', '24-hour lobby'],
  resort: ['Resort pool', 'Clubhouse', 'Private cabanas', 'Fitness pavilion', 'Outdoor dining', 'Rental management'],
  branded: ['Signature concierge', 'Wellness spa', 'Private dining room', 'Valet parking', 'Sky lounge', 'Hospitality services'],
};

const urbanAmenityExtras = ['Wine lounge', 'Screening room', 'Business center', 'Private event suite', 'Rooftop terrace'];
const coastalAmenityExtras = ['Beach club', 'Sunrise yoga lawn', 'Private marina', 'Ocean-view lounge', 'Water sports concierge'];
const wellnessAmenityExtras = ['Cold plunge circuit', 'Meditation studio', 'Recovery suite', 'Nutrition lounge'];

const featureProfiles: Record<Project['type'], string[]> = {
  luxury: ['Floor-to-ceiling windows', 'Italian kitchen cabinetry', 'Quartz waterfall island', 'Spa-style primary bath', 'Smart home system'],
  residential: ['Open-plan interiors', 'Porcelain flooring', 'Integrated appliances', 'Custom wardrobes', 'Expansive terraces'],
  resort: ['Short-term rental flexibility', 'Designer furnishing packages', 'Indoor-outdoor living', 'Hospitality-managed arrivals', 'Family-ready layouts'],
  branded: ['Private elevator access', '10-ft ceilings', 'Architectural chef kitchens', 'Curated branded interiors', 'Seamless home automation'],
};

const completionMap: Record<Project['status'], string[]> = {
  'pre-construction': ['2027', '2028', '2029'],
  'under-construction': ['2026', '2027', '2028'],
  completed: ['Now'],
};

/** Spanish translations for every amenity/feature term used in the pools above. */
const esTerms: Record<string, string> = {
  // Amenities
  'Infinity pool': 'Piscina infinita',
  'Concierge': 'Conserjería',
  'Fitness center': 'Gimnasio',
  'Spa': 'Spa',
  'Valet parking': 'Valet parking',
  'Residents lounge': 'Salón de residentes',
  'Pool deck': 'Terraza de piscina',
  'Fitness studio': 'Estudio de fitness',
  'Co-working lounge': 'Salón de coworking',
  'Children\'s playroom': 'Sala de juegos infantil',
  'Pet spa': 'Spa para mascotas',
  '24-hour lobby': 'Lobby 24 horas',
  'Resort pool': 'Piscina tipo resort',
  'Clubhouse': 'Casa club',
  'Private cabanas': 'Cabañas privadas',
  'Fitness pavilion': 'Pabellón de fitness',
  'Outdoor dining': 'Comedor al aire libre',
  'Rental management': 'Gestión de alquileres',
  'Signature concierge': 'Conserjería exclusiva',
  'Wellness spa': 'Spa de bienestar',
  'Private dining room': 'Comedor privado',
  'Sky lounge': 'Sky lounge',
  'Hospitality services': 'Servicios de hospitalidad',
  'Wine lounge': 'Salón de vinos',
  'Screening room': 'Sala de cine',
  'Business center': 'Centro de negocios',
  'Private event suite': 'Suite privada para eventos',
  'Rooftop terrace': 'Terraza en la azotea',
  'Beach club': 'Club de playa',
  'Sunrise yoga lawn': 'Jardín de yoga al amanecer',
  'Private marina': 'Marina privada',
  'Ocean-view lounge': 'Salón con vista al mar',
  'Water sports concierge': 'Conserjería de deportes acuáticos',
  'Cold plunge circuit': 'Circuito de inmersión fría',
  'Meditation studio': 'Estudio de meditación',
  'Recovery suite': 'Suite de recuperación',
  'Nutrition lounge': 'Salón de nutrición',
  // Features
  'Floor-to-ceiling windows': 'Ventanales de piso a techo',
  'Italian kitchen cabinetry': 'Gabinetes de cocina italianos',
  'Quartz waterfall island': 'Isla de cuarzo tipo cascada',
  'Spa-style primary bath': 'Baño principal estilo spa',
  'Smart home system': 'Sistema de hogar inteligente',
  'Open-plan interiors': 'Interiores de planta abierta',
  'Porcelain flooring': 'Pisos de porcelana',
  'Integrated appliances': 'Electrodomésticos integrados',
  'Custom wardrobes': 'Clósets a medida',
  'Expansive terraces': 'Amplias terrazas',
  'Short-term rental flexibility': 'Flexibilidad de alquiler a corto plazo',
  'Designer furnishing packages': 'Paquetes de mobiliario de diseñador',
  'Indoor-outdoor living': 'Vida interior-exterior',
  'Hospitality-managed arrivals': 'Llegadas gestionadas por hospitalidad',
  'Family-ready layouts': 'Distribuciones ideales para familias',
  'Private elevator access': 'Acceso por ascensor privado',
  '10-ft ceilings': 'Techos de 10 pies',
  'Architectural chef kitchens': 'Cocinas de chef arquitectónicas',
  'Curated branded interiors': 'Interiores de marca curados',
  'Seamless home automation': 'Automatización del hogar sin fisuras',
  'Deep terraces': 'Terrazas profundas',
  'Summer kitchen options': 'Opciones de cocina de verano',
  'Panoramic water views': 'Vistas panorámicas al agua',
  'Double-height lobby arrival': 'Llegada a lobby de doble altura',
  'Home office niche': 'Rincón de oficina en casa',
  'Private storage options': 'Opciones de almacenamiento privado',
};

const typeCopy: Record<Project['type'], LocaleString> = {
  luxury: {
    en: 'Architecture-forward homes, resort-inspired amenities, and an owner-focused service program make it especially attractive for buyers seeking everyday luxury with lasting value.',
    es: 'Su arquitectura de vanguardia, sus amenidades inspiradas en resorts y un programa de servicio enfocado en el propietario lo hacen especialmente atractivo para compradores que buscan el lujo cotidiano con un valor duradero.',
  },
  residential: {
    en: 'Thoughtful layouts, approachable luxury, and amenity spaces designed for daily living give the project wide appeal for both primary residents and investors.',
    es: 'Sus distribuciones bien pensadas, su lujo accesible y sus espacios de amenidades diseñados para la vida diaria le dan un amplio atractivo tanto para residentes principales como para inversores.',
  },
  resort: {
    en: 'Vacation-minded programming, flexible ownership appeal, and a hospitality-led arrival experience position it as a compelling lifestyle and investment play.',
    es: 'Su programación pensada para las vacaciones, su atractivo de propiedad flexible y una experiencia de llegada liderada por la hospitalidad lo posicionan como una convincente apuesta de estilo de vida e inversión.',
  },
  branded: {
    en: 'A globally recognized brand, elevated service culture, and instantly legible design language create a collectible address with international cachet.',
    es: 'Una marca reconocida a nivel mundial, una cultura de servicio elevada y un lenguaje de diseño instantáneamente legible crean una dirección coleccionable con prestigio internacional.',
  },
};

const statusCopy: Record<Project['status'], LocaleString> = {
  'pre-construction': {
    en: 'For early buyers, the current release offers the chance to secure pricing ahead of completion while the surrounding market continues to appreciate.',
    es: 'Para los compradores tempranos, el lanzamiento actual ofrece la oportunidad de asegurar precios antes de la finalización mientras el mercado circundante continúa revalorizándose.',
  },
  'under-construction': {
    en: 'With construction already advancing, purchasers benefit from visible momentum, clearer delivery timelines, and growing confidence in the address.',
    es: 'Con la construcción ya avanzando, los compradores se benefician de un impulso visible, plazos de entrega más claros y una confianza creciente en la dirección.',
  },
  completed: {
    en: 'As a completed offering, it delivers immediate enjoyment, turnkey convenience, and proven presence in one of South Florida\'s most desirable markets.',
    es: 'Como una oferta terminada, brinda disfrute inmediato, comodidad llave en mano y una presencia probada en uno de los mercados más deseados del Sur de Florida.',
  },
};

const projectSeeds: ProjectSeed[] = [
  { id: 'baccarat', name: 'Baccarat Residences', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'French artistry on the Miami River', es: 'Arte francés sobre el Miami River' }, priceFrom: '$2.4M', type: 'branded', status: 'under-construction', featured: true },
  { id: 'domus-brickell-center', name: 'Domus Brickell Center', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Flexible urban residences steps from the center of it all', es: 'Residencias urbanas flexibles a pasos del centro de todo' }, priceFrom: '$780K', type: 'residential', status: 'under-construction' },
  { id: 'domus', name: 'Domus', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Short-stay ready luxury with a cosmopolitan rhythm', es: 'Lujo listo para estancias cortas con ritmo cosmopolita' }, priceFrom: '$720K', type: 'residential', status: 'completed' },
  { id: '1428-brickell', name: '1428 Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Solar-powered skyline living for a new era', es: 'Vida en el horizonte con energía solar para una nueva era' }, priceFrom: '$2.1M', type: 'luxury', status: 'under-construction' },
  { id: 'lofty', name: 'Lofty Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Design-forward residences created for ownership and flexibility', es: 'Residencias de diseño creadas para la propiedad y la flexibilidad' }, priceFrom: '$860K', type: 'luxury', status: 'pre-construction' },
  { id: 'ora', name: 'ORA by Casa Tua', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Italian hospitality meets Brickell sophistication', es: 'La hospitalidad italiana se une a la sofisticación de Brickell' }, priceFrom: '$1.2M', type: 'branded', status: 'pre-construction' },
  { id: 'cipriani', name: 'Cipriani Residences Miami', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Legendary service with a waterfront address', es: 'Servicio legendario con una dirección frente al agua' }, priceFrom: '$1.8M', type: 'branded', status: 'under-construction', featured: true },
  { id: 'mercedes-benz-places-miami', name: 'Mercedes-Benz Places Miami', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Mobility, design, and elevated city living united', es: 'Movilidad, diseño y vida urbana elevada en una sola dirección' }, priceFrom: '$1.1M', type: 'branded', status: 'pre-construction' },
  { id: '2200-brickell', name: '2200 Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Boutique Brickell living with leafy residential calm', es: 'Vida boutique en Brickell con la calma residencial del verdor' }, priceFrom: '$930K', type: 'luxury', status: 'under-construction' },
  { id: '888-brickell-dolce-and-gabbana-residences', name: '888 Brickell by Dolce & Gabbana', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Italian fashion house glamour in the sky', es: 'El glamour de la casa de moda italiana en el cielo' }, priceFrom: '$2.6M', type: 'branded', status: 'pre-construction', featured: true },
  { id: 'viceroy-brickell', name: 'Viceroy Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Hospitality-infused residences overlooking the bay', es: 'Residencias impregnadas de hospitalidad con vista a la bahía' }, priceFrom: '$1.3M', type: 'branded', status: 'pre-construction' },
  { id: 'st-regis-brickell', name: 'St. Regis Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'A celebrated service legacy arrives on Brickell Avenue', es: 'Un célebre legado de servicio llega a Brickell Avenue' }, priceFrom: '$4.2M', type: 'branded', status: 'under-construction' },
  { id: 'parkside', name: 'Parkside', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Family-oriented luxury near Brickell\'s green edge', es: 'Lujo orientado a la familia junto al borde verde de Brickell' }, priceFrom: '$890K', type: 'residential', status: 'pre-construction' },
  { id: 'house-of-wellness-brickell', name: 'House of Wellness Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: { en: 'Holistic living curated around recovery and ritual', es: 'Vida holística curada en torno a la recuperación y el ritual' }, priceFrom: '$1.4M', type: 'luxury', status: 'pre-construction' },
  { id: 'ella', name: 'Ella Miami Beach', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'A boutique beach retreat with vintage glamour', es: 'Un refugio boutique de playa con glamour vintage' }, priceFrom: '$790K', type: 'luxury', status: 'under-construction' },
  { id: 'five-park', name: 'Five Park', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'A sculptural landmark reimagining South Beach luxury', es: 'Un hito escultórico que reimagina el lujo de South Beach' }, priceFrom: '$1.7M', type: 'luxury', status: 'under-construction', featured: true },
  { id: 'nexo', name: 'Nexo Residences', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'Modern ownership with smart flexibility', es: 'Propiedad moderna con flexibilidad inteligente' }, priceFrom: '$690K', type: 'residential', status: 'under-construction' },
  { id: 'one-park', name: 'One Park Tower', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'Grand-scale living moments from the shoreline', es: 'Vida a gran escala a momentos de la costa' }, priceFrom: '$1.35M', type: 'luxury', status: 'pre-construction', featured: true },
  { id: '72-park', name: '72 Park', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'Flexible ownership for a new generation of buyers', es: 'Propiedad flexible para una nueva generación de compradores' }, priceFrom: '$850K', type: 'luxury', status: 'under-construction' },
  { id: 'palma', name: 'Palma Miami Beach', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'Quiet waterfront elegance in North Beach', es: 'Elegancia tranquila frente al agua en North Beach' }, priceFrom: '$1.05M', type: 'luxury', status: 'pre-construction' },
  { id: 'the-william', name: 'The William', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'Intimate designer residences in a boutique format', es: 'Residencias de diseñador íntimas en formato boutique' }, priceFrom: '$2.2M', type: 'luxury', status: 'pre-construction' },
  { id: '72-carlyle', name: '72 Carlyle', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'A polished address balancing beach access and calm', es: 'Una dirección pulida que equilibra el acceso a la playa y la calma' }, priceFrom: '$980K', type: 'luxury', status: 'completed' },
  { id: 'faena-residences', name: 'Faena Residences', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: { en: 'A collector-grade expression of art, culture, and beachfront prestige', es: 'Una expresión de nivel coleccionista de arte, cultura y prestigio frente al mar' }, priceFrom: '$3.9M', type: 'branded', status: 'pre-construction' },
  { id: 'aria-reserve', name: 'Aria Reserve', areaId: 'edgewater', areaName: 'Edgewater', tagline: { en: 'Twin waterfront towers with uninterrupted bay horizons', es: 'Torres gemelas frente al agua con horizontes ininterrumpidos de la bahía' }, priceFrom: '$1.6M', type: 'luxury', status: 'under-construction', featured: true },
  { id: 'missoni-baia', name: 'Missoni Baia', areaId: 'edgewater', areaName: 'Edgewater', tagline: { en: 'Fashion-led design and a private bayfront club', es: 'Diseño liderado por la moda y un club privado frente a la bahía' }, priceFrom: '$1.5M', type: 'branded', status: 'completed' },
  { id: 'edition-residences', name: 'Edition Residences Miami', areaId: 'edgewater', areaName: 'Edgewater', tagline: { en: 'Refined waterfront living from an iconic hospitality brand', es: 'Refinada vida frente al agua de una icónica marca de hospitalidad' }, priceFrom: '$2.7M', type: 'branded', status: 'under-construction' },
  { id: 'the-villa', name: 'The Villa', areaId: 'edgewater', areaName: 'Edgewater', tagline: { en: 'Bayfront privacy with contemporary architectural clarity', es: 'Privacidad frente a la bahía con claridad arquitectónica contemporánea' }, priceFrom: '$1.25M', type: 'luxury', status: 'pre-construction' },
  { id: 'vida', name: 'Vida Residences', areaId: 'edgewater', areaName: 'Edgewater', tagline: { en: 'Well-composed residences for elevated daily living', es: 'Residencias bien compuestas para una vida diaria elevada' }, priceFrom: '$920K', type: 'residential', status: 'pre-construction' },
  { id: 'elle-residences', name: 'Elle Residences', areaId: 'edgewater', areaName: 'Edgewater', tagline: { en: 'Editorial glamour with a fashion-forward spirit', es: 'Glamour editorial con un espíritu vanguardista de la moda' }, priceFrom: '$1.1M', type: 'branded', status: 'pre-construction' },
  { id: 'edge-house-residences', name: 'Edge House Residences', areaId: 'edgewater', areaName: 'Edgewater', tagline: { en: 'Flexible luxury ownership for urban tastemakers', es: 'Propiedad de lujo flexible para creadores de tendencias urbanos' }, priceFrom: '$890K', type: 'luxury', status: 'under-construction' },
  { id: 'aston-martin', name: 'Aston Martin Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: { en: 'Automotive-inspired design at the edge of Biscayne Bay', es: 'Diseño inspirado en el automovilismo al borde de la Bahía de Biscayne' }, priceFrom: '$2.8M', type: 'branded', status: 'completed' },
  { id: 'casa-bella', name: 'Casa Bella Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: { en: 'Italian refinement overlooking the city and bay', es: 'Refinamiento italiano con vista a la ciudad y la bahía' }, priceFrom: '$1.45M', type: 'luxury', status: 'under-construction' },
  { id: 'the-elser', name: 'The Elser Hotel & Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: { en: 'A hospitality-led address in the heart of the action', es: 'Una dirección liderada por la hospitalidad en el corazón de la acción' }, priceFrom: '$820K', type: 'branded', status: 'completed' },
  { id: 'w11', name: 'W11', areaId: 'downtown', areaName: 'Downtown Miami', tagline: { en: 'A design-driven lifestyle tower at Miami Worldcenter', es: 'Una torre de estilo de vida impulsada por el diseño en Miami Worldcenter' }, priceFrom: '$940K', type: 'branded', status: 'pre-construction' },
  { id: 'waldorf-astoria', name: 'Waldorf Astoria Hotel & Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: { en: 'A stacked-glass icon with world-class hospitality', es: 'Un ícono de cristal apilado con hospitalidad de clase mundial' }, priceFrom: '$1.9M', type: 'branded', status: 'under-construction', featured: true },
  { id: 'jem', name: 'JEM Private Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: { en: 'Private ownership elevated by cultural connectivity', es: 'Propiedad privada elevada por la conectividad cultural' }, priceFrom: '$970K', type: 'luxury', status: 'pre-construction' },
  { id: 'vista-harbor', name: 'Vista Harbor', areaId: 'downtown', areaName: 'Downtown Miami', tagline: { en: 'Boutique downtown living with cinematic skyline views', es: 'Vida boutique en el centro con vistas cinematográficas del horizonte' }, priceFrom: '$875K', type: 'luxury', status: 'pre-construction' },
  { id: 'la-baia', name: 'La Baia North', areaId: 'bay-harbor', areaName: 'Bay Harbor Islands', tagline: { en: 'Boutique waterfront living with island intimacy', es: 'Vida boutique frente al agua con intimidad insular' }, priceFrom: '$1.2M', type: 'luxury', status: 'under-construction' },
  { id: 'la-maré', name: 'La Maré', areaId: 'bay-harbor', areaName: 'Bay Harbor Islands', tagline: { en: 'Contemporary calm beside calm waters and marinas', es: 'Calma contemporánea junto a aguas tranquilas y marinas' }, priceFrom: '$1.45M', type: 'luxury', status: 'completed' },
  { id: 'origin', name: 'Origin Residences', areaId: 'bay-harbor', areaName: 'Bay Harbor Islands', tagline: { en: 'A clean-lined address for modern island living', es: 'Una dirección de líneas limpias para la vida insular moderna' }, priceFrom: '$980K', type: 'residential', status: 'pre-construction' },
  { id: 'the-well', name: 'The Well Bay Harbor', areaId: 'bay-harbor', areaName: 'Bay Harbor Islands', tagline: { en: 'Wellness-centric ownership in a serene enclave', es: 'Propiedad centrada en el bienestar en un sereno enclave' }, priceFrom: '$1.55M', type: 'luxury', status: 'under-construction' },
  { id: 'vita', name: 'Vita Coconut Grove', areaId: 'coconut-grove', areaName: 'Coconut Grove', tagline: { en: 'Ultra-private bayfront residences for the discerning few', es: 'Residencias ultraprivadas frente a la bahía para unos pocos exigentes' }, priceFrom: '$5.8M', type: 'luxury', status: 'under-construction' },
  { id: 'the-well-coconut-grove', name: 'The Well Coconut Grove', areaId: 'coconut-grove', areaName: 'Coconut Grove', tagline: { en: 'Holistic design rooted in grove tranquility', es: 'Diseño holístico arraigado en la tranquilidad del Grove' }, priceFrom: '$1.9M', type: 'luxury', status: 'pre-construction' },
  { id: 'the-avenue', name: 'The Avenue', areaId: 'coral-gables', areaName: 'Coral Gables', tagline: { en: 'Mediterranean sophistication with boutique scale', es: 'Sofisticación mediterránea a escala boutique' }, priceFrom: '$1.35M', type: 'luxury', status: 'pre-construction' },
  { id: 'cora-merrick-park', name: 'Cora at Merrick Park', areaId: 'coral-gables', areaName: 'Coral Gables', tagline: { en: 'Walkable luxury beside one of Miami\'s premier retail destinations', es: 'Lujo peatonal junto a uno de los principales destinos comerciales de Miami' }, priceFrom: '$990K', type: 'luxury', status: 'under-construction' },
  { id: 'cassia', name: 'Cassia Coral Gables', areaId: 'coral-gables', areaName: 'Coral Gables', tagline: { en: 'Classic elegance reinterpreted for modern ownership', es: 'Elegancia clásica reinterpretada para la propiedad moderna' }, priceFrom: '$1.1M', type: 'luxury', status: 'completed' },
  { id: 'bentley-residences', name: 'Bentley Residences', areaId: 'sunny-isles', areaName: 'Sunny Isles Beach', tagline: { en: 'Oceanfront grandeur with signature in-residence car lifts', es: 'Grandiosidad frente al mar con icónicos ascensores de autos en la residencia' }, priceFrom: '$5.5M', type: 'branded', status: 'under-construction', featured: true },
  { id: 'st-regis', name: 'St. Regis Sunny Isles', areaId: 'sunny-isles', areaName: 'Sunny Isles Beach', tagline: { en: 'Tailored service and Atlantic-facing elegance', es: 'Servicio a medida y elegancia frente al Atlántico' }, priceFrom: '$4.8M', type: 'branded', status: 'under-construction' },
  { id: 'the-mansions-at-acqualina', name: 'The Mansions at Acqualina', areaId: 'sunny-isles', areaName: 'Sunny Isles Beach', tagline: { en: 'A fully realized oceanfront classic for legacy ownership', es: 'Un clásico frente al mar plenamente realizado para una propiedad de legado' }, priceFrom: '$6.9M', type: 'branded', status: 'completed' },
  { id: 'salerno-estates', name: 'Salerno Estates', areaId: 'homestead', areaName: 'Homestead', tagline: { en: 'Spacious family homes with a polished suburban feel', es: 'Amplias casas familiares con un pulido ambiente suburbano' }, priceFrom: '$590K', type: 'residential', status: 'under-construction' },
  { id: 'sedona-estates', name: 'Sedona Estates', areaId: 'homestead', areaName: 'Homestead', tagline: { en: 'Modern residences with room to grow', es: 'Residencias modernas con espacio para crecer' }, priceFrom: '$545K', type: 'residential', status: 'pre-construction' },
  { id: 'silverland-estates', name: 'Silverland Estates', areaId: 'homestead', areaName: 'Homestead', tagline: { en: 'New-construction comfort rooted in community', es: 'Confort de nueva construcción arraigado en la comunidad' }, priceFrom: '$520K', type: 'residential', status: 'under-construction' },
  { id: 'terra-sol', name: 'Terra Sol', areaId: 'homestead', areaName: 'Homestead', tagline: { en: 'Sunlit homes designed for everyday ease', es: 'Casas llenas de luz diseñadas para la comodidad diaria' }, priceFrom: '$610K', type: 'residential', status: 'pre-construction' },
  { id: 'on-grandville', name: 'On Grandville', areaId: 'homestead', areaName: 'Homestead', tagline: { en: 'Contemporary residences with strong long-term value', es: 'Residencias contemporáneas con sólido valor a largo plazo' }, priceFrom: '$560K', type: 'residential', status: 'completed' },
  { id: 'centris', name: 'Centris Pinecrest', areaId: 'pinecrest', areaName: 'Pinecrest', tagline: { en: 'Estate-style living in one of Miami\'s most prized enclaves', es: 'Vida estilo finca en uno de los enclaves más preciados de Miami' }, priceFrom: '$2.9M', type: 'luxury', status: 'pre-construction' },
  { id: 'pine-rockland-estates', name: 'Pine Rockland Estates', areaId: 'pinecrest', areaName: 'Pinecrest', tagline: { en: 'Large-format residences framed by lush landscaping', es: 'Residencias de gran formato enmarcadas por una frondosa vegetación' }, priceFrom: '$3.4M', type: 'luxury', status: 'under-construction' },
  { id: 'pine-park-villas', name: 'Pine Park Villas', areaId: 'pinecrest', areaName: 'Pinecrest', tagline: { en: 'Boutique luxury townhomes with a private feel', es: 'Townhomes de lujo boutique con un ambiente privado' }, priceFrom: '$1.75M', type: 'luxury', status: 'completed' },
  { id: 'icon-beach-residences', name: 'Icon Beach Residences', areaId: 'hollywood', areaName: 'Hollywood', tagline: { en: 'Coastal refinement moments from the Broadwalk', es: 'Refinamiento costero a momentos del Broadwalk' }, priceFrom: '$1.1M', type: 'luxury', status: 'pre-construction' },
  { id: 'seven-park-residences', name: 'Seven Park Residences', areaId: 'hollywood', areaName: 'Hollywood', tagline: { en: 'A sleek residential address with resort energy', es: 'Una elegante dirección residencial con energía de resort' }, priceFrom: '$860K', type: 'luxury', status: 'under-construction' },
  { id: 'gaia-residences', name: 'Gaia Residences Hollywood', areaId: 'hollywood', areaName: 'Hollywood', tagline: { en: 'Contemporary homes inspired by sea breezes and light', es: 'Casas contemporáneas inspiradas en las brisas marinas y la luz' }, priceFrom: '$790K', type: 'residential', status: 'pre-construction' },
  { id: 'midtown-park-residences', name: 'Midtown Park Residences', areaId: 'midtown-miami', areaName: 'Midtown Miami', tagline: { en: 'A mixed-use address at the center of Miami\'s design circuit', es: 'Una dirección de uso mixto en el centro del circuito de diseño de Miami' }, priceFrom: '$980K', type: 'luxury', status: 'pre-construction' },
  { id: 'the-standard-residences', name: 'The Standard Residences Midtown', areaId: 'midtown-miami', areaName: 'Midtown Miami', tagline: { en: 'Playful hospitality and curated urban wellness', es: 'Hospitalidad desenfadada y bienestar urbano curado' }, priceFrom: '$1.05M', type: 'branded', status: 'under-construction' },
  { id: 'jean-georges-miami-tropic-residences', name: 'Jean-Georges Miami Tropic Residences', areaId: 'midtown-miami', areaName: 'Midtown Miami', tagline: { en: 'Culinary prestige and tropical modernism in Midtown', es: 'Prestigio culinario y modernismo tropical en Midtown' }, priceFrom: '$1.25M', type: 'branded', status: 'pre-construction' },
  { id: 'tula-residences', name: 'Tula Residences', areaId: 'midtown-miami', areaName: 'Midtown Miami', tagline: { en: 'Boutique urban living with clean architectural lines', es: 'Vida urbana boutique con líneas arquitectónicas limpias' }, priceFrom: '$920K', type: 'luxury', status: 'pre-construction' },
  { id: 'alba', name: 'Alba Florida City', areaId: 'florida-city', areaName: 'Florida City', tagline: { en: 'Freshly designed homes at the gateway to the Keys', es: 'Casas de diseño fresco en la puerta de entrada a los Cayos' }, priceFrom: '$420K', type: 'residential', status: 'under-construction' },
  { id: 'oasis', name: 'Oasis Florida City', areaId: 'florida-city', areaName: 'Florida City', tagline: { en: 'A new neighborhood built around comfort and access', es: 'Un nuevo vecindario construido en torno a la comodidad y el acceso' }, priceFrom: '$435K', type: 'residential', status: 'pre-construction' },
  { id: 'parc-villas', name: 'Parc Villas', areaId: 'florida-city', areaName: 'Florida City', tagline: { en: 'Low-maintenance contemporary homes with outdoor appeal', es: 'Casas contemporáneas de bajo mantenimiento con atractivo exterior' }, priceFrom: '$399K', type: 'residential', status: 'completed' },
  { id: 'park-square', name: 'Park Square', areaId: 'florida-city', areaName: 'Florida City', tagline: { en: 'Well-priced residences with strong growth potential', es: 'Residencias a buen precio con sólido potencial de crecimiento' }, priceFrom: '$410K', type: 'residential', status: 'under-construction' },
  { id: 'nomad-residences', name: 'Nomad Residences Wynwood', areaId: 'wynwood', areaName: 'Wynwood', tagline: { en: 'A flexible ownership concept rooted in culture and design', es: 'Un concepto de propiedad flexible arraigado en la cultura y el diseño' }, priceFrom: '$760K', type: 'branded', status: 'under-construction' },
  { id: 'shoma-bay', name: 'Shoma Bay', areaId: 'north-bay-village', areaName: 'North Bay Village', tagline: { en: 'A reimagined island address with panoramic bay views', es: 'Una dirección insular reimaginada con vistas panorámicas a la bahía' }, priceFrom: '$840K', type: 'luxury', status: 'under-construction' },
  { id: 'tula-residences', name: 'Tula Residences North Bay', areaId: 'north-bay-village', areaName: 'North Bay Village', tagline: { en: 'Boutique waterfront residences with an intimate scale', es: 'Residencias boutique frente al agua con una escala íntima' }, priceFrom: '$790K', type: 'luxury', status: 'pre-construction' },
  { id: 'w-pompano-beach', name: 'W Pompano Beach Residences', areaId: 'pompano-beach', areaName: 'Pompano Beach', tagline: { en: 'Lifestyle-driven beachfront ownership with W flair', es: 'Propiedad frente a la playa impulsada por el estilo de vida con el sello W' }, priceFrom: '$1.45M', type: 'branded', status: 'pre-construction' },
  { id: 'envy-residence', name: 'Envy Residences Pompano', areaId: 'pompano-beach', areaName: 'Pompano Beach', tagline: { en: 'Contemporary coastal residences with striking water views', es: 'Residencias costeras contemporáneas con impactantes vistas al agua' }, priceFrom: '$995K', type: 'luxury', status: 'under-construction' },
  { id: 'kempinski-residences', name: 'Kempinski Residences Design District', areaId: 'miami-design-district', areaName: 'Miami Design District', tagline: { en: 'European hospitality and couture-adjacent living', es: 'Hospitalidad europea y una vida cercana a la alta costura' }, priceFrom: '$1.8M', type: 'branded', status: 'pre-construction' },
  { id: '14-river-district', name: '14 River District', areaId: 'miami-river', areaName: 'Miami River', tagline: { en: 'A modern riverfront district created for connected urban life', es: 'Un moderno distrito frente al río creado para una vida urbana conectada' }, priceFrom: '$780K', type: 'luxury', status: 'under-construction' },
  { id: 'faena-residences', name: 'Faena Residences Miami River', areaId: 'miami-river', areaName: 'Miami River', tagline: { en: 'A visionary branded community overlooking the river bend', es: 'Una visionaria comunidad de marca con vista al recodo del río' }, priceFrom: '$1.95M', type: 'branded', status: 'pre-construction' },
  { id: 'alba-palm-beach', name: 'Alba Palm Beach', areaId: 'west-palm-beach', areaName: 'West Palm Beach', tagline: { en: 'An elegant waterfront address for Palm Beach lifestyles', es: 'Una elegante dirección frente al agua para los estilos de vida de Palm Beach' }, priceFrom: '$2.2M', type: 'luxury', status: 'under-construction' },
  { id: 'windsor-cay-resort', name: 'Windsor Cay Resort', areaId: 'orlando', areaName: 'Orlando', tagline: { en: 'A vacation-home resort designed for leisure and flexibility', es: 'Un resort de casas de vacaciones diseñado para el ocio y la flexibilidad' }, priceFrom: '$690K', type: 'resort', status: 'under-construction' },
  { id: 'doppio', name: 'Doppio Orlando', areaId: 'orlando', areaName: 'Orlando', tagline: { en: 'A dual-lifestyle resort concept near Orlando\'s major attractions', es: 'Un concepto de resort de doble estilo de vida cerca de las principales atracciones de Orlando' }, priceFrom: '$630K', type: 'resort', status: 'pre-construction' },
  { id: 'dania-project', name: 'Dania Beach Residences', areaId: 'dania-beach', areaName: 'Dania Beach', tagline: { en: 'Modern coastal living near marina, airport, and beach', es: 'Vida costera moderna cerca de la marina, el aeropuerto y la playa' }, priceFrom: '$720K', type: 'luxury', status: 'pre-construction' },
];

function rotateTake(values: string[], start: number, count: number) {
  return Array.from({ length: count }, (_, offset) => values[(start + offset) % values.length]);
}

/** Convert an English term list into bilingual LocaleString entries. */
function toLocaleList(terms: string[]): LocaleString[] {
  return terms.map((en) => ({ en, es: esTerms[en] ?? en }));
}

function buildAmenities(project: ProjectSeed, index: number): LocaleString[] {
  const base = amenityProfiles[project.type];
  const local = beachAreas.has(project.areaId) ? coastalAmenityExtras : urbanAmenityExtras;
  const wellness = /well|wellness/i.test(project.name) ? wellnessAmenityExtras : [];
  const terms = Array.from(new Set([...base, ...rotateTake(local, index, 2), ...wellness])).slice(0, 7);
  return toLocaleList(terms);
}

function buildFeatures(project: ProjectSeed, index: number): LocaleString[] {
  const extras = beachAreas.has(project.areaId)
    ? ['Deep terraces', 'Summer kitchen options', 'Panoramic water views']
    : ['Double-height lobby arrival', 'Home office niche', 'Private storage options'];
  const terms = Array.from(new Set([...featureProfiles[project.type], ...rotateTake(extras, index, 2)])).slice(0, 7);
  return toLocaleList(terms);
}

function buildDescription(project: ProjectSeed, index: number): LocaleString {
  const enTag = project.tagline.en.toLowerCase();
  const esTag = project.tagline.es.toLowerCase();

  const enOpeners = [
    `${project.name} brings ${enTag} to ${project.areaName}, pairing striking architecture with the polish and ease today's luxury buyers expect in South Florida.`,
    `${project.name} is poised to become one of the most talked-about addresses in ${project.areaName}, where ${enTag} meets hospitality-led living and refined contemporary design.`,
    `${project.name} introduces a fresh point of view to ${project.areaName}, balancing elevated amenities, strong design credentials, and the lifestyle convenience that drives long-term demand.`,
    `${project.name} captures the momentum of ${project.areaName} with ${enTag}, creating a residence collection that feels both current and enduring in equal measure.`,
  ];

  const esOpeners = [
    `${project.name} trae ${esTag} a ${project.areaName}, combinando una arquitectura impactante con el refinamiento y la comodidad que los compradores de lujo de hoy esperan en el Sur de Florida.`,
    `${project.name} está destinado a convertirse en una de las direcciones más comentadas de ${project.areaName}, donde ${esTag} se une a una vida liderada por la hospitalidad y un diseño contemporáneo refinado.`,
    `${project.name} introduce un punto de vista fresco en ${project.areaName}, equilibrando amenidades elevadas, sólidas credenciales de diseño y la comodidad de estilo de vida que impulsa la demanda a largo plazo.`,
    `${project.name} captura el impulso de ${project.areaName} con ${esTag}, creando una colección de residencias que se siente a la vez actual y perdurable en igual medida.`,
  ];

  const i = index % enOpeners.length;
  return {
    en: `${enOpeners[i]} ${typeCopy[project.type].en} ${statusCopy[project.status].en}`,
    es: `${esOpeners[i]} ${typeCopy[project.type].es} ${statusCopy[project.status].es}`,
  };
}

const S3_BASE = 'https://pagina-mama.s3.amazonaws.com/assets2/desarrollos';
const S3_AREAS_BASE = 'https://pagina-mama.s3.amazonaws.com/assets2/areas';

function buildGallery(projectId: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${S3_BASE}/${projectId}/image-gallery/image (${i + 1}).jpg`);
}

export const projects: Project[] = projectSeeds.map((project, index) => {
  const unitCount = 90 + ((index * 13) % 260);
  return {
    ...project,
    image: `${S3_BASE}/${project.id}/image-gallery/image (1).jpg`,
    thumbnail: `${S3_AREAS_BASE}/${project.areaId}/${project.id}.webp`,
    description: buildDescription(project, index),
    amenities: buildAmenities(project, index),
    features: buildFeatures(project, index),
    floors: 18 + (index % 45),
    units: { en: `${unitCount} residences`, es: `${unitCount} residencias` },
    completionYear: completionMap[project.status][index % completionMap[project.status].length],
    gallery: buildGallery(project.id, 6 + (index % 5)),
    factsheetPdf: `${S3_BASE}/${project.id}/pdfs/hoja.pdf`,
    floorplansPdf: `${S3_BASE}/${project.id}/pdfs/planos.pdf`,
    videoUrl: `${S3_BASE}/${project.id}/video.mp4`,
  };
});

export const featuredProjects = projects.filter((project) => project.featured);
