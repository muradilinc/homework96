import { User } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { login, register } from './usersThunk';

interface UsersState {
  user: User | null;
  loginLoading: boolean;
  registerLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  loginLoading: false,
  registerLoading: false,
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
      (state, { payload: user }: PayloadAction<User>) => {
        state.registerLoading = false;
        state.user = user;
      },
    );
    builder.addCase(register.rejected, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state, { payload: user }: PayloadAction<User>) => {
        state.loginLoading = false;
        state.user = user;
      },
    );
    builder.addCase(login.rejected, (state) => {
      state.loginLoading = false;
    });
  },
});

export const usersReducer = usersSlice.reducer;
export const { logoutState } = usersSlice.actions;
export const selectUser = (state: RootState) => state.users.user;
