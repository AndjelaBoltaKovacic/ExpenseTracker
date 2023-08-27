import { useEffect, useRef, useCallback } from 'react';

const useInfiniteScroll = (loadMoreCallback: any) => {
  const sentinelRef = useRef(null);

  const handleIntersection = useCallback(
    (entries: any) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        loadMoreCallback();
      }
    },
    [loadMoreCallback]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [handleIntersection]);

  return sentinelRef;
};

export default useInfiniteScroll;
