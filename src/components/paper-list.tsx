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
      className="h-[calc(100vh-4rem)] snap-y snap-mandatory overflow-y-scroll scroll-smooth"
      onScroll={handleScroll}
    >
      {papers.map((paper, index) => (
        <div
          key={index}
          className="h-full snap-start transition-all duration-500 ease-in-out"
        >
          <PaperComponent {...paper} />
        </div>
      ))}
      {isFetchingNextPage && (
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};
