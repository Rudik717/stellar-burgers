import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { orderBurgerApi } from '../utils/burger-api';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  orderBurgerApi
);

export type TNewOrderState = {
  isLoading: boolean;
  order: TOrder | null;
  errorMessage?: string | null | undefined;
};

export const initialState: TNewOrderState = {
  isLoading: false,
  order: null,
  errorMessage: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    getOrderIsLoading: (state) => state.isLoading,
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.errorMessage = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const { getOrderIsLoading, getOrder } = newOrderSlice.selectors;
