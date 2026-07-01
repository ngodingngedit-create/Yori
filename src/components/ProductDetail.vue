<script setup>
import { ref, computed } from 'vue';
import { currentPage, selectedProduct, navigateTo } from '../routerState.js';
import { addToCart } from '../cartState.js';

// Local list of detailed merch products for fallback and info lookup
const products = [
  {
    id: 1,
    name: 'YoRI Signature Hoodie',
    price: 'Rp 350.000',
    tag: 'Best Seller',
    category: 'apparel',
    image: new URL('../assets/merch_hoodie.png', import.meta.url).href,
    description: 'Hoodie eksklusif dengan desain Nightscape – The Anti Climax. Nyaman dipakai, cocok untuk setiap cerita yang kamu jalani.'
  },
  {
    id: 2,
    name: 'The Anti Climax CD Album',
    price: 'Rp 150.000',
    tag: 'New Release',
    category: 'music',
    image: new URL('../assets/merch_cd.png', import.meta.url).href,
    description: 'CD Album fisik "The Anti Climax" dengan sleeve eksklusif, lirik buklet, dan tanda tangan digital YoRI.'
  },
  {
    id: 3,
    name: 'YoRI Graphic Printed Tee',
    price: 'Rp 220.000',
    tag: 'Limited',
    category: 'apparel',
    image: new URL('../assets/merch_tshirt.png', import.meta.url).href,
    description: 'Kaos premium berbahan Cotton Combed 24s dengan cetakan sablon grafis YoRI beresolusi tinggi.'
  },
  {
    id: 4,
    name: 'Official Sticker Pack',
    price: 'Rp 45.000',
    tag: 'Accessories',
    category: 'accessories',
    image: new URL('../assets/merch.png', import.meta.url).href,
    description: 'Official sticker pack berisi 8 stiker vinyl tahan air dengan berbagai ilustrasi ikonik YoRI.'
  },
  {
    id: 5,
    name: 'YoRI Acrylic Keychain',
    price: 'Rp 35.000',
    tag: 'Accessories',
    category: 'accessories',
    image: new URL('../assets/merch.png', import.meta.url).href,
    description: 'Gantungan kunci akrilik dua sisi berkualitas tinggi yang menampilkan ilustrasi maskot YoRI.'
  },
  {
    id: 6,
    name: 'Anti Climax Vinyl Record',
    price: 'Rp 450.000',
    tag: 'Limited',
    category: 'music',
    image: new URL('../assets/merch_cd.png', import.meta.url).href,
    description: 'Piringan hitam Vinyl 12" premium edisi terbatas dengan warna splatter pink eksklusif.'
  },
  {
    id: 7,
    name: 'YoRI Beanie Hat',
    price: 'Rp 120.000',
    tag: 'New Release',
    category: 'apparel',
    image: new URL('../assets/merch_hoodie.png', import.meta.url).href,
    description: 'Beanie hat rajutan premium yang tebal dan hangat dengan emblem bordir logo YoRI.'
  },
  {
    id: 8,
    name: 'Signed Poster Set',
    price: 'Rp 75.000',
    tag: 'Exclusive',
    category: 'bundles',
    image: new URL('../assets/merch.png', import.meta.url).href,
    description: 'Set poster eksklusif bertandatangan asli YoRI berisi 3 poster dengan desain konseptual album.'
  }
];

// Determine active product, defaulting to Hoodie (id: 1)
const activeProduct = computed(() => {
  const p = selectedProduct.value || products[0];
  // Sync the description from our local detailed array if missing
  const matched = products.find(item => item.id === p.id);
  return { ...p, description: matched ? matched.description : p.description };
});

// Interactive state
const activeThumbnailIndex = ref(0);
const selectedSize = ref('S');
const quantity = ref(1);
const isWishlisted = ref(false);
const showCartToast = ref(false);
let toastTimer = null;

// Sizes list
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

