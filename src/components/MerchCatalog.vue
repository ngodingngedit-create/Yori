<script setup>
import { ref, computed } from 'vue';
import { cart, addToCart, updateQuantity } from '../cartState.js';
import { currentPage, navigateTo, currentArtist } from '../routerState.js';
import { artistData } from '../artistData.js';

// ================= 90 HORSEPOWER PRODUCTS & CARDS CONFIG ================= //
const products = computed(() => artistData[currentArtist.value].products);

const activeCategory = ref('all');

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') return products.value;
  return products.value.filter(p => p.category === activeCategory.value);
});

const selectedItem = ref(null);
const showSuccessModal = ref(false);

// Get reactive quantity from shared cart state
const getProductQuantity = (productId) => {
  const item = cart.value.find(item => item.id === productId);
  return item ? item.quantity : 0;
};

const handleIncrease = (product) => {
  selectedItem.value = product;
  
  // Show toast feedback only on first add (0 -> 1)
  if (getProductQuantity(product.id) === 0) {
    showSuccessModal.value = true;
    setTimeout(() => {
      showSuccessModal.value = false;
    }, 2500);
  }
  
  addToCart(product);
};

const handleDecrease = (product) => {
  updateQuantity(product.id, -1);
};
</script>

<template>
  <!-- ================= 90 HORSEPOWER MERCHANDISE CATALOG SECTION ================= -->
  <section id="merch-catalog" class="catalog-section section" :class="{ 'is-homepage': currentPage === 'home' }">
    <div class="catalog-container container">
      <!-- Centered Section Title -->
      <h2 class="section-title">MERCH CATALOG</h2>
      
      <!-- Filtering Buttons -->
      <div class="filter-wrapper">
        <div class="filter-buttons">
          <button 
            @click="activeCategory = 'all'" 
            class="filter-btn" 
            :class="{ 'active': activeCategory === 'all' }"
          >
            ALL
          </button>
          <button 
            @click="activeCategory = 'apparel'" 
            class="filter-btn" 
            :class="{ 'active': activeCategory === 'apparel' }"
          >
            APPAREL
          </button>
          <button 
            @click="activeCategory = 'music'" 
            class="filter-btn" 
            :class="{ 'active': activeCategory === 'music' }"
          >
            MUSIC
          </button>
          <button 
            @click="activeCategory = 'accessories'" 
            class="filter-btn" 
            :class="{ 'active': activeCategory === 'accessories' }"
          >
            ACCESSORIES
          </button>
          <button 
            @click="activeCategory = 'bundles'" 
            class="filter-btn" 
            :class="{ 'active': activeCategory === 'bundles' }"
          >
            BUNDLES
          </button>
        </div>
      </div>
      
      <!-- Catalog Grid Layout -->
      <div class="catalog-grid" :class="{ 'horizontal-scroll': currentPage === 'home' }">
        <!-- ================= 90 HORSEPOWER PRODUCT CARD ================= -->
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          :class="{ 
            'selected-card': getProductQuantity(product.id) > 0,
            'horizontal-card': currentPage === 'home'
          }"
        >
          <div v-if="product.tag" class="product-badge-wrapper">
            <span class="product-badge" :class="{ 'long-text-badge': product.tag.length > 8 && !product.tag.includes(' ') }">{{ product.tag }}</span>
          </div>
          
          <!-- Image Wrapper -->
          <div class="product-img-wrapper" @click="navigateTo('product-detail', null, product)" style="cursor: pointer;">
            <img :src="product.image" :alt="product.name" class="product-image" />
          </div>
          
          <!-- Product Info -->
          <div class="product-info">
            <div class="product-header-row" @click="navigateTo('product-detail', null, product)" style="cursor: pointer;">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">{{ product.price }}</p>
            </div>
            
            <!-- Quantity Picker Footer -->
            <div class="product-footer">
              <div class="catalog-quantity-picker">
                <button 
                  @click="handleDecrease(product)" 
                  class="catalog-qty-btn decrease" 
                  :disabled="getProductQuantity(product.id) === 0"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span class="catalog-qty-num" :class="{ 'has-items': getProductQuantity(product.id) > 0 }">
                  {{ getProductQuantity(product.id) }}
                </span>
                <button 
                  @click="handleIncrease(product)" 
                  class="catalog-qty-btn increase"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Toast Modal -->
    <Transition name="fade-in">
      <div v-if="showSuccessModal" class="notification-toast">
        <div class="toast-content">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="var(--accent-cyan)" stroke-width="2.5" fill="none">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div class="toast-text">
            <h4>Added to Cart!</h4>
            <p>{{ selectedItem?.name }} &bull; {{ selectedItem?.price }}</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.catalog-section.section {
  background-color: var(--bg-dark);
  position: relative;
  z-index: 10;
  padding: 120px 0 80px 0;
  transition: var(--transition-smooth);
}

