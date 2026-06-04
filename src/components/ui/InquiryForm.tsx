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
  const [submitted, setSubmitted] = useState(false);

  const inputClasses =
    theme === 'dark'
      ? 'w-full border border-[rgba(255,255,255,0.16)] bg-[rgba(255,255,255,0.08)] px-4 py-3 text-sm text-amber-100 outline-none placeholder:text-[rgba(255,255,255,0.58)] focus:border-gold focus:ring-1 focus:ring-gold'
      : 'input-field';

  const textareaClasses = `${inputClasses} ${compact ? 'min-h-[120px]' : 'min-h-[150px]'} resize-none`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: defaultMessage });
  };

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
        />
        <input
          className={inputClasses}
          type="email"
          placeholder={t('inquiryForm.placeholderEmail')}
          value={formData.email}
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          required
        />
        <input
          className={inputClasses}
          type="tel"
          placeholder={t('inquiryForm.placeholderPhone')}
          value={formData.phone}
          onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
        />
        <textarea
          className={textareaClasses}
          placeholder={t('inquiryForm.placeholderMessage')}
          value={formData.message}
          onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))}
          required
        />
        <button className={theme === 'dark' ? 'button-primary w-full sm:w-auto' : 'button-primary w-full'} type="submit">
          {resolvedSubmitLabel}
        </button>
      </form>
      {submitted ? (
        <p className={`mt-4 text-sm ${theme === 'dark' ? 'text-gold' : 'text-navy'}`}>
          {t('inquiryForm.successMessage')}
        </p>
      ) : null}
    </div>
  );
}
