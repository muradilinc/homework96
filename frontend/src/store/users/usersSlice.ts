import {
  GlobalError,
  LoginResponse,
  RegisterResponse,
  User,
  ValidationError,
} from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { googleLogin, login, register } from './usersThunk';

interface UsersState {
  user: User | null;
  loginLoading: boolean;
  registerLoading: boolean;
  loginError: GlobalError | null;
  registerError: ValidationError | null;
}

const initialState: UsersState = {
  user: null,
  loginLoading: false,
  registerLoading: false,
  loginError: null,
  registerError: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logoutState: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(
      register.fulfilled,
      (state, { payload: data }: PayloadAction<RegisterResponse>) => {
        state.registerLoading = false;
        state.user = data.user;
      },
    );
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state, { payload: data }: PayloadAction<LoginResponse>) => {
        state.loginLoading = false;
        state.user = data.user;
      },
    );
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginLoading = false;
      state.loginError = error || null;
    });
    builder.addCase(googleLogin.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(
      googleLogin.fulfilled,
      (state, { payload: data }: PayloadAction<RegisterResponse>) => {
        state.loginLoading = false;
        state.user = data.user;
      },
    );
    builder.addCase(googleLogin.rejected, (state) => {
      state.loginLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { logoutState } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
export const selectLoginError = (state: RootState) => state.users.loginError;
