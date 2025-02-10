import { useState } from 'react';
import Button from '../../../common/button/button';
import { FaLock, FaUnlockAlt } from 'react-icons/fa';
import { useUpdateProfile } from '../../../../hooks/useUpdateProfile';
import style from './changePassword.module.css';
const ChangePassword = () => {
  const { updateProfile, isLoading } = useUpdateProfile();
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState('');
  const handelChangePassword = password => {
    const newPassword = {
      password: password,
    };
    updateProfile({ update: newPassword, isPhoto: false });
  };
  return (
    <div className={style.changePasswordContainer}>
      <div
        style={{
          display: changePassword ? 'flex' : 'none',
          justifyContent: 'space-between',
        }}
        className={style.passwordContainer}
      >
        <div className={style.inputContainer}>
          <input
            onChange={e => {
              setPassword(e.target.value);
            }}
            type='password'
          />
          <h6>
            {password.length < 6 ? 'At least 6 characters' : ''}
          </h6>
        </div>

        <Button
          textColor={!isLoading || password.length < 6}
          onClick={e => {
            e.preventDefault();
            handelChangePassword(password);
          }}
          disable={isLoading || password.length < 6}
        >
          <h6>{isLoading ? 'Changing' : 'Change'}</h6>
          <FaUnlockAlt />
        </Button>
      </div>

      <Button
        width={'100%'}
        textColor={true}
        onClick={e => {
          e.preventDefault();
          setChangePassword(!changePassword);
        }}
        display={changePassword ? 'none' : 'flex'}
      >
        <h6>Change Password</h6>
        <FaLock />
      </Button>
    </div>
  );
};

export default ChangePassword;
