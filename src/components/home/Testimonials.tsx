import { Quote, Star } from 'lucide-react';
import { localize } from '../../data/localize';
import { testimonials } from '../../data/testimonials';
import { useTranslation } from '../../i18n';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeader from '../ui/SectionHeader';

export default function Testimonials() {
  const { t, lang } = useTranslation();

  return (
    <section className="bg-section-bg py-24">
      <div className="site-container">
        <ScrollReveal>
          <SectionHeader
            align="center"
            eyebrow={t('testimonials.eyebrow')}
            title={t('testimonials.title')}
            description={t('testimonials.description')}
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 100}>
              <div className="flex h-full flex-col border border-navy/[0.08] bg-white p-8 shadow-soft">
                <Quote className="text-gold" size={28} />
                <div className="mt-4 flex gap-1 text-gold">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-7 text-muted">{localize(testimonial.quote, lang)}</p>
                <div className="mt-6 border-t border-navy/[0.08] pt-4">
                  <p className="text-sm font-semibold text-navy">{testimonial.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-editorial text-navy/[0.5]">
                    {localize(testimonial.location, lang)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
