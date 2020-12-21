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
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log("The products price is",product.price);
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else {
        localStorage.setItem("totalCost",product.price);
    }
    console.log("My cart cost is ", cartCost);
    console.log(typeof cartCost);
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="row"  style="border-bottom: 4px solid lightgrey;">
                <div class="col-4 offset-1">
                    <div class="product">
                        <ion-icon name ="close-circle"></ion-icon>
                        <img src="./Assets/${item.tag}.jpeg" height="105%" width="40%">
                        <span>${item.name}</span>
                    </div>
                </div>
                <div class="col-2" style="margin-top: 40px;">
                    <div class="price">
                        ${item.price}
                    </div>
                </div>
                <div class="col-3"  style="margin-top: 40px;">
                    <div class="quantity">
                    <ion-icon name="caret-back-circle-outline"></ion-icon> &nbsp;
                    <span>${item.inCart}</span> &nbsp;
                    <ion-icon name="caret-forward-circle-outline"></ion-icon>
                    </div>
                </div>
                <div class="col-2"  style="margin-top: 40px;">
                    <div class="total">
                        ${item.inCart * item.price}
                    </div>
                </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalConatiner">
                <div class="row">
                    <div class="col-3 offset-7">
                        <h4 class="basketTotalTitle">
                            Basket Total
                        </h4>
                    </div>
                    <div class="col-2">
                        <h4 class="basketTotal">
                            ${cartCost}
                        </h4>
                    </div>
                </div>
            </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();


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



