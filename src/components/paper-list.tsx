"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Paper as PaperComponent } from "./paper";

const fetchPapers = async ({ pageParam = 0 }) => {
  const response = await fetch(`/api/papers?start=${pageParam}`);
  const data = await response.json();
  return data;
};

export const PaperList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["papers"],
      queryFn: fetchPapers,
      getNextPageParam: (lastPage, pages) => {
        if (!lastPage.papers?.length) return undefined;
        return pages.reduce((acc, page) => acc + page.papers.length, 0);
      },
      initialPageParam: 0,
    });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (
      scrollHeight - scrollTop <= clientHeight * 1.5 &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  };

  const papers = data?.pages.flatMap((page) => page.papers) ?? [];

  if (status === "pending") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-destructive">Error loading papers</p>
      </div>
    );
  }

  return (
    <div
      className="h-[100dvh] snap-y snap-mandatory overflow-y-auto scroll-smooth"
      onScroll={handleScroll}
    >
      {papers.map((paper, index) => (
        <div
          key={index}
          className="min-h-[calc(100dvh-4rem)] snap-always snap-start flex flex-col"
        >
          <div className="flex h-auto min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:py-0">
            <PaperComponent {...paper} />
          </div>
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">
              Loading more papers...
            </p>
          </div>
        </div>
      )}
      {!hasNextPage && papers.length > 0 && (
        <div className="min-h-[calc(100dvh-4rem)] flex items-center justify-center">
          <p className="text-muted-foreground">No more papers to load</p>
        </div>
      )}
    </div>
  );
};
