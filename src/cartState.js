import { ref, computed } from 'vue';

// Core reactive state
export const cart = ref([]);
export const isCartOpen = ref(false);

// Add product to cart with custom size and quantity support
export const addToCart = (product, size = null, qtyToAdd = 1) => {
  const cartKey = size ? `${product.id}-${size}` : `${product.id}`;
  const existing = cart.value.find(item => item.cartKey === cartKey || (!size && !item.cartKey && item.id === product.id));
  if (existing) {
    existing.quantity += qtyToAdd;
  } else {
    cart.value.push({ ...product, cartKey, size, quantity: qtyToAdd });
  }
  // Don't auto-open cart drawer — notification is handled by the calling component
};

// Increment or decrement quantity using cartKey or id
export const updateQuantity = (key, amount) => {
  const item = cart.value.find(item => item.cartKey === key || item.id === key);
  if (item) {
    item.quantity += amount;
    if (item.quantity <= 0) {
      removeFromCart(key);
    }
  }
};

// Remove single product card using cartKey or id
export const removeFromCart = (key) => {
  cart.value = cart.value.filter(item => item.cartKey !== key && item.id !== key);
};

// Clear entire cart
export const clearCart = () => {
  cart.value = [];
};

// Compute total quantity of items
export const cartCount = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.quantity, 0);
});

// Compute total price (formatted as currency)
export const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => {
    // Parse integer from formatted string like "Rp 350.000"
    const priceNum = parseInt(item.price.replace(/[^\d]/g, ''), 10) || 0;
    return sum + (priceNum * item.quantity);
  }, 0);
});

// Helper for formatting prices back to Rupiah
export const formatRupiah = (num) => {
  return 'Rp ' + num.toLocaleString('id-ID');
};
