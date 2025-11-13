import { useState } from 'react';
import { simpleStorage } from './simple-storage';

export function useMMKVNumberState(key: string, defaultValue?: number): [number | undefined, (value: number) => void] {
  const [value, setValue] = useState<number | undefined>(() => simpleStorage.getNumber(key) ?? defaultValue);

  const setStorageValue = (newValue: number) => {
    simpleStorage.set(key, newValue);
    setValue(newValue);
  };

  return [value, setStorageValue];
}

export function useMMKVStringState(key: string, defaultValue?: string): [string | undefined, (value: string) => void] {
  const [value, setValue] = useState<string | undefined>(() => simpleStorage.getString(key) ?? defaultValue);

  const setStorageValue = (newValue: string) => {
    simpleStorage.set(key, newValue);
    setValue(newValue);
  };

  return [value, setStorageValue];
}

export function useMMKVBooleanState(key: string, defaultValue?: boolean): [boolean | undefined, (value: boolean) => void] {
  const [value, setValue] = useState<boolean | undefined>(() => simpleStorage.getBoolean(key) ?? defaultValue);

  const setStorageValue = (newValue: boolean) => {
    simpleStorage.set(key, newValue);
    setValue(newValue);
  };

  return [value, setStorageValue];
}

export function useMMKVObjectState<T>(key: string, defaultValue?: T): [T | undefined, (value: T) => void] {
  const [value, setValue] = useState<T | undefined>(() => {
    const stored = simpleStorage.getString(key);
    if (stored) {
      try {
        return JSON.parse(stored) as T;
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  const setStorageValue = (newValue: T) => {
    simpleStorage.set(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, setStorageValue];
}