// Thumbnails setup: using CSS zooms on the main high-res image to simulate close-up views!
const thumbnails = computed(() => {
  const p = activeProduct.value;
  if (p.id === 1) {
    return [
      { id: 0, url: p.image, style: { objectFit: 'cover' }, label: 'Front View' },
      { id: 1, url: p.image, style: { objectFit: 'cover', filter: 'brightness(0.85) contrast(1.05)' }, label: 'Back View' },
      { id: 2, url: p.image, style: { objectFit: 'cover', transform: 'scale(2.2)', transformOrigin: '50% 55%' }, label: 'Graphic Print' },
      { id: 3, url: p.image, style: { objectFit: 'cover', transform: 'scale(2.8)', transformOrigin: '50% 20%' }, label: 'Detail' }
    ];
  } else {
    // Fallback for other items
    return [
      { id: 0, url: p.image, style: { objectFit: 'cover' }, label: 'Main View' },
      { id: 1, url: p.image, style: { objectFit: 'cover', filter: 'brightness(0.9) contrast(1.1)' }, label: 'Alternate View' },
      { id: 2, url: p.image, style: { objectFit: 'cover', transform: 'scale(1.8)' }, label: 'Close Up' },
      { id: 3, url: p.image, style: { objectFit: 'cover', transform: 'scale(2.4)' }, label: 'Detail' }
    ];
  }
});

// Dynamic Specifications
const specs = computed(() => {
  const p = activeProduct.value;
  if (p.category === 'apparel' || p.id === 1) {
    return [
      { label: 'Material', value: p.id === 7 ? 'Acrilyc Knit' : 'Fleece Cotton', type: 'material' },
      { label: 'Color', value: 'Black', type: 'color' },
      { label: 'Gender', value: 'Unisex', type: 'gender' },
      { label: 'Sablon', value: p.id === 7 ? 'Embroidery' : 'Plastisol Print', type: 'sablon' },
      { label: 'Available Size', value: p.id === 7 ? 'One Size' : 'S - XXL', type: 'size' }
    ];
  } else if (p.category === 'music') {
    return [
      { label: 'Format', value: p.id === 2 ? 'CD Album' : 'Vinyl 12" LP', type: 'format' },
      { label: 'Release', value: 'The Anti Climax', type: 'release' },
      { label: 'Tracks', value: '10 Songs', type: 'tracks' },
      { label: 'Packaging', value: p.id === 2 ? 'Jewel Case & Sleeve' : 'Splatter Color Jacket', type: 'package' }
    ];
  } else {
    return [
      { label: 'Type', value: 'Official Merchandise', type: 'type' },
      { label: 'Material', value: p.id === 5 ? 'High-grade Acrylic' : 'Art Carton 310gsm', type: 'material' },
      { label: 'Dimensions', value: p.id === 5 ? '5cm x 5cm' : 'A2 Poster Size', type: 'dimensions' },
      { label: 'Exclusive', value: 'Official Release', type: 'exclusive' }
    ];
  }
});

// Quantity controls
const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const increaseQty = () => {
  quantity.value++;
};

// Add to global cart
const handleAddToCart = () => {
  const sizeVal = activeProduct.value.category === 'apparel' ? selectedSize.value : null;
  addToCart(activeProduct.value, sizeVal, quantity.value);
  // Show local toast — sidebar stays closed
  if (toastTimer) clearTimeout(toastTimer);
  showCartToast.value = true;
  toastTimer = setTimeout(() => { showCartToast.value = false; }, 2800);
};

// Toggle wishlist
const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};
</script>

