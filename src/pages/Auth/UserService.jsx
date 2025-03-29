// userApi.js

/**
 * User API service for interacting with user endpoints
 */
class UserService {
    constructor(baseUrl = 'http://localhost:5000/api') {
      this.baseUrl = baseUrl;
      this.userEndpoint = `${this.baseUrl}/User`;
    }
  
    /**
     * Get the current user's profile
     * @returns {Promise<Object>} User profile data
     */
    async getProfile() {
      try {
        const response = await fetch(`${this.userEndpoint}/Profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
          },
          credentials: 'include'
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to fetch profile');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
    }
  
    /**
     * Log in a user
     * @param {Object} credentials - The login credentials
     * @param {string} credentials.email - User's email
     * @param {string} credentials.password - User's password
     * @returns {Promise<Object>} Authentication token and user info
     */
    async login(credentials) {
      try {
        const response = await fetch(`${this.userEndpoint}/Login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials),
          credentials: 'include'
        });
  
        if (!response.ok) {
          throw new Error('Login failed. Please check your credentials.');
        }
  
        const data = await response.json();
       
        this.saveToken(data);
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }
  
    /**
     * Register a new user
     * @param {Object} userData - The registration data
     * @param {string} userData.fullName - User's full name
     * @param {string} userData.email - User's email
     * @param {string} userData.password - User's password
     * @param {string} userData.confirmPassword - Password confirmation
     * @param {string} userData.phone - User's phone number
     * @returns {Promise<string>} Registration result message
     */
    async register(userData) {
      try {
        const response = await fetch(`${this.userEndpoint}/Register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || 'Registration failed');
        }
  
        return await response.text();
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    }
  
    /**
     * Update the current user's profile
     * @param {Object} updateData - Data to update
     * @returns {Promise<Object>} Updated user data
     */
    async updateProfile(updateData) {
      try {
        const response = await fetch(`${this.userEndpoint}/Profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
          },
          body: JSON.stringify(updateData),
          credentials: 'include'
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to update profile');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
    }
  
    /**
     * Change the user's password
     * @param {Object} passwordData - Password change data
     * @returns {Promise<boolean>} Success indicator
     */
    async changePassword(passwordData) {
      try {
        const response = await fetch(`${this.userEndpoint}/ChangePassword`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.getToken()}`
          },
          body: JSON.stringify(passwordData),
          credentials: 'include'
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to change password');
        }
  
        return await response.json();
      } catch (error) {
        console.error('Error changing password:', error);
        throw error;
      }
    }
  
    /**
     * Get token from localStorage
     * @returns {string} Auth token
     */
    getToken() {
      return localStorage.getItem('authToken');
    }
  
    /**
     * Save token to localStorage
     * @param {Object} data - Authentication data
     */
    saveToken(data) {
      if (data && data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    }
  
    /**
     * Clear authentication data on logout
     */
    logout() {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }
  
  export default new UserService();
  