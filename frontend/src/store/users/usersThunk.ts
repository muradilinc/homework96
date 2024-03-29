import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import { LoginMutation, RegisterMutation, User } from '../../types';
import { RootState } from '../../app/store';
import { logoutState } from './usersSlice';

export const register = createAsyncThunk<User, RegisterMutation>(
  'users/register',
  async (user) => {
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('displayName', user.username);
      if (user.avatar) {
        formData.append('avatar', user.avatar);
      }
      formData.append('password', user.password);

      const response = await axiosApi.post('/users', formData);
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        console.log(error);
      }

      throw error;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation>(
  'users/login',
  async (user) => {
    try {
      const response = await axiosApi.post('/users/sessions', user);
      return response.data;
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status === 422
      ) {
        console.log(error);
      }

      throw error;
    }
  },
);

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete('/users/sessions');
    dispatch(logoutState());
  },
);