.catalog-section.section.is-homepage {
  padding: 30px 0;
}

@media (max-width: 768px) {
  .catalog-section.section {
    padding: 100px 0 60px 0;
  }
  .catalog-section.section.is-homepage {
    padding: 20px 0;
  }
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px 24px;
  padding: 20px 4px 40px 4px;
}

.catalog-grid.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  gap: 24px;
  padding: 10px 4px 24px 4px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.catalog-grid.horizontal-scroll::-webkit-scrollbar {
  height: 6px;
}

.catalog-grid.horizontal-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 999px;
}

.catalog-grid.horizontal-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 42, 109, 0.35);
  border-radius: 999px;
}

.catalog-grid.horizontal-scroll::-webkit-scrollbar-thumb:hover {
  background: var(--accent-cyan);
}

@media (max-width: 1200px) {
  .catalog-grid:not(.horizontal-scroll) {
    grid-template-columns: repeat(3, 1fr);
    gap: 28px 20px;
  }
}

@media (max-width: 992px) {
  .catalog-grid:not(.horizontal-scroll) {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 16px;
  }
}

@media (max-width: 576px) {
  .catalog-grid:not(.horizontal-scroll) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 10px 16px;
  }
  .catalog-grid.horizontal-scroll {
    gap: 14px;
  }
  .product-card:not(.horizontal-card) {
    max-width: 340px; /* Slightly larger card size */
    margin: 0 auto;
  }
}

.product-card {
  width: 100%;
  background-color: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: var(--transition-smooth);
}

.product-card.horizontal-card {
  flex: 0 0 280px;
  scroll-snap-align: start;
  width: auto;
}

@media (max-width: 576px) {
  .product-card.horizontal-card {
    flex: 0 0 240px;
  }
}

.product-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 1px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.08), transparent);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  z-index: 3;
  transition: var(--transition-smooth);
}

.product-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 42, 109, 0.25);
  box-shadow: 0 10px 30px rgba(255, 42, 109, 0.05);
}

.product-card:hover::before {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.15), transparent);
}

/* Selected Card Highlight Styles */
.product-card.selected-card {
  border-color: rgba(255, 42, 109, 0.45) !important;
  box-shadow: 0 10px 30px rgba(255, 42, 109, 0.15);
}

.product-card.selected-card::before {
  background: linear-gradient(to bottom, var(--accent-cyan), transparent) !important;
}

.product-badge-wrapper {
  position: absolute;
  top: 0;
  left: 14px;
  z-index: 5;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.5));
}

.product-badge {
  position: relative;
  background: linear-gradient(to bottom, #ff2a6d 0%, #c20c43 100%);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.48rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2px;
  width: 38px;
  height: 46px;
  padding: 8px 2px 6px 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%);
}

.product-badge.long-text-badge {
  font-size: 0.36rem;
  line-height: 1.05;
  letter-spacing: 0px;
}

.product-badge::before {
  content: '';
  position: absolute;
  top: 1px;
  bottom: 1px;
  left: 1px;
  right: 1px;
  border: 0.8px dashed rgba(255, 255, 255, 0.35);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%);
  pointer-events: none;
}

.product-badge::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  background-color: rgba(15, 17, 26, 0.75);
  border-radius: 50%;
}

