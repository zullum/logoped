import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';

/**
 * Custom hook wrapper for useQuery with TypeScript support
 */
export function useAppQuery<TData, TError = Error>(
  options: UseQueryOptions<TData, TError>
) {
  return useQuery<TData, TError>(options);
}

/**
 * Custom hook wrapper for useMutation with TypeScript support
 */
export function useAppMutation<TData, TError = Error, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) {
  return useMutation<TData, TError, TVariables, TContext>(options);
}
