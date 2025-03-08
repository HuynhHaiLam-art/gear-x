// src/utils/CartObserver.js
class CartObserver {
    constructor() {
      this.subscribers = [];
    }
  
    subscribe(fn) {
      if (typeof fn === "function") {
        this.subscribers.push(fn);
      }
    }
  
    unsubscribe(fn) {
      this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn);
    }
  
    notify() {
      this.subscribers.forEach(subscriber => subscriber());
    }
  }
  
  const cartObserver = new CartObserver();
  export default cartObserver;
  