import style from './image.module.css';
import { useSelector } from 'react-redux';

const Image = ({ onClick }) => {
  const userData = useSelector(state => state.auth.user);
  return (
    <div onClick={onClick} className={style.profile}>
      {userData.picture ? (
        <img src={userData.picture} />
      ) : (
        <div className={style.pic}>
          <h1>{userData.name ? userData.name.charAt(0).toUpperCase() : ''}</h1>
        </div>
      )}
    </div>
  );
};
export default Image;
