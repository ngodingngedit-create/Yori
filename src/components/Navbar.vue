<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { isCartOpen, cartCount } from '../cartState.js';
import { currentPage, navigateTo, currentArtist } from '../routerState.js';

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const isArtistDropdownOpen = ref(false);
const isArtistAccordionOpen = ref(false);
const activeAnchor = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (!isMenuOpen.value) {
    isArtistAccordionOpen.value = false;
  }
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const handleNav = (page, anchor = null) => {
  activeAnchor.value = anchor;
  isMenuOpen.value = false;
  isArtistDropdownOpen.value = false;
  isArtistAccordionOpen.value = false;
  navigateTo(page, anchor);
};

const selectArtist = (artist) => {
  currentArtist.value = artist;
  activeAnchor.value = null;
  isArtistDropdownOpen.value = false;
  isArtistAccordionOpen.value = false;
  isMenuOpen.value = false;
  navigateTo('home', '#hero');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <!-- ================= NAVBAR SECTION ================= -->
  <nav class="navbar" :class="{ 'scrolled': isScrolled, 'menu-open': isMenuOpen }">
    <div class="navbar-container container">
      <!-- Logo Wordmark -->
      <a href="#" @click.prevent="handleNav('home')" class="logo">
        <img v-if="currentArtist === 'yori'" src="/logo/logo.png" class="logo-ri" alt="YoRI Logo">
        <!-- 90 HORSEPOWER LOGO -->
        <img v-else src="/90horsepower/logo90.png" class="logo-ri logo-img-90hp" alt="Ninety Horsepower Logo">
      </a>

      <!-- Desktop Links -->
      <div class="nav-links">
        <a href="#" @click.prevent="handleNav('home')" class="nav-link" :class="{ 'active': currentPage === 'home' && !activeAnchor }">HOME</a>
        <div class="nav-dropdown-wrapper" :class="{ 'active': isArtistDropdownOpen }">
          <a href="#" @click.prevent="isArtistDropdownOpen = !isArtistDropdownOpen" class="nav-link dropdown-trigger" :class="{ 'active': isArtistDropdownOpen }">
            <span>ARTIST</span>
            <svg class="dropdown-arrow-icon" :class="{ 'open': isArtistDropdownOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>
          <div class="nav-dropdown-menu">
            <a href="#" @click.prevent="selectArtist('yori')" class="dropdown-item" :class="{ 'active': currentArtist === 'yori' }">
              <span>YoRI</span>
            </a>
            <!-- 90 HORSEPOWER SELECTOR -->
            <a href="#" @click.prevent="selectArtist('90hp')" class="dropdown-item" :class="{ 'active': currentArtist === '90hp' }">
              <span>90 Horses Power</span>
            </a>
          </div>
        </div>
        <a href="#store" @click.prevent="handleNav('store')" class="nav-link" :class="{ 'active': currentPage === 'store' }">STORE</a>
        <a href="#albums" @click.prevent="handleNav('home', '#albums')" class="nav-link" :class="{ 'active': activeAnchor === '#albums' }">ALBUM</a>
        <a href="#highlights" @click.prevent="handleNav('home', '#highlights')" class="nav-link" :class="{ 'active': activeAnchor === '#highlights' }">HIGHLIGHTS</a>
      </div>

      <!-- Actions (Desktop) -->
      <div class="nav-action">
        <a href="#listen" class="btn btn-cyan btn-listen">
          <span>LISTEN</span>
          <svg class="play-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </a>

        <!-- Shopping Cart Icon Trigger -->
        <button @click="toggleCart" class="cart-trigger-btn" aria-label="Open Cart">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>
      </div>

      <!-- Mobile Right Container (Cart + Menu Toggle) -->
      <div class="mobile-actions">
        <!-- Shopping Cart Trigger (Mobile Top) -->
        <button @click="toggleCart" class="cart-trigger-btn cart-mobile" aria-label="Open Cart">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMenu" class="mobile-toggle" aria-label="Toggle menu">
          <span :class="{ 'active': isMenuOpen }"></span>
          <span :class="{ 'active': isMenuOpen }"></span>
          <span :class="{ 'active': isMenuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu (Mainly for Artist Selection and fast info) -->
    <div class="mobile-drawer" :class="{ 'open': isMenuOpen }">
      <div class="mobile-drawer-links">
        <h4 class="mobile-drawer-section-title">SELECT ARTIST</h4>
        <div class="mobile-artist-selector">
          <button @click="selectArtist('yori')" class="mobile-artist-btn" :class="{ 'active': currentArtist === 'yori' }">
            YoRI
          </button>
          <button @click="selectArtist('90hp')" class="mobile-artist-btn" :class="{ 'active': currentArtist === '90hp' }">
            90HP
          </button>
        </div>
        
        <div class="mobile-drawer-divider"></div>

        <a href="#" @click.prevent="handleNav('home')" :class="{ 'active': currentPage === 'home' && !activeAnchor }">HOME</a>
        <a href="#store" @click.prevent="handleNav('store')" :class="{ 'active': currentPage === 'store' }">STORE</a>
        <a href="#albums" @click.prevent="handleNav('home', '#albums')">ALBUM</a>
        <a href="#highlights" @click.prevent="handleNav('home', '#highlights')">HIGHLIGHTS</a>
        
        <a href="#listen" class="btn btn-cyan btn-listen btn-listen-mobile" @click="isMenuOpen = false">
          <span>LISTEN NOW</span>
          <svg class="play-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </a>
      </div>
    </div>
  </nav>

  <!-- Mobile Bottom Navigation Bar (Shown on screens <= 768px) -->
  <div class="mobile-bottom-nav">
    <button 
      @click="handleNav('home')" 
      class="mobile-bottom-nav-item mobile-bottom-nav-home" 
      :class="{ 'active': currentPage === 'home' && !activeAnchor }"
    >
      <img 
        v-if="currentArtist === 'yori'" 
        src="/logo/logo.png" 
        class="mobile-home-logo mobile-home-logo-yori" 
        alt="YoRI"
      />
      <img 
        v-else 
        src="/90horsepower/logo90.png" 
        class="mobile-home-logo mobile-home-logo-90hp" 
        alt="90HP"
      />
      <span>HOME</span>
    </button>

    <button 
      @click="handleNav('home', '#albums')" 
      class="mobile-bottom-nav-item" 
      :class="{ 'active': activeAnchor === '#albums' }"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
      <span>ALBUMS</span>
    </button>

    <button 
      @click="handleNav('store')" 
      class="mobile-bottom-nav-item" 
      :class="{ 'active': currentPage === 'store' || currentPage === 'product-detail' }"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      <span>STORE</span>
    </button>

    <button 
      @click="handleNav('home', '#highlights')" 
      class="mobile-bottom-nav-item" 
      :class="{ 'active': activeAnchor === '#highlights' || currentPage === 'highlight-detail' }"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
      <span>HIGHLIGHTS</span>
    </button>

    <button 
      @click="toggleCart" 
      class="mobile-bottom-nav-item" 
      :class="{ 'active': isCartOpen }"
    >
      <div class="mobile-cart-icon-wrapper">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span v-if="cartCount > 0" class="cart-badge-bottom">{{ cartCount }}</span>
      </div>
      <span>CART</span>
    </button>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  height: 68px;
  background-color: rgba(22, 25, 38, 0.75);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  z-index: 1000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 42, 109, 0.03);
  transition: top 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.navbar.scrolled {
  top: 0;
  width: 100%;
  max-width: 100%;
  height: 70px;
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background-color: rgba(15, 17, 26, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .navbar {
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    max-width: 100%;
    height: 64px; /* Optimized mobile header height */
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background-color: rgba(15, 17, 26, 0.95);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    z-index: 1150;
  }

  .navbar.menu-open {
    background-color: transparent;
    border-bottom-color: transparent;
    box-shadow: none;
    backdrop-filter: none;
  }
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 48px;
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 0 16px;
    position: relative;
    z-index: 1200;
    width: 100%;
  }
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -1.2px;
  user-select: none;
  display: flex;
  align-items: center;
}

