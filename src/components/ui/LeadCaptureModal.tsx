import { Mail, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useExitIntent } from '../../hooks/useExitIntent';
import { useTranslation } from '../../i18n';
import { submitLead } from '../../lib/leadSubmit';

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

const SESSION_KEY = 'sg-lead-modal-shown';

const fieldClass =
  'w-full border border-[rgba(27,52,51,0.15)] bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-muted focus:border-gold focus:ring-1 focus:ring-gold';

export default function LeadCaptureModal() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isContactPage = pathname === '/contact';

  const exitIntentTriggered = useExitIntent({ enabled: !isContactPage });

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  useEffect(() => {
    if (!exitIntentTriggered || isContactPage) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, '1');
    setOpen(true);
  }, [exitIntentTriggered, isContactPage]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const isSubmitting = submitState === 'sending';

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('sending');

    try {
      await submitLead({
        subject: 'Personalized Property Match Request',
        fromName: name,
        fields: { name, email, message: 'Requested personalized property recommendations (exit-intent).' },
        mailtoBody: `Name: ${name}\nEmail: ${email}\n\nRequested personalized property recommendations.`,
      });
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="modal-overlay absolute inset-0 bg-[rgba(15,27,26,0.6)]"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('leadModal.title')}
        className="modal-panel relative w-full max-w-md border border-[rgba(27,52,51,0.08)] bg-cream p-8 shadow-card sm:p-10"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t('leadModal.close')}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-navy transition hover:bg-[rgba(27,52,51,0.06)] hover:text-gold"
        >
          <X size={18} />
        </button>

        {submitState === 'success' ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <Mail className="text-gold" size={28} />
            <p className="text-base leading-7 text-navy">{t('leadModal.success')}</p>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-medium uppercase tracking-editorial text-gold">{t('leadModal.eyebrow')}</p>
            <h3 className="mt-3 text-3xl text-navy">{t('leadModal.title')}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{t('leadModal.description')}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t('inquiryForm.placeholderName')}
                className={fieldClass}
                disabled={isSubmitting}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t('inquiryForm.placeholderEmail')}
                className={fieldClass}
                disabled={isSubmitting}
              />
              <button type="submit" className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-60" disabled={isSubmitting}>
                {isSubmitting ? t('leadModal.sending') : t('leadModal.submit')}
              </button>
              {submitState === 'error' ? <p className="text-sm text-[#b3261e]">{t('leadModal.error')}</p> : null}
            </form>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full text-center text-xs uppercase tracking-editorial text-[rgba(27,52,51,0.5)] transition hover:text-gold"
            >
              {t('leadModal.dismiss')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
