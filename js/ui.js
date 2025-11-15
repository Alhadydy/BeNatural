document.addEventListener('DOMContentLoaded', function () {
    // initialize
    if (typeof ensureMobileAuthButtons === 'undefined') {
        // ensure function exists for older inline loads
    }
    setupMobileMenuToggle();
    setupHeaderHideOnScroll();

    // ensure auth buttons on load/resize for small screens
    if (window.innerWidth < 768) ensureMobileAuthButtons();
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) ensureMobileAuthButtons();
    });
});

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
        // keep header visible and prevent page from scrolling while menu is open
        if (header) {
            header.classList.remove('header-hidden', 'translate-y-full');
        }
        // lock body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        btn.setAttribute('aria-expanded', 'false');
        menu.classList.add('hidden');
        updateIcon(false);
        // restore body scroll
        document.body.style.overflow = '';
        // let the scroll handler re-evaluate header state
        window.dispatchEvent(new Event('scroll'));
    }

    btn.addEventListener('click', function (ev) {
        ev.stopPropagation();
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        if (!isOpen) openMenu();
        else closeMenu();
    });

    // prevent clicks inside menu from closing it
    menu.addEventListener('click', function (ev) {
        ev.stopPropagation();
    });

    // close when a link inside menu is clicked
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        closeMenu();
    }));

    // close when clicking outside
    function handleDocumentClick() {
        if (!menu.classList.contains('hidden')) closeMenu();
    }
    document.addEventListener('click', handleDocumentClick);

    // close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') handleDocumentClick();
    });

    // close when switching to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && !menu.classList.contains('hidden')) closeMenu();
    });
}

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

        // if mobile menu is open, keep the header visible and reset lastScroll
        const menuOpen = (mobileBtn && mobileBtn.getAttribute('aria-expanded') === 'true') || (mobileMenu && !mobileMenu.classList.contains('hidden'));
        if (menuOpen) {
            header.classList.remove('header-hidden', 'translate-y-full');
            lastScroll = Math.max(0, current); // prevent next scroll from miscomputing direction
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