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

const goToBurakku = () => {
  activeAnchor.value = null;
  isMenuOpen.value = false;
  isArtistDropdownOpen.value = false;
  isArtistAccordionOpen.value = false;
  navigateTo('burakku');
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
      <a href="#" @click.prevent="currentPage === 'burakku' ? handleNav('burakku', '#burakku-hero') : handleNav('home')" class="logo" :class="{ 'hidden-on-menu': isMenuOpen }">
        <img v-if="currentPage === 'burakku'" src="/logo/Burakku Logo black (1).png" class="logo-ri logo-img-burakku" alt="Burakku Logo">
        <img v-else-if="currentArtist === 'yori'" src="/logo/YoriLogo.png" class="logo-ri" alt="YoRI Logo">
        <!-- 90 HORSEPOWER LOGO -->
        <img v-else src="/90horsepower/logo90.png" class="logo-ri logo-img-90hp" alt="Ninety Horsepower Logo">
      </a>

      <!-- Desktop Links -->
      <div class="nav-links">
        <a href="#" @click.prevent="goToBurakku" class="nav-link burakku-link" :class="{ 'active': currentPage === 'burakku' && !activeAnchor }">
          <span class="burakku-pill">BURAKKU</span>
        </a>
        <a 
          v-if="currentPage === 'burakku'" 
          href="#burakku-hero" 
          @click.prevent="handleNav('burakku', '#burakku-hero')" 
          class="nav-link" 
          :class="{ 'active': activeAnchor === '#burakku-hero' || !activeAnchor }"
        >
          HOME
        </a>
        <a 
          v-else 
          href="#" 
          @click.prevent="handleNav('home')" 
          class="nav-link" 
          :class="{ 'active': currentPage === 'home' && !activeAnchor }"
        >
          HOME
        </a>
        <!-- ARTIST ACCORDION/DROPDOWN -->
        <div class="nav-dropdown-wrapper" :class="{ 'active': isArtistDropdownOpen }">
          <a href="#" @click.prevent="isArtistDropdownOpen = !isArtistDropdownOpen" class="nav-link dropdown-trigger" :class="{ 'active': isArtistDropdownOpen }">
            <span>ARTIST</span>
            <svg class="dropdown-arrow-icon" :class="{ 'open': isArtistDropdownOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </a>
          <!-- ARTIST ACCORDION MENU WITH LOGOS -->
          <div class="nav-dropdown-menu artist-accordion-menu">
            <a href="#" @click.prevent="selectArtist('yori')" class="dropdown-item artist-dropdown-item" :class="{ 'active': currentArtist === 'yori' && currentPage !== 'burakku' }">
              <div class="artist-item-logo-wrap">
                <img src="/logo/YoriLogo.png" alt="YoRI" class="artist-item-logo artist-item-logo-yori" />
              </div>
              <div class="artist-item-info">
                <span class="artist-item-name">YoRI</span>
                <span class="artist-item-sub">Solo Artist</span>
              </div>
              <div v-if="currentArtist === 'yori' && currentPage !== 'burakku'" class="artist-active-dot"></div>
            </a>
            <a href="#" @click.prevent="selectArtist('90hp')" class="dropdown-item artist-dropdown-item" :class="{ 'active': currentArtist === '90hp' && currentPage !== 'burakku' }">
              <div class="artist-item-logo-wrap">
                <img src="/90horsepower/logo90.png" alt="90 Horse Power" class="artist-item-logo artist-item-logo-90hp" />
              </div>
              <div class="artist-item-info">
                <span class="artist-item-name">90 Horse Power</span>
                <span class="artist-item-sub">Indie Band</span>
              </div>
              <div v-if="currentArtist === '90hp' && currentPage !== 'burakku'" class="artist-active-dot"></div>
            </a>
          </div>
        </div>
        
        <!-- STORE Link -->
        <a 
          v-if="currentPage === 'burakku'" 
          href="#burakku-merch" 
          @click.prevent="handleNav('burakku', '#burakku-merch')" 
          class="nav-link" 
          :class="{ 'active': activeAnchor === '#burakku-merch' }"
        >
          STORE
        </a>
        <a 
          v-else 
          href="#store" 
          @click.prevent="handleNav('store')" 
          class="nav-link" 
          :class="{ 'active': currentPage === 'store' }"
        >
          STORE
        </a>

        <!-- ALBUM Link -->
        <a 
          v-if="currentPage === 'burakku'" 
          href="#burakku-albums" 
          @click.prevent="handleNav('burakku', '#burakku-albums')" 
          class="nav-link" 
          :class="{ 'active': activeAnchor === '#burakku-albums' }"
        >
          ALBUM
        </a>
        <a 
          v-else 
          href="#albums" 
          @click.prevent="handleNav('home', '#albums')" 
          class="nav-link" 
          :class="{ 'active': activeAnchor === '#albums' }"
        >
          ALBUM
        </a>

        <!-- HIGHLIGHTS/ARTISTS Link -->
        <a 
          v-if="currentPage === 'burakku'" 
          href="#burakku-artists" 
          @click.prevent="handleNav('burakku', '#burakku-artists')" 
          class="nav-link" 
          :class="{ 'active': activeAnchor === '#burakku-artists' }"
          v-show="false"
        >
          ARTISTS
        </a>
        <a 
          v-else 
          href="#highlights" 
          @click.prevent="handleNav('home', '#highlights')" 
          class="nav-link" 
          :class="{ 'active': activeAnchor === '#highlights' }"
          v-show="false"
        >
          HIGHLIGHTS
        </a>
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
        <button @click="toggleCart" class="cart-trigger-btn cart-mobile" :class="{ 'hidden-on-menu': isMenuOpen }" aria-label="Open Cart">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMenu" class="mobile-toggle" :class="{ 'hidden-on-menu': isMenuOpen }" aria-label="Toggle menu">
          <span :class="{ 'active': isMenuOpen }"></span>
          <span :class="{ 'active': isMenuOpen }"></span>
          <span :class="{ 'active': isMenuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <div class="mobile-drawer" :class="{ 'open': isMenuOpen }">
      <!-- Close Button inside Drawer -->
      <button @click="isMenuOpen = false" class="drawer-close-btn" aria-label="Close menu">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div class="mobile-drawer-links">
        <!-- Unified Accordion for Agency and Artists -->
        <div class="mobile-drawer-accordion-wrapper">
          <button 
            @click="isArtistAccordionOpen = !isArtistAccordionOpen" 
            class="mobile-accordion-trigger"
            :class="{ 'expanded': isArtistAccordionOpen }"
          >
            <span>AGENCY & ARTISTS</span>
            <svg class="dropdown-arrow-icon" :class="{ 'open': isArtistAccordionOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div class="mobile-accordion-content" :class="{ 'open': isArtistAccordionOpen }">
            <!-- Burakku Agency -->
            <button 
              @click="goToBurakku" 
              class="mobile-accordion-item" 
              :class="{ 'active': currentPage === 'burakku' }"
            >
              <div class="accordion-item-logo-wrap">
                <img src="/logo/burakku-logo.png" alt="Burakku Agency" class="accordion-item-logo accordion-logo-burakku" />
              </div>
              <div class="accordion-item-info">
                <span class="accordion-item-name">Burakku Agency</span>
                <span class="accordion-item-sub">Creative Agency</span>
              </div>
              <div v-if="currentPage === 'burakku'" class="artist-active-dot"></div>
            </button>

            <!-- YoRI Artist -->
            <button 
              @click="selectArtist('yori')" 
              class="mobile-accordion-item" 
              :class="{ 'active': currentArtist === 'yori' && currentPage !== 'burakku' }"
            >
              <div class="accordion-item-logo-wrap">
                <img src="/logo/YoriLogo.png" alt="YoRI" class="accordion-item-logo accordion-logo-yori" />
              </div>
              <div class="accordion-item-info">
                <span class="accordion-item-name">YoRI</span>
                <span class="accordion-item-sub">Solo Artist</span>
              </div>
              <div v-if="currentArtist === 'yori' && currentPage !== 'burakku'" class="artist-active-dot"></div>
            </button>

            <!-- 90 Horse Power Artist -->
            <button 
              @click="selectArtist('90hp')" 
              class="mobile-accordion-item" 
              :class="{ 'active': currentArtist === '90hp' && currentPage !== 'burakku' }"
            >
              <div class="accordion-item-logo-wrap">
                <img src="/90horsepower/logo90.png" alt="90HP" class="accordion-item-logo accordion-logo-90hp" />
              </div>
              <div class="accordion-item-info">
                <span class="accordion-item-name">90 Horse Power</span>
                <span class="accordion-item-sub">Indie Band</span>
              </div>
              <div v-if="currentArtist === '90hp' && currentPage !== 'burakku'" class="artist-active-dot"></div>
            </button>
          </div>
        </div>

        <div class="mobile-drawer-divider"></div>

        <template v-if="currentPage === 'burakku'">
          <a href="#burakku-hero" @click.prevent="handleNav('burakku', '#burakku-hero')" :class="{ 'active': activeAnchor === '#burakku-hero' || !activeAnchor }">HOME</a>
          <a href="#burakku-merch" @click.prevent="handleNav('burakku', '#burakku-merch')" :class="{ 'active': activeAnchor === '#burakku-merch' }">STORE</a>
          <a href="#burakku-albums" @click.prevent="handleNav('burakku', '#burakku-albums')" :class="{ 'active': activeAnchor === '#burakku-albums' }">ALBUM</a>
          <a v-show="false" href="#burakku-artists" @click.prevent="handleNav('burakku', '#burakku-artists')" :class="{ 'active': activeAnchor === '#burakku-artists' }">ARTISTS</a>
        </template>
        <template v-else>
          <a href="#" @click.prevent="handleNav('home')" :class="{ 'active': currentPage === 'home' && !activeAnchor }">HOME</a>
          <a href="#store" @click.prevent="handleNav('store')" :class="{ 'active': currentPage === 'store' }">STORE</a>
          <a href="#albums" @click.prevent="handleNav('home', '#albums')" :class="{ 'active': activeAnchor === '#albums' }">ALBUM</a>
          <a v-show="false" href="#highlights" @click.prevent="handleNav('home', '#highlights')" :class="{ 'active': activeAnchor === '#highlights' }">HIGHLIGHTS</a>
        </template>
        
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
      @click="currentPage === 'burakku' ? goToBurakku() : handleNav('home')" 
      class="mobile-bottom-nav-item mobile-bottom-nav-home" 
      :class="{ 'active': (currentPage === 'home' || currentPage === 'burakku') && !activeAnchor }"
    >
      <img 
        v-if="currentPage === 'burakku'"
        src="/logo/burakku-logo.png"
        class="mobile-burakku-logo"
        alt="Burakku"
      />
      <template v-else>
        <img 
          v-if="currentArtist === 'yori'" 
          src="/logo/YoriLogo.png" 
          class="mobile-home-logo mobile-home-logo-yori" 
          alt="YoRI"
        />
        <img 
          v-else 
          src="/90horsepower/logo90.png" 
          class="mobile-home-logo mobile-home-logo-90hp" 
          alt="90HP"
        />
      </template>
      <span>HOME</span>
    </button>

    <button 
      @click="currentPage === 'burakku' ? handleNav('burakku', '#burakku-merch') : handleNav('store')" 
      class="mobile-bottom-nav-item" 
      :class="{ 'active': currentPage === 'burakku' ? activeAnchor === '#burakku-merch' : (currentPage === 'store' || currentPage === 'product-detail') }"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      <span>STORE</span>
    </button>

    <button 
      @click="currentPage === 'burakku' ? handleNav('burakku', '#burakku-albums') : handleNav('home', '#albums')" 
      class="mobile-bottom-nav-item" 
      :class="{ 'active': currentPage === 'burakku' ? activeAnchor === '#burakku-albums' : activeAnchor === '#albums' }"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.2" fill="none">
        <path d="M9 18V5l12-2v13"></path>
        <circle cx="6" cy="18" r="3"></circle>
        <circle cx="18" cy="16" r="3"></circle>
      </svg>
      <span>ALBUMS</span>
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
  height: 38px;
  width: auto;
  object-fit: contain;
  display: block;
  transition: height var(--transition-smooth);
}