.logo-ri {
  height: 52px;
  width: auto;
  object-fit: contain;
  display: block;
  transition: height var(--transition-smooth);
}

.logo-ri.logo-img-90hp {
  height: 180px;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .logo {
    font-size: 1.2rem;
  }
  .logo-ri {
    height: 36px !important;
  }
  .logo-ri.logo-img-90hp {
    height: 52px !important;
    transform: none !important;
  }
}

.nav-links {
  display: flex;
  gap: 40px;
}

@media (max-width: 768px) {
  .nav-links, .nav-action {
    display: none;
  }
}

.nav-link {
  font-family: var(--font-heading);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 1px;
  transition: var(--transition-smooth);
  position: relative;
  padding: 8px 0;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--accent-cyan);
  transition: var(--transition-smooth);
  box-shadow: 0 0 8px var(--accent-cyan);
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dropdown-arrow-icon {
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease;
  color: var(--text-secondary);
}

.dropdown-trigger:hover .dropdown-arrow-icon,
.dropdown-trigger.active .dropdown-arrow-icon {
  color: var(--accent-cyan);
}

.dropdown-arrow-icon.open {
  transform: rotate(180deg);
}

.nav-dropdown-wrapper {
  position: relative;
}

.nav-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(15px);
  background: rgba(18, 20, 29, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 8px;
  min-width: 180px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  opacity: 0;
  visibility: hidden;
  z-index: 100;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav-dropdown-wrapper:hover .nav-dropdown-menu,
.nav-dropdown-wrapper.active .nav-dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(5px);
}

