document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. DATABASE SETUP (LOCAL STORAGE)
    // ==========================================================================
    const defaultProducts = [
        { id: 1, title: "Silfver UI Kit", category: "Framer Component System", price: "$49", image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop" },
        { id: 2, title: "Monolith Icons", category: "Vector Icon System", price: "$24", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop" },
        { id: 3, title: "Obsidian", category: "8K Desktop Wallpapers", price: "$12", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" }
    ];

    // Initialize database if empty
    if (!localStorage.getItem('silfver_products')) {
        localStorage.setItem('silfver_products', JSON.stringify(defaultProducts));
    }

    let products = JSON.parse(localStorage.getItem('silfver_products'));

    // ==========================================================================
    // 2. RENDER HOMEPAGE PRODUCTS (Dynamic)
    // ==========================================================================
    const productGrid = document.getElementById('dynamic-product-grid');
    if (productGrid) {
        productGrid.innerHTML = ''; // Clear loading state
        products.forEach((product, index) => {
            const delay = index * 0.1; // Staggered animation
            const card = `
                <a href="product.html" class="product-card reveal-up" style="transition-delay: ${delay}s">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-meta">
                        <div>
                            <h3>${product.title}</h3>
                            <p>${product.category}</p>
                        </div>
                        <span class="product-price">${product.price}</span>
                    </div>
                </a>
            `;
            productGrid.insertAdjacentHTML('beforeend', card);
        });
    }

    // ==========================================================================
    // 3. UI INTERACTIONS (Nav, Mobile Menu, Reveals)
    // ==========================================================================
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 100 && window.scrollY > lastScrollY) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            if (navLinks.classList.contains('nav-active')) {
                mobileToggle.innerHTML = '✕';
                document.body.style.overflow = 'hidden';
            } else {
                mobileToggle.innerHTML = '☰';
                document.body.style.overflow = 'auto';
            }
        });
    }

    const revealElements = document.querySelectorAll('.reveal-up');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // ==========================================================================
    // 4. FAQ ACCORDION LOGIC
    // ==========================================================================
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            
            document.querySelectorAll('.faq-content').forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    item.previousElementSibling.classList.remove('active');
                }
            });

            trigger.classList.toggle('active');
            if (trigger.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // ==========================================================================
    // 5. ADMIN PANEL LOGIC
    // ==========================================================================
    const loginForm = document.getElementById('admin-login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const loginContainer = document.getElementById('login-container');
    const adminTableBody = document.getElementById('admin-table-body');
    const addProductBtn = document.getElementById('btn-add-product');
    const logoutBtn = document.getElementById('btn-logout');

    // Authentication Check
    if (loginForm) {
        if (sessionStorage.getItem('silfver_admin_auth') === 'true') {
            showDashboard();
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('admin-user').value;
            const pass = document.getElementById('admin-pass').value;
            const errorMsg = document.getElementById('login-error');

            if (user === 'Admin123' && pass === 'Admin123') {
                sessionStorage.setItem('silfver_admin_auth', 'true');
                showDashboard();
            } else {
                errorMsg.style.display = 'block';
                setTimeout(() => errorMsg.style.display = 'none', 3000);
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('silfver_admin_auth');
            window.location.reload();
        });
    }

    function showDashboard() {
        loginContainer.style.display = 'none';
        adminDashboard.style.display = 'block';
        renderAdminTable();
    }

    function renderAdminTable() {
        if (!adminTableBody) return;
        adminTableBody.innerHTML = '';
        products.forEach((p, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${p.image}" class="admin-thumb" alt="thumb"></td>
                <td><strong>${p.title}</strong></td>
                <td>${p.category}</td>
                <td>${p.price}</td>
                <td>
                    <button class="btn-sm btn-delete" data-index="${index}">Delete</button>
                </td>
            `;
            adminTableBody.appendChild(tr);
        });

        // Attach Delete Listeners
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                if (confirm('Are you sure you want to delete this product?')) {
                    products.splice(idx, 1);
                    localStorage.setItem('silfver_products', JSON.stringify(products));
                    renderAdminTable();
                }
            });
        });
    }

    // Add New Product Prompt (Simple version without complex modals)
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            const title = prompt("Enter Product Title (e.g., Nova UI Kit):");
            if (!title) return;
            const category = prompt("Enter Category (e.g., Design System):");
            const price = prompt("Enter Price (e.g., $59):");
            const image = prompt("Enter Image URL (Unsplash link):", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop");

            const newProduct = {
                id: Date.now(),
                title: title || "Untitled Product",
                category: category || "Uncategorized",
                price: price || "$0",
                image: image
            };

            products.push(newProduct);
            localStorage.setItem('silfver_products', JSON.stringify(products));
            renderAdminTable();
        });
    }
});
