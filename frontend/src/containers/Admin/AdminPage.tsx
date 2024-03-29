import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCocktails } from '../../store/cocktails/cocktailsThunk';
import CocktailsItems from '../../components/CocktailCards/CocktailsItems';
import { selectCocktailsLoading } from '../../store/cocktails/cocktailsSlice';
import Spinner from '../../components/Spinner/Spinner';

const AdminPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCocktailsLoading);

  useEffect(() => {
    dispatch(getCocktails('admin'));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <CocktailsItems />
    </div>
  );
};

export default AdminPage;
