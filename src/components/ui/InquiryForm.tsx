import { FormEvent, useState } from 'react';
import { useTranslation } from '../../i18n';
import { submitLead } from '../../lib/leadSubmit';

interface InquiryFormProps {
  title?: string;
  description?: string;
  submitLabel?: string;
  theme?: 'light' | 'dark';
  compact?: boolean;
  defaultMessage?: string;
  /** When true, renders Interest / Timeline / Budget selects to qualify the lead. */
  qualified?: boolean;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const INTEREST_OPTIONS = ['buying', 'selling', 'investing', 'renting'] as const;
const TIMELINE_OPTIONS = ['immediate', 'threeToSix', 'sixToTwelve', 'exploring'] as const;
const BUDGET_OPTIONS = ['under500', 'between500And1m', 'between1mAnd3m', 'over3m', 'preferNotToSay'] as const;

export default function InquiryForm({
  title,
  description,
  submitLabel,
  theme = 'light',
  compact = false,
  defaultMessage = '',
  qualified = false,
}: InquiryFormProps) {
  const { t } = useTranslation();
  const resolvedSubmitLabel = submitLabel ?? t('inquiryForm.defaultSubmit');

  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    interest: '',
    timeline: '',
    budget: '',
    message: defaultMessage,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const inputClasses =
    theme === 'dark'
      ? 'w-full border border-white/[0.16] bg-white/[0.08] px-4 py-3 text-sm text-amber-100 outline-none placeholder:text-white/[0.58] focus:border-gold focus:ring-1 focus:ring-gold'
      : 'input-field';

  const textareaClasses = `${inputClasses} ${compact ? 'min-h-[120px]' : 'min-h-[150px]'} resize-none`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState('submitting');

    try {
      await submitLead({
        subject: `Inquiry from ${formData.name}`,
        fromName: formData.name,
        fields: {
          email: formData.email,
          phone: formData.phone,
          interest: qualified ? formData.interest : undefined,
          timeline: qualified ? formData.timeline : undefined,
          budget: qualified ? formData.budget : undefined,
          message: formData.message,
        },
      });

      setSubmitState('success');
      setFormData(initialFormData);
    } catch {
      setSubmitState('error');
    }
  };

  const isSubmitting = submitState === 'submitting';

  return (
    <div>
      {title ? <h3 className={`text-3xl ${theme === 'dark' ? 'text-amber-100' : ''}`}>{title}</h3> : null}
      {description ? (
        <p className={`mt-3 text-sm leading-6 ${theme === 'dark' ? 'text-white/[0.76]' : 'text-muted'}`}>{description}</p>
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
        {qualified ? (
          <div className="grid gap-4 sm:grid-cols-3">
            <select
              className={inputClasses}
              value={formData.interest}
              onChange={(event) => setFormData((current) => ({ ...current, interest: event.target.value }))}
              disabled={isSubmitting}
            >
              <option className="text-charcoal" value="" disabled>{t('inquiryForm.interestLabel')}</option>
              {INTEREST_OPTIONS.map((option) => (
                <option className="text-charcoal" key={option} value={option}>{t(`inquiryForm.interestOptions.${option}`)}</option>
              ))}
            </select>
            <select
              className={inputClasses}
              value={formData.timeline}
              onChange={(event) => setFormData((current) => ({ ...current, timeline: event.target.value }))}
              disabled={isSubmitting}
            >
              <option className="text-charcoal" value="" disabled>{t('inquiryForm.timelineLabel')}</option>
              {TIMELINE_OPTIONS.map((option) => (
                <option className="text-charcoal" key={option} value={option}>{t(`inquiryForm.timelineOptions.${option}`)}</option>
              ))}
            </select>
            <select
              className={inputClasses}
              value={formData.budget}
              onChange={(event) => setFormData((current) => ({ ...current, budget: event.target.value }))}
              disabled={isSubmitting}
            >
              <option className="text-charcoal" value="" disabled>{t('inquiryForm.budgetLabel')}</option>
              {BUDGET_OPTIONS.map((option) => (
                <option className="text-charcoal" key={option} value={option}>{t(`inquiryForm.budgetOptions.${option}`)}</option>
              ))}
            </select>
          </div>
        ) : null}
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
