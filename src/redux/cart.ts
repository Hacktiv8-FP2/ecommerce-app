import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Cart } from '@/types';

type CartState = {
  cart: Cart[];
  loading: boolean;
  error?: AxiosError;
};

const initialState = {
  cart: [],
  loading: false,
} as CartState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const product = state.cart.find((item) => item.id === id);

      if (product) {
        product.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const product = state.cart.find((item) => item.id === id);

      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((item) => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, clearCart, updateQuantity, removeFromCart } =
  cartSlice.actions;
