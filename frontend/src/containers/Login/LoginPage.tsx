import { ChangeEvent, useState } from 'react';
import { LoginMutation } from '../../types';

const LoginPage = () => {
  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const changeFields = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <div className="bg-[#E7E7E7] w-[40%] p-5 rounded-[5px]">
        <h2 className="text-center font-semibold text-[32px] text-green-400">
          Login form
        </h2>
        <form className="flex flex-col gap-y-3 my-[15px]">
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
            placeholder="password"
            type="password"
            name="password"
            value={state.password}
            onChange={changeFields}
          />
          <button
            type="submit"
            className="capitalize bg-green-400 py-[10px] rounded-[5px] text-white my-[20px]"
          >
            sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
