import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getOrdersApi } from '../utils/burger-api';

export const getOrders = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);

export type TOrdersListState = {
  orders: Array<TOrder>;
  isLoading: boolean;
};

export const initialState: TOrdersListState = {
  orders: [],
  isLoading: true
};

export const OrdersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  selectors: {
    getOrdersList: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getOrdersList } = OrdersListSlice.selectors;
