import { Agent } from './types';

const S3 = 'https://pagina-mama.s3.amazonaws.com/assets2/asociados';

export const agents: Agent[] = [
  { id: 'elda-scattolini',    firstName: 'Elda',      lastName: 'Scattolini', role: 'Owner & Agent',               photo: `${S3}/elda-transparent-bg.png` },
  { id: 'dania-scattolini',   firstName: 'Dania',     lastName: 'Scattolini', role: 'Agent & Office Manager',       photo: `${S3}/dania-transparent-bg.png` },
  { id: 'laila-saade',        firstName: 'Laila',     lastName: 'Saade',      role: 'Agent',                        photo: `${S3}/laila-transparent-bg.png` },
  { id: 'veruschka-jaimes',   firstName: 'Veruschka', lastName: 'Jaimes',     role: 'Agent',                        photo: `${S3}/veruschka-transparent-bg.png` },
  { id: 'monica-manzione',    firstName: 'Monica',    lastName: 'Manzione',   role: 'Agent & Property Manager',     photo: `${S3}/monica-transparent-bg.png` },
  { id: 'carmen-herrera',     firstName: 'Carmen',    lastName: 'Herrera',    role: 'Agent',                        photo: `${S3}/carmen-transparent-bg.png` },
  { id: 'robinson-avila',     firstName: 'Robinson',  lastName: 'Ávila',      role: 'Agent',                        photo: `${S3}/robinson-transparent-bg.png` },
  { id: 'mariolga-villasana', firstName: 'Mariolga',  lastName: 'Villasana',  role: 'Agent',                        photo: `${S3}/mariolga-transparent-bg.png` },
  { id: 'dayana-trejo',       firstName: 'Dayana',    lastName: 'Trejo',      role: 'Agent',                        photo: `${S3}/dayana-transparent-bg.png` },
  { id: 'victoria-martinez',  firstName: 'Victoria',  lastName: 'Martínez',   role: 'Agent',                        photo: `${S3}/victoria-transparent-bg.png` },
  { id: 'gabriela-pena',      firstName: 'Gabriela',  lastName: 'Peña',       role: 'Agent',                        photo: `${S3}/gabriela-transparent-bg.png` },
  { id: 'anahid-chalikian',   firstName: 'Anahid',    lastName: 'Chalikian',  role: 'Broker',                       photo: `${S3}/anahid-transparent-bg.png` },
  { id: 'sherezade-vacas',    firstName: 'Sherezade', lastName: 'Vacas',      role: 'Agent',                        photo: `${S3}/sherezade-transparent-bg.png` },
  { id: 'laura-martinez',     firstName: 'Laura',     lastName: 'Martínez',   role: 'Agent',                        photo: `${S3}/laura-transparent-bg.png` },
];
