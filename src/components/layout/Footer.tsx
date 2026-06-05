import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { areas } from '../../data/areas';
import { useTranslation } from '../../i18n';

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Facebook', href: '#', icon: Facebook },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
];

export default function Footer() {
  const featuredAreas = areas.slice(0, 6);
  const { t } = useTranslation();

  return (
    <footer>
      {/* CTA Band — teal (#1F595A) bg, cream text */}
      {/*<div className="bg-teal">*/}
      {/*  <div className="site-container py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">*/}
      {/*    <div>*/}
      {/*      <p className="text-[11px] font-medium uppercase tracking-editorial text-[rgba(237,227,214,0.65)]">{t('footer.ctaLabel') || 'Ready to invest?'}</p>*/}
      {/*      <p className="mt-1 font-serif text-2xl text-cream">{t('footer.ctaHeading') || 'Find your next property in Miami'}</p>*/}
      {/*    </div>*/}
      {/*    <Link*/}
      {/*      to="/contact"*/}
      {/*      className="inline-flex items-center gap-2 border border-gold bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-editorial text-navy transition hover:brightness-95 hover:-translate-y-0.5 shrink-0"*/}
      {/*    >*/}
      {/*      {t('footer.ctaButton') || 'Contact us'}*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/* Main footer body — navy (#1B3433) bg */}
      <div className="bg-navy">
        <div className="site-container py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="https://pagina-mama.s3.amazonaws.com/assets2/logos/logo-transparent-background-1.png"
                  alt=""
                  className="h-7 w-auto object-contain brightness-0 invert opacity-80"
                />
                <p className="font-serif text-3xl text-cream">Scattolini Group</p>
              </div>
              <div className="mt-3 h-px w-20 bg-gold" />
              <p className="mt-5 max-w-xs text-sm leading-7 text-[rgba(237,227,214,0.72)]">
                {t('footer.tagline')}
              </p>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(237,227,214,0.18)] text-cream hover:border-gold hover:text-gold transition"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('footer.quickLinks')}</p>
              <ul className="mt-6 space-y-3 text-sm text-[rgba(237,227,214,0.78)]">
                {[
                  { to: '/', label: t('nav.home') },
                  { to: '/projects', label: t('nav.projects') },
                  { to: '/areas', label: t('nav.areas') },
                  { to: '/blog', label: t('nav.blog') },
                  { to: '/team', label: t('nav.team') },
                  { to: '/contact', label: t('nav.contact') },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="inline-flex items-center gap-2 transition hover:text-gold"
                    >
                      <span className="h-px w-3 bg-gold opacity-60" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key markets */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('footer.keyMarkets')}</p>
              <ul className="mt-6 space-y-3 text-sm text-[rgba(237,227,214,0.78)]">
                {featuredAreas.map((area) => (
                  <li key={area.id}>
                    <Link
                      to={`/areas/${area.id}`}
                      className="inline-flex items-center gap-2 transition hover:text-gold"
                    >
                      <span className="h-px w-3 bg-gold opacity-60" />
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact — warm-brown accent icons on a slightly elevated panel */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('footer.contact')}</p>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-[rgba(237,227,214,0.78)]">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-warm-brown" />
                  <span>{t('footer.address')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} className="shrink-0 text-warm-brown" />
                  <span>{t('footer.phone')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} className="shrink-0 text-warm-brown" />
                  <span>{t('footer.email')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={14} className="mt-0.5 shrink-0 text-warm-brown" />
                  <span>{t('footer.hours')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar — Primary Dark (#0e2d2f), muted cream text */}
      <div style={{ background: '#0e2d2f' }}>
        <div className="site-container flex flex-col items-center justify-between gap-3 py-5 text-xs uppercase tracking-editorial text-[rgba(237,227,214,0.45)] sm:flex-row">
          <span>© {new Date().getFullYear()} Scattolini Group. {t('footer.rights')}</span>
          <span className="h-px w-8 bg-gold opacity-30 hidden sm:block" />
          <span className="text-[rgba(237,227,214,0.3)]">Miami · South Florida</span>
        </div>
      </div>
    </footer>
  );
}
