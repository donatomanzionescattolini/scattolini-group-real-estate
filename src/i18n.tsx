/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

export type Lang = 'es' | 'en';

type TranslationValue = string | string[] | Record<string, unknown>;

interface TranslationTree {
  [key: string]: TranslationValue | TranslationTree;
}

// ─── Translations ─────────────────────────────────────────────────────────────

const translations: Record<Lang, TranslationTree> = {
  es: {
    nav: {
      home: 'Inicio',
      projects: 'Proyectos',
      areas: 'Áreas',
      team: 'Equipo',
      contact: 'Contacto',
    },
    footer: {
      tagline: 'Asesoría boutique de bienes raíces en el Sur de Florida para compradores, inversores y familias que buscan direcciones extraordinarias.',
      quickLinks: 'Accesos rápidos',
      keyMarkets: 'Mercados principales',
      contact: 'Contacto',
      address: 'Brickell Avenue, Miami, FL 33131',
      phone: '(305) 555-0147',
      email: 'hello@scattolinigroup.com',
      hours: 'Lun – Vie: 9:00 AM – 6:00 PM',
      rights: 'Todos los derechos reservados',
    },
    hero: {
      eyebrow: 'Bienes Raíces de Lujo · Sur de Florida',
      heading: 'Bienes Raíces Boutique.\nResultados Excepcionales.',
      description: 'Scattolini Group es una firma boutique especializada en los vecindarios más destacados del Sur de Florida, torres de marca y desarrollos de lujo de nueva generación.',
      exploreProjects: 'Explorar Proyectos',
      meetTeam: 'Conocer al Equipo',
    },
    stats: {
      neighborhoods: 'Vecindarios',
      developments: 'Desarrollos',
      expertAgents: 'Agentes Expertos',
      yearsOfExcellence: 'Años de Excelencia',
    },
    featuredProjects: {
      eyebrow: 'Colección Destacada',
      title: 'Proyectos Destacados',
      description: 'Una selección curada de propiedades en el Sur de Florida que definen el próximo capítulo del lujo — desde icónicas torres frente al río hasta exclusivas torres frente al mar.',
      viewAll: 'Ver todos los desarrollos',
    },
    areasShowcase: {
      eyebrow: 'Mercados',
      title: 'Explorar el Sur de Florida',
      description: 'Desde el horizonte costero de Brickell hasta las residencias históricas de Coral Gables, descubra los mercados que moldean nuestra visión editorial del Sur de Florida.',
    },
    teamPreview: {
      eyebrow: 'Asesores',
      title: 'Nuestro Equipo',
      description: 'Una oficina multilingüe y orientada a las relaciones, con profundo conocimiento del mercado en los vecindarios de lujo más competitivos del Sur de Florida.',
      meetAll: 'Conocer a los 14 agentes',
    },
    about: {
      eyebrow: 'Sobre Scattolini Group',
      heading: 'Un equipo boutique de liderazgo latinoamericano con una perspectiva orientada al mercado.',
      description: 'Combinamos conocimiento local, servicio multilingüe y una mirada editorial única sobre el mercado inmobiliario del Sur de Florida. Ya sea guiando a una familia hacia su residencia principal o asesorando a un inversor en proyectos de pre-construcción, nuestro proceso es personalizado, discreto y sumamente atento.',
      statCuratedProjects: 'Proyectos curados',
      statMarketsServed: 'Mercados atendidos',
      statDedicatedAgents: 'Agentes dedicados',
      formTitle: 'Déjenos guiar su próximo movimiento',
      formDescription: 'Comparta sus objetivos y lo conectaremos con el asesor, vecindario y oportunidad adecuados.',
      formSubmit: 'Solicitar Consulta',
    },
    areasPage: {
      eyebrow: 'Mercados',
      title: 'Explorar Nuestros Mercados',
      description: 'Una amplia presencia en el Sur de Florida que abarca núcleos urbanos de lujo, enclaves frente al mar, vecindarios residenciales históricos y destinos de estilo de vida en crecimiento.',
    },
    projectsPage: {
      eyebrow: 'Desarrollos',
      title: 'Todos los Desarrollos',
      description: 'Explore nuestro portafolio completo de desarrollos en el Sur de Florida y Florida, desde íconos de marca hasta lanzamientos residenciales boutique.',
      developmentsCount: 'desarrollos',
      curatedFor: 'Curado para compradores e inversores de lujo en el Sur de Florida',
    },
    projectFilter: {
      allAreas: 'Todas las Áreas',
    },
    contactPage: {
      eyebrow: 'Contacto',
      title: 'Iniciemos la conversación',
      description: 'Ya sea que busque una residencia principal, una oportunidad de pre-construcción o orientación experta sobre un vecindario específico, nuestro equipo está listo para ayudarle.',
      labelOffice: 'Oficina',
      labelPhone: 'Teléfono',
      labelEmail: 'Correo',
      labelHours: 'Horario',
      formTitle: 'Contáctenos',
      formDescription: 'Cuéntenos qué está explorando y lo conectaremos con el asesor y el siguiente paso adecuados.',
      formSubmit: 'Enviar Mensaje',
    },
    teamPage: {
      eyebrow: 'Equipo',
      title: 'Conocer al Equipo',
      description: 'Scattolini Group se basa en un servicio boutique, fluidez intercultural y una cultura de oficina colaborativa diseñada en torno a las relaciones más que al volumen.',
    },
    areaDetail: {
      projectsBadge: 'proyectos',
      marketOverview: 'Descripción del Mercado',
      whyBuyersWatch: 'Por qué los compradores observan',
      atAGlance: 'De un vistazo',
      availableProjects: 'Proyectos disponibles',
      signatureCharacter: 'Carácter distintivo',
      neighborhoodComparison: '¿Necesita una comparación de vecindarios?',
      speakWithTeam: 'Hable con nuestro equipo.',
      collection: 'Colección',
      projectsIn: 'Proyectos en',
      expandingMarket: 'Estamos expandiendo activamente nuestra presencia en este mercado. Contáctenos para conocer oportunidades fuera del mercado.',
      gallery: 'Galería',
      areaGallery: 'Galería del Vecindario',
    },
    projectDetail: {
      breadcrumbHome: 'Inicio',
      breadcrumbProjects: 'Proyectos',
      delivery: 'Entrega',
      scale: 'Escala',
      priceFrom: 'Precio Desde',
      overview: 'Descripción general',
      closerLook: 'Una mirada más cercana a',
      amenities: 'Amenidades',
      residenceFeatures: 'Características de la Residencia',
      contactAbout: 'Contactar sobre esta Propiedad',
      requestPresentation: 'Solicitar una presentación privada',
      market: 'Mercado',
      status: 'Estado',
      price: 'Precio',
      relatedProperties: 'Propiedades Relacionadas',
      moreProjectsIn: 'Más proyectos en',
      exploreArea: 'Explorar esta área',
      inquireNow: 'Consultar Ahora',
      defaultMessage: 'Me gustaría obtener más información sobre',
      statusLabels: {
        'pre-construction': 'Preconstrucción',
        'under-construction': 'En Construcción',
        completed: 'Completado',
      },
      gallery: 'Galería',
      photoGallery: 'Galería de Fotos',
      video: 'Video',
      projectVideo: 'Video del Proyecto',
      documents: 'Documentos',
      factsheet: 'Ficha Técnica',
      floorplans: 'Planos',
      downloadFactsheet: 'Descargar Ficha Técnica',
      downloadFloorplans: 'Descargar Planos',
    },
    inquiryForm: {
      placeholderName: 'Nombre',
      placeholderEmail: 'Correo electrónico',
      placeholderPhone: 'Teléfono',
      placeholderMessage: 'Cuéntenos qué está buscando',
      defaultSubmit: 'Enviar Consulta',
      successMessage: 'Gracias — un asesor de Scattolini Group se pondrá en contacto en breve.',
    },
  },

  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      areas: 'Areas',
      team: 'Team',
      contact: 'Contact',
    },
    footer: {
      tagline: 'Boutique South Florida real estate advisory for discerning buyers, investors, and families seeking extraordinary addresses.',
      quickLinks: 'Quick Links',
      keyMarkets: 'Key Markets',
      contact: 'Contact',
      address: 'Brickell Avenue, Miami, FL 33131',
      phone: '(305) 555-0147',
      email: 'hello@scattolinigroup.com',
      hours: 'Mon – Fri: 9:00 AM – 6:00 PM',
      rights: 'All rights reserved',
    },
    hero: {
      eyebrow: 'Luxury Real Estate · South Florida',
      heading: 'Boutique Real Estate.\nExceptional Results.',
      description: 'Scattolini Group is a boutique advisory focused on South Florida\'s most compelling neighborhoods, branded towers, and next-generation luxury developments.',
      exploreProjects: 'Explore Projects',
      meetTeam: 'Meet Our Team',
    },
    stats: {
      neighborhoods: 'Neighborhoods',
      developments: 'Developments',
      expertAgents: 'Expert Agents',
      yearsOfExcellence: 'Years of Excellence',
    },
    featuredProjects: {
      eyebrow: 'Featured Collection',
      title: 'Our Featured Projects',
      description: 'A curated edit of South Florida addresses defining the next chapter of luxury living — from branded riverfront icons to ultra-private beachfront towers.',
      viewAll: 'View all developments',
    },
    areasShowcase: {
      eyebrow: 'Markets',
      title: 'Explore South Florida',
      description: 'From the bayside skyline of Brickell to the legacy estates of Coral Gables, discover the markets shaping our editorial view of South Florida real estate.',
    },
    teamPreview: {
      eyebrow: 'Advisors',
      title: 'Our Team',
      description: 'A multilingual, relationship-driven office with deep market fluency across South Florida\'s most competitive luxury neighborhoods.',
      meetAll: 'Meet all 14 agents',
    },
    about: {
      eyebrow: 'About Scattolini Group',
      heading: 'A boutique Latin-American-led team with a market-first point of view.',
      description: 'We pair local knowledge, multilingual service, and a distinctly editorial eye for South Florida real estate. Whether guiding a family to a primary residence or advising an investor on pre-construction positioning, our process is tailored, discreet, and relentlessly attentive.',
      statCuratedProjects: 'Curated projects',
      statMarketsServed: 'Markets served',
      statDedicatedAgents: 'Dedicated agents',
      formTitle: 'Let us curate your next move',
      formDescription: 'Share your goals and we will connect you with the right advisor, neighborhood, and opportunity.',
      formSubmit: 'Request Consultation',
    },
    areasPage: {
      eyebrow: 'Markets',
      title: 'Explore Our Markets',
      description: 'A broad South Florida footprint spanning luxury urban cores, beachfront enclaves, legacy residential neighborhoods, and fast-growing lifestyle destinations.',
    },
    projectsPage: {
      eyebrow: 'Developments',
      title: 'All Developments',
      description: 'Browse our complete portfolio of South Florida and Florida developments, from branded icons to boutique residential launches.',
      developmentsCount: 'developments',
      curatedFor: 'Curated for South Florida luxury buyers and investors',
    },
    projectFilter: {
      allAreas: 'All Areas',
    },
    contactPage: {
      eyebrow: 'Contact',
      title: "Let's start the conversation",
      description: 'Whether you are seeking a primary residence, a pre-construction opportunity, or expert guidance on a specific neighborhood, our team is ready to help.',
      labelOffice: 'Office',
      labelPhone: 'Phone',
      labelEmail: 'Email',
      labelHours: 'Hours',
      formTitle: 'Contact our office',
      formDescription: 'Tell us what you are exploring and we will match you with the right advisor and next step.',
      formSubmit: 'Send Message',
    },
    teamPage: {
      eyebrow: 'Team',
      title: 'Meet Our Team',
      description: 'Scattolini Group is built on boutique service, cross-cultural fluency, and a collaborative office culture designed around relationships rather than volume.',
    },
    areaDetail: {
      projectsBadge: 'projects',
      marketOverview: 'Market Overview',
      whyBuyersWatch: 'Why buyers watch',
      atAGlance: 'At a glance',
      availableProjects: 'Available projects',
      signatureCharacter: 'Signature character',
      neighborhoodComparison: 'Need a neighborhood comparison?',
      speakWithTeam: 'Speak with our team.',
      collection: 'Collection',
      projectsIn: 'Projects in',
      expandingMarket: 'We are actively expanding our presence in this market. Contact us for off-market opportunities.',
      gallery: 'Gallery',
      areaGallery: 'Neighborhood Gallery',
    },
    projectDetail: {
      breadcrumbHome: 'Home',
      breadcrumbProjects: 'Projects',
      delivery: 'Delivery',
      scale: 'Scale',
      priceFrom: 'Price From',
      overview: 'Overview',
      closerLook: 'A closer look at',
      amenities: 'Amenities',
      residenceFeatures: 'Residence Features',
      contactAbout: 'Contact About This Property',
      requestPresentation: 'Request a private presentation',
      market: 'Market',
      status: 'Status',
      price: 'Price',
      relatedProperties: 'Related Properties',
      moreProjectsIn: 'More projects in',
      exploreArea: 'Explore this area',
      inquireNow: 'Inquire Now',
      defaultMessage: 'I would like more information about',
      statusLabels: {
        'pre-construction': 'Pre-Construction',
        'under-construction': 'Under Construction',
        completed: 'Completed',
      },
      gallery: 'Gallery',
      photoGallery: 'Photo Gallery',
      video: 'Video',
      projectVideo: 'Project Video',
      documents: 'Documents',
      factsheet: 'Fact Sheet',
      floorplans: 'Floor Plans',
      downloadFactsheet: 'Download Fact Sheet',
      downloadFloorplans: 'Download Floor Plans',
    },
    inquiryForm: {
      placeholderName: 'Name',
      placeholderEmail: 'Email',
      placeholderPhone: 'Phone',
      placeholderMessage: 'Tell us what you are looking for',
      defaultSubmit: 'Submit Inquiry',
      successMessage: 'Thank you — a Scattolini Group advisor will reach out shortly.',
    },
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────

