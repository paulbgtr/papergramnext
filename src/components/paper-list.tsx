"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Paper as PaperComponent } from "./paper";
import { motion, AnimatePresence } from "framer-motion";

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
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
        />
      </div>
    );
  }

  if (status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex h-screen items-center justify-center"
      >
        <p className="text-destructive">Error loading papers</p>
      </motion.div>
    );
  }

  return (
    <div
      className="h-[100dvh] snap-y snap-mandatory overflow-y-auto scroll-smooth"
      onScroll={handleScroll}
    >
      <AnimatePresence mode="popLayout">
        {papers.map((paper, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="min-h-[calc(100dvh-4rem)] snap-always snap-start flex flex-col"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex h-auto min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8 sm:py-0"
            >
              <PaperComponent {...paper} />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
      {isFetchingNextPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-[calc(100dvh-4rem)] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              Loading more papers...
            </motion.p>
          </div>
        </motion.div>
      )}
      {!hasNextPage && papers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[calc(100dvh-4rem)] flex items-center justify-center"
        >
          <p className="text-muted-foreground">No more papers to load</p>
        </motion.div>
      )}
    </div>
  );
};
