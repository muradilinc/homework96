import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getSingleCocktail } from '../../store/cocktails/cocktailsThunk';
import { selectCocktail } from '../../store/cocktails/cocktailsSlice';

const CocktailPage = () => {
  const { id } = useParams() as { id: string };
  const cocktail = useAppSelector(selectCocktail);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSingleCocktail(id));
  }, [dispatch]);

  console.log(cocktail);

  return <div></div>;
};

export default CocktailPage;
