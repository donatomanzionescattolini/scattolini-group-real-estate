import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { areas } from '../../data/areas';
import { blogPosts } from '../../data/blog';
import { localize } from '../../data/localize';
import { projects } from '../../data/projects';
import { useTranslation } from '../../i18n';

const SITE_NAME = 'Scattolini Group';
const SITE_URL = 'https://scattolinigroup.com';
const DARK_LOGO_URL = 'https://pagina-mama.s3.amazonaws.com/assets2/logos/logo-dark-background-1.png';
const COMPANY_PHONE = '+1-305-381-5120';
const COMPANY_EMAIL = 'info@scattolinigroup.com';
const COMPANY_ADDRESS = '12750 NW 17th Street, Suite 222, Miami, FL 33182, US';

const DEFAULT_COPY = {
  es: {
    title: 'Scattolini Group | Bienes Raíces de Lujo en South Florida',
    description:
      'Asesoría boutique de bienes raíces de lujo en South Florida. Explore desarrollos, áreas y análisis para compradores e inversores internacionales.',
    keywords:
      'Scattolini Group, bienes raíces Miami, real estate South Florida, desarrollos de lujo Miami, propiedades de lujo Florida',
  },
  en: {
    title: 'Scattolini Group | South Florida Luxury Real Estate',
    description:
      'Boutique South Florida luxury real estate advisory. Explore developments, neighborhoods, and market insights for international buyers and investors.',
    keywords:
      'Scattolini Group, Miami real estate, South Florida luxury real estate, Miami developments, Florida luxury properties',
  },
} as const;

interface SeoPageData {
  title: string;
  description: string;
  type: 'website' | 'article';
  image: string;
  keywords: string;
  article: null | {
    publishedTime: string;
  };
}

function ensureMetaByName(name: string): HTMLMetaElement {
  const existing = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (existing) return existing;
  const created = document.createElement('meta');
  created.setAttribute('name', name);
  document.head.appendChild(created);
  return created;
}

function ensureMetaByProperty(property: string): HTMLMetaElement {
  const existing = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (existing) return existing;
  const created = document.createElement('meta');
  created.setAttribute('property', property);
  document.head.appendChild(created);
  return created;
}

