export interface LoginResponse {
    message: string; // Message from the backend, if any
    token: string; // JWT token
    expiration: string; // Expiration date/time in ISO 8601 format
    userName: string; // The username of the authenticated user
    isAuthenticated: boolean; // Whether the user is authenticated
    roles: string[]; // List of roles assigned to the user
    userId: number; // Unique identifier for the user
  }
  