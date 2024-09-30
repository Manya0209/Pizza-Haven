//glue b-w view and model
//controller UI I/O

import productOperations from "../services/product-operations.js";

function addToCart(){
    console.log('Add to Cart Call', this);
    const currentButton= this;
    const pizzaId= currentButton.getAttribute('product-id');
    console.log('Pizza id is ', pizzaId);
    const product = productOperations.search(pizzaId);
    if (product) {
        product.isAddedInCart = true;
        product.quantity += 1; // Increase quantity when adding to cart
       
    }
    printBasket();
}

function removeFromCart() {
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('product-id');
    const product = productOperations.search(pizzaId);
    if (product && product.quantity > 1) {
        product.quantity -= 1; // Decrease quantity when removing from cart
    } else {
        product.isAddedInCart = false;
        product.quantity = 1; // Reset quantity to 1 when removing the last pizza from cart
    }
    if (product.quantity === 0) {
        product.isAddedInCart = false; // Reset isAddedInCart to false if quantity becomes zero
        product.style.display= none;
    }
    printBasket();
}

function calculateTotalCost() {
    const cartProducts = productOperations.getProductsInCart();
    const totalCost = cartProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    return totalCost;
}
  

function printBasket(){
    const cartProducts= productOperations.getProductsInCart();
    const basket= document.querySelector('#basket');
    basket.style= 'border: 1px solid #cccc';
    for(let product of cartProducts){
        const li= document.createElement('li');
        li.innerText= `${product.name} ${product.price}`;
        li.innerHTML = `<span>${product.name} x ${product.quantity} - Rs ${product.price * product.quantity}</span>
                        <button class="add-btn" product-id="${product.id}">+</button>
                        <button class="remove-btn" product-id="${product.id}">-</button>`;
        basket.appendChild(li);
    }
    
    const totalCost = calculateTotalCost();
    const totalLi = document.createElement('li');
    totalLi.innerText = `Total Cost: Rs ${totalCost}`;
    basket.appendChild(totalLi);
    const addButtons = document.querySelectorAll('.add-btn');
    const removeButtons = document.querySelectorAll('.remove-btn');

    addButtons.forEach((button) => {
        button.addEventListener('click', addToCart);
    });

    removeButtons.forEach((button) => {
        button.addEventListener('click', removeFromCart);
    });
}

function printPizza(product){
    const colDiv= document.createElement('div'); 
    colDiv.className= 'col-4';
    colDiv.style= 'display: flex; justify-content: space-between; margin-bottom: 20px';
    const cardDiv= document.createElement('div');
    cardDiv.className= 'card';
    cardDiv.style= 'width: 18rem; padding: 20px; margin-top: 10px ';
    colDiv.appendChild(cardDiv);
    const img= document.createElement('img');
    img.src= product.url;
    cardDiv.appendChild(img);
    const cardBody= document.createElement('div');
    cardBody.className= 'card-body';
    cardDiv.appendChild(cardBody);
    const h5= document.createElement('h5');
    h5.className= 'card-title';
    h5.innerText= product.name + '\n Rs '+ product.price;
    const pTag= document.createElement('p');
    pTag.innerText= product.desc;
    pTag.className= 'card-text';
    const addButton = document.createElement('button');
    addButton.className = 'btn btn-primary add-btn';
    addButton.innerText = product.isAddedInCart ? '+ Add More' : '+ Add to Cart';
    addButton.setAttribute('product-id', product.id);
    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-danger remove-btn';
    removeButton.innerText = '- Remove from Cart';
    removeButton.setAttribute('product-id', product.id);

    addButton.addEventListener('click', addToCart);
    removeButton.addEventListener('click', removeFromCart);

    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(addButton);
    cardBody.appendChild(removeButton);
    const outputDiv= document.querySelector('#output');
    outputDiv.appendChild(colDiv);
}


async function showProducts(){
    const products= await productOperations.readAllProducts();
    console.log('Controller rec ', products);
    for(let product of products){
        printPizza(product);
    } 
    //printBasket();
}
showProducts();