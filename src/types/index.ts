export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export interface User {
  id: string;
  displayName: string;
  email?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: Error | null;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ErrorResponse {
  error: string;
  code: number;
}
