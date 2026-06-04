import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import InquiryForm from '../components/ui/InquiryForm';
import SectionHeader from '../components/ui/SectionHeader';
import { useTranslation } from '../i18n';

export default function ContactPage() {
  const { t } = useTranslation();

  const contactItems = [
    { icon: MapPin, label: t('contactPage.labelOffice'), value: t('footer.address') },
    { icon: Phone, label: t('contactPage.labelPhone'), value: t('footer.phone') },
    { icon: Mail, label: t('contactPage.labelEmail'), value: t('footer.email') },
    { icon: Clock3, label: t('contactPage.labelHours'), value: t('footer.hours') },
  ];

  return (
    <div className="bg-white">
      <section className="site-container py-20">
        <SectionHeader
          eyebrow={t('contactPage.eyebrow')}
          title={t('contactPage.title')}
          description={t('contactPage.description')}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <div className="panel-surface p-8">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 border-b border-[rgba(15,27,45,0.08)] py-5 last:border-none last:pb-0 first:pt-0">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(201,168,76,0.12)] text-gold">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-editorial text-muted">{label}</p>
                    <p className="mt-2 text-base text-navy">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden border border-[rgba(15,27,45,0.08)] shadow-soft">
              <iframe
                title="Scattolini Group office map"
                src="https://www.google.com/maps?q=Brickell%20Avenue%2C%20Miami%2C%20FL&z=13&output=embed"
                className="h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="panel-surface p-8 sm:p-10">
            <InquiryForm
              title={t('contactPage.formTitle')}
              description={t('contactPage.formDescription')}
              submitLabel={t('contactPage.formSubmit')}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
