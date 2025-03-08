import CartObserver from "./CartObserver.jsx";

class CartSingleton {
  constructor() {
    if (!CartSingleton.instance) {
      this.items = [];
      CartSingleton.instance = this;
    }
    return CartSingleton.instance;
  }

  addItem(item) {
    this.items.push(item);
    CartObserver.notify();
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    CartObserver.notify();
  }

  getItems() {
    return this.items;
  }
}

const instance = new CartSingleton();
Object.freeze(instance);
export default instance;
