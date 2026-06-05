import { Agent } from './types';

const S3 = 'https://pagina-mama.s3.amazonaws.com/assets2/asociados';

const ROLES = {
  ownerAgent: { en: 'Owner & Agent', es: 'Propietaria y Agente' },
  agentOfficeManager: { en: 'Agent & Office Manager', es: 'Agente y Gerente de Oficina' },
  agent: { en: 'Agent', es: 'Agente' },
  agentPropertyManager: { en: 'Agent & Property Manager', es: 'Agente y Administradora de Propiedades' },
  broker: { en: 'Broker', es: 'Corredora' },
} as const;

export const agents: Agent[] = [
  { id: 'elda-scattolini',    firstName: 'Elda',      lastName: 'Scattolini', role: ROLES.ownerAgent,          photo: `${S3}/elda-transparent-bg.png` },
  { id: 'dania-scattolini',   firstName: 'Dania',     lastName: 'Scattolini', role: ROLES.agentOfficeManager,  photo: `${S3}/dania-transparent-bg.png` },
  { id: 'laila-saade',        firstName: 'Laila',     lastName: 'Saade',      role: ROLES.agent,               photo: `${S3}/laila-transparent-bg.png` },
  { id: 'veruschka-jaimes',   firstName: 'Veruschka', lastName: 'Jaimes',     role: ROLES.agent,               photo: `${S3}/veruschka-transparent-bg.png` },
  { id: 'monica-manzione',    firstName: 'Monica',    lastName: 'Manzione',   role: ROLES.agentPropertyManager, photo: `${S3}/monica-transparent-bg.png` },
  { id: 'carmen-herrera',     firstName: 'Carmen',    lastName: 'Herrera',    role: ROLES.agent,               photo: `${S3}/carmen-transparent-bg.png` },
  { id: 'robinson-avila',     firstName: 'Robinson',  lastName: 'Ávila',      role: ROLES.agent,               photo: `${S3}/robinson-transparent-bg.png` },
  { id: 'mariolga-villasana', firstName: 'Mariolga',  lastName: 'Villasana',  role: ROLES.agent,               photo: `${S3}/mariolga-transparent-bg.png` },
  { id: 'dayana-trejo',       firstName: 'Dayana',    lastName: 'Trejo',      role: ROLES.agent,               photo: `${S3}/dayana-transparent-bg.png` },
  { id: 'victoria-martinez',  firstName: 'Victoria',  lastName: 'Martínez',   role: ROLES.agent,               photo: `${S3}/victoria-transparent-bg.png` },
  { id: 'gabriela-pena',      firstName: 'Gabriela',  lastName: 'Peña',       role: ROLES.agent,               photo: `${S3}/gabriela-transparent-bg.png` },
  { id: 'anahid-chalikian',   firstName: 'Anahid',    lastName: 'Chalikian',  role: ROLES.broker,              photo: `${S3}/anahid-transparent-bg.png` },
  { id: 'sherezade-vacas',    firstName: 'Sherezade', lastName: 'Vacas',      role: ROLES.agent,               photo: `${S3}/sherezade-transparent-bg.png` },
  { id: 'laura-martinez',     firstName: 'Laura',     lastName: 'Martínez',   role: ROLES.agent,               photo: `${S3}/laura-transparent-bg.png` },
];
