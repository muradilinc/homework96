import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getMyCocktails } from '../../store/cocktails/cocktailsThunk';
import CocktailsItems from '../../components/CocktailCards/CocktailsItems';
import {
  selectCocktails,
  selectCocktailsLoading,
} from '../../store/cocktails/cocktailsSlice';
import Spinner from '../../components/Spinner/Spinner';

const MyCocktailsPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCocktailsLoading);
  const cocktails = useAppSelector(selectCocktails);

  useEffect(() => {
    dispatch(getMyCocktails());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>My Cocktails</h2>
      {cocktails.length === 0 ? <h1>No items!</h1> : null}
      <CocktailsItems />
    </div>
  );
};

export default MyCocktailsPage;
