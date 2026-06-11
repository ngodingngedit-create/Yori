<script setup>
import { cart, isCartOpen, updateQuantity, removeFromCart, clearCart, cartTotal, formatRupiah } from '../cartState.js';

const closeDrawer = () => {
  isCartOpen.value = false;
};
</script>

<template>
  <div>
    <!-- Backdrop overlay -->
    <Transition name="fade">
      <div v-if="isCartOpen" class="cart-backdrop" @click="closeDrawer"></div>
    </Transition>

    <!-- Cart Sidebar Panel -->
    <Transition name="slide">
      <div v-if="isCartOpen" class="cart-drawer-panel">
        <!-- Drawer Header -->
        <div class="drawer-header">
          <div class="header-left">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="var(--accent-cyan)" stroke-width="2" fill="none">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h3 class="drawer-title">Shopping Cart</h3>
          </div>
          <button @click="closeDrawer" class="close-btn" aria-label="Close Cart">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2.5" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Drawer Content -->
        <div class="drawer-content">
          <!-- Empty State -->
          <div v-if="cart.length === 0" class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" width="64" height="64" stroke="var(--text-muted)" stroke-width="1.5" fill="none">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Your cart is currently empty.</p>
            <button @click="closeDrawer" class="btn btn-outline shop-now-btn">CONTINUE SHOPPING</button>
          </div>

          <!-- Items list -->
          <div v-else class="cart-items-list">
            <!-- Clear all link -->
            <div class="clear-all-row">
              <button @click="clearCart" class="clear-all-btn">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                <span>Clear All Items</span>
              </button>
            </div>

            <!-- Single Item Row -->
            <div v-for="item in cart" :key="item.cartKey || item.id" class="cart-item-card">
              <img :src="item.image" :alt="item.name" class="item-img" />
              
              <div class="item-details">
                <h4 class="item-name">{{ item.name }}</h4>
                <p v-if="item.size" class="item-size-spec">Size: {{ item.size }}</p>
                <p class="item-price">{{ item.price }}</p>
                
                <!-- Quantity & Actions -->
                <div class="item-actions">
                  <div class="quantity-picker">
                    <button @click="updateQuantity(item.cartKey || item.id, -1)" class="qty-btn" aria-label="Decrease quantity">-</button>
                    <span class="qty-num">{{ item.quantity }}</span>
                    <button @click="updateQuantity(item.cartKey || item.id, 1)" class="qty-btn" aria-label="Increase quantity">+</button>
                  </div>
                  
                  <button @click="removeFromCart(item.cartKey || item.id)" class="remove-btn" aria-label="Remove item">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div v-if="cart.length > 0" class="drawer-footer">
          <div class="summary-row">
            <span class="summary-label">Total Payment</span>
            <span class="summary-value glow-text-cyan">{{ formatRupiah(cartTotal) }}</span>
          </div>
          <button class="btn btn-cyan checkout-btn">
            <span>PROCEED TO CHECKOUT</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.cart-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(5, 6, 8, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1100;
}

.cart-drawer-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 420px;
  background: rgba(21, 24, 32, 0.95);
  backdrop-filter: blur(25px);
  border-left: 1px solid var(--border-card);
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.8), -5px 0 20px rgba(255, 42, 109, 0.05);
  z-index: 1200;
  display: flex;
  flex-direction: column;
}

@media (max-width: 576px) {
  .cart-drawer-panel {
    width: 100%;
  }
}

/* Header */
.drawer-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-card);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.drawer-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.close-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition-smooth);
}

.close-btn:hover {
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.05);
}

/* Content */
.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

/* Scrollbar within content drawer */
.drawer-content::-webkit-scrollbar {
  width: 6px;
}
.drawer-content::-webkit-scrollbar-track {
  background: transparent;
}
.drawer-content::-webkit-scrollbar-thumb {
  background: var(--border-card);
  border-radius: 3px;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  gap: 16px;
  color: var(--text-secondary);
}

.empty-icon {
  opacity: 0.5;
  margin-bottom: 10px;
}

.shop-now-btn {
  font-size: 0.8rem;
  padding: 10px 24px;
}

/* Items list styling */
.cart-items-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.clear-all-row {
  display: flex;
  justify-content: flex-end;
}

.clear-all-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: var(--transition-smooth);
}

.clear-all-btn:hover {
  color: #ff4d4d;
  filter: drop-shadow(0 0 5px rgba(255, 77, 77, 0.3));
}

/* Card */
.cart-item-card {
  display: flex;
  gap: 16px;
  background-color: rgba(5, 6, 8, 0.4);
  border: 1px solid var(--border-card);
  padding: 16px;
  border-radius: 16px;
  transition: var(--transition-smooth);
}

.cart-item-card:hover {
  border-color: rgba(255, 42, 109, 0.25);
  background-color: rgba(5, 6, 8, 0.6);
}

.item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.item-price {
  font-family: var(--font-heading);
  font-size: 0.92rem;
  color: var(--accent-cyan);
  font-weight: 700;
}

.item-size-spec {
  font-size: 0.78rem;
  color: var(--text-secondary);
  font-family: var(--font-heading);
  margin-top: 2px;
  margin-bottom: 2px;
}

.item-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.quantity-picker {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-card);
  border-radius: 9999px;
  overflow: hidden;
  background-color: rgba(5, 6, 8, 0.3);
}

.qty-btn {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: var(--transition-smooth);
}

.qty-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--accent-cyan);
}

.qty-num {
  font-size: 0.85rem;
  font-weight: 700;
  min-width: 24px;
  text-align: center;
}

.remove-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: var(--transition-smooth);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.remove-btn:hover {
  color: #ff4d4d;
  background-color: rgba(255, 77, 77, 0.05);
}

/* Footer Section */
.drawer-footer {
  padding: 24px;
  border-top: 1px solid var(--border-card);
  background-color: rgba(5, 6, 8, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.summary-value {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-weight: 800;
}

.checkout-btn {
  width: 100%;
  padding: 14px 0;
  font-size: 0.9rem;
  border-radius: 9999px;
  font-weight: 700;
}

/* Slide Transition Animations */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Fade Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
