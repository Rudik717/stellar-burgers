import {
  newOrderSlice,
  createOrder,
  resetOrder,
  initialState
} from '../src/slices/new_order_slice';
import { TOrder } from '../src/utils/types';

describe('тест нового заказа', () => {
  const mockOrder: TOrder = {
    _id: '671a8f96d829be001c7787ea',
    ingredients: [
      'Флюоресцентная булка R2-D3',
      'Флюоресцентный spicy люминесцентный бургер',
      'Филе Люминесцентного тетраодонтимформа',
      'Соус Spicy-X',
      'Флюоресцентная булка R2-D3'
    ],
    status: 'done',
    name: 'Флюоресцентный spicy люминесцентный бургер',
    createdAt: '2026-03-26T18:19:02.774Z',
    updatedAt: '2026-03-26T18:19:03.715Z',
    number: 57403
  };

  it('начальное состояние', () => {
    expect(newOrderSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('сброс заказа', () => {
    const previousState = {
      isLoading: true,
      order: mockOrder,
      isSuccess: false,
      errorMessage: 'Error'
    };
    expect(newOrderSlice.reducer(previousState, resetOrder())).toEqual(
      initialState
    );
  });

  it('Успешно', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: { order: mockOrder }
    };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.errorMessage).toBeNull();
    expect(state.isSuccess).toBe(true);
  });

  it('В процессе', () => {
    const action = { type: createOrder.pending.type };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.order).toBeNull();
    expect(state.errorMessage).toBeNull();
    expect(state.isSuccess).toBe(false);
  });

  it('Ошибка', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Error' }
    };
    const state = newOrderSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toBeNull();
    expect(state.errorMessage).toBe('Error');
    expect(state.isSuccess).toBe(false);
  });
});
