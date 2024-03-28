import { User } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface UsersState {
  user: User | null;
  loginLoading: boolean;
}

const initialState: UsersState = {
  user: null,
  loginLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const usersReducer = usersSlice.reducer;
export const selectUser = (state: RootState) => state.users.user;
