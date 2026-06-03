import { useEffect, useMemo, useState } from 'react'
import './App.css'

const logoUrl =
  'https://pagina-mama.s3.amazonaws.com/assets2/logos/logo-transparent-background-1.png'
const videoUrl = 'https://pagina-mama.s3.amazonaws.com/assets2/video-homepage.mp4'
const teamGroupUrl =
  'https://pagina-mama.s3.amazonaws.com/assets2/asociados/asociados2.png'
const eldaPortraitUrl = 'https://pagina-mama.s3.amazonaws.com/assets2/elda/elda.jpg'

type Language = 'en' | 'it'

type Translation = {
  nav: {
    label: string
    home: string
    story: string
    team: string
    contact: string
  }
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    primaryCta: string
    secondaryCta: string
    cardLabel: string
    cardTitle: string
    cardBody: string
  }
  story: {
    eyebrow: string
    title: string
    body: string
    quote: string
    signature: string
    imageAlt: string
  }
  team: {
    eyebrow: string
    title: string
    body: string
    groupAlt: string
    members: Array<{
      name: string
      role: string
      bio: string
      image: string
      alt: string
    }>
  }
  stats: Array<{
    value: string
    label: string
  }>
  contact: {
    eyebrow: string
    title: string
    body: string
    phone: string
    email: string
    address: string
  }
  languageLabel: string
}

