import { useMemo, useState } from 'react';
import BlogCard from '../components/blog/BlogCard';
import SectionHeader from '../components/ui/SectionHeader';
import { blogPosts } from '../data/blog';
import { BlogCategory } from '../data/types';
import { useTranslation } from '../i18n';

const categories: BlogCategory[] = [
  'market-insights',
  'investor-guide',
  'financing',
  'neighborhood',
  'lifestyle',
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const { t } = useTranslation();

  const availableCategories = useMemo(
    () => categories.filter((category) => blogPosts.some((post) => post.category === category)),
    [],
  );

  const visiblePosts = useMemo(
    () => (activeCategory === 'all' ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)),
    [activeCategory],
  );

  const filters: (BlogCategory | 'all')[] = ['all', ...availableCategories];

  return (
    <div className="bg-cream">
      <section className="site-container py-20">
        <SectionHeader eyebrow={t('blog.eyebrow')} title={t('blog.title')} description={t('blog.description')} />

        <div className="mt-12 flex flex-wrap gap-3">
          {filters.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-editorial transition-colors ${
                  isActive
                    ? 'bg-navy text-white'
                    : 'border border-[rgba(15,27,45,0.12)] text-muted hover:border-navy hover:text-navy'
                }`}
              >
                {category === 'all' ? t('blog.allCategories') : t(`blog.categories.${category}`)}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visiblePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

