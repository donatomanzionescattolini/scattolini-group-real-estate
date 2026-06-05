import { BlogPost } from './types';
import generated from './generated-posts.json';

// ─── Seed posts ────────────────────────────────────────────────────────────
// Curated, advisor-voice content for foreign buyers and investors. These ship
// with the site so the blog is never empty. The scheduled generator appends
// additional posts to `generated-posts.json` (see /api/generate-post.mjs).

const seedPosts: BlogPost[] = [
  {
    id: 'comprar-en-miami-siendo-extranjero',
    category: 'investor-guide',
    author: 'Scattolini Group',
    publishedAt: '2026-05-28',
    readMinutes: 6,
    image:
      'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?auto=format&fit=crop&w=1600&q=80',
    title: {
      es: 'Comprar en Miami siendo extranjero: lo que realmente necesita saber',
      en: 'Buying in Miami as a foreign national: what you actually need to know',
    },
    excerpt: {
      es: 'No necesita ser residente ni ciudadano para comprar propiedad en Florida. Le explicamos el proceso paso a paso, con calma y sin letra pequeña.',
      en: 'You do not need to be a resident or a citizen to buy property in Florida. Here is the process, step by step, calmly and without fine print.',
    },
    body: {
      es: [
        'Una de las primeras preguntas que recibimos de clientes en Latinoamérica y Europa es muy directa: “¿puedo comprar si no soy residente?” La respuesta corta es sí. Florida no impone restricciones a la propiedad por parte de extranjeros, y miles de familias internacionales cierran transacciones aquí cada año.',
        '## El comprador extranjero no está en desventaja',
        'Un comprador internacional tiene esencialmente los mismos derechos de propiedad que un ciudadano estadounidense. Puede comprar a su nombre, a nombre de una sociedad (LLC) o a través de un fideicomiso. Cada estructura tiene implicaciones fiscales y de privacidad que conviene revisar con un asesor antes de firmar.',
        '## Lo que sí cambia',
        'Las diferencias prácticas aparecen en el financiamiento y en los impuestos, no en el derecho a comprar. Si paga en efectivo, el proceso es prácticamente idéntico al de un residente. Si necesita una hipoteca, existen bancos que prestan a extranjeros, normalmente con un enganche del 30% al 40%.',
        'También conviene conocer la retención FIRPTA, que aplica cuando un extranjero vende una propiedad. No es un impuesto adicional: es un anticipo sobre la ganancia que, en muchos casos, se recupera al presentar la declaración. Planificarlo desde la compra evita sorpresas.',
        '## Nuestro consejo',
        'Rodéese de un equipo desde el inicio: un agente que conozca el mercado, un abogado de bienes raíces y un contador con experiencia internacional. La compra en sí es sencilla; lo que marca la diferencia es la estructura que elija antes de firmar.',
      ],
      en: [
        'One of the first questions we hear from clients in Latin America and Europe is very direct: “can I buy if I am not a resident?” The short answer is yes. Florida places no restrictions on foreign ownership, and thousands of international families close transactions here every year.',
        '## A foreign buyer is not at a disadvantage',
        'An international buyer has essentially the same ownership rights as a U.S. citizen. You can buy in your own name, through a company (LLC), or via a trust. Each structure carries tax and privacy implications worth reviewing with an advisor before you sign.',
        '## What does change',
        'The practical differences appear in financing and taxes, not in the right to buy. If you pay cash, the process is nearly identical to that of a resident. If you need a mortgage, there are banks that lend to foreign nationals, typically with a 30% to 40% down payment.',
        'It is also worth understanding FIRPTA withholding, which applies when a foreign national sells a property. It is not an extra tax: it is an advance against the gain that, in many cases, is recovered when the return is filed. Planning for it from the moment of purchase avoids surprises.',
        '## Our advice',
        'Surround yourself with a team from day one: an agent who knows the market, a real estate attorney, and an accountant with international experience. The purchase itself is simple; what makes the difference is the structure you choose before signing.',
      ],
    },
  },
  {
    id: 'preconstruccion-vs-reventa-2026',
    category: 'market-insights',
    author: 'Scattolini Group',
    publishedAt: '2026-05-14',
    readMinutes: 5,
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    title: {
      es: 'Preconstrucción vs. reventa en 2026: cómo pensar la decisión',
      en: 'Pre-construction vs. resale in 2026: how to think about the decision',
    },
    excerpt: {
      es: 'Ambas estrategias tienen sentido según su horizonte y su tolerancia al riesgo. Le ayudamos a ordenar las variables antes de decidir.',
      en: 'Both strategies make sense depending on your horizon and risk tolerance. We help you order the variables before deciding.',
    },
    body: {
      es: [
        'No existe una respuesta única a la pregunta de si conviene comprar en preconstrucción o en reventa. La mejor decisión depende de su horizonte de inversión, su flujo de caja y el papel que quiere que juegue la propiedad en su patrimonio.',
        '## La lógica de la preconstrucción',
        'Comprar sobre planos permite asegurar un precio hoy y pagar el enganche en cuotas durante la construcción, normalmente de 18 a 36 meses. Para un inversor con liquidez escalonada, esto es atractivo: financia la compra con sus propios plazos y entra a un precio anterior a la entrega.',
        'El riesgo es de tiempo y de ejecución. Los cronogramas pueden extenderse y el mercado puede moverse en cualquier dirección durante la obra. Por eso priorizamos desarrolladores con trayectoria comprobada.',
        '## La lógica de la reventa',
        'Una propiedad terminada se puede ver, alquilar y generar ingresos de inmediato. Para quien busca renta desde el primer mes o una segunda residencia para usar este invierno, la reventa suele ser el camino más directo.',
        '## Cómo lo abordamos con usted',
        'Antes de mostrarle inventario, conversamos sobre tres cosas: cuándo necesita que la propiedad produzca, cuánta liquidez quiere comprometer por adelantado y qué nivel de gestión está dispuesto a asumir. Con esas respuestas, la elección entre plano y reventa casi se resuelve sola.',
      ],
      en: [
        'There is no single answer to whether you should buy pre-construction or resale. The best decision depends on your investment horizon, your cash flow, and the role you want the property to play in your portfolio.',
        '## The logic of pre-construction',
        'Buying off-plan lets you lock in a price today and pay the deposit in installments during construction, usually 18 to 36 months. For an investor with staggered liquidity, this is attractive: you finance the purchase on your own timeline and enter at a pre-delivery price.',
        'The risk is timing and execution. Schedules can extend and the market can move in any direction during the build. That is why we prioritize developers with a proven track record.',
        '## The logic of resale',
        'A finished property can be seen, rented, and generate income immediately. For someone seeking rent from month one or a second home to use this winter, resale is usually the most direct path.',
        '## How we approach it with you',
        'Before showing you inventory, we talk about three things: when you need the property to produce, how much liquidity you want to commit upfront, and what level of management you are willing to take on. With those answers, the choice between off-plan and resale almost resolves itself.',
      ],
    },
  },
  {
    id: 'el-dolar-y-su-poder-de-compra',
    category: 'financing',
    author: 'Scattolini Group',
    publishedAt: '2026-04-30',
    readMinutes: 4,
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    title: {
      es: 'El dólar y su poder de compra: por qué la calma vence al apuro',
      en: 'The dollar and your buying power: why calm beats urgency',
    },
    excerpt: {
      es: 'El tipo de cambio influye, pero rara vez debe dictar la decisión. Una mirada serena sobre el timing de la inversión en dólares.',
      en: 'Exchange rates matter, but they should rarely dictate the decision. A calm look at timing a dollar-denominated investment.',
    },
    body: {
      es: [
        'Para un comprador cuyos ingresos están en otra moneda, el tipo de cambio se siente como el factor más importante del mundo. Es comprensible, pero rara vez debería ser el que decida la compra.',
        '## El bien raíz es un activo de largo plazo',
        'Una propiedad en Miami se mantiene, en promedio, durante años. Frente a ese horizonte, una variación cambiaria de corto plazo pesa mucho menos de lo que parece en el momento de firmar. Lo que realmente mueve el retorno es la ubicación, la calidad del activo y la demanda de alquiler.',
        '## El dólar como refugio',
        'Para muchos de nuestros clientes, comprar en dólares no es un costo: es precisamente el objetivo. Diversificar el patrimonio hacia una moneda estable y un mercado con reglas claras es una forma de protección frente a la volatilidad local.',
        '## Qué hacemos juntos',
        'No intentamos predecir el tipo de cambio; nadie puede. Lo que sí hacemos es ayudarle a estructurar la compra para que el momento del cambio sea una decisión consciente y no una reacción al titular del día.',
      ],
      en: [
        'For a buyer whose income is in another currency, the exchange rate can feel like the most important factor in the world. That is understandable, but it should rarely be the one that decides the purchase.',
        '## Real estate is a long-term asset',
        'A Miami property is held, on average, for years. Against that horizon, a short-term currency swing matters far less than it seems at the moment of signing. What truly drives the return is location, asset quality, and rental demand.',
        '## The dollar as a safe harbor',
        'For many of our clients, buying in dollars is not a cost: it is precisely the goal. Diversifying wealth into a stable currency and a market with clear rules is a form of protection against local volatility.',
        '## What we do together',
        'We do not try to predict the exchange rate; no one can. What we do is help you structure the purchase so that the timing of the conversion is a deliberate decision and not a reaction to the day\u2019s headline.',
      ],
    },
  },
  {
    id: 'brickell-edgewater-donde-invertir',
    category: 'neighborhood',
    author: 'Scattolini Group',
    publishedAt: '2026-04-16',
    readMinutes: 5,
    image:
      'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=1600&q=80',
    title: {
      es: 'Brickell o Edgewater: dos perfiles de inversión, una misma bahía',
      en: 'Brickell or Edgewater: two investment profiles, one bay',
    },
    excerpt: {
      es: 'Vecinos en el mapa, distintos en la práctica. Comparamos demanda de alquiler, perfil de inquilino y potencial de valorización.',
      en: 'Neighbors on the map, different in practice. We compare rental demand, tenant profile, and appreciation potential.',
    },
    body: {
      es: [
        'Brickell y Edgewater están separados por unos minutos en auto, pero responden a inversores con objetivos distintos. Conocer la diferencia ayuda a elegir el activo correcto y no solo el más cercano a la bahía.',
        '## Brickell: liquidez y demanda constante',
        'Como distrito financiero, Brickell ofrece la demanda de alquiler más profunda y estable de Miami. El inquilino típico es un profesional que valora caminar al trabajo, al gimnasio y a la cena. Esto se traduce en vacancia baja y facilidad para revender.',
        '## Edgewater: vistas y recorrido de valor',
        'Edgewater es más residencial y tranquilo, con torres frente a la bahía y vistas que Brickell no siempre puede ofrecer al mismo precio. Para un inversor con horizonte algo más largo, el recorrido de valorización puede ser atractivo a medida que el corredor madura.',
        '## Cómo decidimos con el cliente',
        'Si la prioridad es rentar rápido y con mínima fricción, solemos inclinarnos por Brickell. Si la prioridad es la vista, el espacio y la apreciación a mediano plazo, Edgewater entra fuerte en la conversación. Ninguna es mejor: son dos respuestas a dos preguntas distintas.',
      ],
      en: [
        'Brickell and Edgewater are a few minutes apart by car, but they answer to investors with different goals. Understanding the difference helps you choose the right asset, not just the one closest to the bay.',
        '## Brickell: liquidity and constant demand',
        'As the financial district, Brickell offers the deepest and most stable rental demand in Miami. The typical tenant is a professional who values walking to work, the gym, and dinner. That translates into low vacancy and easy resale.',
        '## Edgewater: views and a value runway',
        'Edgewater is more residential and calm, with bayfront towers and views that Brickell cannot always offer at the same price. For an investor with a slightly longer horizon, the appreciation runway can be attractive as the corridor matures.',
        '## How we decide with the client',
        'If the priority is renting quickly with minimal friction, we tend to lean toward Brickell. If the priority is the view, the space, and medium-term appreciation, Edgewater enters the conversation strongly. Neither is better: they are two answers to two different questions.',
      ],
    },
  },
];

// ─── Merge generated posts ───────────────────────────────────────────────────

const generatedPosts = generated as BlogPost[];

export const blogPosts: BlogPost[] = [...seedPosts, ...generatedPosts].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

// Re-exported from the shared helper so existing imports keep working.
export { localize, localizeBody } from './localize';

