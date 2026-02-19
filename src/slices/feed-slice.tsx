import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';
import { getFeedsApi } from '../utils/burger-api';

export const getAllFeeds = createAsyncThunk('orders/getAll', getFeedsApi);

export type TFeedSliceState = {
  ordersList: TOrder[];
  totalCount: number;
  totalTodayCount: number;
  isLoading: boolean;
  errorMessage?: string | null | undefined;
};

export const initialState: TFeedSliceState = {
  ordersList: [],
  totalCount: 0,
  totalTodayCount: 0,
  isLoading: true,
  errorMessage: null
};

export const feedSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getOrdersList: (state: TFeedSliceState) => state.ordersList,
    getTotalCount: (state: TFeedSliceState) => state.totalCount,
    getTodayCount: (state: TFeedSliceState) => state.totalTodayCount
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeeds.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      .addCase(getAllFeeds.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.ordersList = orders;
        state.totalCount = total;
        state.totalTodayCount = totalToday;
        state.isLoading = false;
      })
      .addCase(getAllFeeds.rejected, (state, action) => {
        state.ordersList = [];
        state.totalCount = 0;
        state.totalTodayCount = 0;
        state.isLoading = false;
        state.errorMessage = action.error.message;
      });
  }
});

export const { getOrdersList, getTotalCount, getTodayCount } =
  feedSlice.selectors;
