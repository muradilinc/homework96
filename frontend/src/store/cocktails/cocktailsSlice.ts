import { CocktailData } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getCocktails,
  getMyCocktails,
  getSingleCocktail,
} from './cocktailsThunk';
import { RootState } from '../../app/store';

interface CocktailsState {
  cocktail: CocktailData | null;
  cocktails: CocktailData[];
  cocktailsLoading: boolean;
  cocktailLoading: boolean;
}

const initialState: CocktailsState = {
  cocktail: null,
  cocktails: [],
  cocktailsLoading: false,
  cocktailLoading: false,
};

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCocktails.pending, (state) => {
      state.cocktailsLoading = true;
    });
    builder.addCase(
      getCocktails.fulfilled,
      (state, { payload: cocktails }: PayloadAction<CocktailData[]>) => {
        state.cocktailsLoading = false;
        state.cocktails = cocktails;
      },
    );
    builder.addCase(getCocktails.rejected, (state) => {
      state.cocktailsLoading = false;
    });
    builder.addCase(getMyCocktails.pending, (state) => {
      state.cocktailsLoading = true;
    });
    builder.addCase(
      getMyCocktails.fulfilled,
      (state, { payload: cocktails }: PayloadAction<CocktailData[]>) => {
        state.cocktailsLoading = false;
        state.cocktails = cocktails;
      },
    );
    builder.addCase(getMyCocktails.rejected, (state) => {
      state.cocktailsLoading = false;
    });
    builder.addCase(getSingleCocktail.pending, (state) => {
      state.cocktailLoading = true;
    });
    builder.addCase(
      getSingleCocktail.fulfilled,
      (state, { payload: cocktail }: PayloadAction<CocktailData>) => {
        state.cocktailLoading = false;
        state.cocktail = cocktail;
      },
    );
    builder.addCase(getSingleCocktail.rejected, (state) => {
      state.cocktailLoading = false;
    });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.cocktails;
export const selectCocktail = (state: RootState) => state.cocktails.cocktail;
export const selectCocktailsLoading = (state: RootState) =>
  state.cocktails.cocktailsLoading;
export const selectCocktailLoading = (state: RootState) =>
  state.cocktails.cocktailLoading;
