import { expect, test, describe } from '@jest/globals';
import {
  feedSlice,
  initialState,
  getFeedsList
} from '../src/slices/feed-slice';

describe('Feed-slice Редьюсер', function () {
  test('Выполнено успешно', function () {
    const feedResponse = {
      success: true,
      orders: [
        {
          _id: '66d7fc9d119d45001b503fa1',
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
          status: 'done',
          name: 'Краторный бургер',
          createdAt: '2024-09-04T06:22:21.104Z',
          updatedAt: '2024-09-04T06:22:21.577Z',
          number: 51930
        },
        {
          _id: '671a7352d829be001c77877c',
          ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
          status: 'done',
          name: 'Флюоресцентный бургер',
          createdAt: '2024-10-24T16:18:26.559Z',
          updatedAt: '2024-10-24T16:18:27.439Z',
          number: 57396
        }
      ],
      total: 1000,
      totalToday: 115
    };

    const newState = feedSlice.reducer(
      {
        ...initialState,
        isLoading: true
      },
      getFeedsList.fulfilled(feedResponse, '', undefined)
    );

    expect(newState).toEqual({
      ordersList: feedResponse.orders,
      totalCount: feedResponse.total,
      totalTodayCount: feedResponse.totalToday,
      isLoading: false,
      errorMessage: null
    });
  });

  test('В процессе', function () {
    const newState = feedSlice.reducer(
      initialState,
      getFeedsList.pending('', undefined)
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: true,
      errorMessage: undefined
    });
  });

  test('Ошибка', function () {
    const newState = feedSlice.reducer(
      initialState,
      getFeedsList.rejected(
        { message: 'Rejected', name: 'Error' },
        '',
        undefined
      )
    );

    expect(newState).toEqual({
      ...initialState,
      isLoading: false,
      ordersList: [],
      totalCount: 0,
      totalTodayCount: 0,
      errorMessage: 'Rejected'
    });
  });
});

describe('Селекторы', () => {
  const mockState = {
    feeds: {
      ordersList: [
        {
          _id: '1',
          ingredients: [],
          status: 'done',
          name: 'Test burger',
          createdAt: '2026-03-20',
          updatedAt: '2026-03-20',
          number: 1
        }
      ],
      totalCount: 500,
      totalTodayCount: 9,
      isLoading: false,
      errorMessage: null
    }
  };

  test('getOrdersList', () => {
    expect(feedSlice.selectors.getOrdersList(mockState)).toEqual(
      mockState.feeds.ordersList
    );
  });

  test('getTotalCount', () => {
    expect(feedSlice.selectors.getTotalCount(mockState)).toBe(
      mockState.feeds.totalCount
    );
  });

  test('getTodayCount', () => {
    expect(feedSlice.selectors.getTodayCount(mockState)).toBe(
      mockState.feeds.totalTodayCount
    );
  });
});
