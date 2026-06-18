import { create } from 'zustand';

// Safely parse local storage to prevent React crashes
let storedUser = null;
try {
  const userItem = localStorage.getItem('user');
  if (userItem && userItem !== "undefined") {
    storedUser = JSON.parse(userItem);
  }
} catch (error) {
  console.error("Failed to parse user from local storage", error);
}

const storedToken = localStorage.getItem('token');

const useAuthStore = create((set) => ({
  user: storedUser || null,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  
  // Action to run after a successful login API call
  login: (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    set({ user: userData, token, isAuthenticated: true });
  },

  // Action to clear everything out
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  }
}));

export default useAuthStore;