
    // mobile menu toggle
    function setupMobileMenuToggle() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const header = document.querySelector('header');
        if (!btn || !menu) return;
        const icon = btn.querySelector('i');

        function updateIcon(open) {
            if (!icon) return;
            icon.classList.remove('ri-menu-line', 'ri-close-line');
            // keep text-xl for size
            icon.classList.add(open ? 'ri-close-line' : 'ri-menu-line', 'text-xl');
        }

        // initialize icon based on aria-expanded or menu visibility
        const initiallyOpen = btn.getAttribute('aria-expanded') === 'true' || !menu.classList.contains('hidden');
        btn.setAttribute('aria-expanded', String(initiallyOpen));
        updateIcon(initiallyOpen);
        if (initiallyOpen && header) {
            header.classList.remove('header-hidden', 'translate-y-full');
        }

        function openMenu() {
            ensureMobileAuthButtons();
            btn.setAttribute('aria-expanded', 'true');
            menu.classList.remove('hidden');
            updateIcon(true);
            if (header) {
                header.classList.remove('header-hidden', 'translate-y-full');
            }
        }

        function closeMenu() {
            btn.setAttribute('aria-expanded', 'false');
            menu.classList.add('hidden');
            updateIcon(false);
            // trigger scroll to let the header hide-on-scroll code re-evaluate
            window.dispatchEvent(new Event('scroll'));
        }

        btn.addEventListener('click', function (ev) {
            ev.stopPropagation(); // prevent document click handler from immediately closing
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            const newOpen = !isOpen;
            if (newOpen) openMenu();
            else closeMenu();
        });

        // prevent clicks inside menu from reaching document handler
        menu.addEventListener('click', function (ev) {
            ev.stopPropagation();
        });

        // optional: hide menu when a link is clicked
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            closeMenu();
        }));

        // close when clicking outside
        function handleDocumentClick() {
            if (!menu.classList.contains('hidden')) {
                closeMenu();
            }
        }
        document.addEventListener('click', handleDocumentClick);

        // close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') handleDocumentClick();
        });

        // ensure menu is closed and icon reset when switching to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && !menu.classList.contains('hidden')) {
                closeMenu();
            }
        });
    }

    setupMobileMenuToggle();

    // Insert Sign in / Sign up into mobile menu if missing
    function ensureMobileAuthButtons() {
        const menu = document.getElementById('mobile-menu');
        if (!menu) return;
        if (menu.querySelector('.mobile-auth-buttons')) return; // already added

        const container = document.createElement('div');
        container.className = 'flex flex-col space-y-2 pt-4 border-t border-gray-200 mobile-auth-buttons';
        container.innerHTML = `
            <a href="snippets/sign-in.html" class="inline-flex items-center justify-center font-medium bg-rose-500 text-white hover:bg-rose-600 px-4 py-2 rounded-lg w-full text-center">Sign in</a>
            <a href="snippets/sign-up.html" class="inline-flex items-center justify-center font-medium border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white px-4 py-2 rounded-lg w-full text-center">Sign up</a>
        `;
        menu.appendChild(container);
    }

    // ensure auth buttons exist on load for small screens and on resize
    if (window.innerWidth < 768) ensureMobileAuthButtons();
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) ensureMobileAuthButtons();
    });

    function setupHeaderHideOnScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    const mobileMenu = document.getElementById('mobile-menu');
    const mobileBtn = document.getElementById('mobile-menu-btn');

    let lastScroll = 0;
    let ticking = false;
    const START_HIDE_OFFSET = 80; // start hiding after this many px

    function update() {
        const current = window.pageYOffset || document.documentElement.scrollTop;

        // if mobile menu is open, keep the header visible so menu shows reliably
        const menuOpen = (mobileBtn && mobileBtn.getAttribute('aria-expanded') === 'true') || (mobileMenu && !mobileMenu.classList.contains('hidden'));
        if (menuOpen) {
            header.classList.remove('header-hidden');
            header.classList.remove('shadow-sm');
            lastScroll = Math.max(0, current);
            ticking = false;
            return;
        }

        // hide when scrolling down past START_HIDE_OFFSET
        if (current > lastScroll && current > START_HIDE_OFFSET) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        // add small shadow when page is scrolled a bit
        if (current > 8) header.classList.add('shadow-sm');
        else header.classList.remove('shadow-sm');

        lastScroll = Math.max(0, current);
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
}
    
setupHeaderHideOnScroll();






