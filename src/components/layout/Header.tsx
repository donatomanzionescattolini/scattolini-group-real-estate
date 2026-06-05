import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n';

/**
 * Navbar color scheme — both variants use the same brand palette.
 *  - 'light': cream/white background with dark navy text (light navbar)
 *  - 'dark':  navy background with cream text (Scheme 5 "Tonal Gradient")
 * Flip this constant to switch the entire navbar treatment.
 */
type NavTheme = 'light' | 'dark';
const NAV_THEME: NavTheme = 'light';

const NAV_STYLES: Record<NavTheme, {
  header: string;
  scrolledShadow: string;
  logo: string;
  navActive: string;
  navIdle: string;
  toggleBorder: string;
  toggleActive: string;
  toggleIdle: string;
  menuBtn: string;
  mobilePanel: string;
  mobileLinkBorder: string;
  mobileActive: string;
  mobileIdle: string;
  mobileToggleActive: string;
  mobileToggleIdle: string;
}> = {
  light: {
    header: 'border-b border-[rgba(27,52,51,0.08)] bg-[rgba(255,255,255,0.92)] backdrop-blur',
    scrolledShadow: 'shadow-[0_10px_40px_rgba(27,52,51,0.08)]',
    logo: 'text-navy',
    navActive: 'text-gold',
    navIdle: 'text-muted hover:text-navy',
    toggleBorder: 'border-[rgba(27,52,51,0.12)]',
    toggleActive: 'bg-navy text-cream',
    toggleIdle: 'text-muted hover:text-navy',
    menuBtn: 'border-[rgba(27,52,51,0.1)] text-navy',
    mobilePanel: 'border-t border-[rgba(27,52,51,0.08)] bg-white',
    mobileLinkBorder: 'border-[rgba(27,52,51,0.08)]',
    mobileActive: 'text-gold',
    mobileIdle: 'text-muted',
    mobileToggleActive: 'bg-navy text-cream border-navy',
    mobileToggleIdle: 'border-[rgba(27,52,51,0.12)] text-muted',
  },
  dark: {
    header: 'border-b border-[rgba(237,227,214,0.1)] bg-[rgba(27,52,51,0.92)] backdrop-blur',
    scrolledShadow: 'shadow-[0_10px_40px_rgba(12,36,35,0.45)]',
    logo: 'text-cream',
    navActive: 'text-gold',
    navIdle: 'text-[rgba(237,227,214,0.72)] hover:text-cream',
    toggleBorder: 'border-[rgba(237,227,214,0.18)]',
    toggleActive: 'bg-gold text-navy',
    toggleIdle: 'text-[rgba(237,227,214,0.72)] hover:text-cream',
    menuBtn: 'border-[rgba(237,227,214,0.18)] text-cream',
    mobilePanel: 'border-t border-[rgba(237,227,214,0.12)] bg-navy',
    mobileLinkBorder: 'border-[rgba(237,227,214,0.1)]',
    mobileActive: 'text-gold',
    mobileIdle: 'text-[rgba(237,227,214,0.72)]',
    mobileToggleActive: 'bg-gold text-navy border-gold',
    mobileToggleIdle: 'border-[rgba(237,227,214,0.18)] text-[rgba(237,227,214,0.72)]',
  },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useTranslation();
  const c = NAV_STYLES[NAV_THEME];

  const navigation = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.projects'), to: '/projects' },
    { label: t('nav.areas'), to: '/areas' },
    { label: t('nav.blog'), to: '/blog' },
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
    <header className={`fixed inset-x-0 top-0 z-50 ${c.header} ${scrolled ? c.scrolledShadow : ''}`}>
      <div className="site-container">
        <div className="flex h-24 items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className={`font-serif text-[2rem] leading-none ${c.logo} sm:text-[2.2rem]`}>Scattolini Group</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs font-medium uppercase tracking-editorial transition-colors ${isActive ? c.navActive : c.navIdle}`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Language toggle */}
            <div className={`flex items-center gap-1 border ${c.toggleBorder} px-1 py-1`}>
              <button
                type="button"
                onClick={() => setLang('es')}
                className={`px-2 py-1 text-xs font-semibold uppercase tracking-editorial transition-colors ${
                  lang === 'es' ? c.toggleActive : c.toggleIdle
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs font-semibold uppercase tracking-editorial transition-colors ${
                  lang === 'en' ? c.toggleActive : c.toggleIdle
                }`}
              >
                EN
              </button>
            </div>
          </nav>

          <button
            type="button"
            className={`inline-flex h-12 w-12 items-center justify-center border ${c.menuBtn} lg:hidden`}
            onClick={() => setMobileOpen((current) => !current)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className={`${c.mobilePanel} lg:hidden`}>
          <div className="site-container flex flex-col py-6">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `border-b ${c.mobileLinkBorder} py-4 text-xs font-medium uppercase tracking-editorial ${
                    isActive ? c.mobileActive : c.mobileIdle
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
                  lang === 'es' ? c.mobileToggleActive : c.mobileToggleIdle
                }`}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-2 text-xs font-semibold uppercase tracking-editorial border ${
                  lang === 'en' ? c.mobileToggleActive : c.mobileToggleIdle
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
