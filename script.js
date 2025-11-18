// PRODUCT DATABASE 
const products = [
    { id: 1, name: "Laptop", price: 999, 
      image: "Images/lap.jpg", description:"A powerful laptop for work and play." },
    { id: 2, name: "IPhone", price: 1000, 
      image: "Images/Phone.jpg", description:"Latest smartphone with amazing camera." },
    { id: 3, name: "Headphones", price: 199, 
      image: "Images/Headphone.jpg", description:"Noise-cancelling high-quality sound." },
    { id: 4, name: "Smart Watch", price: 300,
      image: "Images/Smartwatch.jpg",
      description: "Track your fitness and notifications." },
    { id: 5, name: "Gaming Keyboard", price: 100,
      image: "Images/Keybored.jpg",
      description: "RGB mechanical keyboard for gamers." },
    { id: 6, name: "Wireless Mouse", price: 50,
      image: "Images/Mouse.jpg",
      description: "Smooth and fast wireless mouse." },
     ];

//HOME PAGE: PRODUCT LIST
if (document.getElementById("products")) {
    const productsContainer = document.getElementById("products");

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
            <a href="product.html?id=${p.id}">View Details</a>
        `;
        productsContainer.appendChild(div);
    });
}

//PRODUCT PAGE 
if (document.getElementById("product-details")) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const product = products.find(p => p.id === id);

    if (product) {
        document.getElementById("product-details").innerHTML = `
            <img src="${product.image}" style="width:300px;">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <h3>$${product.price}</h3>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    } else {
        document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
    }
}

//CART FUNCTIONS
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const prod = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) existing.quantity++;
    else cart.push({ ...prod, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

//UPDATED: Cart with product images
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.getElementById("cart-items");
    container.innerHTML = "";  //clear the container

    let total = 0;

    cart.forEach((item, i) => {
        total += item.price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="${item.image}" style="width:70px; height:70px; object-fit:cover; border-radius:5px;">
                    <span>${item.name} — $${item.price} × ${item.quantity}</span>
                </div>

                <div>
                    <button onclick="changeQty(${i}, 1)">+</button>
                    <button onclick="changeQty(${i}, -1)">-</button>
                    <button onclick="removeItem(${i})" style="background:#dc3545;">Remove</button>
                </div>
            </div>
        `;
    });

    document.getElementById("total").innerText = `Total: $${total}`;
}

function changeQty(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert("Checkout not implemented yet.");
}

// Auto-load cart page 
if (document.getElementById("cart-items")) loadCart();
