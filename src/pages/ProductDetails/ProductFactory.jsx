class Product {
    constructor(id, name, price, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
    }
  }
  
  const ProductFactory = {
    createProduct: (id, name, price, image) => {
      return new Product(id, name, price, image);
    }
  };
  
  export default ProductFactory;
  