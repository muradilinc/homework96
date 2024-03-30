import React from 'react';
import { Link } from 'react-router-dom';
import placeholder from '../../assets/placeholder.jpg';
import { CocktailData } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import {
  getCocktails,
  updateStatusCocktail,
} from '../../store/cocktails/cocktailsThunk';
import { sumRating } from '../../helpers/sumRating';

interface Props {
  cocktail: CocktailData;
}

const CocktailsCard: React.FC<Props> = ({ cocktail }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const updateCocktailHandle = async (id: string) => {
    if (user?.role === 'admin') {
      await dispatch(updateStatusCocktail(id)).unwrap();
      await dispatch(getCocktails('admin'));
    }
    return false;
  };

  return (
    <div
      key={cocktail._id}
      className="w-full flex flex-col max-w-[350px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative"
    >
      {cocktail.isPublished ? null : (
        <span
          onClick={() => updateCocktailHandle(cocktail._id)}
          className="py-[5px] text-white px-[10px] bg-red-500 rounded-[5px] absolute top-[15px] right-[5px]"
        >
          unpublished
        </span>
      )}
      <Link to={`/cocktails/${cocktail._id}`}>
        <img
          src={
            cocktail.image
              ? 'http://localhost:3000' + cocktail.image
              : placeholder
          }
          alt="CocktailImage"
        />
      </Link>
      <div className="px-5 pb-5 grow">
        <Link to={`/cocktails/${cocktail._id}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {cocktail.title}
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: 5 }, (_, index) => {
              const ratingExists = index < cocktail.rating.length;
              return (
                <svg
                  key={index}
                  className={`w-4 h-4 ${
                    ratingExists
                      ? 'text-yellow-300'
                      : 'text-gray-200 dark:text-gray-600'
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              );
            })}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {sumRating(cocktail)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            {cocktail.user.displayName}
          </span>
          <Link
            to={`/cocktails/${cocktail._id}`}
            className="text-white capitalize bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CocktailsCard;
