import { CocktailData } from '../types';

export const sumRating = (cocktail: CocktailData) => {
  if (!cocktail || !cocktail.rating || cocktail.rating.length === 0) {
    return 0;
  }
  const totalGrade = cocktail.rating.reduce((sum, item) => {
    return sum + item.grade;
  }, 0);

  return totalGrade / cocktail.rating.length;
};
