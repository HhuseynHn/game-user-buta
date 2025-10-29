import { mockBasket } from "@/mock/basket-mock";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: mockBasket,
  promo: null,
};

const calculateItemTotal = (item) => {
  const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
  return discountedPrice * item.quantity;
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existing = state.items.find((i) => i.id === newItem.id);
      if (existing) {
        existing.quantity = existing.quantity + (newItem.quantity || 1);
      } else {
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
    },
    updateQuantity(state, action) {
      const { id, change } = action.payload;
      state.items = state.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, i.quantity + change) } : i
      );
    },
    setQuantity(state, action) {
      const { id, quantity } = action.payload;
      state.items = state.items.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
      );
    },
    applyPromo(state, action) {
      const code = (action.payload || "").toUpperCase();
      if (code === "GAME10") state.promo = { code: "GAME10", discount: 10 };
      else if (code === "SAVE20")
        state.promo = { code: "SAVE20", discount: 20 };
      else state.promo = null;
    },
    clearPromo(state) {
      state.promo = null;
    },
    clearBasket(state) {
      state.items = [];
      state.promo = null;
    },
  },
});

// selectors (exported)
export const selectBasketItems = (state) => state.basket.items;
export const selectItemCount = (state) =>
  state.basket.items.reduce((s, i) => s + i.quantity, 0);
export const selectSubtotal = (state) =>
  state.basket.items.reduce((s, i) => s + calculateItemTotal(i), 0);
export const selectPromo = (state) => state.basket.promo;
export const selectPromoDiscount = (state) => {
  const promo = state.basket.promo;
  if (!promo) return 0;
  const subtotal = state.basket.items.reduce(
    (s, i) => s + calculateItemTotal(i),
    0
  );
  return (subtotal * promo.discount) / 100;
};
export const selectTax = (state) => {
  const subtotal = selectSubtotal(state);
  const promoDiscount = selectPromoDiscount(state);
  return (subtotal - promoDiscount) * 0.1;
};
export const selectTotal = (state) => {
  const subtotal = selectSubtotal(state);
  const promoDiscount = selectPromoDiscount(state);
  const tax = selectTax(state);
  return subtotal - promoDiscount + tax;
};

export const {
  addItem,
  removeItem,
  updateQuantity,
  setQuantity,
  applyPromo,
  clearPromo,
  clearBasket,
} = basketSlice.actions;

export default basketSlice.reducer;
