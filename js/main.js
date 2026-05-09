// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    htmlElement.classList.toggle('dark', savedTheme === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = htmlElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);
    
    function updateRTLText(dir) {
        rtlToggles.forEach(btn => {
            const rtlText = btn.querySelector('span');
            if (rtlText) {
                if (btn.id === 'rtl-toggle') {
                    rtlText.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
                } else {
                    rtlText.textContent = dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL Mode';
                }
            }
        });
    }

    updateRTLText(savedDir);

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRTLText(newDir);
        });
    });

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // Floating Leaf Particles
    createLeafParticles();

    // Scroll Progress Bar
    window.onscroll = function() { 
        updateScrollProgress();
        handleScrollTop();
    };

    // Scroll to Top Click
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Initialize icons for dynamic elements
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Highlight Active Nav Link
    highlightActiveNavLink();

    // Initialize Shop Filtering
    initShopFiltering();

    // Initialize Blog Pagination
    initBlogPagination();

    // Initialize Cart Logic
    initCartLogic();
});

function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    let filename = pathParts[pathParts.length - 1] || 'index.html';
    
    if (filename === '' || filename === 'index.html') {
        filename = 'index.html';
    }

    const navLinks = document.querySelectorAll('nav a');
    const desktopHomeBtn = document.querySelector('nav .relative.group button, nav .relative.group a.flex');
    
    let homeActive = false;

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        let linkFilename = href.split('/').pop();
        if (linkFilename === '' || linkFilename === 'index.html') {
            linkFilename = 'index.html';
        }

        const isActive = (linkFilename === filename);
        
        if (isActive) {
            link.classList.add('text-forest', 'font-bold');
            
            if (link.closest('#mobile-menu')) {
                link.classList.add('bg-forest/10', 'rounded-xl', 'px-4');
                link.classList.remove('font-medium');
            } else if (link.classList.contains('block') && (link.closest('.absolute') || link.closest('.group-hover\\:block'))) {
                link.classList.add('bg-forest/10');
                link.classList.remove('text-ecoDark', 'dark:text-ecoLight');
            } else {
                // Top level desktop links - use a pill shape for better visibility
                link.classList.add('bg-forest/5', 'rounded-full', 'px-4', 'py-1');
            }

            if (linkFilename === 'index.html' || linkFilename === 'home-niche.html') {
                homeActive = true;
            }
        } else {
            // Remove active states
            link.classList.remove('text-forest', 'font-bold', 'bg-forest/10', 'bg-forest/5', 'rounded-xl', 'rounded-full', 'px-4', 'py-1');
            if (link.closest('#mobile-menu')) {
                link.classList.add('font-medium');
            } else if (link.classList.contains('block') && (link.closest('.absolute') || link.closest('.group-hover\\:block'))) {
                link.classList.add('text-ecoDark', 'dark:text-ecoLight');
            }
        }
    });

    if (desktopHomeBtn) {
        if (homeActive) {
            desktopHomeBtn.classList.add('text-forest', 'font-bold', 'bg-forest/5', 'rounded-full', 'px-4', 'py-1');
        } else {
            desktopHomeBtn.classList.remove('text-forest', 'font-bold', 'bg-forest/5', 'rounded-full', 'px-4', 'py-1');
        }
    }
}

function handleScrollTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    }
}

function createLeafParticles() {
    const container = document.body;
    const leafCount = 15;
    const icons = ['🌿', '🍃', '🌱'];

    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf-particle';
        leaf.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        
        // Randomize start position
        leaf.style.left = Math.random() * 95 + 'vw';
        leaf.style.bottom = '-50px';
        
        // Randomize speed and delay
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 20;
        leaf.style.animationDuration = duration + 's';
        leaf.style.animationDelay = delay + 's';
        
        // Randomize size
        leaf.style.fontSize = (10 + Math.random() * 20) + 'px';
        leaf.style.opacity = (0.2 + Math.random() * 0.4).toString();

        container.appendChild(leaf);
    }
}

function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
}

function initShopFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const searchInput = document.getElementById('search-input');

    if (!filterBtns.length || !productCards.length) return;

    function filterProducts() {
        const activeBtn = document.querySelector('.filter-btn.bg-forest');
        const activeFilter = activeBtn ? activeBtn.dataset.filter : 'all';
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';

        productCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();

            const matchesCategory = activeFilter === 'all' || category === activeFilter;
            const matchesSearch = title.includes(searchQuery) || description.includes(searchQuery);

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-forest', 'text-white', 'font-bold');
                b.classList.add('bg-white', 'dark:bg-ecoDark', 'border', 'border-forest/10');
            });
            btn.classList.add('bg-forest', 'text-white', 'font-bold');
            btn.classList.remove('bg-white', 'dark:bg-ecoDark', 'border', 'border-forest/10');

            filterProducts();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
}

function initBlogPagination() {
    const blogPosts = document.querySelectorAll('.blog-post');
    const paginationContainer = document.getElementById('blog-pagination');
    if (!blogPosts.length || !paginationContainer) return;

    const pageBtns = paginationContainer.querySelectorAll('.page-btn');
    const prevBtn = paginationContainer.querySelector('.page-prev');
    const nextBtn = paginationContainer.querySelector('.page-next');
    const postsPerPage = 3;
    let currentPage = 1;

    function showPage(page) {
        currentPage = page;
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;

        blogPosts.forEach((post, index) => {
            if (index >= start && index < end) {
                post.classList.remove('hidden');
                setTimeout(() => {
                    post.style.opacity = '1';
                    post.style.transform = 'translateY(0)';
                }, 10);
            } else {
                post.style.opacity = '0';
                post.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    post.classList.add('hidden');
                }, 300);
            }
        });

        // Update buttons
        pageBtns.forEach(btn => {
            if (parseInt(btn.dataset.page) === page) {
                btn.classList.add('bg-forest', 'text-white', 'font-bold');
                btn.classList.remove('border', 'border-forest/10');
            } else {
                btn.classList.remove('bg-forest', 'text-white', 'font-bold');
                btn.classList.add('border', 'border-forest/10');
            }
        });

        // Update arrows state
        if (prevBtn) prevBtn.style.opacity = page === 1 ? '0.5' : '1';
        if (nextBtn) nextBtn.style.opacity = page === pageBtns.length ? '0.5' : '1';
    }

    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showPage(parseInt(btn.dataset.page));
            const blogSection = document.querySelector('header');
            if (blogSection) blogSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) showPage(currentPage - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage < pageBtns.length) showPage(currentPage + 1);
        });
    }

    // Initial show
    showPage(1);
}

function initCartLogic() {
    const cartItems = document.querySelectorAll('.cart-item');
    if (!cartItems.length) return;

    cartItems.forEach(item => {
        const minusBtn = item.querySelector('.qty-minus');
        const plusBtn = item.querySelector('.qty-plus');
        const qtyVal = item.querySelector('.qty-val');
        
        if (minusBtn && plusBtn && qtyVal) {
            minusBtn.addEventListener('click', () => {
                let current = parseInt(qtyVal.textContent);
                if (current > 1) {
                    qtyVal.textContent = current - 1;
                }
            });

            plusBtn.addEventListener('click', () => {
                let current = parseInt(qtyVal.textContent);
                qtyVal.textContent = current + 1;
            });
        }
    });
}

// Parallax Effect for Hero sections
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        const rect = el.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.style.transform = `translateY(${(scrollPercent - 0.5) * 100 * speed}px)`;
        }
    });
});
