import { useCallback } from "react";

const useInfiniteScroll = (
  intersectionObserver: React.MutableRefObject<any>,
  isPending: boolean,
  callback: { (): void; (): void },
) => {
  const infiniteScrollTrigger = useCallback(
    (node: any) => {
      if (isPending) return;
      if (intersectionObserver.current) { intersectionObserver.current.disconnect(); }
      intersectionObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (window.scrollY) {
            callback();
          }
        }
      });

      if (node) intersectionObserver.current.observe(node);
    },
    [isPending, intersectionObserver, callback],
  );
  return { infiniteScrollTrigger };
};
export default useInfiniteScroll;