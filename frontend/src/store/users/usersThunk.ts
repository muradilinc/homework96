import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const register = createAsyncThunk('users/register', async () => {
  try {
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
