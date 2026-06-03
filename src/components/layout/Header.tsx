import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Areas', to: '/areas' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
      className={`fixed inset-x-0 top-0 z-50 border-b border-[rgba(15,27,45,0.05)] bg-[rgba(255,255,255,0.92)] backdrop-blur ${
        scrolled ? 'shadow-[0_10px_40px_rgba(15,27,45,0.08)]' : ''
      }`}
    >
      <div className="site-container">
        <div className="flex h-24 items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-[2rem] leading-none text-navy sm:text-[2.2rem]">Scattolini Group</span>
            <span className="mt-2 h-px w-20 bg-gold" />
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
          </div>
        </div>
      ) : null}
    </header>
  );
}
