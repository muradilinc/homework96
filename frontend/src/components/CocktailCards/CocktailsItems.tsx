import CocktailsCard from './CocktailsCard';
import { useAppSelector } from '../../app/hooks';
import { selectCocktails } from '../../store/cocktails/cocktailsSlice';

const CocktailsItems = () => {
  const cocktails = useAppSelector(selectCocktails);

  return (
    <div className="grid grid-cols-5 gap-x-3 gap-y-3">
      {cocktails.map((cocktail) => (
        <CocktailsCard key={cocktail._id} cocktail={cocktail} />
      ))}
    </div>
  );
};

export default CocktailsItems;
