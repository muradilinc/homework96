import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../store/users/usersSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useAppSelector(selectUser);
  // const navigate = useNavigate();

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
              <button className="bg-blue-300 text-[16px] capitalize py-[5px] rounded-[5px] px-[10px]">
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
