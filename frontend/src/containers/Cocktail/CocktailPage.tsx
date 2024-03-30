import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  deleteCocktail,
  getSingleCocktail,
  updateGradeCocktail,
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
import { sumRating } from '../../helpers/sumRating';

const CocktailPage = () => {
  const { id } = useParams() as { id: string };
  const cocktail = useAppSelector(selectCocktail);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const loading = useAppSelector(selectCocktailLoading);
  const [grade, setGrade] = useState(0);

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

  const sendGradeHandle = async (event: FormEvent) => {
    event.preventDefault();
    if (grade > 5 || grade < 0) {
      toast.error('Please enter grade 0 to 5');
      return false;
    }
    const author = {
      idCocktail: id,
      rating: {
        userId: user ? user._id : '',
        grade,
      },
    };
    await dispatch(updateGradeCocktail(author)).unwrap();
    await dispatch(getSingleCocktail(id));
    setGrade(0);
  };

  if (loading || !cocktail) {
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
          <h4 className="text-[20] font-bold">
            Rating: {sumRating(cocktail)} ({cocktail.rating.length} votes)
          </h4>
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
        <form className="flex gap-x-3" onSubmit={sendGradeHandle}>
          <input
            className="border border-b text-[20px] px-3"
            type="number"
            value={grade}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setGrade(parseInt(event.target.value))
            }
          />
          <button
            className="bg-green-400 text-white py-[5px] px-[10px]"
            type="submit"
          >
            send
          </button>
        </form>
      </div>
    </>
  );
};

export default CocktailPage;