.dropdown-item {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-secondary);
  text-decoration: none;
  padding: 10px 16px;
  border-radius: 10px;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: space-between;
  letter-spacing: 0.5px;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--accent-cyan);
  transform: translateX(4px);
}

.dropdown-item.active {
  color: var(--accent-cyan);
  background: rgba(0, 243, 255, 0.08);
  border-left: 3px solid var(--accent-cyan);
  border-radius: 0 10px 10px 0;
}

.nav-action {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Cart Trigger button styling */
.cart-trigger-btn {
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: var(--transition-smooth);
}

.cart-trigger-btn:hover {
  color: var(--accent-cyan);
  background-color: rgba(255, 255, 255, 0.05);
  filter: drop-shadow(0 0 6px rgba(255, 42, 109, 0.4));
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--accent-cyan);
  color: var(--bg-dark);
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 800;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 0 8px var(--accent-cyan);
  border: 1.5px solid var(--bg-dark);
}

/* Mobile Actions: cart + hamburger only */
.mobile-actions {
  display: none;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .mobile-actions {
    display: flex;
  }
}

.cart-mobile {
  width: 36px;
  height: 36px;
}

.btn-listen {
  padding: 8px 20px;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  box-shadow: 0 0 10px rgba(255, 42, 109, 0.3);
}

.play-icon {
  margin-left: 2px;
}

/* Mobile Toggle Hamburger */
.mobile-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1101;
}

.mobile-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  border-radius: 2px;
  transition: var(--transition-smooth);
}

.mobile-toggle span.active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
  background-color: var(--accent-cyan);
}

.mobile-toggle span.active:nth-child(2) {
  opacity: 0;
}

.mobile-toggle span.active:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
  background-color: var(--accent-cyan);
}

/* Mobile Drawer */
.mobile-drawer {
  display: none;
}