<template>
  <div class="product-detail-section section">
    <div class="detail-container container">
      <!-- Pink Breadcrumbs -->
      <div class="breadcrumbs">
        <a href="#store" @click.prevent="navigateTo('store')" class="breadcrumb-link">STORE</a>
        <span class="breadcrumb-separator">&gt;</span>
        <span class="breadcrumb-link">{{ activeProduct.category.toUpperCase() }}</span>
        <span class="breadcrumb-separator">&gt;</span>
        <span class="breadcrumb-active">{{ activeProduct.name }}</span>
      </div>

      <!-- Main Layout Grid -->
      <div class="product-grid">
        <!-- Left Column: Image Gallery -->
        <div class="image-gallery-col">
          <!-- Main Frame -->
          <div class="product-main-view">
            <!-- Best Seller Ribbon Banner (Applies if Hoodie or Tagged) -->
            <div v-if="activeProduct.tag === 'Best Seller'" class="best-seller-ribbon">
              <span>BEST<br>SELLER</span>
            </div>

            <!-- Zoomed image container -->
            <div class="main-image-container">
              <img 
                :src="thumbnails[activeThumbnailIndex].url" 
                :alt="activeProduct.name" 
                class="product-main-image"
                :style="thumbnails[activeThumbnailIndex].style"
              />
            </div>
          </div>

          <!-- Thumbnail Previews Row -->
          <div class="thumbnail-list">
            <button 
              v-for="(thumb, idx) in thumbnails" 
              :key="idx" 
              class="thumb-btn" 
              :class="{ 'active': activeThumbnailIndex === idx }"
              @click="activeThumbnailIndex = idx"
              :aria-label="'View image style ' + (idx + 1)"
            >
              <div class="thumb-img-wrapper">
                <img 
                  :src="thumb.url" 
                  class="thumb-preview-img" 
                  :style="thumb.style" 
                  alt="Thumb Preview"
                />
              </div>
            </button>
          </div>
        </div>

        <!-- Right Column: Details & Configuration -->
        <div class="details-config-col">
          <!-- Header -->
          <h1 class="product-title">{{ activeProduct.name }}</h1>
          <p class="product-price">{{ activeProduct.price }}</p>

          <!-- Star Ratings Row -->
          <div class="rating-row">
            <div class="stars">
              <svg v-for="i in 5" :key="i" viewBox="0 0 24 24" width="18" height="18" fill="var(--accent-cyan)">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <span class="rating-text">4.8 (128 reviews)</span>
          </div>

          <!-- Description Paragraph -->
          <p class="product-description">{{ activeProduct.description }}</p>

          <!-- Additional info for Pre-order or Stock -->
          <div v-if="activeProduct.stockInfo || activeProduct.poPeriod" class="product-extra-details-block" style="margin-bottom: 24px; border-left: 3px solid var(--accent-cyan); padding-left: 12px;">
            <p v-if="activeProduct.stockInfo" style="color: var(--accent-cyan); font-weight: 600; margin: 4px 0; font-size: 0.9rem;">{{ activeProduct.stockInfo }}</p>
            <p v-if="activeProduct.poPeriod" style="color: var(--text-muted); margin: 4px 0; font-size: 0.82rem;">{{ activeProduct.poPeriod }}</p>
          </div>

          <!-- Details Specifications list (below description) -->
          <div class="specs-section">
            <h3 class="specs-title">DETAILS</h3>
            <div class="specs-list">
              <div v-for="spec in specs" :key="spec.label" class="spec-row">
                <!-- Dynamic outline SVGs -->
                <span class="spec-icon">
                  <svg v-if="spec.type === 'material'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  <svg v-else-if="spec.type === 'color'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <svg v-else-if="spec.type === 'gender'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <svg v-else-if="spec.type === 'sablon'" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                  </svg>
                </span>
                <span class="spec-label">{{ spec.label }}:</span>
                <span class="spec-value">{{ spec.value }}</span>
              </div>
            </div>
          </div>

          <!-- Size Selector (Apparel Only) -->
          <div v-if="activeProduct.category === 'apparel'" class="config-section">
            <h3 class="config-label">SIZE</h3>
            <div class="size-buttons">
              <button 
                v-for="size in sizes" 
                :key="size" 
                @click="selectedSize = size"
                class="size-btn"
                :class="{ 'active': selectedSize === size }"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Quantity Selector —label left, picker right -->
          <div class="config-section quantity-config">
            <h3 class="config-label">QUANTITY</h3>
            <div class="quantity-picker-wrapper">
              <button @click="decreaseQty" class="qty-btn-detail" aria-label="Decrease quantity">-</button>
              <span class="qty-num-detail">{{ quantity }}</span>
              <button @click="increaseQty" class="qty-btn-detail" aria-label="Increase quantity">+</button>
            </div>
          </div>

          <!-- Action Buttons (after specs) -->
          <div class="actions-row">
            <!-- Add to Cart -->
            <button @click="handleAddToCart" class="btn btn-cyan btn-add-cart">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>ADD TO CART</span>
            </button>

            <!-- Add to Wishlist -->
            <button @click="toggleWishlist" class="wishlist-btn" :class="{ 'active': isWishlisted }" aria-label="Add to Wishlist">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" :fill="isWishlisted ? 'var(--accent-cyan)' : 'none'" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{{ isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST' }}</span>
            </button>
          </div>

          <!-- Bottom Trust Badges row -->
          <!-- <div class="trust-badge-row">
            <div class="trust-badge">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent-cyan)" stroke-width="1.8" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <div class="trust-meta">
                <span class="trust-title">100% Original</span>
                <span class="trust-sub">Official Merch</span>
              </div>
            </div>

            <div class="trust-badge">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent-cyan)" stroke-width="1.8" fill="none">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
              <div class="trust-meta">
                <span class="trust-title">Premium Quality</span>
                <span class="trust-sub">Comfortable to Wear</span>
              </div>
            </div>

            <div class="trust-badge">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent-cyan)" stroke-width="1.8" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <div class="trust-meta">
                <span class="trust-title">Secure Payment</span>
                <span class="trust-sub">Safe & Trusted</span>
              </div>
            </div>

            <div class="trust-badge">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="var(--accent-cyan)" stroke-width="1.8" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <div class="trust-meta">
                <span class="trust-title">Worldwide Shipping</span>
                <span class="trust-sub">Delivered to You</span>
              </div>
            </div>
          </div> -->

        </div>
      </div>
    </div>

    <!-- Cart Added Toast Notification -->
    <Transition name="toast-slide">
      <div v-if="showCartToast" class="cart-toast">
        <div class="cart-toast-inner">
          <div class="cart-toast-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="#fff" stroke-width="2.5" fill="none">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div class="cart-toast-text">
            <span class="cart-toast-title">Added to Cart!</span>
            <span class="cart-toast-sub">{{ activeProduct.name }}<span v-if="activeProduct.category === 'apparel'"> · Size {{ selectedSize }}</span> · Qty {{ quantity }}</span>
          </div>
          <button class="cart-toast-close" @click="showCartToast = false" aria-label="Dismiss">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.product-detail-section {
  background-color: var(--bg-dark);
  padding: 120px 0 80px 0;
  position: relative;
  z-index: 10;
}

