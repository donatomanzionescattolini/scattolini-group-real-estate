import FeaturedProjects from '../components/home/FeaturedProjects';
import AreasShowcase from '../components/home/AreasShowcase';
import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import TeamPreview from '../components/home/TeamPreview';
import InquiryForm from '../components/ui/InquiryForm';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <FeaturedProjects />
      <AreasShowcase />
      <TeamPreview />

      <section className="bg-navy py-24">
        <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="editorial-label">About Scattolini Group</p>
            <h2 className="mt-5 text-5xl text-white">A boutique Latin-American-led team with a market-first point of view.</h2>
            <div className="mt-6 h-px w-24 bg-gold" />
            <p className="mt-8 max-w-2xl text-base leading-8 text-[rgba(255,255,255,0.76)]">
              We pair local knowledge, multilingual service, and a distinctly editorial eye for South Florida real estate. Whether guiding a family to a primary residence or advising an investor on pre-construction positioning, our process is tailored, discreet, and relentlessly attentive.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <p className="font-serif text-4xl text-white">80</p>
                <p className="mt-2 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.6)]">Curated projects</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-white">25+</p>
                <p className="mt-2 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.6)]">Markets served</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-white">14</p>
                <p className="mt-2 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.6)]">Dedicated agents</p>
              </div>
            </div>
          </div>

          <div className="border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] p-8 shadow-card sm:p-10">
            <InquiryForm
              title="Let us curate your next move"
              description="Share your goals and we will connect you with the right advisor, neighborhood, and opportunity."
              submitLabel="Request Consultation"
              theme="dark"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
