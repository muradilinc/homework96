import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getMyCocktails } from '../../store/cocktails/cocktailsThunk';
import CocktailsItems from '../../components/CocktailCards/CocktailsItems';

const MyCocktailsPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyCocktails());
  }, []);

  return (
    <div>
      <CocktailsItems person={true} />
    </div>
  );
};

export default MyCocktailsPage;
