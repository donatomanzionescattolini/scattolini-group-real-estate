import { useTranslation } from '../../i18n';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeader from '../ui/SectionHeader';

const STEPS = ['step1', 'step2', 'step3', 'step4'] as const;

export default function ProcessSteps() {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-24">
      <div className="site-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t('process.eyebrow')}
            title={t('process.title')}
            description={t('process.description')}
            align="center"
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step} delay={index * 100}>
              <div>
                <p className="font-serif text-5xl text-gold">{String(index + 1).padStart(2, '0')}</p>
                <div className="mt-4 h-px w-12 bg-[rgba(27,52,51,0.18)]" />
                <h3 className="mt-5 text-xl text-navy">{t(`process.steps.${step}.title`)}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{t(`process.steps.${step}.description`)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
