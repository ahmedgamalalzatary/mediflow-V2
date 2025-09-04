// Global Hooks - useLocalStorage
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Implementation will be added here
  return [initialValue, () => {}] as const;
}

export default useLocalStorage;
