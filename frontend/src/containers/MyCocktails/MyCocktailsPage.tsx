import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getMyCocktails } from '../../store/cocktails/cocktailsThunk';
import CocktailsItems from '../../components/CocktailCards/CocktailsItems';
import { selectCocktailsLoading } from '../../store/cocktails/cocktailsSlice';
import Spinner from '../../components/Spinner/Spinner';

const MyCocktailsPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(getMyCocktails());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>My Cocktails</h2>
      <CocktailsItems />
    </div>
  );
};

export default MyCocktailsPage;
