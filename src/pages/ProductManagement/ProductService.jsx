import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust this to your API URL

class ProductService {
  /**
   * Get all products
   */
  static async getProducts() {
    try {
      const response = await axios.get(`${API_URL}/Products/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  /**
   * Get product by ID
   */
  static async getProduct(productId) {
    try {
      const response = await axios.get(`${API_URL}/Products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Create new product
   */
  static async createProduct(productData) {
    try {
      const response = await axios.post(`${API_URL}/Products`, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  /**
   * Update existing product
   */
  static async updateProduct(productId, productData) {
    try {
      const response = await axios.put(`${API_URL}/Products/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Delete product
   */
  static async deleteProduct(productId) {
    try {
      const response = await axios.delete(`${API_URL}/Products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Add product variant
   */
  static async addProductVariant(productId, variantData) {
    try {
      const response = await axios.post(`${API_URL}/Products/${productId}/variants`, variantData);
      return response.data;
    } catch (error) {
      console.error(`Error adding variant to product ${productId}:`, error);
      throw error;
    }
  }

  /**
   * Update product variant
   */
  static async updateProductVariant(productId, variantId, variantData) {
    try {
      const response = await axios.put(
        `${API_URL}/Products/${productId}/variants/${variantId}`, 
        variantData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating variant ${variantId}:`, error);
      throw error;
    }
  }

  /**
   * Get categories
   */
  static async getCategories() {
    try {
      const response = await axios.get(`${API_URL}/Categories`);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
}

export default ProductService;