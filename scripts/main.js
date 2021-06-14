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
    },
    {
        name: 'Sandal Wood',
        tag: 'sandal',
        price: 80,
        inCart: 0
    },
    {
        name: 'Delight',
        tag: 'delight',
        price: 80,
        inCart: 0
    },
    {
        name: 'Aaradhya',
        tag: 'Aaradhya',
        price: 80,
        inCart: 0
    },
    {
        name: 'Bamboo Sticks',
        tag: 'bamboo',
        price: 100,
        inCart: 0
    },
    {
        name: 'Perfumes',
        tag: 'perfumes',
        price: 120,
        inCart: 0
    }
]

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product d-none d-sm-block"><ion-icon name="close-circle"></ion-icon>
                <span>${item.name}</span>
            </div>
            <div class="price d-none d-sm-block">${item.price},00</div>
            <div class="quantity d-none d-sm-block">
                <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>   
            </div>
            <div class="total d-none d-sm-block">${item.inCart * item.price},00</div>
            <div class="d-block d-sm-none" style="margin-top: 50px;">
            <div class="row">
            <div class="col-4">
            <img src="./Assets/${item.tag}.jpeg" height="120%" width="120%" />
            </div>
            <div class="col-7">
            <div class="product">
            <span>${item.name}</span>
            <ion-icon name="close-circle"></ion-icon>
            </div>
            </div>
            </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer d-none d-sm-block">
                <h4 class="basketTotalTitle">Basket Total</h4>
                <h4 class="basketTotal">${cart},00</h4>
            </div>`

        deleteButtons();
        manageQuantity();
    }
}

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

function formValidation() {
    const form = document.getElementById('user-form');

    if (form.checkValidity()) {
        additreq();
    } else {
        form.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        });
    }

    form.classList.add('was-validated');
}

function reload() {
    window.location.reload();
}

function additreq() {
    let message = `Hello, I'm ${
        document.getElementById('name').value
    } \n*My Address:* ${
        document.getElementById('address').value
    } \n*Additional details about our requirements are* \n ${
    document.getElementById('req').value
    }`;
    const link = `https://api.whatsapp.com/send?phone="+91 7093011926"&text=${encodeURI(
            message
        )}`;
    window.open(link, '_blank');

}

onLoadCartNumbers();
displayCart();