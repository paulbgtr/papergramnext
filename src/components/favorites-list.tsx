"use client";

import { useFavoritesStore } from "@/store/favorites";
import { Paper } from "./paper";
import { motion } from "framer-motion";

export const FavoritesList = () => {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex h-[calc(100vh-4rem)] items-center justify-center"
      >
        <p className="text-muted-foreground">No favorites yet</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-8 sm:mb-12 text-2xl sm:text-3xl font-mono font-bold tracking-tight"
      >
        Your Favorites
      </motion.h1>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((paper, index) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="h-full bg-card rounded-lg shadow-sm hover:border-primary/50"
          >
            <Paper {...paper} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
