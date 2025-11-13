import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';

/**
 * React hook for reactive storage values
 * Similar to useState but persists to storage
 */
export function useStorageState<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  // Initialize state from storage or default
  const [state, setState] = useState<T>(() => {
    const stored = storage.getString(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  // Update both state and storage
  const updateState = useCallback(
    (value: T) => {
      setState(value);
      storage.set(key, JSON.stringify(value));
    },
    [key]
  );

  return [state, updateState];
}

/**
 * Hook for boolean storage values
 */
export function useStorageBoolean(
  key: string,
  defaultValue: boolean
): [boolean, (value: boolean) => void] {
  const [state, setState] = useState<boolean>(() => {
    const stored = storage.getBoolean(key);
    return stored !== undefined ? stored : defaultValue;
  });

  const updateState = useCallback(
    (value: boolean) => {
      setState(value);
      storage.set(key, value);
    },
    [key]
  );

  return [state, updateState];
}

/**
 * Hook for number storage values
 */
export function useStorageNumber(
  key: string,
  defaultValue: number
): [number, (value: number) => void] {
  const [state, setState] = useState<number>(() => {
    const stored = storage.getNumber(key);
    return stored !== undefined ? stored : defaultValue;
  });

  const updateState = useCallback(
    (value: number) => {
      setState(value);
      storage.set(key, value);
    },
    [key]
  );

  return [state, updateState];
}
