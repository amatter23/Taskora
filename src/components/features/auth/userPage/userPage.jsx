import style from './userPage.module.css';
import { useSelector } from 'react-redux';
import UserPhoto from '../userPhoto/userPhoto';
import ChangePassword from '../changePassword/changePassword';
import UserFullName from '../userFullName/userFullName';
const UserPage = () => {
  const userData = useSelector(state => state.auth.user);
  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <UserPhoto />
        <div className={style.userInfo}>
          <UserFullName />
          <h5>Member since January 2024</h5>
        </div>
      </div>
      <div className={style.detailsContainer}>
        <div className={style.emailContainer}>
          <h6>Email</h6>
          <h4>{userData.email}</h4>
        </div>
        <ChangePassword />
      </div>
    </div>
  );
};

export default UserPage;
