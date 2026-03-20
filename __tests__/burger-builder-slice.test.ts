import {
  addIngredient,
  burgerBuilderSlice,
  removeIngredient,
  initialBurgerState,
  burgerBuilderReducer,
  resetBuilder,
  setIngredients
} from '../src/slices/burger-builder-slice';

import { TConstructorIngredient } from '../src/utils/types';

const createIngredient = (
  overrides: Partial<TConstructorIngredient> = {}
): TConstructorIngredient => ({
  _id: '1',
  id: '1',
  name: 'test',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_mobile: '',
  image_large: '',
  ...overrides
});

describe('Тест редьюсера burgerBuilderSlice', () => {
  it('Добавить ингредиент', () => {
    const ingredient = createIngredient({ id: '2' });

    const state = burgerBuilderSlice.reducer(
      initialBurgerState,
      addIngredient(ingredient)
    );

    expect(state.ingredients).toHaveLength(1);
  });

  it('Удалить ингредиент', () => {
    const ingredient = createIngredient({ id: '2' });

    const stateWithItem = {
      bun: null,
      ingredients: [ingredient]
    };

    const state = burgerBuilderSlice.reducer(
      stateWithItem,
      removeIngredient(ingredient)
    );

    expect(state.ingredients).toHaveLength(0);
  });

  it('Добавить булочку', () => {
    const bun = createIngredient({ id: '1', type: 'bun' });

    const state = burgerBuilderSlice.reducer(
      initialBurgerState,
      addIngredient(bun)
    );

    expect(state.bun?._id).toBe('1');
  });

  it('Удалить Булочку)', () => {
    const bun = createIngredient({ id: '1', type: 'bun' });

    const state = burgerBuilderSlice.reducer(
      initialBurgerState,
      removeIngredient(bun)
    );

    expect(state.bun).toBeNull();
  });

  it('Начальное состояние', () => {
    const state = {
      bun: createIngredient({ type: 'bun' }),
      ingredients: [createIngredient({ id: '2' })]
    };

    const newState = burgerBuilderReducer(state, resetBuilder());

    expect(newState).toEqual(initialBurgerState);
  });

  it('Обновление ингредиентов', () => {
    const newIngredients = [
      createIngredient({ id: '3' }),
      createIngredient({ id: '4' })
    ];

    const state = burgerBuilderReducer(
      initialBurgerState,
      setIngredients(newIngredients)
    );

    expect(state.ingredients).toEqual(newIngredients);
  });
});
