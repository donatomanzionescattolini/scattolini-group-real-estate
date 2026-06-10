import { Building2, Globe2, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from '../../i18n';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeader from '../ui/SectionHeader';

const ITEMS = [
  { key: 'multilingual', icon: Globe2 },
  { key: 'boutique', icon: Users },
  { key: 'marketExpertise', icon: TrendingUp },
  { key: 'investorAccess', icon: Building2 },
] as const;

export default function WhyUs() {
  const { t } = useTranslation();

  return (
    <section className="bg-section-bg py-24">
      <div className="site-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow={t('whyUs.eyebrow')}
            title={t('whyUs.title')}
            description={t('whyUs.description')}
            align="center"
          />
        </ScrollReveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ key, icon: Icon }, index) => (
            <ScrollReveal key={key} delay={index * 100}>
              <div className="h-full border border-[rgba(27,52,51,0.08)] bg-white p-8 text-center shadow-soft">
                <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[rgba(165,125,49,0.4)] bg-[rgba(165,125,49,0.08)] text-gold">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl text-navy">{t(`whyUs.items.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{t(`whyUs.items.${key}.description`)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
