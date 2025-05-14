import apiClient from '../config';

export const orderService = {
    // Create order
    createOrder: (orderData) => {
        return apiClient.post('/Orders', orderData);
    },

    // Get all orders
    getAllOrders: () => {
        return apiClient.get('/Orders');
    },

    // Get order by ID
    getOrder: (orderId) => {
        return apiClient.get(`/Orders/${orderId}`);
    },

    // Update order status
    updateOrderStatus: (orderId, status) => {
        return apiClient.put(`/Orders/${orderId}/status`, { status });
    },

    // Cancel order
    cancelOrder: (orderId, reason) => {
        return apiClient.put(`/Orders/${orderId}/cancel`, { reason });
    },

    // Get order history
    getOrderHistory: () => {
        return apiClient.get('/Orders/history');
    },

    // Track order
    trackOrder: (orderId) => {
        return apiClient.get(`/Orders/${orderId}/track`);
    },

    // Get order statistics
    getOrderStats: () => {
        return apiClient.get('/Orders/stats');
    }
}; 