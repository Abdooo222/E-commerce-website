// Demo products
const products = [
  { id: 1, name: "Kaza Classic Hoodie", price: 59.99, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Urban Oversized Tee", price: 34.99, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Signature Joggers", price: 49.99, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Street Snapback", price: 24.99, image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Kaza Graffiti Hoodie", price: 64.99, image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" },
  { id: 6, name: "Minimalist Crewneck", price: 39.99, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" }
];

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render products
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card animate-up';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-name">${product.name}</div>
      <span class="product-price">$${product.price.toFixed(2)}</span>
      <button class="add-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
  animateCartBtn();
}

// Remove item
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Change quantity
function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty < 1) removeFromCart(id);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Update cart icon
function updateCart() {
  const cartCount = document.getElementById('cartCount');
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// Cart button animation
function animateCartBtn() {
  const btn = document.querySelector('.cart-btn');
  btn.style.animation = 'bounce 0.5s';
  setTimeout(() => btn.style.animation = '', 500);
}

// Contact form
document.getElementById('contactForm').onsubmit = function(e) {
  e.preventDefault();
  alert('Message sent!');
  this.reset();
};

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Initial
renderProducts();
updateCart();
