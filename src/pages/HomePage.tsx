import FeaturedProjects from '../components/home/FeaturedProjects';
import AreasShowcase from '../components/home/AreasShowcase';
import HeroSection from '../components/home/HeroSection';
// import MarketReportCTA from '../components/home/MarketReportCTA';
import ProcessSteps from '../components/home/ProcessSteps';
import StatsBar from '../components/home/StatsBar';
import TeamPreview from '../components/home/TeamPreview';
// import Testimonials from '../components/home/Testimonials';
import WhyUs from '../components/home/WhyUs';
import InquiryForm from '../components/ui/InquiryForm';
import ScrollReveal from '../components/ui/ScrollReveal';
import { companyStats, formatStatValue } from '../data/stats';
import { useTranslation } from '../i18n';

export default function HomePage() {
  const { t } = useTranslation();

  const aboutStats = [
    { value: formatStatValue(companyStats.developments), label: t('about.statCuratedProjects') },
    { value: formatStatValue(companyStats.neighborhoods), label: t('about.statMarketsServed') },
    { value: String(companyStats.agents), label: t('about.statDedicatedAgents') },
  ];

  return (
    <div>
      <HeroSection />
      <StatsBar />
      <FeaturedProjects />
      <WhyUs />
      <ProcessSteps />
      <AreasShowcase />
      {/* <MarketReportCTA /> — hidden until the South Florida market report document actually exists */}
      <TeamPreview />
      {/* <Testimonials /> — placeholder content ready, kept hidden until real client testimonials are available */}

      <section className="bg-gradient-to-b from-white to-section-bg py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ScrollReveal>
            <p className="editorial-label">{t('about.eyebrow')}</p>
            <h2 className="mt-5 text-4xl text-navy">{t('about.heading')}</h2>
            <div className="mt-6 h-px w-24 bg-gold" />

            <div className="mt-8 flex items-start gap-6">
              <div className="flex-shrink-0">
                <img
                  src="https://pagina-mama.s3.amazonaws.com/assets2/elda/elda.jpg"
                  alt="Elda Scattolini"
                  className="h-32 w-32 rounded-full border-2 border-gold object-cover shadow-card"
                />
              </div>
              <div>
                <p className="font-serif text-xl leading-snug text-navy">Elda Scattolini</p>
                <p className="mt-1 text-xs uppercase tracking-editorial text-navy/[0.54]">{t('about.ownerRole')}</p>
                <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{t('about.description')}</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl text-navy tabular-nums">{stat.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-editorial text-navy/[0.54]">{stat.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120}>
            <div className="border border-navy/[0.08] bg-cream p-8 shadow-card sm:p-10">
              <InquiryForm
                title={t('about.formTitle')}
                description={t('about.formDescription')}
                submitLabel={t('about.formSubmit')}
                qualified
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
