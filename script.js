// Sample product data
const products = [
    {
        id: 1,
        name: "Quantum Laptop Pro",
        price: 1299.99,
        description: "Ultra-thin laptop with quantum processor and 24-hour battery life",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        category: "Laptops"
    },
    {
        id: 2,
        name: "Nebula Smartphone X",
        price: 899.99,
        description: "Foldable smartphone with holographic display and AI camera",
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1567&q=80",
        category: "Phones"
    },
    {
        id: 3,
        name: "Galaxy Watch 5",
        price: 349.99,
        description: "Advanced smartwatch with health monitoring and LTE connectivity",
        image: "https://images.unsplash.com/photo-1558379850-823f103f866a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "Wearables"
    },
    {
        id: 4,
        name: "Cosmic Earbuds Pro",
        price: 199.99,
        description: "Noise-cancelling wireless earbuds with spatial audio",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        category: "Audio"
    },
    {
        id: 5,
        name: "Horizon Tablet S",
        price: 599.99,
        description: "Professional tablet with OLED display and stylus support",
        image: "https://images.unsplash.com/photo-1546538915-a9e2c8d0a8e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "Tablets"
    },
    {
        id: 6,
        name: "Aurora Gaming Console",
        price: 499.99,
        description: "Next-gen gaming console with ray tracing and VR support",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80",
        category: "Gaming"
    }
];

// Cart functionality
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const closeCart = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// Display products
function displayProducts() {
    productGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card glass-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-desc">${product.description}</p>
            <button class="add-to-cart" data-id="${product.id}">
                <i class="fas fa-plus"></i> Add to Cart
            </button>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Animation effect
    const button = e.target;
    button.innerHTML = '<i class="fas fa-check"></i> Added!';
    button.style.backgroundColor = 'var(--success)';
    button.style.borderColor = 'var(--success)';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-plus"></i> Add to Cart';
        button.style.backgroundColor = '';
        button.style.borderColor = '';
    }, 1000);
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', decreaseQuantity);
        });
        
        document.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', increaseQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeItem);
        });
    }
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Cart quantity functions
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity++;
    updateCart();
}

function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(item => item.id !== productId);
    }
    
    updateCart();
}

function removeItem(e) {
    const productId = parseInt(e.target.closest('button').getAttribute('data-id'));
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Toggle cart
function toggleCart() {
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Event listeners
cartBtn.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Initialize the app
displayProducts();

// Parallax effect for hero image
window.addEventListener('mousemove', (e) => {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        const x = (window.innerWidth - e.pageX) / 100;
        const y = (window.innerHeight - e.pageY) / 100;
        heroImage.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    }
});

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});