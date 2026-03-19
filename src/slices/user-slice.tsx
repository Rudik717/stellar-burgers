import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../utils/types';
import {
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';
import { deleteCookie, setCookie } from '../utils/cookie';

export const registerUser = createAsyncThunk(
  'registerUser',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const getUserFetch = createAsyncThunk('user/getUser', getUserApi);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export type TUserState = {
  isAuth: boolean;
  isAuthChecked: boolean;
  user: TUser;
  errorMessage?: string | undefined;
};

export const initialState: TUserState = {
  isAuth: false,
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
  errorMessage: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.errorMessage = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorMessage = action.error.message!;
      })
      .addCase(registerUser.pending, (state) => {
        state.errorMessage = '';
      });
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.errorMessage = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuth = false;
        state.errorMessage = '';
      });
    builder
      .addCase(getUserFetch.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(getUserFetch.rejected, (state, action) => {
        state.isAuth = false;
        state.isAuthChecked = true;
        state.errorMessage = action.error.message!;
      })
      .addCase(getUserFetch.pending, (state) => {
        state.isAuthChecked = false;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuth = false;
        state.errorMessage = action.error.message!;
      })
      .addCase(updateUser.pending, (state) => {
        state.errorMessage = '';
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.user = { email: '', name: '' };
    });
  },
  selectors: {
    isAuthSelector: (state: TUserState) => state.isAuth,
    getUser: (state) => state.user,
    getUserName: (state) => state.user.name,
    getErrorMessage: (state) => state.errorMessage
  }
});

export const { isAuthSelector, getUser, getUserName, getErrorMessage } =
  userSlice.selectors;
