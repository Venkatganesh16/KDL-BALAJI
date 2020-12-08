let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Champa',
        tag: 'champa',
        price: 20,
        inCart: 0
    },
    {
        name: 'Rose',
        tag: 'rose',
        price: 40,
        inCart: 0
    },
    {
        name: 'Aqua Fresh',
        tag: 'aquafresh',
        price: 60,
        inCart: 0
    }
]

for(let i=0; i<carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers=parseInt(productNumbers);

    if(productNumbers ) {
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsinCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log("The products price is", product .price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My cart cost is", cartCost);
    
    console.log(typeof cartCost);

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productInCart");
    cartItems = JSON.parse(cartItems)

    console.log(cartItems);
}

onLoadCartNumbers();
displayCart();