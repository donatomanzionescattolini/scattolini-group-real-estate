import { Mail, MapPin, Phone } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import { privacyPolicy } from '../data/privacyPolicy';
import { useTranslation } from '../i18n';

export default function PrivacyPolicyPage() {
  const { t, lang } = useTranslation();
  const content = privacyPolicy[lang];

  return (
    <div className="bg-section-bg">
      <section className="site-container py-20">
        <SectionHeader
          eyebrow={t('privacyPage.eyebrow')}
          title={t('privacyPage.title')}
          description={t('privacyPage.description')}
        />

        <div className="mt-14 max-w-3xl space-y-10">
          <p className="text-xs uppercase tracking-editorial text-navy/[0.54]">{content.updated}</p>
          <p className="text-base leading-8 text-muted">{content.intro}</p>

          {content.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-2xl text-navy">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="text-base leading-8 text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <ul className="space-y-3 text-base leading-8 text-muted">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-1 shrink-0 text-gold" />
              <span>Scattolini Group — {t('footer.address')}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-gold" />
              <a href="tel:+13053815120" className="hover:text-navy">{t('footer.phone')}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-gold" />
              <a href="mailto:information@scattolinigroup.com" className="hover:text-navy">{t('footer.email')}</a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
