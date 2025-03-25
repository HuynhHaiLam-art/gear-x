import CartObserver from "./CartObserver.jsx";

class CartSingleton {
  constructor() {
    if (!CartSingleton.instance) {
      this._items = [];
      
      // Khôi phục giỏ hàng từ localStorage nếu có
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this._items = JSON.parse(savedCart);
      }
      
      CartSingleton.instance = this;
    }
    return CartSingleton.instance;
  }

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

  removeItem(itemId) {
    this._items = this._items.filter(item => item.id !== itemId);
    this._saveToLocalStorage();
    CartObserver.notify();
  }

  updateItemQuantity(itemId, newQuantity) {
    const item = this._items.find(item => item.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      this._saveToLocalStorage();
      CartObserver.notify();
    }
  }

  getItems() {
    return this._items;
  }

  clearCart() {
    this._items = [];
    localStorage.removeItem('cart');
    CartObserver.notify();
  }

  getTotalPrice() {
    return this._items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  }

  _saveToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this._items));
  }
}

// Tạo instance mới không đóng băng
const instance = new CartSingleton();
export default instance;