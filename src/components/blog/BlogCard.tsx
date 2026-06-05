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
    <Link to={`/blog/${post.id}`} className="group relative block overflow-hidden border border-[rgba(27,52,51,0.08)] shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={post.image}
          alt={localize(post.title, lang)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(12,36,35,0.88)] via-[rgba(12,36,35,0.3)] to-transparent" />
      </div>

      <div className="relative flex min-h-[340px] flex-col justify-end p-7">
        <Badge>{t(`blog.categories.${post.category}`)}</Badge>
        <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-editorial text-[rgba(255,255,255,0.65)]">
          <span>{formattedDate}</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span>{post.readMinutes} {t('blog.minRead')}</span>
        </div>
        <h3 className="mt-2 text-2xl leading-snug text-amber-100">{localize(post.title, lang)}</h3>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-gold">
          {t('blog.readArticle')} <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
});

export default BlogCard;
