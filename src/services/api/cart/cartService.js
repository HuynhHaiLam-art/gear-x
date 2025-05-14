import apiClient from '../config';

export const cartService = {
    // Get cart items
    getCartItems: () => {
        return apiClient.get('/Cart');
    },

    // Add item to cart
    addToCart: (productId, quantity, variantId = null) => {
        return apiClient.post('/Cart', {
            productId,
            quantity,
            variantId
        });
    },

    // Update cart item
    updateCartItem: (cartItemId, quantity) => {
        return apiClient.put(`/Cart/${cartItemId}`, { quantity });
    },

    // Remove item from cart
    removeFromCart: (cartItemId) => {
        return apiClient.delete(`/Cart/${cartItemId}`);
    },

    // Clear cart
    clearCart: () => {
        return apiClient.delete('/Cart');
    },

    // Add to wishlist
    addToWishlist: (productId) => {
        return apiClient.post('/Wishlist', { productId });
    },

    // Get wishlist
    getWishlist: () => {
        return apiClient.get('/Wishlist');
    },

    // Remove from wishlist
    removeFromWishlist: (productId) => {
        return apiClient.delete(`/Wishlist/${productId}`);
    }
}; 