@media (max-width: 768px) {
  .product-detail-section {
    padding: 100px 0 60px 0;
  }
}

/* Breadcrumbs navigation */
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.breadcrumb-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.breadcrumb-link:hover {
  color: var(--accent-cyan);
}

.breadcrumb-separator {
  color: var(--text-muted);
  opacity: 0.6;
}

.breadcrumb-active {
  color: var(--accent-cyan);
  text-shadow: 0 0 6px rgba(255, 42, 109, 0.2);
}

/* Two-Column Grid */
.product-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: start;
}

@media (max-width: 992px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Left Column: Image Area */
.image-gallery-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-main-view {
  width: 100%;
  aspect-ratio: 1.15;
  background-color: #161926;
  border: 1px solid var(--border-card);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.4);
}

.best-seller-ribbon {
  position: absolute;
  top: 0;
  left: 24px;
  width: 48px;
  height: 72px;
  background: linear-gradient(135deg, #ff2a6d 0%, #c20c43 100%);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.62rem;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.25;
  padding-top: 10px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 5;
}

.best-seller-ribbon::before {
  content: '';
  position: absolute;
  inset: 2px;
  border: 0.8px dashed rgba(255, 255, 255, 0.35);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 86%, 0 100%);
  pointer-events: none;
}

.main-image-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-main-image {
  width: 100%;
  height: 100%;
  transition: all 0.5s cubic-bezier(0.2, 1, 0.3, 1);
}

/* Thumbnails list */
.thumbnail-list {
  display: flex;
  gap: 16px;
  justify-content: flex-start;
}

.thumb-btn {
  flex: 0 0 90px;
  height: 90px;
  border-radius: 12px;
  border: 1px solid var(--border-card);
  background-color: rgba(22, 25, 38, 0.5);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  transition: var(--transition-smooth);
}

@media (max-width: 480px) {
  .thumb-btn {
    flex: 1 1 0;
    height: 70px;
  }
}

.thumb-btn:hover {
  border-color: rgba(255, 42, 109, 0.4);
  transform: translateY(-2px);
}

.thumb-btn.active {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 12px rgba(255, 42, 109, 0.3);
  transform: translateY(-2px);
}

.thumb-img-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.thumb-preview-img {
  width: 100%;
  height: 100%;
}

/* Right Column: details content styling */
.details-config-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.product-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.25;
  margin-bottom: 8px;
}

@media (max-width: 576px) {
  .product-title {
    font-size: 1.7rem;
  }
}

.product-price {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px rgba(255, 42, 109, 0.25);
  margin-bottom: 16px;
}

/* Star Rating */
.rating-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
}

.stars {
  display: flex;
  gap: 4px;
}

