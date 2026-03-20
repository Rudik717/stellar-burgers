import { rootReducer } from '../src/services/store';
import { ingredientSlice } from '../src/slices/ingredient-slice';
import { newOrderSlice } from '../src/slices/new_order_slice';
import { OrdersListSlice } from '../src/slices/order-list-slice';
import { userSlice } from '../src/slices/user-slice';
import { feedSlice } from '../src/slices/feed-slice';
import { burgerBuilderSlice } from '../src/slices/burger-builder-slice';

describe('Инициализация RootReducer', function () {
  test('Проверка инициализации', function () {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, testAction);
    expect(state).toEqual({
      user: userSlice.reducer(undefined, testAction),
      ingredients: ingredientSlice.reducer(undefined, testAction),
      burgerBuilder: burgerBuilderSlice.reducer(undefined, testAction),
      feeds: feedSlice.reducer(undefined, testAction),
      newOrder: newOrderSlice.reducer(undefined, testAction),
      ordersList: OrdersListSlice.reducer(undefined, testAction)
    });
  });
});
