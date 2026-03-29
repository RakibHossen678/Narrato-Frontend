import { PropsWithChildren, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollListProps extends PropsWithChildren {
  hasMore: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export const InfiniteScrollList = ({
  children,
  hasMore,
  isFetchingNextPage,
  fetchNextPage,
}: InfiniteScrollListProps) => {
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasMore && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasMore, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-4">
      {children}
      <div ref={ref} className="h-6" />
    </div>
  );
};
