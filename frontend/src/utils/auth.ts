// src/utils/auth.ts

const TOKEN_KEY = "auth_token";

// Function to save the JWT token in local storage
export const saveAuthToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Function to get the JWT token from local storage
export const getAuthToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

// Function to remove the JWT token from local storage
export const removeAuthToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

// Function to check if the user is authenticated (i.e., if the token exists)
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
