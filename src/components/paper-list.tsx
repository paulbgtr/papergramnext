"use client";

import { useEffect, useState } from "react";
import { Paper as PaperComponent } from "./paper";
import type { Paper } from "@/data/papers";

export const PaperList = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const fetchPapers = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(`/api/papers?start=${startIndex}`);
      const data = await response.json();

      if (data.papers) {
        setPapers((prev) => [...prev, ...data.papers]);
        setStartIndex((prev) => prev + data.papers.length);
      }
    } catch (error) {
      console.error("Error fetching papers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && !isLoading) {
      fetchPapers();
    }
  };

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
      {isLoading && (
        <div className="flex h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};
