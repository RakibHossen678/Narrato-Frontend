import { useEffect, useRef } from "react";

const InfiniteList = ({ hasMore, isLoading, onLoadMore, children }) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <div>
      {children}
      <div ref={sentinelRef} className="h-6" />
      {isLoading ? (
        <p className="py-3 text-center text-sm text-slate-500">
          Loading more...
        </p>
      ) : null}
    </div>
  );
};

export default InfiniteList;
