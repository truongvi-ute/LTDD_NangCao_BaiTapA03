// Common type definitions
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface FormField {
  value: string;
  error?: string;
  touched?: boolean;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

export type Theme = 'light' | 'dark' | 'system';