.logo-ri.logo-img-90hp {
  height: 180px;
  transform: translateY(20px);
}

.logo-ri.logo-img-burakku {
  height: 42px;
  padding: 5px 14px;
  transform: none;
}

@media (max-width: 768px) {
  .logo {
    font-size: 1.2rem;
  }
  .logo-ri {
    height: 22px !important;
  }
  .logo-ri.logo-img-90hp {
    height: 50px !important;
    transform: none !important;
  }
  .logo-ri.logo-img-burakku {
    height: 22px !important;
    padding: 2px 6px !important;
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

/* Burakku nav link pill */
.burakku-link {
  position: relative;
}

.burakku-pill {
  background: linear-gradient(135deg, rgba(255, 42, 109, 0.15), rgba(139, 92, 246, 0.12));
  border: 1px solid rgba(255, 42, 109, 0.3);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 0.8rem;
  letter-spacing: 1px;
  color: var(--accent-cyan);
  transition: all 0.3s ease;
}

.burakku-link:hover .burakku-pill,
.burakku-link.active .burakku-pill {
  background: var(--accent-cyan);
  border-color: var(--accent-cyan);
  color: var(--bg-dark);
  box-shadow: 0 0 14px rgba(255, 42, 109, 0.4);
}

.burakku-link::after {
  display: none !important;
}

/* Artist accordion dropdown (with logos) */
.artist-accordion-menu {
  min-width: 240px !important;
  padding: 10px !important;
  gap: 6px !important;
}

.artist-dropdown-item {
  display: flex !important;
  align-items: center !important;
  gap: 14px !important;
  padding: 10px 12px !important;
  justify-content: flex-start !important;
  border-radius: 12px !important;
}

.artist-dropdown-item:hover {
  transform: translateX(0) !important;
  background: rgba(255, 255, 255, 0.06) !important;
}

.artist-dropdown-item.active {
  background: rgba(255, 42, 109, 0.08) !important;
  border-left: 3px solid var(--accent-cyan);
  border-radius: 0 12px 12px 0 !important;
}

.artist-item-logo-wrap {
  width: 52px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  overflow: hidden;
  padding: 4px;
  box-sizing: border-box;
}

.artist-item-logo {
  display: block;
  object-fit: contain;
}

.artist-item-logo-yori {
  height: 22px;
  width: auto;
}

.artist-item-logo-90hp {
  height: 30px;
  width: auto;
}

.artist-item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.artist-item-name {
  font-family: var(--font-heading);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.3px;
  transition: color 0.2s ease;
}

.artist-dropdown-item:hover .artist-item-name,
.artist-dropdown-item.active .artist-item-name {
  color: var(--accent-cyan);
}

.artist-item-sub {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.artist-active-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-cyan);
  box-shadow: 0 0 6px var(--accent-cyan);
  flex-shrink: 0;
  margin-left: auto;
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
    z-index: 1300;
    transition: var(--transition-smooth);
    align-items: flex-start;
    justify-content: center;
    padding-top: 80px;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .drawer-close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: transparent;
    border: none;
    color: var(--text-primary);
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    z-index: 1200;
  }

  .drawer-close-btn:hover {
    background-color: rgba(255, 255, 255, 0.08);
    color: var(--accent-cyan);
  }

  .logo, .cart-trigger-btn, .mobile-toggle {
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease !important;
  }

  .hidden-on-menu {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
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

/* Mobile Drawer Accordion styles */
.mobile-drawer-accordion-wrapper {
  width: 100%;
  max-width: 280px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;
}

.mobile-accordion-trigger {
  width: 100%;
  padding: 14px 20px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--text-primary);
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease;
  box-sizing: border-box;
}

.mobile-accordion-trigger:hover {
  background-color: rgba(255, 255, 255, 0.02);
}

.mobile-accordion-trigger .dropdown-arrow-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
  color: var(--text-secondary);
}

