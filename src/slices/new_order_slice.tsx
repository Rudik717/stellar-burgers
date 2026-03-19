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
  isSuccess: boolean;
  errorMessage?: string | null | undefined;
};

export const initialState: TNewOrderState = {
  isLoading: false,
  order: null,
  isSuccess: false,
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
    getOrder: (state) => state.order,
    getIsSuccess: (state) => state.isSuccess
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload.order;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.isSuccess = false;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      });
  }
});

export const { resetOrder } = newOrderSlice.actions;
export const { getOrderIsLoading, getOrder, getIsSuccess } =
  newOrderSlice.selectors;
