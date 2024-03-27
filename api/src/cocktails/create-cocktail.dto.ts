export class CreateCocktailDto {
  user: string;
  title: string;
  recipe: string;
  ingredients: [
    {
      name: string;
      count: string;
    },
  ];
}
