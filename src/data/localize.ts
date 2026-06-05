import { Lang, LocaleString, LocaleStringArray } from './types';

/** Pick the value for the active language, falling back to Spanish. */
export function localize(value: LocaleString, lang: Lang): string {
  return value[lang] ?? value.es;
}


/** Localize an array of paragraphs stored per language. */
export function localizeBody(value: LocaleStringArray, lang: Lang): string[] {
  return value[lang] ?? value.es;
}

