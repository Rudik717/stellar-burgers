import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerBuilderSlice } from '../slices/burger-builder-slice';
import { feedSlice } from '../slices/feed-slice';
import { ingredientSlice } from '../slices/ingredient-slice';
import { newOrderSlice } from '../slices/new_order_slice';
import { OrdersListSlice } from '../slices/order-list-slice';
import { userSlice } from '../slices/user-slice';

export const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  [burgerBuilderSlice.name]: burgerBuilderSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [OrdersListSlice.name]: OrdersListSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
