import { Lang } from '../i18n';

export interface PrivacyPolicySection {
  heading: string;
  paragraphs: string[];
}

export interface PrivacyPolicyContent {
  updated: string;
  intro: string;
  sections: PrivacyPolicySection[];
}

export const privacyPolicy: Record<Lang, PrivacyPolicyContent> = {
  es: {
    updated: 'Última actualización: 11 de junio de 2026',
    intro:
      'Scattolini Group ("nosotros" o "nuestro") respeta su privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos la información cuando usted utiliza nuestro sitio web y la aplicación móvil Scattolini Group (los "Servicios").',
    sections: [
      {
        heading: 'Información que Recopilamos',
        paragraphs: [
          'Cuando envía un formulario de contacto, una consulta o se suscribe a nuestro boletín a través de nuestro sitio web o aplicación, recopilamos la información que usted proporciona directamente, que puede incluir su nombre, correo electrónico, teléfono y mensaje. Si utiliza nuestros formularios de consulta calificada, también podemos recopilar su interés declarado (comprar, vender, invertir o alquilar), su plazo estimado y su rango de presupuesto.',
          'Utilizamos Vercel Analytics para comprender cómo los visitantes usan nuestro sitio web y aplicación. Este servicio recopila datos agregados y anonimizados, como páginas visitadas, ubicación general (país o región), tipo de dispositivo y navegador, sin utilizar cookies ni rastrearlo en otros sitios web.',
          'Nuestra aplicación almacena su preferencia de idioma (español o inglés) directamente en su dispositivo mediante almacenamiento local. Esta preferencia nunca se transmite a nosotros.',
        ],
      },
      {
        heading: 'Cómo Utilizamos su Información',
        paragraphs: [
          'Utilizamos la información recopilada para responder a sus consultas, conectarlo con el asesor adecuado, enviarle el informe de mercado del Sur de Florida o las actualizaciones de nuestro boletín que solicite, mejorar nuestro sitio web y aplicación con base en tendencias de uso agregadas, y cumplir con las obligaciones legales aplicables.',
        ],
      },
      {
        heading: 'Cómo Compartimos su Información',
        paragraphs: [
          'Los formularios se procesan a través de Web3Forms, un servicio externo que entrega su mensaje directamente a la bandeja de entrada de nuestra oficina. Web3Forms procesa esta información únicamente para entregar su mensaje y no la utiliza para ningún otro propósito.',
          'No vendemos, alquilamos ni intercambiamos su información personal con terceros con fines de marketing. Podemos divulgar información si así lo exige la ley, o para proteger los derechos, la propiedad o la seguridad de Scattolini Group, nuestros clientes u otras personas.',
        ],
      },
      {
        heading: 'Conservación de Datos',
        paragraphs: [
          'Conservamos la información que envía a través de nuestros formularios durante el tiempo necesario para responder a su consulta y mantener nuestros registros comerciales, después de lo cual se elimina de forma segura o se anonimiza.',
        ],
      },
      {
        heading: 'Sus Opciones y Derechos',
        paragraphs: [
          'Puede darse de baja de nuestro boletín en cualquier momento mediante el enlace incluido en nuestros correos electrónicos. También puede solicitar acceso, corrección o eliminación de su información personal contactándonos con los datos que se indican a continuación.',
        ],
      },
      {
        heading: 'Privacidad de Menores',
        paragraphs: [
          'Nuestro sitio web y aplicación no están dirigidos a menores de 13 años, y no recopilamos conscientemente información personal de menores.',
        ],
      },
      {
        heading: 'Permisos de la Aplicación Móvil',
        paragraphs: [
          'Nuestra aplicación móvil solo requiere conexión a internet para cargar contenido y enviar formularios. No solicita acceso a su cámara, ubicación, contactos, fotos ni a ningún otro sensor o función del dispositivo.',
        ],
      },
      {
        heading: 'Seguridad',
        paragraphs: [
          'Todos los datos transmitidos entre su dispositivo y nuestros servidores están encriptados mediante HTTPS. Si bien ningún método de transmisión o almacenamiento es completamente seguro, tomamos medidas razonables para proteger su información.',
        ],
      },
      {
        heading: 'Enlaces de Terceros y Contenido Incrustado',
        paragraphs: [
          'Nuestra página de contacto incluye un mapa de Google Maps con la ubicación de nuestra oficina, y nuestro pie de página enlaza a nuestros perfiles en Instagram, Facebook y LinkedIn. Estos servicios de terceros operan bajo sus propias políticas de privacidad, que le recomendamos revisar.',
        ],
      },
      {
        heading: 'Cambios a esta Política',
        paragraphs: [
          'Podemos actualizar esta Política de Privacidad periódicamente. La fecha de "última actualización" indicada arriba refleja la revisión más reciente. El uso continuado de nuestro sitio web o aplicación después de publicar cambios constituye la aceptación de la política actualizada.',
        ],
      },
      {
        heading: 'Contáctenos',
        paragraphs: [
          'Si tiene preguntas sobre esta Política de Privacidad o sobre cómo manejamos su información, contáctenos utilizando los siguientes datos:',
        ],
      },
    ],
  },

  en: {
    updated: 'Last updated: June 11, 2026',
    intro:
      'Scattolini Group ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you use our website and the Scattolini Group mobile app (the "Services").',
    sections: [
      {
        heading: 'Information We Collect',
        paragraphs: [
          'When you submit a contact form, inquiry form, or newsletter signup through our website or app, we collect the information you provide directly, which may include your name, email address, phone number, and message. If you use our qualified inquiry forms, we may also collect your stated interest (buying, selling, investing, or renting), timeline, and budget range.',
          'We use Vercel Analytics to understand how visitors use our website and app. This service collects anonymized, aggregate data such as page views, general location (country or region), device type, and browser — without using cookies or tracking you across other websites.',
          'Our app stores your selected language preference (Spanish or English) directly on your device using local storage. This preference is never transmitted to us.',
        ],
      },
      {
        heading: 'How We Use Your Information',
        paragraphs: [
          'We use the information we collect to respond to your inquiries, connect you with the appropriate advisor, send the South Florida market report or newsletter updates you request, improve our website and app based on aggregate usage trends, and comply with applicable legal obligations.',
        ],
      },
      {
        heading: 'How We Share Your Information',
        paragraphs: [
          'Form submissions are processed through Web3Forms, a third-party service that delivers your message directly to our office inbox. Web3Forms processes this information solely to deliver your submission and does not use it for any other purpose.',
          'We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may disclose information if required to do so by law, or to protect the rights, property, or safety of Scattolini Group, our clients, or others.',
        ],
      },
      {
        heading: 'Data Retention',
        paragraphs: [
          'We retain the information you submit through our forms for as long as necessary to respond to your inquiry and maintain our business records, after which it is securely deleted or anonymized.',
        ],
      },
      {
        heading: 'Your Choices and Rights',
        paragraphs: [
          'You may unsubscribe from our newsletter at any time using the link included in our emails. You may also request access to, correction of, or deletion of your personal information by contacting us at the details below.',
        ],
      },
      {
        heading: "Children's Privacy",
        paragraphs: [
          'Our website and app are not directed to children under the age of 13, and we do not knowingly collect personal information from children.',
        ],
      },
      {
        heading: 'Mobile App Permissions',
        paragraphs: [
          'Our mobile app requires only an internet connection to load content and submit forms. It does not request access to your camera, location, contacts, photos, or any other device feature or sensor.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'All data transmitted between your device and our servers is encrypted using HTTPS. While no method of transmission or storage is completely secure, we take reasonable measures to protect your information.',
        ],
      },
      {
        heading: 'Third-Party Links and Embedded Content',
        paragraphs: [
          'Our contact page includes an embedded Google Maps view of our office, and our footer links to our social media profiles on Instagram, Facebook, and LinkedIn. These third-party services operate under their own privacy policies, which we encourage you to review.',
        ],
      },
      {
        heading: 'Changes to This Policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. The "last updated" date above reflects the most recent revision. Continued use of our website or app after changes are posted constitutes acceptance of the updated policy.',
        ],
      },
      {
        heading: 'Contact Us',
        paragraphs: [
          'If you have questions about this Privacy Policy or how we handle your information, please contact us using the details below:',
        ],
      },
    ],
  },
};
