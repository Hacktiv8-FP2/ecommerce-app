import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Products } from '@/types';

type SalesState = {
  sales: Products[];
  loading: boolean;
  error?: AxiosError;
};

const initialState = {
  sales: [],
  loading: false,
} as SalesState;

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addToSales: (state, action) => {
      const sales = action.payload;
      state.sales.push(...sales);
    },
  },
});

export default salesSlice.reducer;
export const { addToSales } = salesSlice.actions;
