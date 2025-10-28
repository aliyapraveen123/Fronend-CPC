import { createSlice } from '@reduxjs/toolkit';

/**
 * Load cart from localStorage
 */
const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

/**
 * Calculate cart totals
 */
const calculateTotals = (items) => {
  const itemsPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxPrice = itemsPrice * 0.1; // 10% tax
  const shippingPrice = itemsPrice > 500 ? 0 : 50; // Free shipping over 500
  const totalAmount = itemsPrice + taxPrice + shippingPrice;

  return {
    itemsPrice: Number(itemsPrice.toFixed(2)),
    taxPrice: Number(taxPrice.toFixed(2)),
    shippingPrice: Number(shippingPrice.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
  };
};

// Initial state
const initialState = {
  items: loadCartFromStorage(),
  ...calculateTotals(loadCartFromStorage()),
};

// Cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.product === item.product);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      // Recalculate totals
      Object.assign(state, calculateTotals(state.items));

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.product !== action.payload);

      // Recalculate totals
      Object.assign(state, calculateTotals(state.items));

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { product, quantity } = action.payload;
      const item = state.items.find((i) => i.product === product);

      if (item) {
        item.quantity = quantity;
      }

      // Recalculate totals
      Object.assign(state, calculateTotals(state.items));

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.itemsPrice = 0;
      state.taxPrice = 0;
      state.shippingPrice = 0;
      state.totalAmount = 0;

      // Clear localStorage
      localStorage.removeItem('cart');
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
