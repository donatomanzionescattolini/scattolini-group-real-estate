import { FormEvent, useState } from 'react';
import { useTranslation } from '../../i18n';

interface InquiryFormProps {
  title?: string;
  description?: string;
  submitLabel?: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
  defaultMessage?: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export default function InquiryForm({
  title,
  description,
  submitLabel,
  theme = 'light',
  compact = false,
  defaultMessage = '',
}: InquiryFormProps) {
  const { t } = useTranslation();
  const resolvedSubmitLabel = submitLabel ?? t('inquiryForm.defaultSubmit');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: defaultMessage,
  });
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const inputClasses =
    theme === 'dark'
      ? 'w-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-amber-100 outline-none placeholder:text-[rgba(255,255,255,0.58)] focus:border-gold focus:ring-1 focus:ring-gold'
      : 'input-field';

  const textareaClasses = `${inputClasses} ${compact ? 'min-h-[120px]' : 'min-h-[150px]'} resize-none`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('submitting');

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    try {
      if (accessKey) {
        const response = await fetch(WEB3FORMS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Inquiry from ${formData.name}`,
            from_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
        });

        const result = await response.json();
        if (!response.ok || !result.success) throw new Error('Submission failed');
      } else {
        const body = [
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          formData.phone ? `Phone: ${formData.phone}` : null,
          '',
          formData.message,
        ]
          .filter(Boolean)
          .join('\n');

        window.location.href = `mailto:info@scattolinigroup.com?subject=${encodeURIComponent(`Inquiry from ${formData.name}`)}&body=${encodeURIComponent(body)}`;
      }

      setSubmitState('success');
      setFormData({ name: '', email: '', phone: '', message: defaultMessage });
    } catch {
      setSubmitState('error');
    }
  };

  const isSubmitting = submitState === 'submitting';

  return (
    <div>
      {title ? <h3 className={`text-3xl ${theme === 'dark' ? 'text-amber-100' : ''}`}>{title}</h3> : null}
      {description ? (
        <p className={`mt-3 text-sm leading-6 ${theme === 'dark' ? 'text-[rgba(255,255,255,0.76)]' : 'text-muted'}`}>{description}</p>
      ) : null}
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          className={inputClasses}
          type="text"
          placeholder={t('inquiryForm.placeholderName')}
          value={formData.name}
          onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
          required
          disabled={isSubmitting}
        />
        <input
          className={inputClasses}
          type="email"
          placeholder={t('inquiryForm.placeholderEmail')}
          value={formData.email}
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          required
          disabled={isSubmitting}
        />
        <input
          className={inputClasses}
          type="tel"
          placeholder={t('inquiryForm.placeholderPhone')}
          value={formData.phone}
          onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
          disabled={isSubmitting}
        />
        <textarea
          className={textareaClasses}
          placeholder={t('inquiryForm.placeholderMessage')}
          value={formData.message}
          onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
          required
          disabled={isSubmitting}
        />
        <button
          className={`${theme === 'dark' ? 'button-primary w-full sm:w-auto' : 'button-primary w-full'} disabled:cursor-not-allowed disabled:opacity-60`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('inquiryForm.sending') : resolvedSubmitLabel}
        </button>
      </form>
      {submitState === 'success' ? (
        <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gold' : 'text-navy'}`}>
          {t('inquiryForm.successMessage')}
        </p>
      ) : null}
      {submitState === 'error' ? (
        <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gold' : 'text-navy'}`}>
          {t('inquiryForm.errorMessage')}
        </p>
      ) : null}
    </div>
  );
}
