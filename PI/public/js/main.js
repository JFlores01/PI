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
        const buttonAdd = product.quantity ? `<i class='bx bx-plus' id='${product.id}'></i>` : "<span class='soldout'>Sold Out</span>"

        ejs += `
        <div class="product">
            <div class="product__img">
                <img src="${product.image}" alt="imagen" />
                </div>

                <div class="product__info">
                <h4>${product.name} | <span><b>Stock</b>: ${product.quantity}</span></h4>

                <h5>
                    $${product.price}
                    ${buttonAdd}
                    
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
            ImprimirTotal(db);
            ManejarCantidadProductos(db);
        }
    });
}

function PintarProductosCarrito(db) {
    const cartProducts = document.querySelector(".cart__products");

    let ejs = '';

    for (const product in db.cart) {
        const { quantity, price, name, image, id, amount } = db.cart[product];

        
        ejs += `
        <div class="cart__product">
            <div class="cart__product--img">
                <img src="${image}" alt="imagen" />
            </div>
            <div class="cart__product--body">
                <h4>${name} | $${price}</h4>
                <p>Stock: ${quantity}</p>
    
                <div class="cart__product--body-op" id='${id}' >
                    <i class='bx bx-minus'></i>
                    <span>${amount} unit</span>
                    <i class='bx bx-plus'></i>
                    <i class='bx bxs-trash'></i>
                </div>
            </div>
        </div>
    `;
    

    }
    cartProducts.innerHTML = ejs;
}

function EditarProductosCarrito(db){
    const cartProducts = document.querySelector(".cart__products");

    cartProducts.addEventListener("click", function (e){
            if(e.target.classList.contains("bx-plus")) {
                const id = Number(e.target.parentElement.id);

                const productFind = db.products.find(product => product.id === id);


                if (productFind.quantity === db.cart[productFind.id].amount)
                    return alert('No tenemos más en Stock');

                db.cart[id].amount++;
            }

            if(e.target.classList.contains("bx-minus")) {
                const id = Number(e.target.parentElement.id);

                if (db.cart[id].amount === 1){
                    const response = confirm('¿Estás seguro que desea eliminar el producto?');
                    if(!response) return;
                    delete db.cart[id];
                }else{
                    db.cart[id].amount--;
                }

            }

            if(e.target.classList.contains("bxs-trash")) {
                const id = Number(e.target.parentElement.id);
                const response = confirm('¿Estás seguro que desea eliminar el producto?');
                if(!response) return;
                delete db.cart[id];
            }

            window.localStorage.setItem('cart', JSON.stringify(db.cart));
            PintarProductosCarrito(db);
            ImprimirTotal(db);
            ManejarCantidadProductos(db);
    });
}

function ImprimirTotal(db){
    const infoTotal =  document.querySelector(".info__total");
    const infoAmount = document.querySelector(".info__amount");

    let totalProductos = 0;
    let amountProductos = 0;

    for (const product in db.cart) {
        const {amount, price} = db.cart[product];
        totalProductos += price * amount;
        amountProductos += amount;
    }

    
    infoAmount.textContent = amountProductos + " units";
    infoTotal.textContent = "$" + totalProductos + ".00";
}

function ManejadorTotal(db){
    const btnBuy = document.querySelector(".btn__buy");

    btnBuy.addEventListener('click', function() {
        if(!Object.values(db.cart).length) 
        return alert("Añade algún producto al carrito");

        const response = confirm("¿Deseas hacer esta compra?");
        if(!response) return;

        const currentProductos = []

        for (const product of db.products) {
            const productCart = db.cart[product.id]
            if(product.id === productCart?.id){
                currentProductos.push({
                    ...product,
                    quantity: product.quantity - productCart.amount
                }); 

            }else{
                currentProductos.push(product);
            }
        }

        db.products = currentProductos;
        db.cart = {}

        window.localStorage.setItem("products", JSON.stringify(db.products));
        window.localStorage.setItem("cart", JSON.stringify(db.cart));

        ImprimirTotal(db);
        PintarProductosCarrito(db);
        printProducts(db);
        ManejarCantidadProductos(db);

    });

}

function ManejarCantidadProductos(db){
    const amountProductos = document.querySelector(".amountProductos");

    let amount = 0;

    for (const product in db.cart){
        amount += db.cart[product].amount;
    }

    amountProductos.textContent = amount;
   
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
    EditarProductosCarrito(db);
    ImprimirTotal(db);
    ManejadorTotal(db);
    ManejarCantidadProductos(db);
   
}


main();


