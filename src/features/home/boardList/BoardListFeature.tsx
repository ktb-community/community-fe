import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { getBoardList } from '@/entities/board/api.ts';
import BoardCard from '@/features/home/boardList/ui/BoardCard.tsx';

const BoardListFeature = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const limit = 10;

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['boardList'],
    queryFn: ({ pageParam }) => getBoardList(pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage]);

  return (
    <div>
      <div className="flex flex-col gap-6">
        {data?.pages.map((page) =>
          page?.data.map((board) => <BoardCard key={board.boardId} board={board} />),
        )}
      </div>
      <div ref={observerRef} className="h-10"></div>
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default BoardListFeature;