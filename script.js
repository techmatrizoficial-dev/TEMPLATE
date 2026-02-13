document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderNav();
    renderMenu();
    initScrollSpy();
    initOverlay();
});

// State
let cart = [];
let currentItem = null;
let currentQty = 1;

function renderHeader() {
    const data = restaurantData;

    // Set text content
    document.getElementById('restaurant-name').textContent = data.name;

    // Set Status and Hours
    const isOpen = checkOpenStatus(data.schedule);
    const statusEl = document.getElementById('status-indicator');
    const hoursEl = document.getElementById('restaurant-hours');

    if (isOpen) {
        statusEl.style.backgroundColor = "#2ecc71"; // Green
        hoursEl.innerHTML = `<span style="color: #2ecc71; font-weight: 700;">ABERTO</span> <i class="fa-regular fa-clock" style="margin-left: 8px;"></i> ${data.hours}`;
    } else {
        statusEl.style.backgroundColor = "#e74c3c"; // Red
        hoursEl.innerHTML = `<span style="color: #e74c3c; font-weight: 700;">FECHADO</span> <i class="fa-regular fa-clock" style="margin-left: 8px;"></i> ${data.hours}`;
    }

    // Set Address
    const addressEl = document.getElementById('restaurant-address');
    if (addressEl) {
        addressEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.address}`;
    }

    // Set images
    document.getElementById('banner-img').style.backgroundImage = `url('${data.bannerUrl}')`;
    document.getElementById('profile-img').src = data.avatarUrl;
}

function checkOpenStatus(schedule) {
    if (!schedule) return true; // Default to open if no schedule

    const now = new Date();
    const currentDay = now.getDay(); // 0-6 (Sun-Sat)
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    // Find today's schedule
    const todaySchedule = schedule.find(s => s.days.includes(currentDay));

    if (!todaySchedule) return false; // Closed today

    const [openHour, openMinute] = todaySchedule.open.split(':').map(Number);
    const [closeHour, closeMinute] = todaySchedule.close.split(':').map(Number);

    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    // Handle overnight hours (e.g. 18:00 to 02:00)
    if (closeTime < openTime) {
        return currentTime >= openTime || currentTime < closeTime;
    }

    return currentTime >= openTime && currentTime < closeTime;
}

function renderNav() {
    const navList = document.getElementById('nav-list');

    restaurantData.menu.forEach((category, index) => {
        const li = document.createElement('li');
        li.className = 'nav-item';
        if (index === 0) li.classList.add('active'); // First item active by default
        li.textContent = category.title;
        li.dataset.target = category.id;

        li.addEventListener('click', () => {
            scrollToSection(category.id);
            setActiveNav(li);
        });

        navList.appendChild(li);
    });
}

function renderMenu() {
    const menuContainer = document.getElementById('menu-container');

    restaurantData.menu.forEach(category => {
        const section = document.createElement('section');
        section.id = category.id;
        section.className = 'menu-section';

        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = category.title;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'menu-items-grid';

        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-item-card';

            const priceFormatted = item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

            // Note: We attach the item data to the card click
            card.onclick = () => openProductOverlay(item);

            card.innerHTML = `
                <div class="item-info">
                    <div class="item-header">
                        <h3 class="item-name">${item.name}</h3>
                    </div>
                    <p class="item-desc">${item.description}</p>
                    <span class="item-price">${priceFormatted}</span>
                </div>
                <div class="item-image-container">
                    <img src="${item.image}" alt="${item.name}" class="item-image" loading="lazy">
                    <div class="add-btn-mini"><i class="fa-solid fa-plus"></i></div>
                </div>
            `;

            grid.appendChild(card);
        });

        section.appendChild(grid);
        menuContainer.appendChild(section);
    });
}

function scrollToSection(id) {
    const element = document.getElementById(id);
    const navHeight = document.querySelector('.sticky-nav').offsetHeight;
    const offset = 20; // Extra padding

    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
}

function setActiveNav(activeItem) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');

    activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('.menu-section');
    const navItems = document.querySelectorAll('.nav-item');

    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px', // Trigger when section is near top
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeNav = document.querySelector(`.nav-item[data-target="${id}"]`);
                if (activeNav) {
                    setActiveNav(activeNav);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// --- OVERLAY & CART LOGIC ---

function initOverlay() {
    const closeBtn = document.getElementById('close-overlay-btn');
    const overlay = document.getElementById('product-overlay');

    // Close button (Product)
    closeBtn.addEventListener('click', closeOverlay);

    // Quantity buttons
    document.getElementById('btn-minus').addEventListener('click', () => updateQty(-1));
    document.getElementById('btn-plus').addEventListener('click', () => updateQty(1));

    // Add to cart button
    document.getElementById('add-to-cart-btn').addEventListener('click', addToCart);

    // Cart Overlay Interactions
    document.getElementById('checkout-btn').addEventListener('click', openCartOverlay);
    document.getElementById('close-cart-btn').addEventListener('click', closeCartOverlay);
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    document.getElementById('finalize-order-btn').addEventListener('click', finalizeOrder);

    // Checkout Form Logic
    const nameInput = document.getElementById('client-name');
    const pickupCheckbox = document.getElementById('is-pickup');
    const addressInput = document.getElementById('client-address');
    const addressContainer = document.getElementById('address-container');
    const stepAddressPickup = document.getElementById('step-address-pickup');
    const stepPayment = document.getElementById('step-payment');
    const paymentRadios = document.getElementsByName('payment-method');
    const changeContainer = document.getElementById('change-container');

    // Step 1: Name -> Show Step 2
    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== "") {
            stepAddressPickup.classList.remove('hidden');
        } else {
            stepAddressPickup.classList.add('hidden');
            stepPayment.classList.add('hidden'); // Hide subsequent step
        }
    });

    // Step 2: Address -> Show Step 3 (Payment) ONLY if NOT pickup
    addressInput.addEventListener('input', () => {
        if (addressInput.value.trim() !== "" && !pickupCheckbox.checked) {
            stepPayment.classList.remove('hidden');
        } else {
            stepPayment.classList.add('hidden');
        }
    });

    // Step 2: Pickup Toggle
    pickupCheckbox.addEventListener('change', () => {
        if (pickupCheckbox.checked) {
            // User chose Pickup: Hide Address input field and Hide Payment
            addressContainer.classList.add('hidden');
            stepPayment.classList.add('hidden');
        } else {
            // User unchecks Pickup: Show Address input
            addressContainer.classList.remove('hidden');

            // Should we show payment? Only if address is already filled
            if (addressInput.value.trim() !== "") {
                stepPayment.classList.remove('hidden');
            } else {
                stepPayment.classList.add('hidden');
            }
        }
    });

    // Payment Logic (Change field)
    Array.from(paymentRadios).forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'Dinheiro') {
                changeContainer.classList.remove('hidden');
            } else {
                changeContainer.classList.add('hidden');
            }
        });
    });
}

function openProductOverlay(item) {
    currentItem = item;
    currentQty = 1;

    document.getElementById('overlay-title').textContent = item.name;
    document.getElementById('overlay-desc').textContent = item.description;
    document.getElementById('overlay-price').textContent = item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('overlay-img').src = item.image;
    document.getElementById('observation').value = '';

    updateQtyDisplay();

    // Show overlay
    const overlay = document.getElementById('product-overlay');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeOverlay() {
    document.getElementById('product-overlay').classList.add('hidden');
    document.body.style.overflow = '';
}

function updateQty(change) {
    if (currentQty + change >= 1) {
        currentQty += change;
        updateQtyDisplay();
    }
}

function updateQtyDisplay() {
    document.getElementById('qty-value').textContent = currentQty;

    const total = currentItem.price * currentQty;
    document.getElementById('overlay-total').textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function addToCart() {
    const observation = document.getElementById('observation').value;

    const cartItem = {
        ...currentItem,
        qty: currentQty,
        obs: observation,
        totalPrice: currentItem.price * currentQty
    };

    cart.push(cartItem);
    updateCartUI();
    closeOverlay();
}

function updateCartUI() {
    const floatingCart = document.getElementById('floating-cart');
    const countEl = document.getElementById('cart-count');
    const totalEl = document.getElementById('cart-total');

    if (cart.length > 0) {
        floatingCart.classList.remove('hidden');
    } else {
        floatingCart.classList.add('hidden');
    }

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

    countEl.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    totalEl.textContent = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// --- NEW CART MANAGEMENT LOGIC ---

function openCartOverlay() {
    if (cart.length === 0) return;

    renderCartItems();

    // Reset form visibility state when opening
    const nameInput = document.getElementById('client-name');
    const stepAddressPickup = document.getElementById('step-address-pickup');
    const stepPayment = document.getElementById('step-payment');

    // If name is already filled (e.g. from previous attempt), show next step
    if (nameInput.value.trim() !== "") {
        stepAddressPickup.classList.remove('hidden');
    } else {
        stepAddressPickup.classList.add('hidden');
        stepPayment.classList.add('hidden');
    }

    const cartOverlay = document.getElementById('cart-overlay');
    cartOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCartOverlay() {
    document.getElementById('cart-overlay').classList.add('hidden');
    document.body.style.overflow = '';
}

function renderCartItems() {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.totalPrice;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-title">${item.qty}x ${item.name}</div>
                ${item.obs ? `<div class="cart-item-obs">Obs: ${item.obs}</div>` : ''}
                <span class="cart-item-price">${item.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        list.appendChild(div);
    });

    document.getElementById('cart-overlay-total').textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

window.removeFromCart = function (index) {
    cart.splice(index, 1);
    renderCartItems();
    updateCartUI();

    if (cart.length === 0) {
        closeCartOverlay();
    }
};

function clearCart() {
    if (confirm("Tem certeza que deseja limpar a sacola?")) {
        cart = [];
        updateCartUI();
        closeCartOverlay();
    }
}

function finalizeOrder() {
    const nameInput = document.getElementById('client-name');
    const addressInput = document.getElementById('client-address');
    const isPickup = document.getElementById('is-pickup').checked;
    const paymentRadios = document.getElementsByName('payment-method');
    const changeInput = document.getElementById('change-for');

    const name = nameInput.value.trim();
    const address = addressInput.value.trim();

    let selectedPayment = null;
    for (const radio of paymentRadios) {
        if (radio.checked) {
            selectedPayment = radio.value;
            break;
        }
    }

    const changeValue = changeInput.value.trim();

    // Validation
    let isValid = true;
    let errors = [];

    if (!name) {
        nameInput.classList.add('input-error');
        isValid = false;
        errors.push("Nome");
    } else {
        nameInput.classList.remove('input-error');
    }

    if (!isPickup) {
        if (!address) {
            addressInput.classList.add('input-error');
            isValid = false;
            errors.push("Endereço");
        } else {
            addressInput.classList.remove('input-error');
        }

        if (!selectedPayment) {
            isValid = false;
            errors.push("Forma de Pagamento");
        }
    }

    if (!isValid) {
        alert("Por favor, preencha os campos obrigatórios: " + errors.join(", "));
        return;
    }

    // Build Message
    let message = `*NOVO PEDIDO (Via Site)*\n\n`;
    message += `*Cliente:* ${name}\n`;

    if (isPickup) {
        message += `*Tipo:* [RETIRADA NO LOCAL]\n`;
    } else {
        message += `*Tipo:* [ENTREGA]\n`;
        message += `*Endereço:* ${address}\n`;
        message += `*Pagamento:* ${selectedPayment}\n`;
        if (selectedPayment === 'Dinheiro' && changeValue) {
            message += `*Troco para:* ${changeValue}\n`;
        }
    }

    message += `\n-------------------------------\n`;

    cart.forEach(item => {
        message += `*${item.qty}x ${item.name}*\n`;
        if (item.obs) message += `_Obs: ${item.obs}_\n`;
        message += `Valor: ${item.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n\n`;
    });

    const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    message += `-------------------------------\n`;
    message += `*TOTAL: ${totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}*\n`;

    const whatsappNumber = restaurantData.whatsapp;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
}
