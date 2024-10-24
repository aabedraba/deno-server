import React, { createContext, useContext, useState } from 'react';
import type { AuthState, User } from '../types';

interface BaseProviderProps {
  children: React.ReactNode;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null
};

const BaseContext = createContext<AuthState>(initialState);

export const BaseProvider: React.FC<BaseProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  
  return (
    <BaseContext.Provider value={state}>
      {children}
    </BaseContext.Provider>
  );
};

export const useBase = () => {
  const context = useContext(BaseContext);
  if (!context) {
    throw new Error('useBase must be used within BaseProvider');
  }
  return context;
};
