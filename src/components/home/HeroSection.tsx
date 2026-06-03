import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-[calc(100vh-6rem)] items-end overflow-hidden bg-navy">
      <img
        src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80"
        alt="Luxury skyline in Miami"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,27,45,0.88),rgba(15,27,45,0.36),rgba(15,27,45,0.18))]" />
      <div className="site-container relative z-10 py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="editorial-label">{t('hero.eyebrow')}</p>
          <h1 className="mt-6 text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
            {t('hero.heading').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 ? <br /> : null}</span>
            ))}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(255,255,255,0.78)]">
            {t('hero.description')}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link className="button-primary" to="/projects">
              {t('hero.exploreProjects')}
              <ArrowRight size={16} />
            </Link>
            <Link className="button-secondary" to="/team">
              {t('hero.meetTeam')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
