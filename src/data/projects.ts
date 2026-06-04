import { Project } from './types';

type ProjectSeed = Omit<Project, 'description' | 'amenities' | 'features' | 'image' | 'floors' | 'units' | 'completionYear'> & {
  imageIndex: number;
};

const imageLibrary = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1462396240927-52058a6a84ec?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
];

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

const typeCopy: Record<Project['type'], string> = {
  luxury:
    'Architecture-forward homes, resort-inspired amenities, and an owner-focused service program make it especially attractive for buyers seeking everyday luxury with lasting value.',
  residential:
    'Thoughtful layouts, approachable luxury, and amenity spaces designed for daily living give the project wide appeal for both primary residents and investors.',
  resort:
    'Vacation-minded programming, flexible ownership appeal, and a hospitality-led arrival experience position it as a compelling lifestyle and investment play.',
  branded:
    'A globally recognized brand, elevated service culture, and instantly legible design language create a collectible address with international cachet.',
};

const statusCopy: Record<Project['status'], string> = {
  'pre-construction':
    'For early buyers, the current release offers the chance to secure pricing ahead of completion while the surrounding market continues to appreciate.',
  'under-construction':
    'With construction already advancing, purchasers benefit from visible momentum, clearer delivery timelines, and growing confidence in the address.',
  completed:
    'As a completed offering, it delivers immediate enjoyment, turnkey convenience, and proven presence in one of South Florida\'s most desirable markets.',
};

