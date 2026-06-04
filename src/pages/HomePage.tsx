import FeaturedProjects from '../components/home/FeaturedProjects';
import AreasShowcase from '../components/home/AreasShowcase';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import TeamPreview from '../components/home/TeamPreview';
import InquiryForm from '../components/ui/InquiryForm';
import { useTranslation } from '../i18n';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <HeroSection />
      <StatsBar />
      <FeaturedProjects />
      <AreasShowcase />
      <TeamPreview />

      <section className="bg-teal-950 py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="editorial-label">{t('about.eyebrow')}</p>
            <h2 className="mt-5 text-5xl text-amber-100">{t('about.heading')}</h2>
            <div className="mt-6 h-px w-24 bg-gold" />

            {/* Elda's photo */}
            <div className="mt-8 flex items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src="https://pagina-mama.s3.amazonaws.com/assets2/elda/elda.jpg"
                  alt="Elda Scattolini"
                  className="h-32 w-32 rounded-full object-cover border-2 border-gold shadow-card"
                />
              </div>
              <div>
                <p className="font-serif text-xl text-amber-100 leading-snug">Elda Scattolini</p>
                <p className="mt-1 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.6)]">Owner &amp; Agent</p>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[rgba(255,255,255,0.76)]">
                  {t('about.description')}
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="font-serif text-4xl text-amber-100">80</p>
                <p className="mt-2 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.6)]">{t('about.statCuratedProjects')}</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-amber-100">25+</p>
                <p className="mt-2 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.6)]">{t('about.statMarketsServed')}</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-amber-100">14</p>
                <p className="mt-2 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.6)]">{t('about.statDedicatedAgents')}</p>
              </div>
            </div>
          </div>

          <div className="border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-8 shadow-card sm:p-10">
            <InquiryForm
              title={t('about.formTitle')}
              description={t('about.formDescription')}
              submitLabel={t('about.formSubmit')}
              theme="dark"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
