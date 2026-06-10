const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const FALLBACK_EMAIL = 'info@scattolinigroup.com';

export interface SubmitLeadParams {
  /** Subject line for the notification email. */
  subject: string;
  /** Display name of the person submitting the lead. */
  fromName: string;
  /** Extra fields sent to Web3Forms (email, phone, message, interest, etc). */
  fields: Record<string, string | undefined>;
  /** Plain-text body used for the mailto fallback when no access key is configured. */
  mailtoBody: string;
}

/**
 * Submits a lead via Web3Forms when VITE_WEB3FORMS_KEY is configured, otherwise
 * falls back to a pre-filled mailto link. Throws if the Web3Forms submission fails.
 */
export async function submitLead({ subject, fromName, fields, mailtoBody }: SubmitLeadParams): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

  if (accessKey) {
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject,
        from_name: fromName,
        ...fields,
      }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) throw new Error('Submission failed');
    return;
  }

  window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;
}
