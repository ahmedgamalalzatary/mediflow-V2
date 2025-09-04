'use client';

// Redux Store Provider
// Wraps the app with Redux Provider for state management

import { Provider } from 'react-redux';
import { store } from './index';

interface StoreProviderProps {
  children: React.ReactNode;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}