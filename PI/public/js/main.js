//Función asíncrona llamada que realiza una petición a una API.

async function getProductos() {
    try {
        const data = await fetch('https://ecommercebackend.fundamentos-29.repl.co/');

        const res = await data.json();

        window.localStorage.setItem("products", JSON.stringify(res));

        return res;
    } catch (error) {
        console.log(error);

    }
}

function printProducts(db) {

    const productsHTML = document.querySelector(".products");

    let ejs = "";

    for (const product of db.products) {

        ejs += `
        <div class="product">
            <div class="product__img">
                <img src="${product.image}" alt="imagen" />
                </div>

                <div class="product__info">
                <h4>${product.name} | <span><b>Stock</b>: ${product.quantity}</span></h4>

                <h5>
                    $${product.price}
                    <i class='bx bx-plus' id='${product.id}'></i>
                </h5>
                
                </div>

           
            </div>
        `;

    }

    productsHTML.innerHTML = ejs;

}

function MostrarCarrito() {
    const iconCartHTML = document.querySelector(".bx-cart");
    const cartHTML = document.querySelector(".cart");

    iconCartHTML.addEventListener('click', function () {
        cartHTML.classList.toggle("cart__show");
    });
}

function AñadirCarritoProductos(db) {
    const productsHTML = document.querySelector(".products");

    productsHTML.addEventListener("click", function (e) {
        if (e.target.classList.contains("bx-plus")) {
            const id = Number(e.target.id);

            const productFind = db.products.find(product => product.id === id);

            if (db.cart[productFind.id]) {
                if (productFind.quantity === db.cart[productFind.id].amount)
                    return alert('No tenemos más en Stock');
                db.cart[productFind.id].amount++;
            } else {
                db.cart[productFind.id] = { ...productFind, amount: 1 };
            }

            window.localStorage.setItem('cart', JSON.stringify(db.cart));
            PintarProductosCarrito(db)

        }
    });
}

function PintarProductosCarrito(db) {
    const cardProducts = document.querySelector(".card__products");

    let ejs = '';

    for (const product in db.cart) {
        const { quantity, price, name, image, id, amount } = db.cart[product];

        
        ejs += `
        <div class="card__product">
            <div class="card__product--img">
                <img src="${image}" alt="imagen" />
            </div>
            <div class="card__product--body">
                <h4>${name} | $${price}</h4>
                <p>Stock: ${quantity}</p>
    
                <div class="card__product--body-op">
                    <i class='bx bx-minus'></i>
                    <span>${amount} unit</span>
                    <i class='bx bx-plus'></i>
                    <i class='bx bxs-trash'></i>
                </div>
            </div>
        </div>
    `;
    

    }
    cardProducts.innerHTML = ejs;
}


async function main() {
    const db = {
        products: JSON.parse(window.localStorage.getItem("products")) ||
            (await getProductos()),

        cart: JSON.parse(window.localStorage.getItem('cart')) || {},
    };


    printProducts(db);
    MostrarCarrito();
    AñadirCarritoProductos(db);
    PintarProductosCarrito(db);



}


main();


