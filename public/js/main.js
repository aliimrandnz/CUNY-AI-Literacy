// Header Scroll & Active link handling
const navLinks = document.querySelectorAll('.nav-link');
const activeClasses = ['text-white', 'font-bold', 'border-[#feb71a]'];
const inactiveClasses = ['text-white/80', 'font-medium', 'border-transparent'];

function setActive(link) {
    if (!link) return;
    navLinks.forEach(l => {
        l.classList.remove('active', ...activeClasses);
        l.removeAttribute('aria-current');
        inactiveClasses.forEach(c => l.classList.add(c));
    });
    link.classList.add('active', ...activeClasses);
    link.classList.remove(...inactiveClasses);
    link.setAttribute('aria-current', 'page');
}

// Set initial active state
const initialActive = document.querySelector('.nav-link.active');
if (initialActive) {
    setActive(initialActive);
}

const sections = [{ id: '', el: document.body }, ...['sessions', 'speakers', 'leadership', 'faq'].map(id => ({ id, el: document.getElementById(id) }))].filter(s => s.el);

const mainNav = document.getElementById('mainNav');
const navContainer = document.getElementById('navContainer');
const logoFull = document.getElementById('logoFull');
const logoCompact = document.getElementById('logoCompact');

let isScrollingFromClick = false;

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        isScrollingFromClick = true;
        setActive(link);
        setTimeout(() => { isScrollingFromClick = false; }, 1000);
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        if (mainNav) {
            mainNav.classList.remove('bg-transparent', 'shadow-none');
            mainNav.classList.add('bg-[#0033A1]', 'shadow-md');
        }
        if (navContainer) {
            navContainer.classList.remove('h-20');
            navContainer.classList.add('h-14');
        }
        if (logoFull) logoFull.classList.replace('opacity-100', 'opacity-0');
        if (logoCompact) logoCompact.classList.replace('opacity-0', 'opacity-100');
    } else {
        if (mainNav) {
            mainNav.classList.add('bg-transparent', 'shadow-none');
            mainNav.classList.remove('bg-[#0033A1]', 'shadow-md');
        }
        if (navContainer) {
            navContainer.classList.add('h-20');
            navContainer.classList.remove('h-14');
        }
        if (logoFull) logoFull.classList.replace('opacity-0', 'opacity-100');
        if (logoCompact) logoCompact.classList.replace('opacity-100', 'opacity-0');
    }

    if (isScrollingFromClick) return;

    let current = '';
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;

    if (isAtBottom) {
        current = 'faq';
    } else {
        sections.forEach(s => {
            if (s.el && s.el.getBoundingClientRect().top <= 120) current = s.id;
        });
    }

    navLinks.forEach(link => {
        const h = link.getAttribute('href');
        if (h) {
            const href = h.replace('#', '');
            // Handle Overview/Top case
            if (href === current || (current === '' && (href === 'top' || href === ''))) {
                setActive(link);
            }
        }
    });
});

// Focus Trapping Helper
function trapFocus(container, event) {
    if (!container) return;
    const focusableEls = container.querySelectorAll('button:not([disabled]), [href]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusableEls.length === 0) return;
    
    const firstFocusedEl = focusableEls[0];
    const lastFocusedEl = focusableEls[focusableEls.length - 1];

    if (event.key === 'Tab') {
        if (event.shiftKey) {
            if (document.activeElement === firstFocusedEl) {
                lastFocusedEl.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusedEl) {
                firstFocusedEl.focus();
                event.preventDefault();
            }
        }
    }
}

let lastActiveElement = null;

// Accordion handling
document.querySelectorAll('.accordion button').forEach(btn => {
    btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        if (!parent) return;
        const isOpen = parent.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        
        const controlsId = btn.getAttribute('aria-controls');
        const content = controlsId ? document.getElementById(controlsId) : null;
        if (content) {
            if (isOpen) {
                content.removeAttribute('hidden');
            } else {
                // Using 300ms to match the transition duration
                setTimeout(() => {
                    if (!parent.classList.contains('is-open')) {
                        content.setAttribute('hidden', '');
                    }
                }, 300);
            }
        }
    });
});

