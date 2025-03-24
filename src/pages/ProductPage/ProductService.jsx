import axios from 'axios';

const API_URL = "http://localhost:5000/api";

// Thêm cấu hình mặc định cho axios
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

class ProductService {
    // Get all products - Sửa endpoint giống với FlashSaleSlider
    static getAllProducts() {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/all`,  // Sửa endpoint này
        });
    }

    // Get a specific product
    static getProduct(id) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/${id}`,  // Sửa Products viết hoa
        });
    }

    // Get product details by ID
    static getProductById(id) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/${id}`,  // Sửa Products viết hoa
        });
    }

    // Get product variants by product ID
    static getProductVariants(productId) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/${productId}/variants`,  // Sửa Products viết hoa
        });
    }

    // Get product reviews
    static getProductReviews(productId) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/${productId}/reviews`,  // Sửa Products viết hoa
        });
    }

    // Get related products
    static getRelatedProducts(categoryId) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/all`,  // Sửa endpoint này
            params: {
                category: categoryId,
                limit: 4
            }
        });
    }

    // Add product to cart
    static addToCart(productId, quantity, variantId = null) {
        return axios({
            method: 'POST',
            url: `${API_URL}/Cart`,  // Sửa Cart viết hoa
            data: {
                productId,
                quantity,
                variantId
            }
        });
    }

    // Add product to wishlist
    static addToWishlist(productId) {
        return axios({
            method: 'POST',
            url: `${API_URL}/Wishlist`,  // Sửa Wishlist viết hoa
            data: {
                productId
            }
        });
    }

    // Get product stock status
    static getProductStock(productId, variantId = null) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/${productId}/stock`,  // Sửa Products viết hoa
            params: variantId ? { variantId } : {}
        });
    }

    // Get product categories
    static getCategories() {
        return axios({
            method: 'GET',
            url: `${API_URL}/Categories`,  // Sửa Categories viết hoa
        });
    }

    // Search products
    static searchProducts(query) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/search`,  // Sửa endpoint này
            params: { q: query }
        });
    }

    // Filter products
    static filterProducts(filters) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/all`,  // Sửa endpoint này
            params: filters
        });
    }

    // Get product images
    static getProductImages(productId) {
        return axios({
            method: 'GET',
            url: `${API_URL}/Products/${productId}/images`,  // Sửa Products viết hoa
        });
    }

    // Rate product
    static rateProduct(productId, rating, review = '') {
        return axios({
            method: 'POST',
            url: `${API_URL}/Products/${productId}/rate`,  // Sửa Products viết hoa
            data: {
                rating,
                review
            }
        });
    }

    // Share product
    static shareProduct(productId, platform) {
        return axios({
            method: 'POST',
            url: `${API_URL}/Products/${productId}/share`,  // Sửa Products viết hoa
            data: {
                platform
            }
        });
    }
}

export default ProductService;