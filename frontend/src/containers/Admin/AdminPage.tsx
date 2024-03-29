import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { getCocktails } from '../../store/cocktails/cocktailsThunk';
import CocktailsItems from '../../components/CocktailCards/CocktailsItems';

const AdminPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCocktails('admin'));
  }, []);

  return (
    <div>
      <CocktailsItems />
    </div>
  );
};

export default AdminPage;