.rating-text {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.product-description {
  font-size: 0.95rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin-bottom: 28px;
}

/* Config Options */
.config-section {
  width: 100%;
  margin-bottom: 24px;
}

.config-label {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--text-muted);
  letter-spacing: 1.5px;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.size-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.size-btn {
  min-width: 50px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid var(--border-card);
  background-color: transparent;
  color: var(--text-secondary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition-smooth);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
}

.size-btn:hover {
  border-color: rgba(255, 42, 109, 0.4);
  color: var(--text-primary);
}

.size-btn.active {
  border-color: var(--accent-cyan);
  color: var(--text-primary);
  background-color: rgba(255, 42, 109, 0.08);
  box-shadow: 0 0 10px rgba(255, 42, 109, 0.15);
  text-shadow: 0 0 5px rgba(255, 42, 109, 0.2);
}

/* Quantity picker details */
.quantity-picker-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-card);
  border-radius: 9999px;
  overflow: hidden;
  background-color: rgba(5, 6, 8, 0.3);
  width: fit-content;
}

/* Quantity row: label left, picker right */
.quantity-config {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row !important;
  gap: 16px;
}

.quantity-config .config-label {
  margin-bottom: 0;
}

.qty-btn-detail {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  transition: var(--transition-smooth);
}

.qty-btn-detail:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--accent-cyan);
}

.qty-num-detail {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 700;
  min-width: 44px;
  text-align: center;
  color: var(--text-primary);
}

/* Action Buttons */
.actions-row {
  display: flex;
  gap: 16px;
  width: 100%;
  margin-top: 0;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .actions-row {
    flex-direction: column;
    gap: 12px;
  }
}

.btn-add-cart {
  flex: 1;
  padding: 14px 28px;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  box-shadow: 0 0 15px rgba(255, 42, 109, 0.3);
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

@media (max-width: 480px) {
  .btn-add-cart {
    width: 100%;
    flex: none;
  }
}

.wishlist-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 28px;
  height: 48px;
  border-radius: 9999px;
  border: 1px solid var(--border-card);
  background-color: transparent;
  color: var(--text-secondary);
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

@media (max-width: 480px) {
  .wishlist-btn {
    width: 100%;
    height: 48px;
  }
}

.wishlist-btn:hover {
  border-color: rgba(255, 42, 109, 0.4);
  color: var(--text-primary);
}

.wishlist-btn.active {
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
  background-color: rgba(255, 42, 109, 0.04);
  box-shadow: 0 0 15px rgba(255, 42, 109, 0.15);
}

/* Specs details list */
.specs-section {
  width: 100%;
  border-top: 1px solid var(--border-card);
  padding-top: 28px;
  margin-bottom: 36px;
}

.specs-title {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--accent-cyan);
  letter-spacing: 1.5px;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.specs-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.spec-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.88rem;
}

.spec-icon {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

.spec-label {
  color: var(--text-muted);
  font-weight: 500;
  min-width: 100px;
}

.spec-value {
  color: var(--text-primary);
  font-weight: 600;
}

/* Trust badges footer */
.trust-badge-row {
  width: 100%;
  border-top: 1px solid var(--border-card);
  padding-top: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 768px) {
  .trust-badge-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px 16px;
  }
}

@media (max-width: 480px) {
  .trust-badge-row {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.trust-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  background-color: rgba(22, 25, 38, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 12px 8px;
  transition: var(--transition-smooth);
}

.trust-badge:hover {
  background-color: rgba(22, 25, 38, 0.4);
  border-color: rgba(255, 42, 109, 0.1);
  transform: translateY(-2px);
}

.trust-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.trust-title {
  font-family: var(--font-heading);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-primary);
}

.trust-sub {
  font-size: 0.6rem;
  color: var(--text-muted);
  font-weight: 500;
}

/* Cart Added Toast */
.cart-toast {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 9999;
  pointer-events: all;
}

@media (max-width: 576px) {
  .cart-toast {
    right: 16px;
    left: 16px;
    bottom: 20px;
  }
}

.cart-toast-inner {
  display: flex;
  align-items: center;
  gap: 14px;
  background: rgba(15, 17, 26, 0.92);
  backdrop-filter: blur(20px);
  border: 1px solid var(--accent-cyan);
  border-radius: 14px;
  padding: 14px 18px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 42, 109, 0.18);
  min-width: 280px;
  max-width: 380px;
}

@media (max-width: 576px) {
  .cart-toast-inner {
    min-width: unset;
    max-width: 100%;
    width: 100%;
  }
}

.cart-toast-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff2a6d 0%, #c20c43 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 10px rgba(255, 42, 109, 0.4);
}

.cart-toast-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.cart-toast-title {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text-primary);
}

.cart-toast-sub {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.cart-toast-close {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition-smooth);
  flex-shrink: 0;
}

.cart-toast-close:hover {
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.08);
}

/* Toast slide-up transition */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