const projectSeeds: ProjectSeed[] = [
  { id: 'baccarat', name: 'Baccarat Residences', areaId: 'brickell', areaName: 'Brickell', tagline: 'French artistry on the Miami River', priceFrom: '$2.4M', type: 'branded', status: 'under-construction', featured: true, imageIndex: 0 },
  { id: 'domus-brickell-center', name: 'Domus Brickell Center', areaId: 'brickell', areaName: 'Brickell', tagline: 'Flexible urban residences steps from the center of it all', priceFrom: '$780K', type: 'residential', status: 'under-construction', imageIndex: 1 },
  { id: 'domus', name: 'Domus', areaId: 'brickell', areaName: 'Brickell', tagline: 'Short-stay ready luxury with a cosmopolitan rhythm', priceFrom: '$720K', type: 'residential', status: 'completed', imageIndex: 2 },
  { id: '1428-brickell', name: '1428 Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: 'Solar-powered skyline living for a new era', priceFrom: '$2.1M', type: 'luxury', status: 'under-construction', imageIndex: 3 },
  { id: 'lofty', name: 'Lofty Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: 'Design-forward residences created for ownership and flexibility', priceFrom: '$860K', type: 'luxury', status: 'pre-construction', imageIndex: 4 },
  { id: 'ora', name: 'ORA by Casa Tua', areaId: 'brickell', areaName: 'Brickell', tagline: 'Italian hospitality meets Brickell sophistication', priceFrom: '$1.2M', type: 'branded', status: 'pre-construction', imageIndex: 5 },
  { id: 'cipriani', name: 'Cipriani Residences Miami', areaId: 'brickell', areaName: 'Brickell', tagline: 'Legendary service with a waterfront address', priceFrom: '$1.8M', type: 'branded', status: 'under-construction', featured: true, imageIndex: 6 },
  { id: 'mercedes-benz-places-miami', name: 'Mercedes-Benz Places Miami', areaId: 'brickell', areaName: 'Brickell', tagline: 'Mobility, design, and elevated city living united', priceFrom: '$1.1M', type: 'branded', status: 'pre-construction', imageIndex: 7 },
  { id: '2200-brickell', name: '2200 Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: 'Boutique Brickell living with leafy residential calm', priceFrom: '$930K', type: 'luxury', status: 'under-construction', imageIndex: 8 },
  { id: '888-brickell-dolce-and-gabbana-residences', name: '888 Brickell by Dolce & Gabbana', areaId: 'brickell', areaName: 'Brickell', tagline: 'Italian fashion house glamour in the sky', priceFrom: '$2.6M', type: 'branded', status: 'pre-construction', featured: true, imageIndex: 9 },
  { id: 'viceroy-brickell', name: 'Viceroy Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: 'Hospitality-infused residences overlooking the bay', priceFrom: '$1.3M', type: 'branded', status: 'pre-construction', imageIndex: 10 },
  { id: 'st-regis-brickell', name: 'St. Regis Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: 'A celebrated service legacy arrives on Brickell Avenue', priceFrom: '$4.2M', type: 'branded', status: 'under-construction', imageIndex: 11 },
  { id: 'parkside', name: 'Parkside', areaId: 'brickell', areaName: 'Brickell', tagline: 'Family-oriented luxury near Brickell\'s green edge', priceFrom: '$890K', type: 'residential', status: 'pre-construction', imageIndex: 2 },
  { id: 'house-of-wellness-brickell', name: 'House of Wellness Brickell', areaId: 'brickell', areaName: 'Brickell', tagline: 'Holistic living curated around recovery and ritual', priceFrom: '$1.4M', type: 'luxury', status: 'pre-construction', imageIndex: 5 },
  { id: 'ella', name: 'Ella Miami Beach', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'A boutique beach retreat with vintage glamour', priceFrom: '$790K', type: 'luxury', status: 'under-construction', imageIndex: 6 },
  { id: 'five-park', name: 'Five Park', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'A sculptural landmark reimagining South Beach luxury', priceFrom: '$1.7M', type: 'luxury', status: 'under-construction', featured: true, imageIndex: 0 },
  { id: 'nexo', name: 'Nexo Residences', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'Modern ownership with smart flexibility', priceFrom: '$690K', type: 'residential', status: 'under-construction', imageIndex: 3 },
  { id: 'one-park', name: 'One Park Tower', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'Grand-scale living moments from the shoreline', priceFrom: '$1.35M', type: 'luxury', status: 'pre-construction', featured: true, imageIndex: 1 },
  { id: '72-park', name: '72 Park', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'Flexible ownership for a new generation of buyers', priceFrom: '$850K', type: 'luxury', status: 'under-construction', imageIndex: 7 },
  { id: 'palma', name: 'Palma Miami Beach', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'Quiet waterfront elegance in North Beach', priceFrom: '$1.05M', type: 'luxury', status: 'pre-construction', imageIndex: 8 },
  { id: 'the-william', name: 'The William', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'Intimate designer residences in a boutique format', priceFrom: '$2.2M', type: 'luxury', status: 'pre-construction', imageIndex: 10 },
  { id: '72-carlyle', name: '72 Carlyle', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'A polished address balancing beach access and calm', priceFrom: '$980K', type: 'luxury', status: 'completed', imageIndex: 11 },
  { id: 'faena-residences', name: 'Faena Residences', areaId: 'miami-beach', areaName: 'Miami Beach', tagline: 'A collector-grade expression of art, culture, and beachfront prestige', priceFrom: '$3.9M', type: 'branded', status: 'pre-construction', imageIndex: 4 },
  { id: 'aria-reserve', name: 'Aria Reserve', areaId: 'edgewater', areaName: 'Edgewater', tagline: 'Twin waterfront towers with uninterrupted bay horizons', priceFrom: '$1.6M', type: 'luxury', status: 'under-construction', featured: true, imageIndex: 0 },
  { id: 'missoni-baia', name: 'Missoni Baia', areaId: 'edgewater', areaName: 'Edgewater', tagline: 'Fashion-led design and a private bayfront club', priceFrom: '$1.5M', type: 'branded', status: 'completed', imageIndex: 9 },
  { id: 'edition-residences', name: 'Edition Residences Miami', areaId: 'edgewater', areaName: 'Edgewater', tagline: 'Refined waterfront living from an iconic hospitality brand', priceFrom: '$2.7M', type: 'branded', status: 'under-construction', imageIndex: 2 },
  { id: 'the-villa', name: 'The Villa', areaId: 'edgewater', areaName: 'Edgewater', tagline: 'Bayfront privacy with contemporary architectural clarity', priceFrom: '$1.25M', type: 'luxury', status: 'pre-construction', imageIndex: 3 },
  { id: 'vida', name: 'Vida Residences', areaId: 'edgewater', areaName: 'Edgewater', tagline: 'Well-composed residences for elevated daily living', priceFrom: '$920K', type: 'residential', status: 'pre-construction', imageIndex: 5 },
  { id: 'elle-residences', name: 'Elle Residences', areaId: 'edgewater', areaName: 'Edgewater', tagline: 'Editorial glamour with a fashion-forward spirit', priceFrom: '$1.1M', type: 'branded', status: 'pre-construction', imageIndex: 10 },
  { id: 'edge-house-residences', name: 'Edge House Residences', areaId: 'edgewater', areaName: 'Edgewater', tagline: 'Flexible luxury ownership for urban tastemakers', priceFrom: '$890K', type: 'luxury', status: 'under-construction', imageIndex: 11 },
  { id: 'aston-martin', name: 'Aston Martin Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: 'Automotive-inspired design at the edge of Biscayne Bay', priceFrom: '$2.8M', type: 'branded', status: 'completed', imageIndex: 1 },
  { id: 'casa-bella', name: 'Casa Bella Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: 'Italian refinement overlooking the city and bay', priceFrom: '$1.45M', type: 'luxury', status: 'under-construction', imageIndex: 6 },
  { id: 'the-elser', name: 'The Elser Hotel & Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: 'A hospitality-led address in the heart of the action', priceFrom: '$820K', type: 'branded', status: 'completed', imageIndex: 7 },
  { id: 'w11', name: 'W11', areaId: 'downtown', areaName: 'Downtown Miami', tagline: 'A design-driven lifestyle tower at Miami Worldcenter', priceFrom: '$940K', type: 'branded', status: 'pre-construction', imageIndex: 8 },
  { id: 'waldorf-astoria', name: 'Waldorf Astoria Hotel & Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: 'A stacked-glass icon with world-class hospitality', priceFrom: '$1.9M', type: 'branded', status: 'under-construction', featured: true, imageIndex: 0 },
  { id: 'jem', name: 'JEM Private Residences', areaId: 'downtown', areaName: 'Downtown Miami', tagline: 'Private ownership elevated by cultural connectivity', priceFrom: '$970K', type: 'luxury', status: 'pre-construction', imageIndex: 4 },
  { id: 'vista-harbor', name: 'Vista Harbor', areaId: 'downtown', areaName: 'Downtown Miami', tagline: 'Boutique downtown living with cinematic skyline views', priceFrom: '$875K', type: 'luxury', status: 'pre-construction', imageIndex: 2 },
  { id: 'la-baia', name: 'La Baia North', areaId: 'bay-harbor', areaName: 'Bay Harbor Islands', tagline: 'Boutique waterfront living with island intimacy', priceFrom: '$1.2M', type: 'luxury', status: 'under-construction', imageIndex: 6 },
  { id: 'la-maré', name: 'La Maré', areaId: 'bay-harbor', areaName: 'Bay Harbor Islands', tagline: 'Contemporary calm beside calm waters and marinas', priceFrom: '$1.45M', type: 'luxury', status: 'completed', imageIndex: 9 },
  { id: 'origin', name: 'Origin Residences', areaId: 'bay-harbor', areaName: 'Bay Harbor Islands', tagline: 'A clean-lined address for modern island living', priceFrom: '$980K', type: 'residential', status: 'pre-construction', imageIndex: 3 },
  { id: 'the-well', name: 'The Well Bay Harbor', areaId: 'bay-harbor', areaName: 'Bay Harbor Islands', tagline: 'Wellness-centric ownership in a serene enclave', priceFrom: '$1.55M', type: 'luxury', status: 'under-construction', imageIndex: 5 },
  { id: 'vita', name: 'Vita Coconut Grove', areaId: 'coconut-grove', areaName: 'Coconut Grove', tagline: 'Ultra-private bayfront residences for the discerning few', priceFrom: '$5.8M', type: 'luxury', status: 'under-construction', imageIndex: 0 },
  { id: 'the-well-coconut-grove', name: 'The Well Coconut Grove', areaId: 'coconut-grove', areaName: 'Coconut Grove', tagline: 'Holistic design rooted in grove tranquility', priceFrom: '$1.9M', type: 'luxury', status: 'pre-construction', imageIndex: 5 },
  { id: 'the-avenue', name: 'The Avenue', areaId: 'coral-gables', areaName: 'Coral Gables', tagline: 'Mediterranean sophistication with boutique scale', priceFrom: '$1.35M', type: 'luxury', status: 'pre-construction', imageIndex: 8 },
  { id: 'cora-merrick-park', name: 'Cora at Merrick Park', areaId: 'coral-gables', areaName: 'Coral Gables', tagline: 'Walkable luxury beside one of Miami\'s premier retail destinations', priceFrom: '$990K', type: 'luxury', status: 'under-construction', imageIndex: 4 },
  { id: 'cassia', name: 'Cassia Coral Gables', areaId: 'coral-gables', areaName: 'Coral Gables', tagline: 'Classic elegance reinterpreted for modern ownership', priceFrom: '$1.1M', type: 'luxury', status: 'completed', imageIndex: 10 },
  { id: 'bentley-residences', name: 'Bentley Residences', areaId: 'sunny-isles', areaName: 'Sunny Isles Beach', tagline: 'Oceanfront grandeur with signature in-residence car lifts', priceFrom: '$5.5M', type: 'branded', status: 'under-construction', featured: true, imageIndex: 1 },
  { id: 'st-regis', name: 'St. Regis Sunny Isles', areaId: 'sunny-isles', areaName: 'Sunny Isles Beach', tagline: 'Tailored service and Atlantic-facing elegance', priceFrom: '$4.8M', type: 'branded', status: 'under-construction', imageIndex: 11 },
  { id: 'the-mansions-at-acqualina', name: 'The Mansions at Acqualina', areaId: 'sunny-isles', areaName: 'Sunny Isles Beach', tagline: 'A fully realized oceanfront classic for legacy ownership', priceFrom: '$6.9M', type: 'branded', status: 'completed', imageIndex: 7 },
  { id: 'salerno-estates', name: 'Salerno Estates', areaId: 'homestead', areaName: 'Homestead', tagline: 'Spacious family homes with a polished suburban feel', priceFrom: '$590K', type: 'residential', status: 'under-construction', imageIndex: 8 },
  { id: 'sedona-estates', name: 'Sedona Estates', areaId: 'homestead', areaName: 'Homestead', tagline: 'Modern residences with room to grow', priceFrom: '$545K', type: 'residential', status: 'pre-construction', imageIndex: 2 },
  { id: 'silverland-estates', name: 'Silverland Estates', areaId: 'homestead', areaName: 'Homestead', tagline: 'New-construction comfort rooted in community', priceFrom: '$520K', type: 'residential', status: 'under-construction', imageIndex: 3 },
  { id: 'terra-sol', name: 'Terra Sol', areaId: 'homestead', areaName: 'Homestead', tagline: 'Sunlit homes designed for everyday ease', priceFrom: '$610K', type: 'residential', status: 'pre-construction', imageIndex: 9 },
  { id: 'on-grandville', name: 'On Grandville', areaId: 'homestead', areaName: 'Homestead', tagline: 'Contemporary residences with strong long-term value', priceFrom: '$560K', type: 'residential', status: 'completed', imageIndex: 4 },
  { id: 'centris', name: 'Centris Pinecrest', areaId: 'pinecrest', areaName: 'Pinecrest', tagline: 'Estate-style living in one of Miami\'s most prized enclaves', priceFrom: '$2.9M', type: 'luxury', status: 'pre-construction', imageIndex: 10 },
  { id: 'pine-rockland-estates', name: 'Pine Rockland Estates', areaId: 'pinecrest', areaName: 'Pinecrest', tagline: 'Large-format residences framed by lush landscaping', priceFrom: '$3.4M', type: 'luxury', status: 'under-construction', imageIndex: 0 },
  { id: 'pine-park-villas', name: 'Pine Park Villas', areaId: 'pinecrest', areaName: 'Pinecrest', tagline: 'Boutique luxury townhomes with a private feel', priceFrom: '$1.75M', type: 'luxury', status: 'completed', imageIndex: 11 },
  { id: 'icon-beach-residences', name: 'Icon Beach Residences', areaId: 'hollywood', areaName: 'Hollywood', tagline: 'Coastal refinement moments from the Broadwalk', priceFrom: '$1.1M', type: 'luxury', status: 'pre-construction', imageIndex: 1 },
  { id: 'seven-park-residences', name: 'Seven Park Residences', areaId: 'hollywood', areaName: 'Hollywood', tagline: 'A sleek residential address with resort energy', priceFrom: '$860K', type: 'luxury', status: 'under-construction', imageIndex: 6 },
  { id: 'gaia-residences', name: 'Gaia Residences Hollywood', areaId: 'hollywood', areaName: 'Hollywood', tagline: 'Contemporary homes inspired by sea breezes and light', priceFrom: '$790K', type: 'residential', status: 'pre-construction', imageIndex: 3 },
  { id: 'midtown-park-residences', name: 'Midtown Park Residences', areaId: 'midtown-miami', areaName: 'Midtown Miami', tagline: 'A mixed-use address at the center of Miami\'s design circuit', priceFrom: '$980K', type: 'luxury', status: 'pre-construction', imageIndex: 9 },
  { id: 'the-standard-residences', name: 'The Standard Residences Midtown', areaId: 'midtown-miami', areaName: 'Midtown Miami', tagline: 'Playful hospitality and curated urban wellness', priceFrom: '$1.05M', type: 'branded', status: 'under-construction', imageIndex: 5 },
  { id: 'jean-georges-miami-tropic-residences', name: 'Jean-Georges Miami Tropic Residences', areaId: 'midtown-miami', areaName: 'Midtown Miami', tagline: 'Culinary prestige and tropical modernism in Midtown', priceFrom: '$1.25M', type: 'branded', status: 'pre-construction', imageIndex: 0 },
  { id: 'tula-residences', name: 'Tula Residences', areaId: 'midtown-miami', areaName: 'Midtown Miami', tagline: 'Boutique urban living with clean architectural lines', priceFrom: '$920K', type: 'luxury', status: 'pre-construction', imageIndex: 8 },
  { id: 'alba', name: 'Alba Florida City', areaId: 'florida-city', areaName: 'Florida City', tagline: 'Freshly designed homes at the gateway to the Keys', priceFrom: '$420K', type: 'residential', status: 'under-construction', imageIndex: 2 },
  { id: 'oasis', name: 'Oasis Florida City', areaId: 'florida-city', areaName: 'Florida City', tagline: 'A new neighborhood built around comfort and access', priceFrom: '$435K', type: 'residential', status: 'pre-construction', imageIndex: 4 },
  { id: 'parc-villas', name: 'Parc Villas', areaId: 'florida-city', areaName: 'Florida City', tagline: 'Low-maintenance contemporary homes with outdoor appeal', priceFrom: '$399K', type: 'residential', status: 'completed', imageIndex: 10 },
  { id: 'park-square', name: 'Park Square', areaId: 'florida-city', areaName: 'Florida City', tagline: 'Well-priced residences with strong growth potential', priceFrom: '$410K', type: 'residential', status: 'under-construction', imageIndex: 3 },
  { id: 'nomad-residences', name: 'Nomad Residences Wynwood', areaId: 'wynwood', areaName: 'Wynwood', tagline: 'A flexible ownership concept rooted in culture and design', priceFrom: '$760K', type: 'branded', status: 'under-construction', imageIndex: 6 },
  { id: 'shoma-bay', name: 'Shoma Bay', areaId: 'north-bay-village', areaName: 'North Bay Village', tagline: 'A reimagined island address with panoramic bay views', priceFrom: '$840K', type: 'luxury', status: 'under-construction', imageIndex: 1 },
  { id: 'tula-residences', name: 'Tula Residences North Bay', areaId: 'north-bay-village', areaName: 'North Bay Village', tagline: 'Boutique waterfront residences with an intimate scale', priceFrom: '$790K', type: 'luxury', status: 'pre-construction', imageIndex: 7 },
  { id: 'w-pompano-beach', name: 'W Pompano Beach Residences', areaId: 'pompano-beach', areaName: 'Pompano Beach', tagline: 'Lifestyle-driven beachfront ownership with W flair', priceFrom: '$1.45M', type: 'branded', status: 'pre-construction', imageIndex: 5 },
  { id: 'envy-residence', name: 'Envy Residences Pompano', areaId: 'pompano-beach', areaName: 'Pompano Beach', tagline: 'Contemporary coastal residences with striking water views', priceFrom: '$995K', type: 'luxury', status: 'under-construction', imageIndex: 11 },
  { id: 'kempinski-residences', name: 'Kempinski Residences Design District', areaId: 'miami-design-district', areaName: 'Miami Design District', tagline: 'European hospitality and couture-adjacent living', priceFrom: '$1.8M', type: 'branded', status: 'pre-construction', imageIndex: 0 },
  { id: '14-river-district', name: '14 River District', areaId: 'miami-river', areaName: 'Miami River', tagline: 'A modern riverfront district created for connected urban life', priceFrom: '$780K', type: 'luxury', status: 'under-construction', imageIndex: 9 },
  { id: 'faena-residences', name: 'Faena Residences Miami River', areaId: 'miami-river', areaName: 'Miami River', tagline: 'A visionary branded community overlooking the river bend', priceFrom: '$1.95M', type: 'branded', status: 'pre-construction', imageIndex: 1 },
  { id: 'alba-palm-beach', name: 'Alba Palm Beach', areaId: 'west-palm-beach', areaName: 'West Palm Beach', tagline: 'An elegant waterfront address for Palm Beach lifestyles', priceFrom: '$2.2M', type: 'luxury', status: 'under-construction', imageIndex: 6 },
  { id: 'windsor-cay-resort', name: 'Windsor Cay Resort', areaId: 'orlando', areaName: 'Orlando', tagline: 'A vacation-home resort designed for leisure and flexibility', priceFrom: '$690K', type: 'resort', status: 'under-construction', imageIndex: 2 },
  { id: 'doppio', name: 'Doppio Orlando', areaId: 'orlando', areaName: 'Orlando', tagline: 'A dual-lifestyle resort concept near Orlando\'s major attractions', priceFrom: '$630K', type: 'resort', status: 'pre-construction', imageIndex: 8 },
  { id: 'dania-project', name: 'Dania Beach Residences', areaId: 'dania-beach', areaName: 'Dania Beach', tagline: 'Modern coastal living near marina, airport, and beach', priceFrom: '$720K', type: 'luxury', status: 'pre-construction', imageIndex: 4 },
];

function rotateTake(values: string[], start: number, count: number) {
  return Array.from({ length: count }, (_, offset) => values[(start + offset) % values.length]);
}

function buildAmenities(project: ProjectSeed, index: number) {
  const base = amenityProfiles[project.type];
  const local = beachAreas.has(project.areaId) ? coastalAmenityExtras : urbanAmenityExtras;
  const wellness = /well|wellness/i.test(project.name) ? wellnessAmenityExtras : [];
  return Array.from(new Set([...base, ...rotateTake(local, index, 2), ...wellness])).slice(0, 7);
}

function buildFeatures(project: ProjectSeed, index: number) {
  const extras = beachAreas.has(project.areaId)
    ? ['Deep terraces', 'Summer kitchen options', 'Panoramic water views']
    : ['Double-height lobby arrival', 'Home office niche', 'Private storage options'];
  return Array.from(new Set([...featureProfiles[project.type], ...rotateTake(extras, index, 2)])).slice(0, 7);
}

function buildDescription(project: ProjectSeed, index: number) {
  const openers = [
    `${project.name} brings ${project.tagline.toLowerCase()} to ${project.areaName}, pairing striking architecture with the polish and ease today's luxury buyers expect in South Florida.`,
    `${project.name} is poised to become one of the most talked-about addresses in ${project.areaName}, where ${project.tagline.toLowerCase()} meets hospitality-led living and refined contemporary design.`,
    `${project.name} introduces a fresh point of view to ${project.areaName}, balancing elevated amenities, strong design credentials, and the lifestyle convenience that drives long-term demand.`,
    `${project.name} captures the momentum of ${project.areaName} with ${project.tagline.toLowerCase()}, creating a residence collection that feels both current and enduring in equal measure.`,
  ];

  return `${openers[index % openers.length]} ${typeCopy[project.type]} ${statusCopy[project.status]}`;
}

const S3_BASE = 'https://pagina-mama.s3.amazonaws.com/assets2/desarrollos';

function buildGallery(projectId: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${S3_BASE}/${projectId}/image-gallery/image (${i + 1}).jpg`);
}

export const projects: Project[] = projectSeeds.map((project, index) => ({
  ...project,
  image: imageLibrary[project.imageIndex % imageLibrary.length],
  description: buildDescription(project, index),
  amenities: buildAmenities(project, index),
  features: buildFeatures(project, index),
  floors: 18 + (index % 45),
  units: `${90 + ((index * 13) % 260)} residences`,
  completionYear: completionMap[project.status][index % completionMap[project.status].length],
  gallery: buildGallery(project.id, 6 + (index % 5)),
  factsheetPdf: `${S3_BASE}/${project.id}/pdfs/hoja.pdf`,
  floorplansPdf: `${S3_BASE}/${project.id}/pdfs/planos.pdf`,
  videoUrl: `${S3_BASE}/${project.id}/video.mp4`,
}));

export const featuredProjects = projects.filter((project) => project.featured);
