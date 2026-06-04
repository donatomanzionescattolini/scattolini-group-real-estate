import { Facebook, Instagram, Linkedin } from 'lucide-react';
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
    <footer className="bg-navy text-white">
      <div className="site-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="https://pagina-mama.s3.amazonaws.com/assets2/logos/logo-transparent-background-1.png"
                alt=""
                className="h-7 w-auto object-contain brightness-0 invert opacity-80"
              />
              <p className="font-serif text-4xl text-white">Scattolini Group</p>
            </div>
            <div className="mt-3 h-px w-20 bg-gold" />
            <p className="mt-5 max-w-xs text-sm leading-7 text-[rgba(255,255,255,0.72)]">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(255,255,255,0.16)] text-white hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="editorial-label">{t('footer.quickLinks')}</p>
            <ul className="mt-6 space-y-4 text-sm text-[rgba(255,255,255,0.78)]">
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/projects">{t('nav.projects')}</Link></li>
              <li><Link to="/areas">{t('nav.areas')}</Link></li>
              <li><Link to="/team">{t('nav.team')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <p className="editorial-label">{t('footer.keyMarkets')}</p>
            <ul className="mt-6 space-y-4 text-sm text-[rgba(255,255,255,0.78)]">
              {featuredAreas.map((area) => (
                <li key={area.id}>
                  <Link to={`/areas/${area.id}`}>{area.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="editorial-label">{t('footer.contact')}</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[rgba(255,255,255,0.78)]">
              <li>{t('footer.address')}</li>
              <li>{t('footer.phone')}</li>
              <li>{t('footer.email')}</li>
              <li>{t('footer.hours')}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[rgba(255,255,255,0.12)] pt-6 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.5)]">
          © {new Date().getFullYear()} Scattolini Group. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
