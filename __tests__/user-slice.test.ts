import {
  userSlice,
  registerUser,
  loginUser,
  getUserFetch,
  updateUser,
  logout,
  initialState
} from '../src/slices/user-slice';

const fakeUser = {
  email: 't717rv@yandex.ru',
  name: 'Rudik'
};

describe('тестирование userSlice', () => {
  it('Успешная регистрация', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: fakeUser }
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: true,
      isAuthChecked: false,
      user: fakeUser,
      errorMessage: ''
    });
  });

  it('Ошибка при регистрации', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: false,
      isAuthChecked: false,
      user: { email: '', name: '' },
      errorMessage: 'Ошибка регистрации'
    });
  });

  it('Успешный вход', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: fakeUser }
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: true,
      isAuthChecked: true,
      user: fakeUser,
      errorMessage: ''
    });
  });

  it('Ошибка входа', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка авторизации' }
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: false,
      isAuthChecked: false,
      user: { email: '', name: '' },
      errorMessage: 'Ошибка авторизации'
    });
  });

  it('Успешное получение данных о пользователе', () => {
    const action = {
      type: getUserFetch.fulfilled.type,
      payload: { user: fakeUser }
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: true,
      isAuthChecked: true,
      user: fakeUser,
      errorMessage: ''
    });
  });

  it('Ошибка при получении данных о пользователе', () => {
    const action = {
      type: getUserFetch.rejected.type,
      error: { message: 'Ошибка загрузки' }
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: false,
      isAuthChecked: true,
      user: { email: '', name: '' },
      errorMessage: 'Ошибка загрузки'
    });
  });

  it('Успешное обновление пользователя', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: fakeUser }
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: true,
      isAuthChecked: false,
      user: fakeUser,
      errorMessage: ''
    });
  });

  it('Ошибка обновление пользователя', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка обновления' }
    };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: false,
      isAuthChecked: false,
      user: { email: '', name: '' },
      errorMessage: 'Ошибка обновления'
    });
  });

  it('Выход', () => {
    const action = { type: logout.fulfilled.type };

    const newState = userSlice.reducer(initialState, action);

    expect(newState).toEqual({
      isAuth: false,
      isAuthChecked: false,
      user: { email: '', name: '' },
      errorMessage: ''
    });
  });
});