function ensureLink(rel: string, hreflang?: string): HTMLLinkElement {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  const existing = document.querySelector(selector) as HTMLLinkElement | null;
  if (existing) return existing;
  const created = document.createElement('link');
  created.setAttribute('rel', rel);
  if (hreflang) {
    created.setAttribute('hreflang', hreflang);
  }
  document.head.appendChild(created);
  return created;
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export default function SeoManager() {
  const { pathname } = useLocation();
  const { lang } = useTranslation();

  const seo = useMemo(() => {
    const normalizedPath = normalizePath(pathname);
    const fallback = DEFAULT_COPY[lang];
    const page: SeoPageData = {
      title: fallback.title,
      description: fallback.description,
      type: 'website',
      image: DARK_LOGO_URL,
      keywords: fallback.keywords,
      article: null,
    };

    if (normalizedPath === '/projects') {
      page.title = lang === 'es'
        ? 'Proyectos en South Florida | Scattolini Group'
        : 'South Florida Developments | Scattolini Group';
      page.description = lang === 'es'
        ? 'Explore desarrollos residenciales y branded residences en South Florida con asesoría boutique.'
        : 'Explore residential and branded developments across South Florida with boutique advisory support.';
    } else if (normalizedPath.startsWith('/projects/')) {
      const projectId = normalizedPath.split('/')[2];
      const project = projects.find((entry) => entry.id === projectId);
      if (project) {
        page.title = `${project.name} | ${SITE_NAME}`;
        page.description = localize(project.tagline, lang);
        page.image = project.image;
      }
    } else if (normalizedPath === '/areas') {
      page.title = lang === 'es'
        ? 'Áreas y Vecindarios de South Florida | Scattolini Group'
        : 'South Florida Neighborhoods | Scattolini Group';
      page.description = lang === 'es'
        ? 'Descubra las áreas más relevantes para inversión y estilo de vida en South Florida.'
        : 'Discover key South Florida neighborhoods for investment, lifestyle, and long-term value.';
    } else if (normalizedPath.startsWith('/areas/')) {
      const areaId = normalizedPath.split('/')[2];
      const area = areas.find((entry) => entry.id === areaId);
      if (area) {
        page.title = `${area.name} | ${SITE_NAME}`;
        page.description = localize(area.tagline, lang);
        page.image = area.bannerImage;
      }
    } else if (normalizedPath === '/blog') {
      page.title = lang === 'es'
        ? 'Análisis de Mercado | Scattolini Group'
        : 'Market Insights | Scattolini Group';
      page.description = lang === 'es'
        ? 'Análisis inmobiliario para compradores e inversores internacionales en South Florida.'
        : 'Real estate insights for international buyers and investors in South Florida.';
      page.type = 'article';
    } else if (normalizedPath.startsWith('/blog/')) {
      const postId = normalizedPath.split('/')[2];
      const post = blogPosts.find((entry) => entry.id === postId);
      if (post) {
        page.title = `${localize(post.title, lang)} | ${SITE_NAME}`;
        page.description = localize(post.excerpt, lang);
        page.image = post.image;
        page.type = 'article';
        page.article = { publishedTime: post.publishedAt };
      }
    } else if (normalizedPath === '/team') {
      page.title = lang === 'es'
        ? 'Equipo de Asesores | Scattolini Group'
        : 'Our Advisory Team | Scattolini Group';
      page.description = lang === 'es'
        ? 'Conozca al equipo multilingüe de Scattolini Group especializado en bienes raíces de lujo en South Florida.'
        : 'Meet Scattolini Group’s multilingual team specialized in South Florida luxury real estate advisory.';
    } else if (normalizedPath === '/contact') {
      page.title = lang === 'es'
        ? 'Contacto | Scattolini Group'
        : 'Contact | Scattolini Group';
      page.description = lang === 'es'
        ? 'Hable con Scattolini Group para asesoría de compra, inversión y desarrollos en South Florida.'
        : 'Contact Scattolini Group for advisory on buying, investing, and developments in South Florida.';
    }

    const canonicalPath = normalizedPath === '/' ? '/' : `${normalizedPath}/`;
    return {
      ...page,
      canonical: `${SITE_URL}${canonicalPath}`,
      spanishUrl: `${SITE_URL}${canonicalPath}?lang=es`,
      englishUrl: `${SITE_URL}${canonicalPath}?lang=en`,
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      languageCode: lang === 'es' ? 'es' : 'en',
      normalizedPath,
    };
  }, [lang, pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('lang', seo.languageCode);
    document.title = seo.title;

    ensureMetaByName('description').setAttribute('content', seo.description);
    ensureMetaByName('keywords').setAttribute('content', seo.keywords);
    ensureMetaByName('robots').setAttribute('content', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMetaByName('bingbot').setAttribute('content', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMetaByName('googlebot').setAttribute('content', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    ensureMetaByName('author').setAttribute('content', SITE_NAME);
    ensureMetaByName('twitter:card').setAttribute('content', 'summary_large_image');
    ensureMetaByName('twitter:title').setAttribute('content', seo.title);
    ensureMetaByName('twitter:description').setAttribute('content', seo.description);
    ensureMetaByName('twitter:image').setAttribute('content', seo.image);
    ensureMetaByName('twitter:image:alt').setAttribute('content', `${SITE_NAME} logo`);

    ensureMetaByProperty('og:title').setAttribute('content', seo.title);
    ensureMetaByProperty('og:description').setAttribute('content', seo.description);
    ensureMetaByProperty('og:url').setAttribute('content', seo.canonical);
    ensureMetaByProperty('og:type').setAttribute('content', seo.type);
    ensureMetaByProperty('og:site_name').setAttribute('content', SITE_NAME);
    ensureMetaByProperty('og:image').setAttribute('content', seo.image);
    ensureMetaByProperty('og:image:secure_url').setAttribute('content', seo.image);
    ensureMetaByProperty('og:image:alt').setAttribute('content', `${SITE_NAME} logo`);
    ensureMetaByProperty('og:locale').setAttribute('content', seo.locale);

    if (seo.article?.publishedTime) {
      ensureMetaByProperty('article:published_time').setAttribute('content', seo.article.publishedTime);
    }

    ensureLink('canonical').setAttribute('href', seo.canonical);
    ensureLink('alternate', 'es').setAttribute('href', seo.spanishUrl);
    ensureLink('alternate', 'en').setAttribute('href', seo.englishUrl);
    ensureLink('alternate', 'x-default').setAttribute('href', seo.canonical);

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          url: SITE_URL,
          email: COMPANY_EMAIL,
          telephone: COMPANY_PHONE,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '12750 NW 17th Street, Suite 222',
            addressLocality: 'Miami',
            addressRegion: 'FL',
            postalCode: '33182',
            addressCountry: 'US',
          },
          logo: {
            '@type': 'ImageObject',
            url: DARK_LOGO_URL,
            contentUrl: DARK_LOGO_URL,
          },
          image: DARK_LOGO_URL,
          knowsLanguage: ['es', 'en'],
        },
        {
          '@type': 'RealEstateAgent',
          '@id': `${SITE_URL}/#real-estate-agent`,
          name: SITE_NAME,
          url: SITE_URL,
          telephone: COMPANY_PHONE,
          email: COMPANY_EMAIL,
          areaServed: 'South Florida',
          address: COMPANY_ADDRESS,
          parentOrganization: {
            '@id': `${SITE_URL}/#organization`,
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: SITE_NAME,
          inLanguage: ['es', 'en'],
          publisher: {
            '@id': `${SITE_URL}/#organization`,
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${seo.canonical}#webpage`,
          url: seo.canonical,
          name: seo.title,
          description: seo.description,
          inLanguage: seo.languageCode,
          isPartOf: {
            '@id': `${SITE_URL}/#website`,
          },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: seo.image,
          },
        },
      ],
    } as Record<string, unknown>;

    if (seo.type === 'article' && seo.normalizedPath.startsWith('/blog/')) {
      const postId = seo.normalizedPath.split('/')[2];
      const post = blogPosts.find((entry) => entry.id === postId);
      if (post) {
        (schema['@graph'] as Record<string, unknown>[]).push({
          '@type': 'BlogPosting',
          headline: localize(post.title, lang),
          description: localize(post.excerpt, lang),
          image: post.image,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          inLanguage: seo.languageCode,
          author: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
          publisher: {
            '@id': `${SITE_URL}/#organization`,
          },
          mainEntityOfPage: {
            '@id': `${seo.canonical}#webpage`,
          },
        });
      }
    }

    let script = document.getElementById('sg-structured-data');
    if (!script) {
      script = document.createElement('script');
      script.id = 'sg-structured-data';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [lang, seo]);

  return null;
}
