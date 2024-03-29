import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { RegisterMutation } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { register } from '../../store/users/usersThunk';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [state, setState] = useState<RegisterMutation>({
    email: '',
    username: '',
    password: '',
    avatar: null,
  });
  const imageSelect = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState('');
  const [imageData, setImageData] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const clearImageField = () => {
    setFilename('');
    setImageData('');
    setState((prevState) => ({
      ...prevState,
      avatar: null,
    }));
    if (imageSelect.current) {
      imageSelect.current.value = '';
    }
  };

  const registerHandle = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(register(state)).unwrap();
    setState({
      email: '',
      username: '',
      avatar: null,
      password: '',
    });
    setFilename('');
    setImageData('');
    if (imageSelect.current) {
      imageSelect.current.value = '';
    }
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className="bg-[#E7E7E7] w-[40%] p-5 rounded-[5px]">
        <h2 className="text-center font-semibold text-[32px] text-green-400">
          Register form
        </h2>
        <form
          onSubmit={registerHandle}
          className="flex flex-col gap-y-3 my-[15px]"
        >
          <input
            className="bg-inherit text-[20px] outline-0 px-[10px] py-[5px] border-b border-black placeholder:capitalize"
            type="email"
            placeholder="email"
            name="email"
            value={state.email}
            onChange={changeFields}
            required
          />
          <input
            className="bg-inherit text-[20px]  outline-0 px-[10px] py-[5px] border-b border-black placeholder:capitalize"
            type="text"
            placeholder="nickname"
            name="username"
            value={state.username}
            onChange={changeFields}
            required
          />
          <input
            type="file"
            className="hidden"
            name="avatar"
            ref={imageSelect}
            onChange={changeImageFiled}
            required
          />
          <div className="flex flex-col gap-y-3">
            <h4 className="capitalize text-[22px]">avatar</h4>
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
          <input
            className="bg-inherit text-[20px]  outline-0 px-[10px] py-[5px] border-b border-black placeholder:capitalize"
            placeholder="password"
            type="password"
            name="password"
            value={state.password}
            onChange={changeFields}
            required
          />
          <button
            type="submit"
            className="capitalize bg-green-400 py-[10px] rounded-[5px] text-white my-[20px]"
          >
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
