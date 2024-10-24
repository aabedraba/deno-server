import type { ApiResponse, ErrorResponse } from '../types';

export async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error);
  }
  return response.json();
}

export function handleError(error: unknown): ErrorResponse {
  if (error instanceof Error) {
    return {
      error: error.message,
      code: 500
    };
  }
  return {
    error: 'Unknown error occurred',
    code: 500
  };
}
