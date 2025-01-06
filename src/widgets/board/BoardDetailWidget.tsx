import BoardDetailFeature from '@/features/board/detail/BoardDetailFeature.tsx';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getBoardComments } from '@/entities/board/api.ts';
import { useEffect, useRef } from 'react';
import BoardCommentCard from '@/features/board/detail/ui/BoardCommentCard.tsx';
import { useAuthStore } from '@/entities/auth/model.ts';
import BoardLikeFeature from '@/features/board/detail/BoardLikeFeature.tsx';

const BoardDetailWidget = () => {
  const user = useAuthStore(state => state.user);
  const { boardId } = useParams();
  const bid = parseInt(boardId as string);
  const observerRef = useRef<HTMLDivElement | null>(null);

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
    <div className="w-[580px]">
      <div className="border-2 rounded-2xl p-6 w-full flex flex-col gap-6">
        <BoardDetailFeature boardId={bid} />
        <BoardLikeFeature boardId={bid} userId={user!!.id} />
      </div>
      <hr className="my-5" />
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        {boardCommentsData?.pages?.map((page) =>
          page?.data?.map((comment, index) => <BoardCommentCard key={index} comment={comment} userId={user!!.id} />),
        )}
      </div>
      <div ref={observerRef} className="h-10"></div>
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default BoardDetailWidget;