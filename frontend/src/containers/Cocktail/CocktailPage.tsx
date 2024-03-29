import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteCocktail,
  getSingleCocktail,
  updateStatusCocktail,
} from '../../store/cocktails/cocktailsThunk';
import {
  selectCocktail,
  selectCocktailLoading,
} from '../../store/cocktails/cocktailsSlice';
import placeholder from '../../assets/placeholder.jpg';
import { selectUser } from '../../store/users/usersSlice';
import { Trash } from '@phosphor-icons/react';
import Spinner from '../../components/Spinner/Spinner';
import { toast } from 'react-toastify';

const CocktailPage = () => {
  const { id } = useParams() as { id: string };
  const cocktail = useAppSelector(selectCocktail);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const loading = useAppSelector(selectCocktailLoading);

  useEffect(() => {
    dispatch(getSingleCocktail(id));
  }, [dispatch]);

  const updateStatusHandle = async (idCocktail: string) => {
    await dispatch(updateStatusCocktail(idCocktail)).unwrap();
    await dispatch(getSingleCocktail(id));
    toast.success('Cocktail status changed!');
  };

  const deleteCocktailHandel = async (id: string) => {
    await dispatch(deleteCocktail(id)).unwrap();
    toast.success('Cocktail deleted!');
    navigate(-1);
  };

  if (!cocktail || loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex gap-x-3">
        <div>
          <img
            className="min-h-[450px] max-w-[350px]"
            src={
              cocktail.image
                ? 'http://localhost:3000' + cocktail.image
                : placeholder
            }
            alt="CocktailImg"
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="text-[23px] font-medium">{cocktail.title}</h2>
            {user?.role === 'admin' ? (
              <button
                onClick={() => deleteCocktailHandel(cocktail._id)}
                className="capitalize bg-red-400 text-white py-[5px] px-[10px] rounded-[5px] font-bold"
              >
                <Trash size={23} />
              </button>
            ) : null}
          </div>
          <h4 className="text-[20] font-bold">Rating: 4.5 (2 votes)</h4>
          <div className="flex gap-x-3 items-center">
            <h5 className="text-[20] font-bold">
              Status: {cocktail.isPublished ? 'Published' : 'Unpublished'}
            </h5>
            {user?.role === 'admin' ? (
              <button
                className="capitalize bg-green-400 text-white py-[5px] px-[10px] rounded-[5px] font-bold"
                onClick={() => updateStatusHandle(cocktail._id)}
              >
                change status
              </button>
            ) : null}
          </div>
          <p className="text-[18px] font-medium">Ingredients:</p>
          <ul className="list-disc pl-[25px]">
            {cocktail.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name} - {ingredient.count}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="my-[20px]">
        <h4>Recipe:</h4>
        <p>{cocktail.recipe}</p>
      </div>
      <div>
        <h4>Rate:</h4>
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
          <svg
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-yellow-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-4 h-4 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
          5.0
        </span>
      </div>
    </>
  );
};

export default CocktailPage;
