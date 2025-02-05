"use client";

import { useFavoritesStore } from "@/store/favorites";
import { Paper } from "./paper";

export const FavoritesList = () => {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground">No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="mb-8 sm:mb-12 text-2xl sm:text-3xl font-bold tracking-tight">
        Your Favorites
      </h1>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((paper) => (
          <div
            key={paper.title}
            className="h-full bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <Paper {...paper} />
          </div>
        ))}
      </div>
    </div>
  );
};
