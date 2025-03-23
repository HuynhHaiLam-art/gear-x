import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Product API service
const ProductService = {
    // Get all products
    getAllProducts: async () => {
        try {
            console.log("Fetching from:", `${API_URL}/Products/all`);
            const response = await axios.get(`${API_URL}/Products/all`);
            console.log("Raw API response:", response);
            return response; // Return the entire response object
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    },

    // Get product by ID
    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/Products/${id}`);
            return response; // Return the entire response object
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            throw error;
        }
    }
};

export default ProductService;