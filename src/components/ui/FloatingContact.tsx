import { MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export default function FloatingContact() {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/13053815120"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(27,52,51,0.12)] bg-white text-navy shadow-card transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
      >
        <MessageCircle size={20} />
      </a>
      <a
        href="tel:+13053815120"
        aria-label={t('footer.phone')}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-gold text-navy shadow-card transition hover:-translate-y-0.5 hover:brightness-95"
      >
        <Phone size={18} />
      </a>
      <Link
        to="/contact"
        className="hidden rounded-full border border-[rgba(27,52,51,0.12)] bg-navy px-4 py-2 text-[10px] font-semibold uppercase tracking-editorial text-cream shadow-card transition hover:-translate-y-0.5 sm:inline-flex"
      >
        {t('nav.contact')}
      </Link>
    </div>
  );
}
