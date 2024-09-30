//product CRUD operation
//C- create, R- read, U- update, D- delete

import Product from '../models/product.js';
import doNetworkCall from './api-client.js'
const productOperations= {
    products:[],
    search(pizzaId){
        const product = this.products.find(currentProduct=>currentProduct.id= pizzaId);
        console.log('Product found ', product);
        //product.isAddedInCart= true;
        console.log('Array ', this.products);
        return product;
    }, 
    getProductsInCart(){
        const productInBasket= this.products.filter(product=>product.isAddedInCart);
        return productInBasket;
    },
  async readAllProducts(){
      try{
          const obj= await doNetworkCall();
          const pizzas= obj['Vegetarian'];
          const pizzaArray= pizzas.map(pizza => {
              const pizzaObject= new Product(pizza.id, pizza.name, pizza.menu_description, pizza.price, pizza.assets.product_details_page[0].url);
              return pizzaObject;
            });
           this.products= pizzaArray;
           return pizzaArray;
        }
      catch{
          throw err;
        }
    }
}

export default productOperations;