import useLogOut from '../../../hooks/auth/useLogout';
import Button from '../button/button';
import style from './logout.module.css';
const Logout = () => {
  const { handleLogout, logoutIsLoading } = useLogOut();
  return (
    <div className={style.logout}>
      <Button
        disable={logoutIsLoading ? true : false}
        onClick={e => {
          handleLogout();
        }}
      >
        <div>
          <h4>{logoutIsLoading ? 'Logging out... ' : 'logout'}</h4>
        </div>
      </Button>
    </div>
  );
};
export default Logout;