.mobile-accordion-trigger .dropdown-arrow-icon.open {
  transform: rotate(180deg);
  color: var(--accent-cyan);
}

.mobile-accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), padding 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 8px;
  box-sizing: border-box;
}

.mobile-accordion-content.open {
  max-height: 300px;
  padding-bottom: 12px;
}

.mobile-accordion-item {
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  text-align: left;
  box-sizing: border-box;
}

.mobile-accordion-item:hover,
.mobile-accordion-item.active {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(0, 243, 255, 0.2);
}

.mobile-accordion-item.active {
  border-left: 3px solid var(--accent-cyan);
  border-radius: 0 10px 10px 0;
  background: rgba(0, 243, 255, 0.05);
}

.accordion-item-logo-wrap {
  width: 48px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  overflow: hidden;
  padding: 2px;
  box-sizing: border-box;
}

.accordion-item-logo {
  display: block;
  object-fit: contain;
}

.accordion-logo-burakku {
  height: 20px;
  width: auto;
  filter: brightness(0) invert(1);
}

.accordion-logo-yori {
  height: 18px;
  width: auto;
}

.accordion-logo-90hp {
  height: 24px;
  width: auto;
}

.accordion-item-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
  flex: 1;
}

.accordion-item-name {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.2px;
  transition: color 0.2s ease;
}

.mobile-accordion-item:hover .accordion-item-name,
.mobile-accordion-item.active .accordion-item-name {
  color: var(--accent-cyan);
}

.accordion-item-sub {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.5px;
  text-transform: uppercase;
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
    height: 20px;
    width: auto;
  }

  .mobile-home-logo-90hp {
    height: 24px;
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

  .mobile-burakku-logo {
    height: 24px;
    width: auto;
    display: block;
    object-fit: contain;
    transition: var(--transition-smooth);
    filter: brightness(0) invert(1);
  }

  .mobile-bottom-nav-home.active .mobile-burakku-logo {
    transform: translateY(-2px);
    filter: drop-shadow(0 0 6px var(--accent-cyan));
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

  .mobile-bottom-nav-home.active span {
    color: var(--accent-cyan);
  }
}

</style>
