import { ArrowRight, Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { areas } from '../../data/areas';
import { useTranslation } from '../../i18n';
import { submitLead } from '../../lib/leadSubmit';

type NewsletterState = 'idle' | 'sending' | 'success' | 'error';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/scattolinigroup/', icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/scattolinigroup', icon: Facebook },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/scattolini-group', icon: Linkedin },
];

export default function Footer() {
  const featuredAreas = areas.slice(0, 6);
  const { t } = useTranslation();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<NewsletterState>('idle');

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterState('sending');
    try {
      await submitLead({
        subject: 'Newsletter Subscription',
        fromName: newsletterEmail,
        fields: { email: newsletterEmail, message: 'Newsletter subscription request' },
      });
      setNewsletterState('success');
      setNewsletterEmail('');
    } catch {
      setNewsletterState('error');
    }
  };

  return (
    <footer>
      <div className="bg-teal">
        <div className="site-container flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-editorial text-cream/[0.65]">{t('footer.ctaLabel')}</p>
            <p className="mt-1 font-serif text-2xl text-cream">{t('footer.ctaHeading')}</p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-2 border border-gold bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-editorial text-navy transition hover:-translate-y-0.5 hover:brightness-95"
          >
            {t('footer.ctaButton')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="bg-navy">
        <div className="site-container py-16">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <img
                src="/brand/logo-cream.png"
                alt="Scattolini Group — Real Estate"
                className="h-24 w-auto"
              />
              <div className="mt-4 h-px w-20 bg-gold" />
              <p className="mt-5 max-w-xs text-sm leading-7 text-cream/[0.72]">
                {t('footer.tagline')}
              </p>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center border border-cream/[0.18] text-cream transition hover:border-gold hover:text-gold"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('footer.newsletter.title')}</p>
                {newsletterState === 'success' ? (
                  <p className="mt-3 text-sm text-cream/[0.78]">{t('footer.newsletter.success')}</p>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="mt-3 flex max-w-xs">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(event) => setNewsletterEmail(event.target.value)}
                      placeholder={t('footer.newsletter.placeholder')}
                      disabled={newsletterState === 'sending'}
                      className="w-full border border-cream/[0.2] bg-white/[0.05] px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/[0.45] focus:border-gold disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      aria-label={t('footer.newsletter.submit')}
                      disabled={newsletterState === 'sending'}
                      className="flex shrink-0 items-center justify-center border border-l-0 border-gold bg-gold px-4 text-navy transition hover:brightness-95 disabled:opacity-60"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </form>
                )}
                {newsletterState === 'error' ? (
                  <p className="mt-2 text-xs text-[#f3b8b8]">{t('footer.newsletter.error')}</p>
                ) : null}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('footer.quickLinks')}</p>
              <ul className="mt-6 space-y-3 text-sm text-cream/[0.78]">
                {[
                  { to: '/', label: t('nav.home') },
                  { to: '/projects', label: t('nav.projects') },
                  { to: '/areas', label: t('nav.areas') },
                  { to: '/blog', label: t('nav.blog') },
                  { to: '/team', label: t('nav.team') },
                  { to: '/contact', label: t('nav.contact') },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="inline-flex items-center gap-2 transition hover:text-gold">
                      <span className="h-px w-3 bg-gold opacity-60" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('footer.keyMarkets')}</p>
              <ul className="mt-6 space-y-3 text-sm text-cream/[0.78]">
                {featuredAreas.map((area) => (
                  <li key={area.id}>
                    <Link to={`/areas/${area.id}`} className="inline-flex items-center gap-2 transition hover:text-gold">
                      <span className="h-px w-3 bg-gold opacity-60" />
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('footer.contact')}</p>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-cream/[0.78]">
                <li className="flex items-start gap-3">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-warm-brown" />
                  <span>{t('footer.address')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={14} className="shrink-0 text-warm-brown" />
                  <a href="tel:+13053815120" className="transition hover:text-gold">
                    {t('footer.phone')}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={14} className="shrink-0 text-warm-brown" />
                  <a href="mailto:information@scattolinigroup.com" className="transition hover:text-gold">
                    {t('footer.email')}
                  </a>
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

      <div className="bg-deep">
        <div className="site-container flex flex-col items-center justify-between gap-3 py-5 text-xs uppercase tracking-editorial text-cream/[0.45] sm:flex-row">
          <span>© {new Date().getFullYear()} Scattolini Group. {t('footer.rights')}</span>
          <Link to="/privacy" className="transition hover:text-gold">{t('footer.privacyLink')}</Link>
          <span className="hidden h-px w-8 bg-gold opacity-30 sm:block" />
          <span className="text-cream/[0.3]">Miami · South Florida</span>
        </div>
      </div>
    </footer>
  );
}
