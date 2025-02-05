import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Paper {
  title: string;
  authors: string[];
  date: string;
  keyPoints: string[];
  description: string;
  link?: string;
}

interface FavoritesStore {
  favorites: Paper[];
  addFavorite: (paper: Paper) => void;
  removeFavorite: (title: string) => void;
  isFavorite: (title: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (paper) =>
        set((state) => ({
          favorites: [...state.favorites, paper],
        })),
      removeFavorite: (title) =>
        set((state) => ({
          favorites: state.favorites.filter((paper) => paper.title !== title),
        })),
      isFavorite: (title) =>
        get().favorites.some((paper) => paper.title === title),
    }),
    {
      name: "favorites-storage",
    }
  )
);