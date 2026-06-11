<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { isCartOpen, cartCount } from '../cartState.js';
import { currentPage, navigateTo } from '../routerState.js';

const isMenuOpen = ref(false);
const isScrolled = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

const handleNav = (page, anchor = null) => {
  isMenuOpen.value = false;
  navigateTo(page, anchor);
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
  <nav class="navbar" :class="{ 'scrolled': isScrolled, 'menu-open': isMenuOpen }">
    <div class="navbar-container container">
      <!-- Logo Wordmark -->
      <a href="#" @click.prevent="handleNav('home')" class="logo">
        <img src="/logo/logo.png" class="logo-ri" alt="YoRI Logo">
      </a>

      <!-- Desktop Links -->
      <div class="nav-links">
        <a href="#hero" @click.prevent="handleNav('home', '#hero')" class="nav-link" :class="{ 'active': currentPage === 'home' }">HOME</a>
        <a href="#store" @click.prevent="handleNav('store')" class="nav-link" :class="{ 'active': currentPage === 'store' }">STORE</a>
        <a href="#albums" @click.prevent="handleNav('home', '#albums')" class="nav-link">ALBUM</a>
        <a href="#highlights" @click.prevent="handleNav('home', '#highlights')" class="nav-link">HIGHLIGHTS</a>
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
        <!-- Shopping Cart Trigger (Mobile) -->
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

    <!-- Mobile Drawer Menu -->
    <div class="mobile-drawer" :class="{ 'open': isMenuOpen }">
      <div class="mobile-drawer-links">
        <a href="#hero" @click.prevent="handleNav('home', '#hero')" :class="{ 'active': currentPage === 'home' }">HOME</a>
        <a href="#store" @click.prevent="handleNav('store')" :class="{ 'active': currentPage === 'store' }">STORE</a>
        <a href="#albums" @click.prevent="handleNav('home', '#albums')">ALBUM</a>
        <a href="#highlights" @click.prevent="handleNav('home', '#highlights')">HIGHLIGHTS</a>
        <a href="#listen" class="btn btn-cyan btn-listen btn-listen-mobile" @click="isMenuOpen = false">
          <span>LISTEN</span>
          <svg class="play-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </a>
      </div>
    </div>
  </nav>
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
    height: 96px;
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

@media (max-width: 768px) {
  .logo {
    font-size: 1.2rem;
  }
  .logo-ri {
    height: 80px;
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

.nav-action {
  display: flex;
  align-items: center;
  gap: 20px;
}

@media (max-width: 768px) {
  .nav-action {
    display: none;
  }
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
    gap: 30px;
  }

  .mobile-drawer-links a:not(.btn) {
    font-family: var(--font-heading);
    font-size: 1.5rem;
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
  margin-top: 15px;
  padding: 12px 36px;
  font-size: 1rem;
}
</style>
