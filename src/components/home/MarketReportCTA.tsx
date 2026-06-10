import { Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useTranslation } from '../../i18n';
import { submitLead } from '../../lib/leadSubmit';
import ScrollReveal from '../ui/ScrollReveal';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'w-full border border-cream/[0.25] bg-white/[0.06] px-4 py-3 text-sm text-cream outline-none transition placeholder:text-cream/[0.5] focus:border-gold';

export default function MarketReportCTA() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState('sending');
    try {
      await submitLead({
        subject: 'South Florida Market Report Request',
        fromName: name,
        fields: {
          name,
          email,
          message: 'Requested the South Florida Market Report.',
        },
      });
      setState('success');
    } catch {
      setState('error');
    }
  };

  return (
    <section className="bg-teal py-24 text-cream">
      <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <ScrollReveal>
          <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('marketReport.eyebrow')}</p>
          <h2 className="mt-4 text-4xl text-cream sm:text-5xl">{t('marketReport.title')}</h2>
          <div className="mt-5 h-px w-20 bg-gold" />
          <p className="mt-6 max-w-xl text-base leading-8 text-cream/[0.8]">{t('marketReport.description')}</p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="border border-cream/[0.18] bg-deep/[0.35] p-8 sm:p-10">
            {state === 'success' ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <Mail className="text-gold" size={28} />
                <p className="text-base leading-7 text-cream">{t('marketReport.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={t('marketReport.placeholderName')}
                  className={fieldClass}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t('marketReport.placeholderEmail')}
                  className={fieldClass}
                />
                <button type="submit" disabled={state === 'sending'} className="button-primary w-full disabled:opacity-60">
                  {state === 'sending' ? t('marketReport.sending') : t('marketReport.submit')}
                </button>
                {state === 'error' ? <p className="text-sm text-[#f3b8b8]">{t('marketReport.error')}</p> : null}
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
