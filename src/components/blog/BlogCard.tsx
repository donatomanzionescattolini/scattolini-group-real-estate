import { ArrowRight } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { localize } from '../../data/blog';
import { BlogPost } from '../../data/types';
import { useTranslation } from '../../i18n';
import Badge from '../ui/Badge';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = memo(function BlogCard({ post }: BlogCardProps) {
  const { t, lang } = useTranslation();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[rgba(237,227,214,0.12)] bg-navy shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <Link to={`/blog/${post.id}`} className="relative block h-56 overflow-hidden">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={post.image}
          alt={localize(post.title, lang)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,36,35,0.6)] via-transparent to-transparent" />
        <div className="absolute left-5 top-5">
          <Badge>{t(`blog.categories.${post.category}`)}</Badge>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-editorial text-[rgba(237,227,214,0.6)]">
          <span>{formattedDate}</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span>
            {post.readMinutes} {t('blog.minRead')}
          </span>
        </div>
        <h3 className="mt-3 text-2xl leading-snug text-cream">{localize(post.title, lang)}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-[rgba(237,227,214,0.72)]">{localize(post.excerpt, lang)}</p>

        <Link
          to={`/blog/${post.id}`}
          className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-gold hover:text-cream"
        >
          {t('blog.readArticle')}
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
});

export default BlogCard;
