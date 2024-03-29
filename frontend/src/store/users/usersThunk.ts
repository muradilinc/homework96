import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi';

export const register = createAsyncThunk('users/register', async () => {
  try {
    const response = await axiosApi.post('/users');
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
});

export const login = createAsyncThunk('users/login', async () => {
  try {
    const response = await axiosApi.post('/users/sessions');
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
});
