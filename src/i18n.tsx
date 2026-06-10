/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

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
      blog: 'Análisis',
    },
    footer: {
      tagline: 'Asesoría boutique de bienes raíces en el Sur de Florida para compradores, inversores y familias que buscan direcciones extraordinarias.',
      ctaLabel: '¿Listo para invertir?',
      ctaHeading: 'Encuentre su próxima propiedad en Miami',
      ctaButton: 'Contáctenos',
      quickLinks: 'Accesos rápidos',
      keyMarkets: 'Mercados principales',
      contact: 'Contacto',
      address: '12750 NW 17th Street, Suite 222, Miami, FL 33182',
      phone: '(305) 381-5120',
      email: 'information@scattolinigroup.com',
      hours: 'Lun – Vie: 9:00 AM – 5:00 PM',
      rights: 'Todos los derechos reservados',
      newsletter: {
        title: 'Análisis de mercado, directo a su correo',
        placeholder: 'Su correo electrónico',
        submit: 'Suscribirse',
        success: '¡Gracias! Ya está suscrito.',
        sending: 'Enviando…',
        error: 'No pudimos procesar su suscripción. Inténtelo de nuevo.',
      },
    },
    hero: {
      eyebrow: 'Bienes Raíces de Lujo · Sur de Florida',
      heading: 'Bienes Raíces Boutique.\nResultados Excepcionales.',
      description: 'Scattolini Group es una firma boutique especializada en los vecindarios más destacados del Sur de Florida y desarrollos de lujo de nueva generación.',
      exploreProjects: 'Explorar Proyectos',
      meetTeam: 'Conocer al Equipo',
      finder: {
        title: 'Encuentre su Próxima Propiedad',
        areaLabel: 'Vecindario',
        typeLabel: 'Tipo de Propiedad',
        statusLabel: 'Estado',
        submit: 'Buscar Propiedades',
      },
    },
    stats: {
      neighborhoods: 'Vecindarios',
      developments: 'Desarrollos',
      expertAgents: 'Agentes Expertos',
      yearsOfExcellence: 'Años de Excelencia',
    },
    seo: {
      home: {
        title: 'Scattolini Group | Bienes Raíces de Lujo en el Sur de Florida',
        description: 'Firma boutique de bienes raíces en Miami y el Sur de Florida. Desarrollos de lujo, asesoría multilingüe y experiencia en los mercados más exclusivos.',
      },
      projects: {
        title: 'Desarrollos | Scattolini Group',
        description: 'Explore nuestro portafolio de desarrollos residenciales de lujo en Miami, Brickell, Miami Beach y el Sur de Florida.',
      },
      projectDetail: {
        title: 'Desarrollo | Scattolini Group',
        description: 'Detalles, amenidades y galería de un desarrollo de lujo en el Sur de Florida.',
      },
      areas: {
        title: 'Mercados | Scattolini Group',
        description: 'Descubra los vecindarios y mercados inmobiliarios más exclusivos del Sur de Florida.',
      },
      areaDetail: {
        title: 'Mercado | Scattolini Group',
        description: 'Proyectos, estilo de vida y oportunidades inmobiliarias en un mercado del Sur de Florida.',
      },
      team: {
        title: 'Equipo | Scattolini Group',
        description: 'Conozca a nuestro equipo multilingüe de agentes expertos en bienes raíces de lujo.',
      },
      contact: {
        title: 'Contacto | Scattolini Group',
        description: 'Contáctenos para asesoría personalizada sobre desarrollos, inversiones y residencias en el Sur de Florida.',
      },
      blog: {
        title: 'Análisis de Mercado | Scattolini Group',
        description: 'Perspectivas sobre el mercado inmobiliario del Sur de Florida para compradores e inversores internacionales.',
      },
      blogPost: {
        title: 'Artículo | Scattolini Group',
        description: 'Análisis y guías sobre bienes raíces de lujo en Miami y el Sur de Florida.',
      },
    },
    errorBoundary: {
      title: 'Algo salió mal',
      description: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo.',
      retry: 'Reintentar',
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
      meetAll: 'Conocer a todo el equipo',
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
      ownerRole: 'Propietaria y Agente',
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
      allTypes: 'Todos los Tipos',
      allStatuses: 'Todos los Estados',
    },
    projectTypes: {
      luxury: 'Lujo',
      residential: 'Residencial',
      resort: 'Resort',
      branded: 'De Marca',
    },
    projectCard: {
      viewDetails: 'Ver Detalles',
      priceFrom: 'Desde',
    },
    areaCard: {
      projects: 'proyectos',
      exploreMarket: 'Explorar Mercado',
    },
    agentCard: {
      contact: 'Contacto',
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
      quickSnapshot: 'Resumen rápido para evaluar esta zona en segundos.',
      availableProjects: 'Proyectos disponibles',
      launchPipeline: 'Pipeline activo',
      deliveryReady: 'Listo para entrega',
      galleryMoments: 'Momentos de galería',
      signatureCharacter: 'Carácter distintivo',
      marketPulse: 'Pulso del mercado',
      marketRead: {
        pipelineStrong: 'Alta actividad de nuevos lanzamientos.',
        pipelineBalanced: 'Mercado equilibrado entre lanzamientos y entregas.',
        pipelineEstablished: 'Inventario consolidado con más opciones terminadas.',
      },
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
      deliveryNow: 'Ahora',
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
      sending: 'Enviando…',
      errorMessage: 'No pudimos enviar su mensaje. Por favor llame al (305) 381-5120 o escríbanos a information@scattolinigroup.com.',
      interestLabel: 'Estoy interesado en',
      interestOptions: {
        buying: 'Comprar una propiedad',
        selling: 'Vender una propiedad',
        investing: 'Oportunidades de inversión',
        renting: 'Alquilar una propiedad',
      },
      timelineLabel: 'Plazo estimado',
      timelineOptions: {
        immediate: 'Inmediatamente',
        threeToSix: '3 – 6 meses',
        sixToTwelve: '6 – 12 meses',
        exploring: 'Solo explorando',
      },
      budgetLabel: 'Rango de presupuesto',
      budgetOptions: {
        under500: 'Menos de $500K',
        between500And1m: '$500K – $1M',
        between1mAnd3m: '$1M – $3M',
        over3m: 'Más de $3M',
        preferNotToSay: 'Prefiero no decir',
      },
    },
    blog: {
      eyebrow: 'Análisis del Mercado',
      title: 'Perspectivas para el Inversor Internacional',
      description: 'Lecturas claras y serenas sobre el mercado inmobiliario del Sur de Florida, pensadas para compradores e inversores extranjeros que valoran estar bien informados.',
      allCategories: 'Todos',
      minRead: 'min de lectura',
      readArticle: 'Leer artículo',
      backToBlog: 'Volver al blog',
      relatedEyebrow: 'Seguir leyendo',
      relatedTitle: 'Artículos relacionados',
      ctaEyebrow: 'Hablemos',
      ctaTitle: '¿Tiene preguntas sobre invertir en Miami?',
      ctaDescription: 'Nuestro equipo multilingüe acompaña a compradores internacionales en cada paso, con calma y sin presión.',
      ctaDefaultMessage: 'Leí su artículo y me gustaría conversar sobre',
      ctaSubmit: 'Solicitar Asesoría',
      categories: {
        'market-insights': 'Mercado',
        'investor-guide': 'Guía del Inversor',
        financing: 'Financiamiento',
        neighborhood: 'Vecindarios',
        lifestyle: 'Estilo de Vida',
      },
    },
    whyUs: {
      eyebrow: 'Por Qué Scattolini Group',
      title: 'La Ventaja Boutique',
      description: 'Cuatro razones por las que compradores e inversores internacionales eligen a Scattolini Group para navegar el mercado del Sur de Florida.',
      items: {
        multilingual: {
          title: 'Servicio Multilingüe',
          description: 'Nuestros asesores se comunican con fluidez en español, inglés, portugués e italiano, para que nada se pierda en la traducción.',
        },
        boutique: {
          title: 'Atención Boutique, No Volumen',
          description: 'Trabaja directamente con asesores senior que conocen cada propiedad personalmente — no con un call center ni un agente rotativo.',
        },
        marketExpertise: {
          title: 'Profundo Conocimiento del Mercado',
          description: 'Quince años de experiencia hiperlocal en los vecindarios más codiciados del Sur de Florida y en mercados emergentes.',
        },
        investorAccess: {
          title: 'Acceso a Preconstrucción e Inversión',
          description: 'Acceso anticipado a lanzamientos de preconstrucción, precios de desarrollador y oportunidades fuera del mercado.',
        },
      },
    },
    process: {
      eyebrow: 'Cómo Funcionamos',
      title: 'Su Camino Hacia el Sur de Florida',
      description: 'Un proceso claro y sin presión, diseñado para acompañarle desde la primera conversación hasta el cierre.',
      steps: {
        step1: {
          title: 'Cuéntenos sus Objetivos',
          description: 'Una conversación inicial para entender su presupuesto, plazo y estilo de vida deseado.',
        },
        step2: {
          title: 'Recomendaciones Curadas',
          description: 'Recibirá una selección personalizada de propiedades y vecindarios que se ajustan a sus criterios.',
        },
        step3: {
          title: 'Recorridos Privados y Llamadas',
          description: 'Coordinamos visitas privadas, presentaciones virtuales y llamadas con desarrolladores cuando sea necesario.',
        },
        step4: {
          title: 'Cierre con Confianza',
          description: 'Le acompañamos en cada paso de la negociación, contratos y cierre — con total transparencia.',
        },
      },
    },
    marketReport: {
      eyebrow: 'Recurso Gratuito',
      title: 'Obtenga el Informe del Mercado del Sur de Florida',
      description: 'Tendencias de precios, actividad de preconstrucción y perspectivas del mercado para compradores e inversores internacionales — directo a su correo.',
      placeholderName: 'Su nombre',
      placeholderEmail: 'Su correo electrónico',
      submit: 'Enviarme el Informe',
      success: 'Gracias — le enviaremos el informe de mercado a su correo en breve.',
      sending: 'Enviando…',
      error: 'No pudimos procesar su solicitud. Por favor inténtelo de nuevo o escríbanos a information@scattolinigroup.com.',
    },
    leadModal: {
      eyebrow: 'Antes de Irse',
      title: 'Reciba Recomendaciones Personalizadas',
      description: 'Comparta sus datos de contacto y un asesor de Scattolini Group le enviará propiedades seleccionadas según sus intereses.',
      submit: 'Recibir Recomendaciones',
      success: 'Gracias — un asesor se pondrá en contacto en breve con recomendaciones personalizadas.',
      sending: 'Enviando…',
      error: 'No pudimos enviar su solicitud. Por favor inténtelo de nuevo.',
      dismiss: 'No gracias, continuar explorando',
      close: 'Cerrar',
    },
    testimonials: {
      eyebrow: 'Historias de Clientes',
      title: 'Lo Que Dicen Nuestros Clientes',
      description: 'La confianza de compradores e inversores en todo el Sur de Florida y más allá.',
    },
    floatingContact: {
      cta: 'Consulta Gratuita',
    },
  },

  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      areas: 'Areas',
      team: 'Team',
      contact: 'Contact',
      blog: 'Insights',
    },
    footer: {
      tagline: 'Boutique South Florida real estate advisory for discerning buyers, investors, and families seeking extraordinary addresses.',
      ctaLabel: 'Ready to invest?',
      ctaHeading: 'Find your next property in Miami',
      ctaButton: 'Contact us',
      quickLinks: 'Quick Links',
      keyMarkets: 'Key Markets',
      contact: 'Contact',
      address: '12750 NW 17th Street, Suite 222, Miami, FL 33182',
      phone: '(305) 381-5120',
      email: 'information@scattolinigroup.com',
      hours: 'Mon – Fri: 9:00 AM – 5:00 PM',
      rights: 'All rights reserved',
      newsletter: {
        title: 'Market insights, straight to your inbox',
        placeholder: 'Your email address',
        submit: 'Subscribe',
        success: 'Thank you — you are subscribed.',
        sending: 'Sending…',
        error: 'We could not process your subscription. Please try again.',
      },
    },
    hero: {
      eyebrow: 'Luxury Real Estate · South Florida',
      heading: 'Boutique Real Estate.\nExceptional Results.',
      description: 'Scattolini Group is a boutique advisory focused on South Florida\'s most compelling neighborhoods, branded towers, and next-generation luxury developments.',
      exploreProjects: 'Explore Projects',
      meetTeam: 'Meet Our Team',
      finder: {
        title: 'Find Your Next Property',
        areaLabel: 'Neighborhood',
        typeLabel: 'Property Type',
        statusLabel: 'Status',
        submit: 'Search Properties',
      },
    },
    stats: {
      neighborhoods: 'Neighborhoods',
      developments: 'Developments',
      expertAgents: 'Expert Agents',
      yearsOfExcellence: 'Years of Excellence',
    },
    seo: {
      home: {
        title: 'Scattolini Group | South Florida Luxury Real Estate',
        description: 'Boutique real estate advisory in Miami and South Florida. Luxury developments, multilingual service, and deep market expertise.',
      },
      projects: {
        title: 'Developments | Scattolini Group',
        description: 'Browse our portfolio of luxury residential developments across Miami, Brickell, Miami Beach, and South Florida.',
      },
      projectDetail: {
        title: 'Development | Scattolini Group',
        description: 'Details, amenities, and gallery for a luxury development in South Florida.',
      },
      areas: {
        title: 'Markets | Scattolini Group',
        description: 'Discover South Florida\'s most exclusive neighborhoods and real estate markets.',
      },
      areaDetail: {
        title: 'Market | Scattolini Group',
        description: 'Projects, lifestyle, and real estate opportunities in a South Florida market.',
      },
      team: {
        title: 'Team | Scattolini Group',
        description: 'Meet our multilingual team of expert luxury real estate advisors.',
      },
      contact: {
        title: 'Contact | Scattolini Group',
        description: 'Reach out for personalized guidance on developments, investments, and residences in South Florida.',
      },
      blog: {
        title: 'Market Insights | Scattolini Group',
        description: 'Perspectives on the South Florida real estate market for international buyers and investors.',
      },
      blogPost: {
        title: 'Article | Scattolini Group',
        description: 'Insights and guides on luxury real estate in Miami and South Florida.',
      },
    },
    errorBoundary: {
      title: 'Something went wrong',
      description: 'An unexpected error occurred. Please try again.',
      retry: 'Try again',
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
      meetAll: 'Meet the full team',
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
      ownerRole: 'Owner & Agent',
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
      allTypes: 'All Types',
      allStatuses: 'All Statuses',
    },
    projectTypes: {
      luxury: 'Luxury',
      residential: 'Residential',
      resort: 'Resort',
      branded: 'Branded',
    },
    projectCard: {
      viewDetails: 'View Details',
      priceFrom: 'From',
    },
    areaCard: {
      projects: 'projects',
      exploreMarket: 'Explore Market',
    },
    agentCard: {
      contact: 'Contact',
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
      quickSnapshot: 'A quick read to evaluate this market in seconds.',
      availableProjects: 'Available projects',
      launchPipeline: 'Active pipeline',
      deliveryReady: 'Delivery ready',
      galleryMoments: 'Gallery moments',
      signatureCharacter: 'Signature character',
      marketPulse: 'Market pulse',
      marketRead: {
        pipelineStrong: 'Strong new-launch activity.',
        pipelineBalanced: 'Balanced momentum between launches and deliveries.',
        pipelineEstablished: 'Established inventory with more completed options.',
      },
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
      deliveryNow: 'Now',
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
      sending: 'Sending…',
      errorMessage: 'We could not send your message. Please call (305) 381-5120 or email information@scattolinigroup.com.',
      interestLabel: 'I am interested in',
      interestOptions: {
        buying: 'Buying a property',
        selling: 'Selling a property',
        investing: 'Investment opportunities',
        renting: 'Renting a property',
      },
      timelineLabel: 'Timeline',
      timelineOptions: {
        immediate: 'Immediately',
        threeToSix: '3 – 6 months',
        sixToTwelve: '6 – 12 months',
        exploring: 'Just exploring',
      },
      budgetLabel: 'Budget range',
      budgetOptions: {
        under500: 'Under $500K',
        between500And1m: '$500K – $1M',
        between1mAnd3m: '$1M – $3M',
        over3m: '$3M+',
        preferNotToSay: 'Prefer not to say',
      },
    },
    blog: {
      eyebrow: 'Market Insights',
      title: 'Perspectives for the International Investor',
      description: 'Clear, calm reading on the South Florida real estate market, written for foreign buyers and investors who value being well informed.',
      allCategories: 'All',
      minRead: 'min read',
      readArticle: 'Read article',
      backToBlog: 'Back to insights',
      relatedEyebrow: 'Keep reading',
      relatedTitle: 'Related articles',
      ctaEyebrow: "Let's talk",
      ctaTitle: 'Questions about investing in Miami?',
      ctaDescription: 'Our multilingual team guides international buyers through every step — calmly and without pressure.',
      ctaDefaultMessage: 'I read your article and would like to talk about',
      ctaSubmit: 'Request Guidance',
      categories: {
        'market-insights': 'Market',
        'investor-guide': 'Investor Guide',
        financing: 'Financing',
        neighborhood: 'Neighborhoods',
        lifestyle: 'Lifestyle',
      },
    },
    whyUs: {
      eyebrow: 'Why Scattolini Group',
      title: 'The Boutique Advantage',
      description: 'Four reasons international buyers and investors choose Scattolini Group to navigate the South Florida market.',
      items: {
        multilingual: {
          title: 'Multilingual Service',
          description: 'Our advisors communicate fluently in Spanish, English, Portuguese, and Italian, so nothing is lost in translation.',
        },
        boutique: {
          title: 'Boutique Attention, Not Volume',
          description: 'You work directly with senior advisors who know every listing personally — not a call center or rotating agent.',
        },
        marketExpertise: {
          title: 'Deep Market Expertise',
          description: 'Fifteen years of hyperlocal knowledge across South Florida\'s most sought-after neighborhoods and emerging markets.',
        },
        investorAccess: {
          title: 'Pre-Construction & Investor Access',
          description: 'Early access to pre-construction launches, developer pricing, and off-market opportunities.',
        },
      },
    },
    process: {
      eyebrow: 'How It Works',
      title: 'Your Path to South Florida',
      description: 'A clear, pressure-free process designed to guide you from the first conversation through closing.',
      steps: {
        step1: {
          title: 'Tell Us Your Goals',
          description: 'An initial conversation to understand your budget, timeline, and desired lifestyle.',
        },
        step2: {
          title: 'Curated Recommendations',
          description: 'Receive a personalized selection of properties and neighborhoods matched to your criteria.',
        },
        step3: {
          title: 'Private Tours & Calls',
          description: 'We coordinate private showings, virtual walkthroughs, and developer calls as needed.',
        },
        step4: {
          title: 'Close With Confidence',
          description: 'We guide you through every step of negotiation, contracts, and closing — with full transparency.',
        },
      },
    },
    marketReport: {
      eyebrow: 'Free Resource',
      title: 'Get the South Florida Market Report',
      description: 'Pricing trends, pre-construction activity, and market outlook for international buyers and investors — delivered to your inbox.',
      placeholderName: 'Your name',
      placeholderEmail: 'Your email',
      submit: 'Send Me the Report',
      success: 'Thank you — we will send the market report to your inbox shortly.',
      sending: 'Sending…',
      error: 'We could not process your request. Please try again or email information@scattolinigroup.com.',
    },
    leadModal: {
      eyebrow: 'Before You Go',
      title: 'Get Personalized Property Matches',
      description: 'Share your details and a Scattolini Group advisor will send you a curated selection based on your interests.',
      submit: 'Get Matches',
      success: 'Thank you — an advisor will reach out shortly with personalized recommendations.',
      sending: 'Sending…',
      error: 'We could not send your request. Please try again.',
      dismiss: 'No thanks, continue browsing',
      close: 'Close',
    },
    testimonials: {
      eyebrow: 'Client Stories',
      title: 'What Our Clients Say',
      description: 'Trusted by buyers and investors across South Florida and beyond.',
    },
    floatingContact: {
      cta: 'Free Consultation',
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

const LANG_STORAGE_KEY = 'scattolini-lang';

function readStoredLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch {
    /* private browsing or storage blocked */
  }
  return 'es';
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = next;
  }, []);

  const t = useCallback((path: string) => getTranslation(path, lang), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
