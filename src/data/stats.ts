import { agents } from './agents';
import { areas } from './areas';
import { projects } from './projects';

/** Single source of truth for company metrics shown across the site. */
export const companyStats = {
  neighborhoods: areas.length,
  developments: projects.length,
  agents: agents.length,
  yearsOfExcellence: 15,
} as const;

export function formatStatValue(value: number, suffix = '+'): string {
  return `${value}${suffix}`;
}
