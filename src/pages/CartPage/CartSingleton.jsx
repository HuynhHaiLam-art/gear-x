import CartObserver from "./CartObserver.jsx";

/**
 * Singleton class for managing the shopping cart
 */
class CartSingleton {
  constructor() {
    if (!CartSingleton.instance) {
      this._items = [];
      
      // Restore cart from localStorage if available
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this._items = JSON.parse(savedCart);  
      }
      this.sessionId = localStorage.getItem('cart_session_id') || null;
      CartSingleton.instance = this;
    }
    return CartSingleton.instance;
  }

  /**
   * Set the session ID and save to localStorage
   */
  setSessionId(sessionId) {
    this.sessionId = sessionId;
    localStorage.setItem('cart_session_id', sessionId);
  }

  /**
   * Get the current session ID
   */
  getSessionId() {
    return this.sessionId;
  }

  /**
   * Add an item to cart, update quantity if item exists
   */
  addItem(item) {
    const existingItemIndex = this._items.findIndex(
      i => i.id === item.id && i.size === item.size
    );

    if (existingItemIndex !== -1) {
      this._items[existingItemIndex].quantity += item.quantity;
    } else {
      this._items.push({...item, quantity: item.quantity || 1});
    }
    
    this._saveToLocalStorage();
    CartObserver.notify();
  }

  /**
   * Remove an item from cart by ID
   */
  removeItem(itemId) {
    this._items = this._items.filter(item => item.id !== itemId);
    this._saveToLocalStorage();
    CartObserver.notify();
  }

  /**
   * Update quantity of an item in cart
   */
  updateItemQuantity(itemId, newQuantity) {
    const item = this._items.find(item => item.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      this._saveToLocalStorage();
      CartObserver.notify();
    }
  }

  /**
   * Get all items in cart
   */
  getItems() {
    return this._items;
  }

  /**
   * Clear all items from cart
   */
  clearCart() {
    this._items = [];
    localStorage.removeItem('cart');
    CartObserver.notify();
  }

  /**
   * Calculate total price of all items in cart
   */
  getTotalPrice() {
    return this._items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  }

  /**
   * Save cart to localStorage
   */
  _saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this._items));
  }
}

// Create a singleton instance
const instance = new CartSingleton();
export default instance;