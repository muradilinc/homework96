import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';
import {
  GlobalError,
  LoginMutation,
  LoginResponse,
  RegisterMutation,
  RegisterResponse,
  ValidationError,
} from '../../types';
import { RootState } from '../../app/store';
import { logoutState } from './usersSlice';

export const register = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (user, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append('email', user.email);
    formData.append('displayName', user.username);
    if (user.avatar) {
      formData.append('avatar', user.avatar);
    }
    formData.append('password', user.password);

    const response = await axiosApi.post<RegisterResponse>('/users', formData);
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const login = createAsyncThunk<
  LoginResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (user, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<LoginResponse>(
      '/users/sessions',
      user,
    );
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const googleLogin = createAsyncThunk<
  RegisterResponse,
  string,
  { rejectValue: GlobalError }
>('users/googleLogin', async (credential, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>('/google', {
      credential,
    });
    return response.data;
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data);
    }

    throw error;
  }
});

export const logout = createAsyncThunk<void, undefined, { state: RootState }>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete('/users/sessions');
    dispatch(logoutState());
  },
);
