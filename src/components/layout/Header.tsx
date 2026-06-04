import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useTranslation();

  const navigation = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.projects'), to: '/projects' },
    { label: t('nav.areas'), to: '/areas' },
    { label: t('nav.team'), to: '/team' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-[rgba(14,45,47,0.08)] bg-[rgba(242,242,237,0.95)] backdrop-blur ${
        scrolled ? 'shadow-[0_10px_40px_rgba(15,27,45,0.08)]' : ''
      }`}
    >
      <div className="site-container">
        <div className="flex h-24 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://pagina-mama.s3.amazonaws.com/assets2/logos/logo-transparent-background-1.png"
              alt="Scattolini Group"
              className="h-16 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs font-medium uppercase tracking-editorial ${isActive ? 'text-navy' : 'text-muted hover:text-navy'}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Language toggle */}
            <div className="flex items-center gap-1 border border-[rgba(15,27,45,0.12)] px-1 py-1">
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`px-2 py-1 text-xs font-semibold uppercase tracking-editorial transition-colors ${
                  lang === 'es' ? 'bg-navy text-white' : 'text-muted hover:text-navy'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs font-semibold uppercase tracking-editorial transition-colors ${
                  lang === 'en' ? 'bg-navy text-white' : 'text-muted hover:text-navy'
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center border border-[rgba(15,27,45,0.08)] text-navy lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[rgba(15,27,45,0.08)] bg-white lg:hidden">
          <div className="site-container flex flex-col py-6">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b border-[rgba(15,27,45,0.08)] py-4 text-xs font-medium uppercase tracking-editorial ${
                    isActive ? 'text-navy' : 'text-muted'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {/* Mobile language toggle */}
            <div className="mt-4 flex items-center gap-2 py-2">
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-editorial border ${
                  lang === 'es' ? 'bg-navy text-white border-navy' : 'border-[rgba(15,27,45,0.12)] text-muted'
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-editorial border ${
                  lang === 'en' ? 'bg-navy text-white border-navy' : 'border-[rgba(15,27,45,0.12)] text-muted'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
