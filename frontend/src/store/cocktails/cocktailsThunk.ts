import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { CocktailCommonData, CocktailData, Rating } from '../../types';
import { RootState } from '../../app/store';

export const createCocktail = createAsyncThunk<
  void,
  CocktailCommonData,
  { state: RootState }
>('cocktail/createCocktail', async (cocktail, { getState }) => {
  try {
    const user = getState().users.user;
    const formData = new FormData();
    if (user) {
      formData.append('user', user._id);
    }
    formData.append('title', cocktail.cocktail.title);
    if (cocktail.cocktail.image) {
      formData.append('image', cocktail.cocktail.image);
    }
    formData.append('recipe', cocktail.cocktail.recipe);
    formData.append('ingredients', JSON.stringify(cocktail.ingredients));
    await axiosApi.post('/cocktails', formData);
  } catch (error) {
    console.log(error);
  }
});

export const getCocktails = createAsyncThunk<
  CocktailData[],
  string | undefined
>('cocktail/getAll', async (role) => {
  if (role) {
    const response = await axiosApi.get<CocktailData[]>(
      `/cocktails?admin=true`,
    );
    return response.data;
  } else {
    const response = await axiosApi.get<CocktailData[]>(`/cocktails`);
    return response.data;
  }
});

export const getMyCocktails = createAsyncThunk<
  CocktailData[],
  undefined,
  { state: RootState }
>('cocktail/getMyAll', async (_, { getState }) => {
  const userId = getState().users.user?._id;
  const response = await axiosApi.get<CocktailData[]>(
    `/cocktails?userId=${userId}`,
  );
  return response.data;
});

export const getSingleCocktail = createAsyncThunk<CocktailData, string>(
  'cocktail/getSingleCocktail',
  async (id) => {
    const response = await axiosApi.get<CocktailData>(`/cocktails/${id}`);
    if (!response.data) {
      throw new Error('Not found!');
    }
    return response.data;
  },
);

export const updateStatusCocktail = createAsyncThunk<void, string>(
  'cocktail/updateStatusCocktail',
  async (id) => {
    return await axiosApi.patch(`/cocktails/${id}`);
  },
);

interface UpdateGrade {
  idCocktail: string;
  rating: Rating;
}

export const updateGradeCocktail = createAsyncThunk<void, UpdateGrade>(
  'cocktail/updateGrade',
  async ({ idCocktail, rating }) => {
    return await axiosApi.patch(
      `cocktails/${idCocktail}/change-rating`,
      rating,
    );
  },
);

export const deleteCocktail = createAsyncThunk<void, string>(
  'cocktail/deleteCocktail',
  async (id) => {
    return await axiosApi.delete(`/cocktails/${id}`);
  },
);