@media (max-width: 768px) {
  .mobile-drawer {
    display: flex;
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    height: 100vh;
    background-color: rgba(14, 16, 20, 0.98);
    backdrop-filter: blur(20px);
    z-index: 1100;
    transition: var(--transition-smooth);
    align-items: center;
    justify-content: center;
  }

  .mobile-drawer.open {
    right: 0;
  }

  .mobile-drawer-links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: 100%;
    padding: 0 32px;
    box-sizing: border-box;
  }

  .mobile-drawer-links a:not(.btn) {
    font-family: var(--font-heading);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text-primary);
    text-decoration: none;
    letter-spacing: 1px;
    transition: var(--transition-smooth);
  }

  .mobile-drawer-links a:not(.btn):hover,
  .mobile-drawer-links a:not(.btn).active {
    color: var(--accent-cyan);
    text-shadow: 0 0 10px rgba(255, 42, 109, 0.5);
  }
}

.btn-listen-mobile {
  margin-top: 10px;
  padding: 12px 36px;
  font-size: 0.95rem;
}

/* Mobile Drawer Selector items */
.mobile-drawer-section-title {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-bottom: 4px;
  text-align: center;
}

.mobile-artist-selector {
  display: flex;
  gap: 12px;
  width: 100%;
  max-width: 280px;
  margin-bottom: 5px;
}

.mobile-artist-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 10px 16px;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition-smooth);
  border-radius: 20px;
  outline: none;
}

.theme-90hp .mobile-artist-btn {
  border-radius: 4px !important;
}

.mobile-artist-btn:hover,
.mobile-artist-btn.active {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  box-shadow: 0 0 15px rgba(255, 42, 109, 0.15);
}

.mobile-drawer-divider {
  width: 80px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px 0;
}

/* Mobile Bottom Nav styles */
.mobile-bottom-nav {
  display: none;
}

@media (max-width: 768px) {
  .nav-links, .nav-action {
    display: none !important;
  }

  .mobile-bottom-nav {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    transform: none;
    width: 100%;
    max-width: 100%;
    height: calc(60px + env(safe-area-inset-bottom, 0px));
    padding-bottom: env(safe-area-inset-bottom, 0px);
    background-color: rgba(22, 25, 38, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: none;
    border-left: none;
    border-right: none;
    border-radius: 16px 16px 0 0;
    z-index: 1000;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    transition: var(--transition-smooth);
  }

  .theme-90hp .mobile-bottom-nav {
    background-color: rgba(20, 20, 22, 0.95);
    border-top-color: rgba(255, 255, 255, 0.1);
    border-radius: 16px 16px 0 0;
  }

  .mobile-bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 6px 4px;
    flex: 1;
    transition: var(--transition-smooth);
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-bottom-nav-item span {
    font-family: var(--font-heading);
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    transition: var(--transition-smooth);
  }

  .mobile-bottom-nav-item svg {
    transition: var(--transition-smooth);
  }

  .mobile-bottom-nav-item:hover,
  .mobile-bottom-nav-item.active {
    color: var(--accent-cyan);
  }

  .mobile-bottom-nav-item.active svg {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 5px var(--accent-cyan));
  }

  /* Logo images in HOME tab */
  .mobile-home-logo {
    display: block;
    object-fit: contain;
    transition: var(--transition-smooth);
  }

  .mobile-home-logo-yori {
    height: 34px;
    width: auto;
  }

  .mobile-home-logo-90hp {
    height: 38px;
    width: auto;
  }

  .mobile-bottom-nav-home.active .mobile-home-logo-yori {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 5px var(--accent-cyan));
  }

  .mobile-bottom-nav-home.active .mobile-home-logo-90hp {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6)) brightness(1.2);
  }

  .mobile-cart-icon-wrapper {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .cart-badge-bottom {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: var(--accent-cyan);
    color: var(--bg-dark);
    font-family: var(--font-heading);
    font-size: 0.6rem;
    font-weight: 800;
    min-width: 14px;
    height: 14px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    box-shadow: 0 0 6px var(--accent-cyan);
    border: 1px solid var(--bg-dark);
  }
}
</style>
