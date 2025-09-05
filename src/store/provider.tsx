'use client';

// Redux Store Provider
// Wraps the app with Redux Provider for state management

import { Provider } from 'react-redux';
import { store } from './index';
import { useAuthState } from '@/features/auth';

interface StoreProviderProps {
  children: React.ReactNode;
}

function AuthStateProvider({ children }: { children: React.ReactNode }) {
  // Initialize auth state at the root level
  useAuthState();
  return <>{children}</>;
}

export function StoreProvider({ children }: StoreProviderProps) {
  return (
    <Provider store={store}>
      <AuthStateProvider>
        {children}
      </AuthStateProvider>
    </Provider>
  );
}