import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n';

const VIDEO_SRC = 'https://pagina-mama.s3.amazonaws.com/assets2/video-homepage.mp4';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative isolate flex min-h-[calc(100vh-6rem)] items-end overflow-hidden bg-deep">
      {/* Autoplay background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(12,36,35,0.92),rgba(12,36,35,0.55),rgba(12,36,35,0.25))]" />
      <div className="site-container relative z-10 py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('hero.eyebrow')}</p>
          <h1 className="mt-6 text-5xl leading-tight text-amber-100 sm:text-6xl lg:text-7xl">
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