.product-img-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-bottom: 1px solid var(--border-card);
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.2, 1, 0.3, 1);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  align-items: flex-start;
}

@media (max-width: 576px) {
  .product-info {
    padding: 10px 12px 12px;
  }
}

.product-header-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  margin-bottom: 20px;
}

.product-name {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.35;
  margin-bottom: 0;
  text-align: left;
}

@media (max-width: 576px) {
  .product-name {
    font-size: 0.8rem;
    line-height: 1.3;
  }
}

.product-price {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 800;
  color: var(--accent-cyan);
  text-shadow: 0 0 8px rgba(255, 42, 109, 0.2);
  white-space: nowrap;
  margin-bottom: 0;
  align-self: flex-end;
}

@media (max-width: 576px) {
  .product-price {
    font-size: 0.85rem;
  }
}

/* Quantity controls in card footer */
.product-footer {
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: flex-end; /* right-aligns the picker */
}

.catalog-quantity-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1.5px solid var(--border-card);
  border-radius: 9999px;
  background-color: rgba(5, 6, 8, 0.3);
  padding: 2px 4px;
  width: fit-content;
  min-width: 100px;
  gap: 6px;
  transition: var(--transition-smooth);
}

@media (max-width: 576px) {
  .catalog-quantity-picker {
    min-width: 80px;
    gap: 4px;
  }
}

.product-card.selected-card .catalog-quantity-picker {
  border-color: rgba(255, 42, 109, 0.5);
  box-shadow: 0 0 10px rgba(255, 42, 109, 0.15);
}

.catalog-qty-btn {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 700;
  transition: var(--transition-smooth);
}

@media (max-width: 576px) {
  .catalog-qty-btn {
    width: 24px;
    height: 24px;
    font-size: 0.95rem;
  }
}

.catalog-qty-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--accent-cyan);
}

.catalog-qty-btn:disabled {
  opacity: 0.25;
  cursor: not-allowed;
}

.catalog-qty-num {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-muted);
  transition: var(--transition-smooth);
}

.catalog-qty-num.has-items {
  color: var(--accent-cyan);
  text-shadow: 0 0 8px rgba(255, 42, 109, 0.4);
}

/* Success Toast styling */
.notification-toast {
  position: fixed;
  bottom: 120px; /* offset standard music player */
  right: 30px;
  background: rgba(21, 24, 32, 0.9);
  backdrop-filter: blur(15px);
  border: 1px solid var(--accent-cyan);
  border-radius: 12px;
  padding: 16px;
  z-index: 10000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 42, 109, 0.15);
}

@media (max-width: 576px) {
  .notification-toast {
    right: 20px;
    left: 20px;
    bottom: 190px;
  }
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.toast-text h4 {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 2px;
}

.toast-text p {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Toast Transitions */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-enter-from,
.fade-in-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Filter buttons */
.filter-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 35px;
  width: 100%;
}

.filter-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.filter-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-secondary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 1.5px;
  padding: 10px 28px;
  border-radius: 9999px;
  cursor: pointer;
  transition: var(--transition-smooth);
  text-transform: uppercase;
}

.filter-btn:hover {
  border-color: rgba(255, 42, 109, 0.4);
  color: var(--text-primary);
  box-shadow: 0 0 12px rgba(255, 42, 109, 0.15);
}

.filter-btn.active {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  background-color: rgba(255, 42, 109, 0.04);
  box-shadow: 0 0 15px rgba(255, 42, 109, 0.2);
  text-shadow: 0 0 8px rgba(255, 42, 109, 0.3);
}

@media (max-width: 576px) {
  .filter-wrapper {
    overflow-x: auto;
    justify-content: flex-start;
    padding: 0 4px 10px 4px;
    -webkit-overflow-scrolling: touch;
  }
  .filter-buttons {
    flex-wrap: nowrap;
    justify-content: flex-start;
    gap: 10px;
  }
  .filter-btn {
    padding: 8px 18px;
    font-size: 0.72rem;
    flex-shrink: 0;
  }
}
</style>
