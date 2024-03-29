export interface User {
  _id: string;
  email: string;
  displayName: string;
  token: string;
  role: string;
  avatar: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface RegisterMutation {
  email: string;
  username: string;
  password: string;
  avatar: File | null;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface Ingredient {
  id: string;
  name: string;
  count: string;
}

export interface CocktailMutation {
  title: string;
  image: File | null;
  recipe: string;
}

export interface CocktailCommonData {
  cocktail: CocktailMutation;
  ingredients: Ingredient[];
}

export interface CocktailData {
  _id: string;
  title: string;
  image: string | null;
  isPublished: boolean;
  recipe: string;
  user: User;
}
