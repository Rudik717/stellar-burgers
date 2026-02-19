import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient } from '../utils/types';

type TBurgerBuilderState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialBurgerState: TBurgerBuilderState = {
  bun: null,
  ingredients: []
};

export const burgerBuilderSlice = createSlice({
  name: 'burgerBuilder',
  initialState: initialBurgerState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const ingredientId = uuidv4();
        return { payload: { ...ingredient, id: ingredientId } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetBuilder: (state) => (state = initialBurgerState),
    setIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    selectBuilderState: (state: TBurgerBuilderState) => state
  }
});

export const { addIngredient, removeIngredient, resetBuilder, setIngredients } =
  burgerBuilderSlice.actions;
export const burgerBuilderSelector = burgerBuilderSlice.selectors;
export const burgerBuilderReducer = burgerBuilderSlice.reducer;
