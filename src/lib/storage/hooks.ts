import { useMMKVString, useMMKVNumber, useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import { storage } from './mmkv';

/**
 * Hook to use a string value from MMKV storage
 * Automatically re-renders when the value changes
 */
export function useMMKVStringState(key: string, defaultValue?: string) {
  return useMMKVString(key, storage);
}

/**
 * Hook to use a number value from MMKV storage
 * Automatically re-renders when the value changes
 */
export function useMMKVNumberState(key: string, defaultValue?: number) {
  return useMMKVNumber(key, storage);
}

/**
 * Hook to use a boolean value from MMKV storage
 * Automatically re-renders when the value changes
 */
export function useMMKVBooleanState(key: string, defaultValue?: boolean) {
  return useMMKVBoolean(key, storage);
}

/**
 * Hook to use an object value from MMKV storage
 * Automatically re-renders when the value changes
 */
export function useMMKVObjectState<T>(key: string, defaultValue?: T) {
  return useMMKVObject<T>(key, storage);
}
