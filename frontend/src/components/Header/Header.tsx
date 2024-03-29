import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import { Link } from 'react-router-dom';
import { logout } from '../../store/users/usersThunk';

const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-green-400">
      <div className="container mx-auto flex justify-between py-3 items-center">
        <div>
          <Link to="/">
            <h1 className="cursor-pointer font-bold text-white text-[22px]">
              Cocktails
            </h1>
          </Link>
        </div>
        <div className="text-white flex gap-x-3 items-center">
          {user ? (
            <>
              <div className="flex gap-x-3 items-center">
                {user.role === 'admin' ? (
                  <Link className="capitalize" to="admin">
                    admin
                  </Link>
                ) : null}
                <Link className="capitalize" to="my-cocktails">
                  my cocktails
                </Link>
                <img
                  className="rounded-[50%] w-[60px] h-[40px] p-[3px] bg-black"
                  src={
                    user.avatar.includes('users')
                      ? 'http://localhost:3000' + user.avatar
                      : user.avatar
                  }
                  alt="avata"
                />
                <h4 className="font-bold">{user.displayName}</h4>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="bg-blue-300 text-[16px] capitalize py-[5px] rounded-[5px] px-[10px]"
              >
                logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="bg-blue-300 text-[16px] capitalize py-[5px] rounded-[5px] px-[10px]"
                to="/register"
              >
                sign up
              </Link>
              <Link
                className="bg-blue-300 text-[16px] capitalize py-[5px] rounded-[5px] px-[10px]"
                to="/login"
              >
                sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
