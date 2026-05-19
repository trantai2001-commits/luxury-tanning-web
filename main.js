// main.js
// Goddess landing page: cart + product rendering + scroll interactions

const products = [
    {
        id: 'tan-body-cream',
        name: 'Tan Lab Self-Tan Body Cream',
        subtitle: 'Kem dưỡng nâu / 200ml',
        price: 449000,
        image: 'images/z7842254408607_39192d66899d9910a11201281440f884.jpg',
        fallback: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 'glow-mitt',
        name: 'Glow Application Mitt',
        subtitle: 'Găng thoa đều màu',
        price: 129000,
        image: 'images/z7842254416802_f629e634fcd85cf23d7a1003a0c2252b.jpg',
        fallback: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 'pre-tan-scrub',
        name: 'Pre-Tan Body Scrub Mini',
        subtitle: 'Tẩy da chết trước tanning',
        price: 199000,
        image: 'images/z7842254430944_90b54bc7d8e05800e88a56d053ab7e6b.jpg',
        fallback: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 'perfect-glow-bundle',
        name: 'The Perfect Glow Bundle',
        subtitle: 'Kem + găng + scrub mini',
        price: 599000,
        image: 'images/z7842254432904_7ef37129c5352879b7b5766f94a3b8ae.jpg',
        fallback: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
    }
];

let cart = [];

const formatMoney = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';

const getProductById = (productId) => products.find((product) => product.id === productId);

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = products.map((product) => `
        <article class="group flex flex-col h-full">
            <div class="aspect-[3/4] overflow-hidden bg-[#F2F2F2] mb-6 relative rounded-[1.5rem]">
                <img src="${product.image}"
                    onerror="this.onerror=null; this.src='${product.fallback}'"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="${product.name}">
                <div class="absolute top-4 left-4 bg-white/85 backdrop-blur px-4 py-2 text-[9px] uppercase tracking-widest">
                    Controlled glow
                </div>
            </div>
            <div class="flex justify-between items-start flex-grow gap-4">
                <div>
                    <h3 class="text-xl font-serif italic text-[#1A120B]">${product.name}</h3>
                    <p class="text-[10px] text-gray-400 uppercase tracking-widest mt-1">${product.subtitle}</p>
                </div>
                <span class="text-sm font-light italic whitespace-nowrap">${formatMoney(product.price)}</span>
            </div>
            <button onclick="addToCart('${product.id}')"
                class="mt-6 w-full border border-black py-3 text-[10px] uppercase tracking-widest hover:bg-[#1A120B] hover:text-white transition-colors duration-300">
                Add to Bag
            </button>
        </article>
    `).join('');
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    if (!sidebar || !overlay) return;

    if (sidebar.classList.contains('translate-x-full')) {
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        sidebar.classList.remove('translate-x-full');
        document.body.classList.add('overflow-hidden');
    } else {
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('opacity-0');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => overlay.classList.add('hidden'), 300);
    }
}

function addToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();

    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar && sidebar.classList.contains('translate-x-full')) {
        toggleCart();
    }
}

function changeQuantity(productId, delta) {
    const item = cart.find((cartItem) => cartItem.id === productId);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        cart = cart.filter((cartItem) => cartItem.id !== productId);
    }

    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartBadgeElements = document.querySelectorAll('#cart-count-badge');

    if (!cartItemsContainer || !cartTotalElement) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadgeElements.forEach((badge) => {
        badge.innerText = totalItems;
    });

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.innerText = formatMoney(totalPrice);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="h-full flex flex-col items-center justify-center text-gray-400 space-y-4 text-center">
                <span class="text-4xl font-light">👜</span>
                <p class="text-[10px] uppercase tracking-widest mt-4">Your bag is empty</p>
                <p class="text-xs text-gray-400 max-w-[260px]">
                    Chọn routine phù hợp với bạn để bắt đầu sắc nâu có kiểm soát.
                </p>
            </div>`;
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item) => `
        <div class="flex gap-4 border-b border-gray-100 pb-6 animate-fade-in">
            <img src="${item.image}"
                onerror="this.onerror=null; this.src='${item.fallback}'"
                class="w-20 h-24 object-cover bg-gray-100 rounded-xl"
                alt="${item.name}">
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start gap-4">
                        <h4 class="font-serif italic text-lg">${item.name}</h4>
                        <button onclick="removeFromCart('${item.id}')"
                            class="text-gray-300 hover:text-black transition-colors text-sm">✕</button>
                    </div>
                    <p class="text-gray-500 text-[10px] mt-1 uppercase tracking-widest">${item.subtitle}</p>
                </div>
                <div class="flex justify-between items-end mt-3">
                    <div class="flex items-center border border-gray-200 rounded-full overflow-hidden">
                        <button onclick="changeQuantity('${item.id}', -1)"
                            class="w-8 h-8 text-gray-500 hover:bg-gray-100">−</button>
                        <span class="w-8 text-center text-xs">${item.quantity}</span>
                        <button onclick="changeQuantity('${item.id}', 1)"
                            class="w-8 h-8 text-gray-500 hover:bg-gray-100">+</button>
                    </div>
                    <p class="font-light text-sm">${formatMoney(item.price * item.quantity)}</p>
                </div>
            </div>
        </div>
    `).join('');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your bag is currently empty. Please add items before checking out.');
        return;
    }

    alert('Demo checkout: bước thanh toán thật sẽ được tích hợp sau khi kết nối cổng thanh toán hoặc backend.');
}

function handleScroll() {
    const backToTopBtn = document.getElementById('backToTop');
    const navbar = document.getElementById('navbar');

    if (backToTopBtn) {
        if (window.scrollY > 600) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    }

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'text-black', 'shadow-sm');
            navbar.classList.remove('mix-blend-difference', 'text-white');
        } else {
            navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'text-black', 'shadow-sm');
            navbar.classList.add('mix-blend-difference', 'text-white');
        }
    }
}

window.addEventListener('scroll', handleScroll);

window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    handleScroll();
});