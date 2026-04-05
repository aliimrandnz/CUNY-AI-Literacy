// Header Scroll & Active link handling
const navLinks = document.querySelectorAll('.nav-link');
const activeClasses = ['text-white', 'font-bold', 'border-[#feb71a]'];
const inactiveClasses = ['text-white/80', 'font-medium', 'border-transparent'];

function setActive(link) {
    const targetHref = link.getAttribute('href');
    const allLinks = [...navLinks, ...mobileNavLinks];

    allLinks.forEach(l => {
        const isMobileLink = l.classList.contains('mobile-nav-link');
        l.classList.remove('active');
        if (isMobileLink) {
            l.classList.remove('text-white', 'font-bold');
            l.classList.add('text-white/60', 'font-medium');
        } else {
            l.classList.remove(...activeClasses);
            inactiveClasses.forEach(c => l.classList.add(c));
        }

        if (l.getAttribute('href') === targetHref || (targetHref === '#' && l.getAttribute('href') === '#')) {
            l.classList.add('active');
            if (isMobileLink) {
                l.classList.add('text-white', 'font-bold');
                l.classList.remove('text-white/60', 'font-medium');
            } else {
                l.classList.add(...activeClasses);
                l.classList.remove(...inactiveClasses);
            }
        }
    });
}

// Set initial active state
const initialActive = document.querySelector('.nav-link.active') || navLinks[0];
if (initialActive) setActive(initialActive);

const sections = [{ id: '', el: document.body }, ...['sessions', 'speakers', 'leadership', 'faq'].map(id => ({ id, el: document.getElementById(id) }))].filter(s => s.el);

const mainNav = document.getElementById('mainNav');
const navContainer = document.getElementById('navContainer');
const logoFull = document.getElementById('logoFull');
const logoCompact = document.getElementById('logoCompact');

let isScrollingFromClick = false;

// Combined link listener
[...navLinks, ...mobileNavLinks].forEach(link => {
    link.addEventListener('click', (e) => {
        isScrollingFromClick = true;
        setActive(link);
        if (link.classList.contains('mobile-nav-link')) {
            setTimeout(() => { if (isMobileMenuOpen) toggleMobileMenu(); }, 150);
        }
        setTimeout(() => { isScrollingFromClick = false; }, 1000);
    });
});

window.addEventListener('scroll', () => {
    // Header sticky transition
    if (window.scrollY > 50) {
        mainNav.classList.remove('bg-transparent', 'shadow-none');
        mainNav.classList.add('bg-[#0033A1]', 'shadow-md');
        navContainer.classList.remove('h-20');
        navContainer.classList.add('h-14');
        logoFull.classList.replace('opacity-100', 'opacity-0');
        logoCompact.classList.replace('opacity-0', 'opacity-100');
    } else {
        mainNav.classList.add('bg-transparent', 'shadow-none');
        mainNav.classList.remove('bg-[#0033A1]', 'shadow-md');
        navContainer.classList.add('h-20');
        navContainer.classList.remove('h-14');
        logoFull.classList.replace('opacity-0', 'opacity-100');
        logoCompact.classList.replace('opacity-100', 'opacity-0');
    }

    if (isScrollingFromClick) return;

    // Current section highlighting
    let current = '';
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10;

    if (isAtBottom) {
        current = 'faq';
    } else {
        sections.forEach(s => {
            if (s.el.getBoundingClientRect().top <= 150) current = s.id;
        });
    }

    const targetLink = [...navLinks].find(l => l.getAttribute('href').replace('#', '') === current) || navLinks[0];
    if (targetLink) setActive(targetLink);
});

// Accordion handling
document.querySelectorAll('.accordion button').forEach(btn => {
    btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        parent.classList.toggle('is-open');
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
        mobileOverlay.classList.remove('hidden');
        setTimeout(() => mobileOverlay.classList.remove('opacity-0'), 10);
        mobileDrawer.classList.remove('translate-x-full');
        mobileMenuIcon.textContent = 'close';
        document.body.style.overflow = 'hidden'; 
    } else {
        mobileOverlay.classList.add('opacity-0');
        mobileDrawer.classList.add('translate-x-full');
        mobileMenuIcon.textContent = 'menu';
        document.body.style.overflow = ''; 
        setTimeout(() => mobileOverlay.classList.add('hidden'), 300); 
    }
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileMenu);

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
        const newSrc = currentGalleryGroup[currentIndex].getAttribute('href');
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = newSrc;
            lightboxImg.style.opacity = '1';
        }, 150);
    }
}

function openLightbox(index, group) {
    currentGalleryGroup = group;
    currentIndex = index;
    lightboxImg.src = currentGalleryGroup[currentIndex].getAttribute('href');
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    const mult = currentGalleryGroup.length > 1;
    if (prevBtn) prevBtn.style.display = mult ? 'flex' : 'none';
    if (nextBtn) nextBtn.style.display = mult ? 'flex' : 'none';
}

function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 300);
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

document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay || !lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
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
