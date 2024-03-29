import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { X } from '@phosphor-icons/react';
import { CocktailCommonData, CocktailMutation, Ingredient } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { createCocktail } from '../../store/cocktails/cocktailsThunk';

const NewCocktailPage = () => {
  const [ingredient, setIngredient] = useState<Ingredient>({
    id: '',
    name: '',
    count: '',
  });
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [cocktail, setCocktail] = useState<CocktailMutation>({
    title: '',
    image: null,
    recipe: '',
  });
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [imageData, setImageData] = useState('');
  const dispatch = useAppDispatch();

  const changeIngredient = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const changeCocktail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setCocktail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addIngredientHandle = () => {
    const id = new Date().toISOString();
    setIngredients((prevState) => [
      ...prevState,
      { id, name: ingredient.name, count: ingredient.count },
    ]);
  };

  const deleteIngredientHandle = (id: string) => {
    const ingredientsCommon = [...ingredients];
    const filteredIngredients = ingredientsCommon.filter(
      (ingredient) => ingredient.id !== id,
    );
    setIngredients(filteredIngredients);
  };

  const selectImage = () => {
    if (imageSelect.current) {
      imageSelect.current.click();
    }
  };

  const changeImageFiled = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      setFilename(files[0].name);
      const imageUrl = URL.createObjectURL(files[0]);
      setImageData(imageUrl);
      setCocktail((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const clearImageField = () => {
    setFilename('');
    setImageData('');
    setCocktail((prevState) => ({
      ...prevState,
      image: null,
    }));
    if (imageSelect.current) {
      imageSelect.current.value = '';
    }
  };

  const createCocktailHandle = async (event: FormEvent) => {
    event.preventDefault();
    const cocktailObject: CocktailCommonData = {
      cocktail,
      ingredients,
    };
    await dispatch(createCocktail(cocktailObject)).unwrap();
  };

  console.log(cocktail);

  return (
    <div className="bg-[#E7E7E7]">
      <h2 className="font-bold text-[26px]">Add new cocktail!</h2>
      <form
        onSubmit={createCocktailHandle}
        className="grid grid-cols-1 my-[20px] px-[10px] gap-y-3"
      >
        <div className="grid grid-cols-2 items-center">
          <p className="capitalize">name</p>
          <input
            className="border-b py-[5px] px-[10px] text-[20px] outline-0 border-black"
            type="text"
            name="title"
            value={cocktail.title}
            onChange={changeCocktail}
            required
          />
        </div>
        <div className="grid grid-cols-2">
          <p className="capitalize">ingredients</p>
          <div>
            <div className="flex flex-col gap-y-3">
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="flex justify-between">
                  <input
                    defaultValue={ingredient.name}
                    className="border-b w-[70%] py-[5px] px-[10px] text-[20px] outline-0 border-black"
                    type="text"
                  />
                  <input
                    defaultValue={ingredient.count}
                    type="text"
                    className="border-b w-[25%] py-[5px] px-[10px] text-[20px] outline-0 border-black"
                  />
                  <button
                    onClick={() => deleteIngredientHandle(ingredient.id)}
                    type="button"
                  >
                    <X size={23} />
                  </button>
                </div>
              ))}
              <div className="flex justify-between">
                <input
                  name="name"
                  value={ingredient.name}
                  onChange={changeIngredient}
                  className="border-b w-[70%] py-[5px] px-[10px] text-[20px] outline-0 border-black"
                  type="text"
                />
                <input
                  name="count"
                  value={ingredient.count}
                  onChange={changeIngredient}
                  type="text"
                  className="border-b w-[25%] py-[5px] px-[10px] text-[20px] outline-0 border-black"
                />
              </div>
            </div>
            <button type="button" onClick={addIngredientHandle}>
              add ingredient
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <p className="capitalize">recipe</p>
          <textarea
            className="border-b outline-0 border-black"
            cols={30}
            rows={3}
            name="recipe"
            onChange={changeCocktail}
            required
          />
        </div>
        <div className="grid grid-cols-2">
          <p className="capitalize">image</p>
          <input
            type="file"
            className="hidden"
            name="image"
            ref={imageSelect}
            onChange={changeImageFiled}
            required
          />
          <div className="flex flex-col gap-y-3">
            {filename.length === 0 ? (
              <button
                className="capitalize border-blue-700 border text-blue-600 font-bold p-[5px] px-[10px] rounded-[35px]"
                onClick={selectImage}
                type="button"
              >
                browse
              </button>
            ) : (
              <div className="flex relative">
                <img
                  className="w-full object-contain max-h-[350px]"
                  src={imageData}
                  alt="preview"
                />
                <button
                  onClick={clearImageField}
                  type="button"
                  className="absolute bg-[#ff6314] text-white px-[10px] py-[2px] text-center right-[15px] top-[10px] rounded-[50%]"
                >
                  x
                </button>
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="capitalize">
          create cocktail
        </button>
      </form>
    </div>
  );
};

export default NewCocktailPage;