(() => {
  // ========================
  // 🎯 العناصر والثوابت
  // ========================
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCountEl = document.getElementById("cart-count");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const checkoutBtn = document.getElementById("checkout-btn");
  const clearBtn = document.getElementById("clear-cart-btn");
  const CART_KEY = "benatural_cart_v1";

  const openCartButtons = [
    document.getElementById("desktop-cart-btn"),
    document.getElementById("mobile-cart-btn"),
  ];

  // ========================
  // 💾 إدارة التخزين
  // ========================
  const loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || {};
    } catch {
      return {};
    }
  };

  const saveCart = (cart) =>
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

  const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    renderCart();
  };

  // ========================
  // 💲 تنسيق السعر
  // ========================
  const formatPrice = (n) => `$${Number(n).toFixed(2)}`;

  // ========================
  // 🧱 إنشاء عنصر المنتج
  // ========================
  const createCartItem = (item) => {
    const itemEl = document.createElement("div");
    itemEl.className = "cart-item flex items-center gap-4 py-4 border-b";
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
      <div class="flex-1">
        <div class="font-medium text-gray-900">${item.name}</div>
        <div class="text-sm text-gray-500">${formatPrice(item.price)}</div>
        <div class="mt-2 inline-flex items-center gap-2">
          <button class="decrease text-gray-600 px-2 py-1 border rounded" data-id="${item.id}">-</button>
          <span class="px-2">${item.qty}</span>
          <button class="increase text-gray-600 px-2 py-1 border rounded" data-id="${item.id}">+</button>
          <button class="remove text-red-500 text-sm ml-4" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `;
    return itemEl;
  };

  // ========================
  // 🛒 عرض السلة
  // ========================
  const renderCart = () => {
    const cart = loadCart();
    const ids = Object.keys(cart);
    const emptyEl = document.getElementById("cart-empty");

    // إذا كانت السلة فارغة
    if (!ids.length) {
      cartItemsContainer.innerHTML = "";
      cartCountEl.textContent = "(0)";
      cartSubtotalEl.textContent = formatPrice(0);
      if (emptyEl) emptyEl.style.display = "";
      return;
    }

    // عرض المنتجات
    if (emptyEl) emptyEl.style.display = "none";
    cartItemsContainer.innerHTML = "";

    let subtotal = 0;
    let totalQty = 0;

    ids.forEach((id) => {
      const item = cart[id];
      subtotal += item.price * item.qty;
      totalQty += item.qty;
      cartItemsContainer.appendChild(createCartItem(item));
    });

    cartCountEl.textContent = `(${totalQty})`;
    cartSubtotalEl.textContent = formatPrice(subtotal);
  };

  // ========================
  // 🎚️ فتح/إغلاق السلة
  // ========================
  const openCart = () => {
    drawer.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    renderCart();
  };

  const closeCart = () => {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  // ========================
  // 🧠 التعامل مع النقرات
  // ========================

  // 1️⃣ فتح السلة من أي زر
  openCartButtons.forEach((btn) => btn?.addEventListener("click", openCart));

  // 2️⃣ إغلاق السلة
  document
    .getElementById("cart-drawer-close")
    ?.addEventListener("click", closeCart);
  overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  // 3️⃣ إضافة منتج للسلة
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart-btn");
    if (!btn) return;

    const card = btn.closest("[data-product-id]");
    if (!card) return;

    const id = card.dataset.productId;
    const name = card.dataset.productName;
    const price = parseFloat(card.dataset.productPrice) || 0;
    const image = card.dataset.productImage || "";

    const cart = loadCart();
    cart[id] = cart[id]
      ? { ...cart[id], qty: cart[id].qty + 1 }
      : { id, name, price, image, qty: 1 };

    saveCart(cart);
    openCart();
  });

  // 4️⃣ التحكم داخل السلة (زيادة/نقص/حذف)
  cartItemsContainer.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    const cart = loadCart();
    const item = cart[id];
    if (!item) return;

    if (e.target.classList.contains("increase")) item.qty++;
    else if (e.target.classList.contains("decrease"))
      item.qty = Math.max(1, item.qty - 1);
    else if (e.target.classList.contains("remove")) delete cart[id];

    saveCart(cart);
    renderCart();
  });

  // 5️⃣ مسح السلة
  clearBtn.addEventListener("click", clearCart);

  // 6️⃣ الدفع (تجريبي)
  checkoutBtn.addEventListener("click", () => {
    alert("Checkout not implemented yet.");
  });

  // 7️⃣ تحديث عند تحميل الصفحة
  renderCart();
})();
