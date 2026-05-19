// main.js

// 1. Logic Giỏ hàng (Cart)
let cart = [];

const formatMoney = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
};

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    if (sidebar.classList.contains('translate-x-full')) {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        sidebar.classList.remove('translate-x-full');
    } else {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
}

function addToCart(name, price, image) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: Date.now(), name, price, image, quantity: 1 });
    }
    updateCartUI();

    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar.classList.contains('translate-x-full')) {
        toggleCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartBadgeElements = document.querySelectorAll('#cart-count-badge');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadgeElements.forEach(badge => badge.innerText = totalItems);

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.innerText = formatMoney(totalPrice);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <span class="text-4xl font-light">👜</span>
                <p class="text-[10px] uppercase tracking-widest mt-4">Your bag is empty</p>
            </div>`;
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="flex gap-4 border-b border-gray-100 pb-6 animate-fade-in">
            <img src="${item.image}" class="w-20 h-24 object-cover bg-gray-100" alt="${item.name}">
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start">
                        <h4 class="font-serif italic text-lg pr-4">${item.name}</h4>
                        <button onclick="removeFromCart(${item.id})" class="text-gray-300 hover:text-black transition-colors text-sm">✕</button>
                    </div>
                    <p class="text-gray-500 text-[10px] mt-1 uppercase tracking-widest">Qty: ${item.quantity}</p>
                </div>
                <p class="font-light text-sm mt-2">${formatMoney(item.price * item.quantity)}</p>
            </div>
        </div>
    `).join('');
}

function checkout() {
    if (cart.length === 0) {
        alert("Your bag is currently empty. Please add items before checking out.");
    } else {
        alert("Tính năng thanh toán thực tế sẽ được tích hợp khi kết nối với cổng thanh toán (Stripe/PayPal) hoặc hệ thống Backend. Chúc mừng bạn đã có một Front-end hoàn hảo!");
    }
}

// 2. Logic cho nút Back to Top và Smart Navbar
window.addEventListener('scroll', () => {
    // Xử lý nút Back to Top
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 600) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }

    // Xử lý đổi màu Navbar khi cuộn qua Hero Section
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'text-black', 'shadow-sm');
        navbar.classList.remove('mix-blend-difference', 'text-white');
    } else {
        navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'text-black', 'shadow-sm');
        navbar.classList.add('mix-blend-difference', 'text-white');
    }
});