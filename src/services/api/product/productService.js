import apiClient from '../config';

export const productService = {
    // Get all products
    getAllProducts: () => {
        return apiClient.get('/Products/all');
    },

    // Get a specific product
    getProduct: (id) => {
        return apiClient.get(`/Products/${id}`);
    },

    // Get product variants
    getProductVariants: (productId) => {
        return apiClient.get(`/Products/${productId}/variants`);
    },

    // Get product reviews
    getProductReviews: (productId) => {
        return apiClient.get(`/Products/${productId}/reviews`);
    },

    // Get related products
    getRelatedProducts: (categoryId) => {
        return apiClient.get(`/Products/category/${categoryId}`);
    },

    // Get product stock status
    getProductStock: (productId, variantId = null) => {
        return apiClient.get(`/Products/${productId}/stock`, {
            params: variantId ? { variantId } : {}
        });
    },

    // Search products
    searchProducts: (query) => {
        return apiClient.get('/Products/search', { params: { q: query } });
    },

    // Filter products
    filterProducts: (filters) => {
        return apiClient.get('/Products/all', { params: filters });
    },

    // Get product images
    getProductImages: (productId) => {
        return apiClient.get(`/Products/${productId}/images`);
    },

    // Rate product
    rateProduct: (productId, rating, review = '') => {
        return apiClient.post(`/Products/${productId}/rate`, { rating, review });
    }
}; 