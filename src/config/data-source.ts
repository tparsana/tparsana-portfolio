// Data source configuration
// Set to 'supabase' for production, 'localStorage' for development without backend

export const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'localStorage';

export const isUsingSupabase = DATA_SOURCE === 'supabase';
export const isUsingLocalStorage = DATA_SOURCE === 'localStorage';

// Environment check
export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;
