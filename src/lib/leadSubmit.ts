const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

export interface SubmitLeadParams {
  /** Subject line for the notification email. */
  subject: string;
  /** Display name of the person submitting the lead. */
  fromName: string;
  /** Extra fields sent to Web3Forms (email, phone, message, interest, etc). */
  fields: Record<string, string | undefined>;
}

/**
 * Submits a lead by POSTing to Web3Forms, which delivers the message straight to
 * the inbox registered to VITE_WEB3FORMS_KEY (information@scattolinigroup.com). No mail
 * app is ever opened. Throws if the key is missing or the request fails, so the
 * calling form can surface its error state.
 */
export async function submitLead({ subject, fromName, fields }: SubmitLeadParams): Promise<void> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
  if (!accessKey) {
    throw new Error('VITE_WEB3FORMS_KEY is not configured');
  }

  // Strip undefined values so they aren't serialized as the string "undefined".
  const cleanFields = Object.fromEntries(
    Object.entries(fields).filter(([, value]) => value !== undefined && value !== ''),
  );

  const response = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: fromName,
      // Route replies straight to the lead when we captured an email.
      ...(cleanFields.email ? { replyto: cleanFields.email } : {}),
      ...cleanFields,
    }),
  });

  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result?.message || 'Submission failed');
  }
}