const translations: Record<Language, Translation> = {
  en: {
    nav: {
      label: 'Primary',
      home: 'Home',
      story: 'Leadership',
      team: 'Team',
      contact: 'Contact',
    },
    hero: {
      eyebrow: 'Scattolini Group Real Estate',
      title: 'A warmer, international face for your next chapter in South Florida.',
      subtitle:
        'A redesigned landing experience built around the Scattolini Group identity: cinematic motion, trusted leadership, and a team ready to guide local and international buyers.',
      primaryCta: 'Speak with Elda',
      secondaryCta: 'Meet the team',
      cardLabel: 'International-ready',
      cardTitle: 'English and Italian from the first click.',
      cardBody:
        'This concept is already localized so overseas clients can immediately connect with your brand story.',
    },
    story: {
      eyebrow: 'Owner spotlight',
      title: 'Lead with Elda’s presence and the credibility of a people-first advisory team.',
      body:
        'The redesign puts Elda Scattolini at the center of the brand while letting the broader team reinforce trust, speed, and local knowledge. The result feels personal, polished, and ready for premium listings.',
      quote:
        '“Relationships come first. Every search, sale, and relocation deserves clarity, care, and real guidance.”',
      signature: 'Elda Scattolini · Owner & Agent',
      imageAlt: 'Portrait of Elda Scattolini',
    },
    team: {
      eyebrow: 'Team presentation',
      title: 'Feature the faces behind the service.',
      body:
        'Use the group image for immediate warmth, then reinforce the brand with selected individual portraits for leadership, operations, and top agents.',
      groupAlt: 'Scattolini Group team photo',
      members: [
        {
          name: 'Elda Scattolini',
          role: 'Owner & Agent',
          bio: 'The recognizable face of the brand and the ideal anchor for high-trust lead generation.',
          image:
            'https://pagina-mama.s3.amazonaws.com/assets2/asociados/elda-transparent-bg.png',
          alt: 'Elda Scattolini team portrait',
        },
        {
          name: 'Dania Scattolini',
          role: 'Agent & Office Manager',
          bio: 'Operational depth and continuity for clients who need a seamless purchase journey.',
          image:
            'https://pagina-mama.s3.amazonaws.com/assets2/asociados/dania-transparent-bg.png',
          alt: 'Dania Scattolini team portrait',
        },
        {
          name: 'Monica Manzione',
          role: 'Agent & Property Manager',
          bio: 'Perfect for communicating full-service support beyond the initial transaction.',
          image:
            'https://pagina-mama.s3.amazonaws.com/assets2/asociados/monica-transparent-bg.png',
          alt: 'Monica Manzione team portrait',
        },
      ],
    },
    stats: [
      { value: '2', label: 'languages ready at launch' },
      { value: '1', label: 'brand video woven into the hero' },
      { value: '4+', label: 'real team visuals featured above the fold' },
    ],
    contact: {
      eyebrow: 'Contact',
      title: 'Turn the redesign into a high-trust conversion page.',
      body:
        'Keep the next step simple for buyers, sellers, and relocating families with direct access to Elda and the Scattolini Group office.',
      phone: '+1 (305) 613-9338',
      email: 'elda.scattolini@scattolinigroup.com',
      address: '12750 NW 17th Street, Unit 222 · Doral, Florida',
    },
    languageLabel: 'Italiano',
  },
  it: {
    nav: {
      label: 'Principale',
      home: 'Home',
      story: 'Leadership',
      team: 'Team',
      contact: 'Contatti',
    },
    hero: {
      eyebrow: 'Scattolini Group Real Estate',
      title:
        'Un volto più caldo e internazionale per il prossimo capitolo del brand in South Florida.',
      subtitle:
        'Una landing page ripensata attorno all’identità Scattolini Group: movimento cinematografico, leadership riconoscibile e un team pronto ad accompagnare clienti locali e internazionali.',
      primaryCta: 'Parla con Elda',
      secondaryCta: 'Scopri il team',
      cardLabel: 'Pronto per l’internazionale',
      cardTitle: 'Italiano e inglese fin dal primo clic.',
      cardBody:
        'Il concept è già localizzato per permettere ai clienti esteri di entrare subito in contatto con la storia e il tono del brand.',
    },
    story: {
      eyebrow: 'Focus sulla proprietà',
      title:
        'Mettere Elda in primo piano rafforza autorevolezza, relazione e fiducia.',
      body:
        'Il redesign porta Elda Scattolini al centro del racconto e usa il team per trasmettere affidabilità, rapidità e conoscenza del territorio. Il risultato è più personale, curato e adatto a un posizionamento premium.',
      quote:
        '“Le relazioni vengono prima di tutto. Ogni ricerca, vendita o relocation merita chiarezza, attenzione e una guida concreta.”',
      signature: 'Elda Scattolini · Proprietaria e agente',
      imageAlt: 'Ritratto di Elda Scattolini',
    },
    team: {
      eyebrow: 'Valore del team',
      title: 'Mostrare i volti giusti rende il brand più umano e memorabile.',
      body:
        'La foto di gruppo crea subito vicinanza, mentre alcuni ritratti selezionati valorizzano leadership, operations e servizi continuativi.',
      groupAlt: 'Foto del team Scattolini Group',
      members: [
        {
          name: 'Elda Scattolini',
          role: 'Proprietaria e agente',
          bio: 'Il volto più riconoscibile del brand, ideale per una homepage ad alta fiducia.',
          image:
            'https://pagina-mama.s3.amazonaws.com/assets2/asociados/elda-transparent-bg.png',
          alt: 'Ritratto del team di Elda Scattolini',
        },
        {
          name: 'Dania Scattolini',
          role: 'Agente e office manager',
          bio: 'Trasmette solidità operativa e continuità in tutto il percorso del cliente.',
          image:
            'https://pagina-mama.s3.amazonaws.com/assets2/asociados/dania-transparent-bg.png',
          alt: 'Ritratto del team di Dania Scattolini',
        },
        {
          name: 'Monica Manzione',
          role: 'Agente e property manager',
          bio: 'Perfetta per comunicare supporto completo anche dopo la transazione.',
          image:
            'https://pagina-mama.s3.amazonaws.com/assets2/asociados/monica-transparent-bg.png',
          alt: 'Ritratto del team di Monica Manzione',
        },
      ],
    },
    stats: [
      { value: '2', label: 'lingue disponibili al lancio' },
      { value: '1', label: 'video brand integrato nell’hero' },
      { value: '4+', label: 'visual reali del team già in evidenza' },
    ],
    contact: {
      eyebrow: 'Contatti',
      title: 'Trasforma il redesign in una pagina che converte con fiducia.',
      body:
        'Rendi immediato il passo successivo per buyer, seller e famiglie in relocation con accesso diretto a Elda e all’ufficio Scattolini Group.',
      phone: '+1 (305) 613-9338',
      email: 'elda.scattolini@scattolinigroup.com',
      address: '12750 NW 17th Street, Unit 222 · Doral, Florida',
    },
    languageLabel: 'English',
  },
}

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return 'en'
    }

    const storedLanguage = window.localStorage.getItem('sg-language')

    if (storedLanguage === 'en' || storedLanguage === 'it') {
      return storedLanguage
    }

    return window.navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en'
  })

  const t = useMemo(() => translations[language], [language])

  useEffect(() => {
    document.documentElement.lang = language
    document.title = 'Scattolini Group Real Estate'
    window.localStorage.setItem('sg-language', language)
  }, [language])

  return (
    <div className="page-shell">
      <header className="hero-section" id="home">
        <video
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          aria-label="Scattolini Group background video"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        <div className="topbar">
          <a className="brand" href="#home" aria-label="Scattolini Group home">
            <img src={logoUrl} alt="Scattolini Group logo" />
          </a>

          <nav aria-label={t.nav.label}>
            <a href="#home">{t.nav.home}</a>
            <a href="#story">{t.nav.story}</a>
            <a href="#team">{t.nav.team}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <button
            type="button"
            className="language-toggle"
            onClick={() => setLanguage((current) => (current === 'en' ? 'it' : 'en'))}
          >
            {t.languageLabel}
          </button>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p className="lead">{t.hero.subtitle}</p>

            <div className="hero-actions">
              <a className="primary-action" href="mailto:elda.scattolini@scattolinigroup.com">
                {t.hero.primaryCta}
              </a>
              <a className="secondary-action" href="#team">
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>

          <aside className="hero-card">
            <span>{t.hero.cardLabel}</span>
            <h2>{t.hero.cardTitle}</h2>
            <p>{t.hero.cardBody}</p>
          </aside>
        </div>
      </header>

      <main>
        <section className="content-section story-grid" id="story">
          <div className="story-copy">
            <p className="eyebrow">{t.story.eyebrow}</p>
            <h2>{t.story.title}</h2>
            <p>{t.story.body}</p>
            <blockquote>{t.story.quote}</blockquote>
            <p className="signature">{t.story.signature}</p>
          </div>

          <figure className="portrait-card">
            <img src={eldaPortraitUrl} alt={t.story.imageAlt} />
          </figure>
        </section>

        <section className="content-section team-section" id="team">
          <div className="section-heading">
            <p className="eyebrow">{t.team.eyebrow}</p>
            <h2>{t.team.title}</h2>
            <p>{t.team.body}</p>
          </div>

          <div className="team-layout">
            <div className="team-photo-card">
              <img src={teamGroupUrl} alt={t.team.groupAlt} />
            </div>

            <div className="team-members">
              {t.team.members.map((member) => (
                <article className="member-card" key={member.name}>
                  <img src={member.image} alt={member.alt} />
                  <div>
                    <h3>{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p>{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section stats-section" aria-label="Project highlights">
          {t.stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>
      </main>

      <footer className="content-section footer-section" id="contact">
        <div>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.body}</p>
        </div>

        <div className="contact-card">
          <a href={`tel:${t.contact.phone.replace(/[^\d+]/g, '')}`}>{t.contact.phone}</a>
          <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
          <p>{t.contact.address}</p>
        </div>
      </footer>
    </div>
  )
}

export default App
