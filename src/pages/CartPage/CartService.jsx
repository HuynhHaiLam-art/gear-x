import axios from 'axios';

const API_URL = "http://localhost:5000/api";

// Default axios configuration
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

class CartService {
    // Get cart items
    static getCartItems() {
        return axios({
            method: 'GET',
            url: `${API_URL}/Cart`,
        });
    }

    // Add item to cart
    static addToCart(productId, quantity, variantId = null) {
        return axios({
            method: 'POST',
            url: `${API_URL}/ShoppingCart`,
            data: {
                productId,
                quantity,
                variantId
            }
        });
    }

    // Update cart item quantity
    static updateCartItem(cartItemId, quantity) {
        return axios({
            method: 'PUT',
            url: `${API_URL}/Cart/${cartItemId}`,
            data: {
                quantity
            }
        });
    }

    // Remove item from cart
    static removeFromCart(cartItemId, sessionId) {
        return axios({
            method: 'DELETE',
            url: `${API_URL}/ShoppingCart/items/${cartItemId}`,
            headers: {
                'Session-Id': sessionId
            }
        });
    }

    // Clear cart
    static clearCart() {
        return axios({
            method: 'DELETE',
            url: `${API_URL}/Cart/clear`,
        });
    }

    // Apply coupon code
    static applyCoupon(couponCode) {
        return axios({
            method: 'POST',
            url: `${API_URL}/Cart/coupon`,
            data: {
                couponCode
            }
        });
    }

    // Remove coupon
    static removeCoupon() {
        return axios({
            method: 'DELETE',
            url: `${API_URL}/Cart/coupon`,
        });
    }

    // Get cart summary (total, subtotal, discounts)
    static getCartSummary() {
        return axios({
            method: 'GET',
            url: `${API_URL}/Cart/summary`,
        });
    }

    // Save cart for later
    static saveForLater(cartItemId) {
        return axios({
            method: 'POST',
            url: `${API_URL}/Cart/save-for-later/${cartItemId}`,
        });
    }

    // Move to cart from saved items
    static moveToCart(savedItemId) {
        return axios({
            method: 'POST',
            url: `${API_URL}/Cart/move-to-cart/${savedItemId}`,
        });
    }

    // Get saved items
    static getSavedItems() {
        return axios({
            method: 'GET',
            url: `${API_URL}/Cart/saved-items`,
        });
    }
}

export default CartService;