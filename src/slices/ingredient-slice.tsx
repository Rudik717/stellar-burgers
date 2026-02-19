import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  isLoading: boolean;
  errorMessage?: string | null | undefined;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  errorMessage: null
};

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state,
    getIngredientsIsLoading: (state) => state.isLoading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.error.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientsState, getIngredientsIsLoading, getIngredients } =
  ingredientSlice.selectors;
