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
});

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
        leaf.style.left = Math.random() * 100 + 'vw';
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
