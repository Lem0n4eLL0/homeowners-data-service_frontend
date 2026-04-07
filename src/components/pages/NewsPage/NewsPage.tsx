import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './NewsPage.module.scss';
import { INewsItem, fetchNews } from './newsData';

const NewsCard = ({ item }: { item: INewsItem }) => (
  <article className={styles['card']}>
    <div className={styles['cardImage']}>
      <img src={item.image} alt={item.title} loading="lazy" />
      <span className={styles['category']}>{item.category}</span>
    </div>
    <div className={styles['cardContent']}>
      <div className={styles['cardMeta']}>
        <span className={styles['date']}>{item.date}</span>
      </div>
      <h3 className={styles['cardTitle']}>{item.title}</h3>
      <p className={styles['cardDescription']}>{item.description}</p>
    </div>
  </article>
);

const Loader = () => (
  <div className={styles['loaderContainer']}>
    <div className={styles['spinner']}></div>
    <span>Загрузка новостей...</span>
  </div>
);

export const NewsPage = () => {
  const [newsItems, setNewsItems] = useState<INewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadingRef = useRef(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadNews = useCallback(async () => {
    if (loading || loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);

    try {
      const { items, hasMore: more } = await fetchNews(page, 6);

      setNewsItems(prev => {
        const existingIds = new Set(prev.map(item => item.id));
        const newItems = items.filter(item => !existingIds.has(item.id));
        return [...prev, ...newItems];
      });

      setHasMore(more);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
      setTimeout(() => {
        loadingRef.current = false;
      }, 100);
    }
  }, [page, hasMore, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        if (first.isIntersecting && !loading && hasMore) {
          void loadNews();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loading, hasMore, loadNews]);

  useEffect(() => {
    void loadNews();
  }, [loadNews]);

  return (
    <div className={styles['pageWrapper']}>
      <header className={styles['header']}>
        <h1 className={styles['title']}>Лента новостей</h1>
        <p className={styles['subtitle']}>Листайте вниз, чтобы загрузить еще</p>
      </header>

      <div className={styles['newsGrid']}>
        {newsItems.map(news => (
          <NewsCard key={news.id} item={news} />
        ))}
      </div>

      <div ref={loaderRef} className={styles['observerTarget']}>
        {loading && <Loader />}
        {!hasMore && newsItems.length > 0 && (
          <div className={styles['endMessage']}>Больше новостей нет 🎉</div>
        )}
      </div>
    </div>
  );
};
