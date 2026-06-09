import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getTranslation, useTranslation } from '../../i18n';

const ROUTE_KEYS: Record<string, string> = {
  '/': 'seo.home',
  '/projects': 'seo.projects',
  '/areas': 'seo.areas',
  '/team': 'seo.team',
  '/contact': 'seo.contact',
  '/blog': 'seo.blog',
};

function resolveSeoKey(pathname: string): string {
  if (ROUTE_KEYS[pathname]) return ROUTE_KEYS[pathname];
  if (pathname.startsWith('/projects/')) return 'seo.projectDetail';
  if (pathname.startsWith('/areas/')) return 'seo.areaDetail';
  if (pathname.startsWith('/blog/')) return 'seo.blogPost';
  return 'seo.home';
}

export default function PageMeta() {
  const { pathname } = useLocation();
  const { lang, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const key = resolveSeoKey(pathname);
    const title = t(`${key}.title`);
    const description = t(`${key}.description`);

    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [pathname, lang, t]);

  return null;
}

/** Non-hook helper for static fallbacks outside React. */
export function getDefaultPageTitle(lang: 'es' | 'en'): string {
  return getTranslation('seo.home.title', lang);
}
