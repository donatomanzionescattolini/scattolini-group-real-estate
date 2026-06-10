import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n';
import PropertyFinder from './PropertyFinder';

const VIDEO_SRC = 'https://pagina-mama.s3.amazonaws.com/assets2/video-homepage.mp4';
const POSTER_SRC = 'https://pagina-mama.s3.amazonaws.com/assets2/desarrollos/AriaReserve/banner.jpg';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-[calc(100vh-6rem)] items-end overflow-hidden bg-section-bg">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        poster={POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgb(var(--deep)_/_0.9),rgb(var(--deep)_/_0.68),rgb(var(--deep)_/_0.42))]" />
      <div className="site-container relative z-10 py-20 sm:py-28">
        <div className="max-w-5xl hero-enter">
          <p className="hero-enter-item text-[11px] font-medium uppercase tracking-editorial text-gold">{t('hero.eyebrow')}</p>
          <h1 className="hero-enter-item mt-6 text-5xl leading-tight text-cream sm:text-6xl lg:text-7xl">
            {t('hero.heading').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 ? <br /> : null}</span>
            ))}
          </h1>
          <p className="hero-enter-item mt-6 max-w-2xl text-lg leading-8 text-cream/[0.84]">
            {t('hero.description')}
          </p>
          <div className="hero-enter-item mt-10 flex flex-col gap-4 sm:flex-row">
            <Link className="button-primary" to="/projects">
              {t('hero.exploreProjects')}
              <ArrowRight size={16} />
            </Link>
            <Link className="button-secondary-light" to="/team">
              {t('hero.meetTeam')}
            </Link>
          </div>
          <PropertyFinder />
        </div>
      </div>
    </section>
  );
}
