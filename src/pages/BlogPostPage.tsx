import { ArrowLeft, CalendarDays, Clock, UserRound } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import BlogCard from '../components/blog/BlogCard';
import Badge from '../components/ui/Badge';
import InquiryForm from '../components/ui/InquiryForm';
import { blogPosts, getPostById, localize, localizeBody } from '../data/blog';
import { useTranslation } from '../i18n';

export default function BlogPostPage() {
  const { postId } = useParams();
  const post = getPostById(postId ?? '');
  const { t, lang } = useTranslation();

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const title = localize(post.title, lang);
  const paragraphs = localizeBody(post.body, lang);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const relatedPosts = blogPosts
    .filter((entry) => entry.id !== post.id && entry.category === post.category)
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-navy">
        <img src={post.image} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,27,45,0.42),rgba(15,27,45,0.85))]" />
        <div className="site-container relative z-10 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-editorial text-[rgba(255,255,255,0.72)]">
              <Link to="/" className="hover:text-gold">
                {t('nav.home')}
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-gold">
                {t('nav.blog')}
              </Link>
            </div>
            <div className="mt-8">
              <Badge tone="light">{t(`blog.categories.${post.category}`)}</Badge>
            </div>
            <h1 className="mt-6 text-4xl text-amber-100 sm:text-5xl">{title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-[rgba(255,255,255,0.78)]">
              <span className="inline-flex items-center gap-2">
                <UserRound size={16} className="text-gold" /> {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} className="text-gold" /> {formattedDate}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={16} className="text-gold" /> {post.readMinutes} {t('blog.minRead')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body + sidebar */}
      <section className="bg-cream">
        <div className="site-container py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <article>
            <p className="text-lg leading-8 text-charcoal">{localize(post.excerpt, lang)}</p>
            <div className="mt-8 space-y-6">
              {paragraphs.map((block, index) =>
                block.startsWith('## ') ? (
                  <h2 key={`${index}-${block}`} className="pt-2 text-3xl text-navy">
                    {block.replace(/^##\s+/, '')}
                  </h2>
                ) : (
                  <p key={`${index}-${block.slice(0, 16)}`} className="text-base leading-8 text-muted">
                    {block}
                  </p>
                ),
              )}
            </div>

            <div className="mt-12 border-t border-[rgba(15,27,45,0.08)] pt-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-editorial text-navy hover:text-gold"
              >
                <ArrowLeft size={14} /> {t('blog.backToBlog')}
              </Link>
            </div>
          </article>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="panel-surface p-8">
              <p className="editorial-label">{t('blog.ctaEyebrow')}</p>
              <h3 className="mt-4 text-3xl">{t('blog.ctaTitle')}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{t('blog.ctaDescription')}</p>
              <div className="mt-6">
                <InquiryForm compact defaultMessage={`${t('blog.ctaDefaultMessage')} "${title}".`} submitLabel={t('blog.ctaSubmit')} />
              </div>
            </div>
          </aside>
        </div>
        </div>
      </section>

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section className="bg-cream py-20">
          <div className="site-container">
            <p className="editorial-label">{t('blog.relatedEyebrow')}</p>
            <h2 className="mt-4 text-4xl">{t('blog.relatedTitle')}</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

