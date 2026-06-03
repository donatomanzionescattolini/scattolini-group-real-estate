import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { areas } from '../../data/areas';

const socialLinks = [
  { label: 'Instagram', href: '#', icon: Instagram },
  { label: 'Facebook', href: '#', icon: Facebook },
  { label: 'LinkedIn', href: '#', icon: Linkedin },
];

export default function Footer() {
  const featuredAreas = areas.slice(0, 6);

  return (
    <footer className="bg-navy text-white">
      <div className="site-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-4xl text-white">Scattolini Group</p>
            <div className="mt-3 h-px w-20 bg-gold" />
            <p className="mt-5 max-w-xs text-sm leading-7 text-[rgba(255,255,255,0.72)]">
              Boutique South Florida real estate advisory for discerning buyers, investors, and families seeking extraordinary addresses.
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
            <p className="editorial-label">Quick Links</p>
            <ul className="mt-6 space-y-4 text-sm text-[rgba(255,255,255,0.78)]">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/areas">Areas</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="editorial-label">Key Markets</p>
            <ul className="mt-6 space-y-4 text-sm text-[rgba(255,255,255,0.78)]">
              {featuredAreas.map((area) => (
                <li key={area.id}>
                  <Link to={`/areas/${area.id}`}>{area.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="editorial-label">Contact</p>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-[rgba(255,255,255,0.78)]">
              <li>Brickell Avenue, Miami, FL 33131</li>
              <li>(305) 555-0147</li>
              <li>hello@scattolinigroup.com</li>
              <li>Mon – Fri: 9:00 AM – 6:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[rgba(255,255,255,0.12)] pt-6 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.5)]">
          © {new Date().getFullYear()} Scattolini Group. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
