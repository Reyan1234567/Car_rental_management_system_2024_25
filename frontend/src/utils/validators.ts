// src/utils/validators.ts

// Function to check if a string is a valid email
export const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };
  
  // Function to check if a password is strong enough (e.g., at least 8 characters)
  export const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  // Function to check if a string is empty or contains only whitespace
  export const validateNotEmpty = (input: string): boolean => {
    return input.trim().length > 0;
  };
  
  // Function to check if a number is a valid positive integer
  export const validatePositiveInteger = (input: string): boolean => {
    const regex = /^\d+$/;
    return regex.test(input);
  };
  