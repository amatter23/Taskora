import style from '../../../layouts/authLayout/authLayout.module.css';
import useForgotPassword from '../../../../hooks/auth/useForgotPassword';
import { useState } from 'react';

const ChangePassword = ({ email }) => {
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [passwordMatch, setPasswordMatch] = useState();
  const [otp, setOtp] = useState();
  const [disable, setDisable] = useState(true);

  const handelOtpChange = e => {
    setOtp(e.target.value);
    setDisable(!password || !passwordMatch || !otp);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
    const isMatch = passwordConfirm === e.target.value;
    setPasswordMatch(isMatch);
    setDisable(!password || !isMatch || !otp);
  };
  const handleConfirmPasswordChange = e => {
    const isMatch = password === e.target.value;
    setPasswordConfirm(e.target.value);
    setPasswordMatch(isMatch);
    setDisable(!password || !isMatch || !otp);
  };
  const { handeLForgotPassword, forgotPasswordIsLoading } = useForgotPassword();

  const handeLForgot = async (e, password, otp) => {
    e.preventDefault();
    await handeLForgotPassword(email, otp, password);
  };

  return (
    <form onSubmit={e => handeLForgot(e, password, otp)}>
      <div>
        <label>OTP</label>
        <input
          placeholder='Enter the OTP'
          type='number'
          onChange={e => {
            handelOtpChange(e);
          }}
        />
      </div>
      <div>
        <label>New Password</label>
        <input
          onChange={e => {
            handlePasswordChange(e);
          }}
          type='password'
          placeholder='At least 6 characters'
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          onChange={e => {
            handleConfirmPasswordChange(e);
          }}
          type='password'
          placeholder='At least 6 characters'
        />
        <label>
          {password ? (passwordMatch ? '' : 'password not match') : ''}
        </label>
      </div>
      <button
        className={
          disable || forgotPasswordIsLoading
            ? style.actionBtnDisabled
            : style.actionBtn
        }
        type='submit'
        disabled={disable}
      >
        {forgotPasswordIsLoading ? 'Changing...' : 'Change Password'}
      </button>
    </form>
  );
};

export default ChangePassword;
