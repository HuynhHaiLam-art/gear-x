import apiClient from '../config';

export const authService = {
    // Login
    login: (email, password) => {
        return apiClient.post('/Auth/login', { email, password });
    },

    // Register
    register: (userData) => {
        return apiClient.post('/Auth/register', userData);
    },

    // Logout
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    // Get current user
    getCurrentUser: () => {
        return apiClient.get('/Auth/me');
    },

    // Update profile
    updateProfile: (userData) => {
        return apiClient.put('/Auth/profile', userData);
    },

    // Change password
    changePassword: (oldPassword, newPassword) => {
        return apiClient.put('/Auth/password', { oldPassword, newPassword });
    },

    // Reset password request
    resetPasswordRequest: (email) => {
        return apiClient.post('/Auth/reset-password-request', { email });
    },

    // Reset password
    resetPassword: (token, newPassword) => {
        return apiClient.post('/Auth/reset-password', { token, newPassword });
    },

    // Verify email
    verifyEmail: (token) => {
        return apiClient.post('/Auth/verify-email', { token });
    }
}; 