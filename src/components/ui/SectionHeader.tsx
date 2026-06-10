interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({ eyebrow, title, description, align = 'left' }: SectionHeaderProps) {
  const alignment = align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl';

  return (
    <div className={alignment}>
      <p className="editorial-label">{eyebrow}</p>
      <h2 className="mt-4 text-4xl sm:text-5xl">{title}</h2>
      <div className={`mt-5 h-px w-20 bg-gold ${align === 'center' ? 'mx-auto' : ''}`} />
      {description ? <p className="mt-6 text-base leading-7 text-navy/[0.72]">{description}</p> : null}
    </div>
  );
}
