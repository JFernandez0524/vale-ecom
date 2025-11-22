'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import * as AuthLibrary from 'aws-amplify/auth'; // Import all auth APIs

// Define the shape of our context
interface AuthContextType {
  // Properties from useAuthenticator (UI State)
  user: any;
  signOut: (data?: any) => void;
  authStatus: 'authenticated' | 'unauthenticated' | 'configuring';
  route: any;
  // The Raw AWS Amplify Auth APIs
  api: typeof AuthLibrary;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Internal component that actually uses the useAuthenticator hook.
 * This must be nested INSIDE the Authenticator.Provider.
 */
function AuthContextContent({ children }: { children: React.ReactNode }) {
  // 1. Get UI state and methods from Amplify UI
  const { user, signOut, authStatus, route } = useAuthenticator((context) => [
    context.user,
    context.authStatus,
    context.route,
  ]);

  // 2. Memoize the value so it doesn't trigger re-renders unnecessarily
  const value = useMemo(
    () => ({
      // State from the UI Library
      user,
      authStatus,
      // We wrap signOut to ensure it uses the UI library's flow (clearing state)
      signOut,
      route,

      // Expose all the raw functional APIs provided in your list
      // We group them under an 'api' object to keep namespaces clean,
      // or you can spread them directly if you prefer.
      api: {
        ...AuthLibrary,
      },
    }),
    [user, authStatus, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * The Main Provider Component
 * Wraps the app in BOTH the Amplify Authenticator.Provider
 * and your Custom AuthContext.
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Authenticator.Provider>
      <AuthContextContent>{children}</AuthContextContent>
    </Authenticator.Provider>
  );
}

/**
 * Custom Hook to use the context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
