import { useParams } from 'react-router-dom';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getBoard, getBoardComments } from '@/entities/board/api.ts';
import BoardDetailForm from '@/features/board/detail/ui/BoardDetailForm.tsx';
import { useEffect, useRef } from 'react';

const BoardDetailFeature = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { boardId } = useParams();
  const bid = parseInt(boardId as string);

  const { isPending: isBoardDetailPending, isError: isBoardDetailError, data: boardDetailData } = useQuery({
    queryKey: ['board_detail', boardId],
    queryFn: async () => await getBoard(bid),
    enabled: !!bid,
  });

  const {
    data: boardCommentsData,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['boardComments'],
    queryFn: ({ pageParam }) => getBoardComments(bid, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextCursor : undefined,
  });

  console.log(boardCommentsData)

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

  if (isBoardDetailPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-2 rounded-2xl p-6 w-[680px]">
      <BoardDetailForm boardDetail={boardDetailData!!.data} />

      <div ref={observerRef} className="h-10"></div>
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default BoardDetailFeature;