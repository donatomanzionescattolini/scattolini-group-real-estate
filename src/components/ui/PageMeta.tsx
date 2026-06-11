import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { areas } from '../../data/areas';
import { getPostById } from '../../data/blog';
import { projects } from '../../data/projects';
import { useTranslation } from '../../i18n';

const ROUTE_KEYS: Record<string, string> = {
  '/': 'seo.home',
  '/projects': 'seo.projects',
  '/areas': 'seo.areas',
  '/team': 'seo.team',
  '/contact': 'seo.contact',
  '/blog': 'seo.blog',
  '/privacy': 'seo.privacy',
};

function resolveSeoKey(pathname: string): string {
  if (ROUTE_KEYS[pathname]) return ROUTE_KEYS[pathname];
  if (pathname.startsWith('/projects/')) return 'seo.projectDetail';
  if (pathname.startsWith('/areas/')) return 'seo.areaDetail';
  if (pathname.startsWith('/blog/')) return 'seo.blogPost';
  return 'seo.home';
}

function resolveDynamicTitle(pathname: string, params: Record<string, string | undefined>): string | null {
  if (pathname.startsWith('/projects/') && params.projectId) {
    const project = projects.find((entry) => entry.id === params.projectId);
    if (project) return `${project.name} | Scattolini Group`;
  }
  if (pathname.startsWith('/areas/') && params.areaId) {
    const area = areas.find((entry) => entry.id === params.areaId);
    if (area) return `${area.name} | Scattolini Group`;
  }
  if (pathname.startsWith('/blog/') && params.postId) {
    const post = getPostById(params.postId);
    if (post) return `${post.title.en} | Scattolini Group`;
  }
  return null;
}

export default function PageMeta() {
  const { pathname } = useLocation();
  const params = useParams();
  const { lang, t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const key = resolveSeoKey(pathname);
    const dynamicTitle = resolveDynamicTitle(pathname, params);
    const title = dynamicTitle ?? t(`${key}.title`);
    const description = t(`${key}.description`);

    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    const ogTags: Record<string, string> = {
      'og:title': title,
      'og:description': description,
      'og:type': 'website',
      'og:url': `${window.location.origin}${pathname}`,
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
  }, [pathname, params, lang, t]);

  return null;
}
