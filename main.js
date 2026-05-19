const products = [
    {
        id: 'body-cream',
        name: 'Kem dưỡng nâu body TanLab',
        subtitle: 'Dưỡng thể nâu sáng / 250ml',
        price: 750000,
        image: 'images/z7842250773462_6bf214506cd68fba8970eb0a84c4cbf9.jpg'
    },
    {
        id: 'face-cream',
        name: 'Kem dưỡng nâu mặt TanLab',
        subtitle: 'Dưỡng nâu da mặt / 50ml',
        price: 450000,
        image: 'images/z7842254461715_c4123ecdbe53d917b1d71192454bd4f1.jpg'
    },
    {
        id: 'combo-glow',
        name: 'Combo Face & Body TanLab',
        subtitle: 'Bộ kem dưỡng nâu mặt và body',
        price: 999000,
        image: 'images/z7842552930827_e830ce6261ddad6ed3bbca3edf9dd028.jpg'
    }
];

let cart = [];

function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
}

function getProduct(productId) {
    return products.find(product => product.id === productId);
}

function addToCart(productId) {
    const product = getProduct(productId);

    if (!product) {
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);

    if (!item) {
        return;
    }

    item.quantity += delta;

    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cart-count');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = formatMoney(totalPrice);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty">
                <div>
                    <div style="font-size: 42px; margin-bottom: 14px;">👜</div>
                    <p>Giỏ hàng đang trống.<br>Bấm “Mua ngay” để thêm sản phẩm TanLab.</p>
                </div>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-line">
            <img src="${item.image}" alt="${item.name}">

            <div>
                <h4>${item.name}</h4>
                <p>${item.subtitle}</p>

                <div class="cart-actions">
                    <div class="qty">
                        <button onclick="changeQuantity('${item.id}', -1)">−</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity('${item.id}', 1)">+</button>
                    </div>

                    <strong>${formatMoney(item.price * item.quantity)}</strong>
                </div>

                <button class="remove" onclick="removeFromCart('${item.id}')">Xóa</button>
            </div>
        </div>
    `).join('');
}

function openCart() {
    document.getElementById('cartOverlay').classList.add('active');
    document.getElementById('cartSidebar').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartOverlay').classList.remove('active');
    document.getElementById('cartSidebar').classList.remove('active');
    document.body.style.overflow = '';
}

function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng đang trống. Hãy bấm “Mua ngay” để thêm sản phẩm.');
        return;
    }

    alert('Đây là demo frontend. Bước thanh toán thật sẽ được kết nối sau với cổng thanh toán hoặc backend.');
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function handleScroll() {
    const navbar = document.getElementById('navbar');
    const backTop = document.getElementById('backTop');

    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 600) {
        backTop.classList.add('show');
    } else {
        backTop.classList.remove('show');
    }
}

window.addEventListener('scroll', handleScroll);

window.addEventListener('DOMContentLoaded', () => {
    updateCart();
    handleScroll();
});