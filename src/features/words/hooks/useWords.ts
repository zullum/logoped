import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Word, WordFilters, WordCategory, DifficultyLevel } from '@/types';
import * as wordService from '@/lib/api/wordService';

/**
 * Query keys factory for words
 * Provides consistent query keys for React Query
 */
export const wordKeys = {
  all: ['words'] as const,
  lists: () => [...wordKeys.all, 'list'] as const,
  list: (filters: WordFilters) => [...wordKeys.lists(), filters] as const,
  details: () => [...wordKeys.all, 'detail'] as const,
  detail: (id: string) => [...wordKeys.details(), id] as const,
  random: (count: number, category?: WordCategory, difficulty?: DifficultyLevel) =>
    [...wordKeys.all, 'random', count, category, difficulty] as const,
  search: (query: string) => [...wordKeys.all, 'search', query] as const,
  categories: () => [...wordKeys.all, 'categories'] as const,
};

/**
 * Hook to fetch all words with optional filters
 */
export const useWords = (filters?: WordFilters) => {
  return useQuery({
    queryKey: wordKeys.list(filters || {}),
    queryFn: () => wordService.fetchWords(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * Hook to fetch a single word by ID
 */
export const useWord = (id: string) => {
  return useQuery({
    queryKey: wordKeys.detail(id),
    queryFn: () => wordService.fetchWordById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook to fetch words by category
 */
export const useWordsByCategory = (category: WordCategory) => {
  return useQuery({
    queryKey: wordKeys.list({ category }),
    queryFn: () => wordService.fetchWordsByCategory(category),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook to fetch words by difficulty
 */
export const useWordsByDifficulty = (difficulty: DifficultyLevel) => {
  return useQuery({
    queryKey: wordKeys.list({ difficulty }),
    queryFn: () => wordService.fetchWordsByDifficulty(difficulty),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * Hook to fetch random words for practice
 */
export const useRandomWords = (
  count: number = 5,
  category?: WordCategory,
  difficulty?: DifficultyLevel
) => {
  return useQuery({
    queryKey: wordKeys.random(count, category, difficulty),
    queryFn: () => wordService.fetchRandomWords(count, category, difficulty),
    staleTime: 0, // Always fetch fresh random words
    gcTime: 0, // Don't cache random results
  });
};

/**
 * Hook to search words
 */
export const useSearchWords = (query: string) => {
  return useQuery({
    queryKey: wordKeys.search(query),
    queryFn: () => wordService.searchWords(query),
    enabled: query.length > 0,
    staleTime: 1000 * 60, // 1 minute
  });
};

/**
 * Hook to get available categories with word counts
 */
export const useCategories = () => {
  return useQuery({
    queryKey: wordKeys.categories(),
    queryFn: () => wordService.getCategories(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to prefetch words for better UX
 * Useful for preloading data before navigation
 */
export const usePrefetchWords = () => {
  const queryClient = useQueryClient();

  const prefetchCategory = async (category: WordCategory) => {
    await queryClient.prefetchQuery({
      queryKey: wordKeys.list({ category }),
      queryFn: () => wordService.fetchWordsByCategory(category),
      staleTime: 1000 * 60 * 5,
    });
  };

  const prefetchWord = async (id: string) => {
    await queryClient.prefetchQuery({
      queryKey: wordKeys.detail(id),
      queryFn: () => wordService.fetchWordById(id),
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    prefetchCategory,
    prefetchWord,
  };
};
