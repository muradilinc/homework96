import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { selectUser } from '../../store/users/usersSlice';
import CocktailsItems from '../../components/CocktailCards/CocktailsItems';
import { useEffect } from 'react';
import { getCocktails } from '../../store/cocktails/cocktailsThunk';

const HomePage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCocktails());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>Cocktails</h2>
        {user ? (
          <Link
            className="py-[5px] px-[10px] bg-green-400 text-white font-medium capitalize rounded-[5px]"
            to="/new-cocktail"
          >
            create cocktail
          </Link>
        ) : null}
      </div>
      <div className="my-[30px]">
        <CocktailsItems />
      </div>
    </>
  );
};

export default HomePage;
