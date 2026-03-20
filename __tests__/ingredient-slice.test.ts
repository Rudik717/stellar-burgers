import { expect, test, describe } from '@jest/globals';
import {
  getIngredientsList,
  ingredientSlice,
  initialState
} from '../src/slices/ingredient-slice';

describe('Тест редьюсера ingredientSlice', () => {
  test('Выполнено успешно', () => {
    const testIngredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ];

    const newState = ingredientSlice.reducer(
      { ...initialState, isLoading: true },
      getIngredientsList.fulfilled(testIngredients, '', undefined)
    );

    expect(newState).toEqual({
      ingredients: testIngredients,
      isLoading: false,
      errorMessage: null
    });
  });

  test('В процессе', () => {
    const newState = ingredientSlice.reducer(
      initialState,
      getIngredientsList.pending('', undefined)
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: true,
      errorMessage: null
    });
  });

  test('Ошибка', () => {
    const newState = ingredientSlice.reducer(
      { ...initialState, isLoading: true },
      getIngredientsList.rejected(
        { message: 'Error', name: 'Error' },
        '',
        undefined
      )
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      errorMessage: 'Error'
    });
  });
});
