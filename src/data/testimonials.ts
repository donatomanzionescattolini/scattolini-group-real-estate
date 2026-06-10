import { LocaleString } from './types';

export interface Testimonial {
  id: string;
  name: string;
  location: LocaleString;
  quote: LocaleString;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-mendez',
    name: 'Carolina Méndez',
    location: { es: 'Compradora, Brickell', en: 'Buyer, Brickell' },
    quote: {
      es: 'El equipo de Scattolini Group nos guio en cada paso de la compra de nuestro primer condominio en Brickell. Su conocimiento del mercado y la atención personalizada marcaron la diferencia.',
      en: 'The Scattolini Group team guided us through every step of buying our first condo in Brickell. Their market knowledge and personal attention made all the difference.',
    },
    rating: 5,
  },
  {
    id: 'testimonial-ferreira',
    name: 'Lucas Ferreira',
    location: { es: 'Inversor, Sunny Isles Beach', en: 'Investor, Sunny Isles Beach' },
    quote: {
      es: 'Como inversor extranjero, valoré enormemente que pudieran comunicarse conmigo en mi idioma y explicarme con claridad cada detalle del proceso de pre-construcción.',
      en: 'As a foreign investor, I deeply valued that they could communicate with me in my language and clearly explain every detail of the pre-construction process.',
    },
    rating: 5,
  },
  {
    id: 'testimonial-howard',
    name: 'Diane Howard',
    location: { es: 'Vendedora, Coconut Grove', en: 'Seller, Coconut Grove' },
    quote: {
      es: 'Vendieron nuestra propiedad por encima del precio pedido en menos de tres semanas. Profesionales, receptivos y honestos de principio a fin.',
      en: 'They sold our property above asking price in under three weeks. Professional, responsive, and honest from start to finish.',
    },
    rating: 5,
  },
];
