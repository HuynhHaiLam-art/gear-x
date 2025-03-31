import axios from 'axios';

const API_URL = 'http://localhost:5000/api/Categories';

export const CategoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(API_URL, categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (id, categoryData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, categoryData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default CategoryService;