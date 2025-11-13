// Temporary: Use simple storage for Expo Go compatibility
// When using development build (npm run ios), switch back to './mmkv' and './hooks'
export { simpleStorage as storage, STORAGE_KEYS } from './simple-storage';
export {
  useMMKVStringState,
  useMMKVNumberState,
  useMMKVBooleanState,
  useMMKVObjectState,
} from './simple-hooks';
