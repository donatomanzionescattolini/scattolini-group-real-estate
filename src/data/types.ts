export interface Agent {
  id: string;
  firstName: string;
  lastName: string;
  role: LocaleString;
  phone?: string;
  email?: string;
  photo?: string;
}

export interface Area {
  id: string;
  name: string;
  tagline: LocaleString;
  description: LocaleString;
  image: string;
  bannerImage: string;
  projectCount: number;
  gallery?: string[];
}

/** Supported UI languages (mirrors the union exported from i18n). */
export type Lang = 'es' | 'en';

/** A value translated into both supported languages. */
export interface LocaleString {
  es: string;
  en: string;
}

/** An array of strings (e.g. body paragraphs) per language. */
export interface LocaleStringArray {
  es: string[];
  en: string[];
}

export type BlogCategory =
  | 'market-insights'
  | 'investor-guide'
  | 'financing'
  | 'neighborhood'
  | 'lifestyle';

export interface BlogPost {
  /** URL slug, also used as the unique id. */
  id: string;
  category: BlogCategory;
  author: string;
  /** ISO date string (YYYY-MM-DD). */
  publishedAt: string;
  readMinutes: number;
  image: string;
  title: LocaleString;
  excerpt: LocaleString;
  /**
   * Body paragraphs per language. A paragraph that starts with `## `
   * is rendered as a subheading; everything else is a paragraph.
   */
  body: LocaleStringArray;
  /** True when the post was produced by the scheduled AI generator. */
  generated?: boolean;
}

export interface Project {
  id: string;
  name: string;
  areaId: string;
  areaName: string;
  tagline: LocaleString;
  description: LocaleString;
  address?: string;
  floors?: number;
  units?: LocaleString;
  completionYear?: string;
  priceFrom?: string;
  type: 'luxury' | 'residential' | 'resort' | 'branded';
  status: 'pre-construction' | 'under-construction' | 'completed';
  amenities: LocaleString[];
  features: LocaleString[];
  image: string;
  thumbnail?: string;
  featured?: boolean;
  gallery?: string[];
  factsheetPdf?: string;
  floorplansPdf?: string;
  videoUrl?: string;
}
