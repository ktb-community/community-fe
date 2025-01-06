import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { countBoardView, getBoardComments } from '@/entities/board/api.ts';
import { useAuthStore } from '@/entities/auth/model.ts';
import BoardDetailFeature from '@/features/board/detail/BoardDetailFeature.tsx';
import BoardLikeFeature from '@/features/board/detail/BoardLikeFeature.tsx';
import BoardCommentFeature from '@/features/board/detail/BoardCommentFeature.tsx';
import BoardCommentCardFeature from '@/features/board/detail/BoardCommentCardFeature.tsx';

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
    queryKey: ['board_comments', bid],
    queryFn: async ({ pageParam }) => await getBoardComments(bid, pageParam),
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

  useEffect(() => {
    countBoardView(bid);
  }, [bid]);

  return (
    <div className="w-[580px]">
      <div className="border-2 rounded-2xl p-6 w-full flex flex-col gap-6">
        <BoardDetailFeature boardId={bid} />
        <BoardLikeFeature boardId={bid} userId={user!!.id} />
      </div>

      <hr className="my-12" />

      <div className="w-full">
        <BoardCommentFeature boardId={bid} userId={user!!.id} />
        <div className="mt-12 w-full flex flex-col gap-4">
          {boardCommentsData?.pages?.map((page) =>
            page?.data?.map((comment, index) => <BoardCommentCardFeature key={index} comment={comment} userId={user!!.id} boardId={bid} />),
          )}
        </div>
      </div>

      <div ref={observerRef} className="h-10"></div>
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default BoardDetailWidget;