// Mobile Menu Drawer handling
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuIcon = document.getElementById('mobileMenuIcon');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
let isMobileMenuOpen = false;

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (isMobileMenuOpen) {
        lastActiveElement = document.activeElement;
        if (mobileOverlay) {
            mobileOverlay.classList.remove('hidden');
            setTimeout(() => mobileOverlay.classList.remove('opacity-0'), 10);
        }
        if (mobileDrawer) {
            mobileDrawer.removeAttribute('hidden');
            mobileDrawer.classList.remove('translate-x-full');
            const firstLink = mobileDrawer.querySelector('a');
            if (firstLink) setTimeout(() => firstLink.focus(), 350); 
        }
        if (mobileMenuIcon) mobileMenuIcon.textContent = 'close';
        document.body.style.overflow = 'hidden'; 
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
        if (mobileOverlay) mobileOverlay.classList.add('opacity-0');
        if (mobileDrawer) mobileDrawer.classList.add('translate-x-full');
        if (mobileMenuIcon) mobileMenuIcon.textContent = 'menu';
        document.body.style.overflow = ''; 
        if (mobileMenuBtn) {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            if (lastActiveElement) {
                lastActiveElement.focus();
            } else {
                mobileMenuBtn.focus();
            }
        }
        setTimeout(() => {
            if (!isMobileMenuOpen) {
                if (mobileOverlay) mobileOverlay.classList.add('hidden');
                if (mobileDrawer) mobileDrawer.setAttribute('hidden', '');
            }
        }, 300); 
    }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if(isMobileMenuOpen) toggleMobileMenu();
    });
});

// Lightbox functionality
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentGalleryGroup = [];
let currentIndex = -1;

function getGalleryGroup(item) {
    const container = item.closest('.grid');
    return container ? Array.from(container.querySelectorAll('.gallery-item')) : [item];
}

function updateLightboxImage() {
    if (currentGalleryGroup[currentIndex]) {
        const item = currentGalleryGroup[currentIndex];
        const newSrc = item.getAttribute('href');
        const thumbImg = item.querySelector('img');
        const altText = thumbImg ? thumbImg.alt : 'Lightbox image view';
        
        if (lightboxImg) {
            lightboxImg.style.opacity = '0';
            setTimeout(() => {
                lightboxImg.src = newSrc;
                lightboxImg.alt = altText;
                lightboxImg.style.opacity = '1';
            }, 150);
        }
    }
}

function openLightbox(index, group) {
    lastActiveElement = document.activeElement;
    currentGalleryGroup = group;
    currentIndex = index;
    
    if (lightboxOverlay) {
        lightboxOverlay.removeAttribute('hidden');
        lightboxOverlay.classList.add('active');
        
        const item = currentGalleryGroup[currentIndex];
        const thumbImg = item.querySelector('img');
        if (lightboxImg) {
            lightboxImg.src = item.getAttribute('href');
            lightboxImg.alt = thumbImg ? thumbImg.alt : 'Lightbox image view';
        }

        const mult = currentGalleryGroup.length > 1;
        if (prevBtn) prevBtn.style.display = mult ? 'flex' : 'none';
        if (nextBtn) nextBtn.style.display = mult ? 'flex' : 'none';
        
        if (lightboxClose) setTimeout(() => lightboxClose.focus(), 350);
    }
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (lightboxOverlay) {
        lightboxOverlay.classList.remove('active');
        setTimeout(() => {
            if (!lightboxOverlay.classList.contains('active')) {
                lightboxOverlay.setAttribute('hidden', '');
                if (lightboxImg) lightboxImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
            }
        }, 300);
    }
    document.body.style.overflow = '';
    if (lastActiveElement) lastActiveElement.focus();
}

function showNextImage() {
    if (currentGalleryGroup.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentGalleryGroup.length;
    updateLightboxImage();
}

function showPrevImage() {
    if (currentGalleryGroup.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentGalleryGroup.length) % currentGalleryGroup.length;
    updateLightboxImage();
}

galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const group = getGalleryGroup(item);
        openLightbox(group.indexOf(item), group);
    });
});

if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });
if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxOverlay) lightboxOverlay.addEventListener('click', (e) => { if (e.target === lightboxOverlay) closeLightbox(); });

// Keyboard Listeners
document.addEventListener('keydown', (e) => {
    // 1. Lightbox handling
    if (lightboxOverlay && lightboxOverlay.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'Tab') trapFocus(lightboxOverlay, e);
    }
    
    // 2. Mobile Drawer handling
    if (isMobileMenuOpen) {
        if (e.key === 'Escape') toggleMobileMenu();
        if (e.key === 'Tab') trapFocus(mobileDrawer, e);
    }
});

let touchStartX = 0;
if (lightboxOverlay) {
    lightboxOverlay.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, {passive: true});
    lightboxOverlay.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) showNextImage();
        if (touchEndX > touchStartX + 50) showPrevImage();
    }, {passive: true});
}

// Global Image Error Handling (Local Avatar Fallback)
// Ensures that broken profile images are securely handled locally,
// removing dependencies on third-party remote avatar services.
document.addEventListener('error', (e) => {
    if (e.target.tagName && e.target.tagName.toLowerCase() === 'img') {
        const img = e.target;
        if (!img.dataset.errorHandled) {
            img.dataset.errorHandled = 'true';
            // Hide the broken image to prevent incorrect fallback (like human avatar for logo)
            img.style.display = 'none';
            img.classList.add('error-hidden');
        }
    }
}, true); // Use capture phase to intercept errors during the loading process

