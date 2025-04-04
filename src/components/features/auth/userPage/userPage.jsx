import style from './userPage.module.css';
import { useSelector } from 'react-redux';
import UserPhoto from '../userPhoto/userPhoto';
import ChangePassword from '../changePassword/changePassword';
import UserFullName from '../userFullName/userFullName';
const UserPage = () => {
  const userData = useSelector(state => state.auth.user);
  console.log(userData.createdAt);
  return (
    <div className={style.container}>
      <div className={style.userContainer}>
        <UserPhoto />
        <div className={style.userInfo}>
          <UserFullName />
          <h5>
            {userData?.createdAt
              ? `Member since ${new Date(
                  userData.createdAt
                ).toLocaleDateString()}`
              : null}
          </h5>
        </div>
      </div>
      <div className={style.detailsContainer}>
        <div className={style.emailContainer}>
          <h6>Email</h6>
          <h4>{userData.email}</h4>
        </div>
        {userData?.hasPassword ? <ChangePassword /> : null}
      </div>
    </div>
  );
};

export default UserPage;
