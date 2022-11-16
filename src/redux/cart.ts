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

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const product = state.cart.find((item) => item.id === id);

      if (product) {
        product.quantity += 1;
      } else {
        state.cart.push({ ...action.payload });
      }
    },
  },
});

export default productsSlice.reducer;
export const { addToCart } = productsSlice.actions;
