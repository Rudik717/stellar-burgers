import {
  OrdersListSlice,
  getOrders,
  initialState
} from '../src/slices/order-list-slice';
import { TOrder } from '../src/utils/types';

describe('слайс заказов', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '66e9f8b2119d45001b507802',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный spicy био-марсианский минеральный бургер',
      createdAt: '2024-09-17T21:46:26.339Z',
      updatedAt: '2024-09-17T21:46:26.815Z',
      number: 53260
    }
  ];

  it('начальное состояние', () => {
    expect(OrdersListSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('Успешно', () => {
    const pendingState = OrdersListSlice.reducer(
      initialState,
      getOrders.pending('', undefined)
    );
    const fulfilledState = OrdersListSlice.reducer(
      pendingState,
      getOrders.fulfilled(mockOrders, '', undefined)
    );

    expect(fulfilledState.isLoading).toBe(false);
    expect(fulfilledState.orders).toEqual(mockOrders);
  });

  it('Ожидание', () => {
    const state = OrdersListSlice.reducer(
      initialState,
      getOrders.pending('', undefined)
    );
    expect(state.isLoading).toBe(true);
    expect(state.orders).toEqual([]);
  });

  it('Ошибка', () => {
    const pendingState = OrdersListSlice.reducer(
      initialState,
      getOrders.pending('', undefined)
    );
    const rejectedState = OrdersListSlice.reducer(
      pendingState,
      getOrders.rejected(new Error('Error'), '', undefined)
    );

    expect(rejectedState.isLoading).toBe(false);
    expect(rejectedState.orders).toEqual([]);
  });
});