interface TranslationContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (path: string) => string;
}

const TranslationContext = createContext<TranslationContextValue | null>(null);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolvePath(tree: TranslationTree, segments: string[]): string | null {
  let node: TranslationValue | TranslationTree = tree;
  for (const seg of segments) {
    if (typeof node !== 'object' || Array.isArray(node)) return null;
    node = (node as TranslationTree)[seg];
    if (node === undefined) return null;
  }
  return typeof node === 'string' ? node : null;
}

/** Flexible path lookup — strips a leading "pages." prefix if present. */
export function getTranslation(path: string, lang: Lang): string {
  const segments = path.replace(/^pages\./, '').split('.');
  const tree = translations[lang];

  const result = resolvePath(tree, segments);
  if (result !== null) return result;

  // Fallback to the other language
  const other: Lang = lang === 'es' ? 'en' : 'es';
  return resolvePath(translations[other], segments) ?? path;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function TranslationProvider({ children }: { children: ReactNode }) {
  // New sessions start in Spanish per AGENTS.md
  const [lang, setLang] = useState<Lang>('es');

  const t = useCallback((path: string) => getTranslation(path, lang), [lang]);

  return (
    <TranslationContext.Provider value={{ lang, setLang, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTranslation(): TranslationContextValue {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error('useTranslation must be used inside TranslationProvider');
  return ctx;
}

