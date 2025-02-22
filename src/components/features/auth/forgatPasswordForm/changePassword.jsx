import style from '../../../layouts/authLayout/authLayout.module.css';
import useForgotPassword from '../../../../hooks/auth/useForgotPassword';
import CreatePassword from '../createPassword/createPassword';
import { useState } from 'react';

const ChangePassword = ({ email }) => {
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [passwordMatch, setPasswordMatch] = useState();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    letter: false,
    digit: false,
    special: false,
    length: false,
  });
  const [otp, setOtp] = useState();
  const [disable, setDisable] = useState(true);

  const handelOtpChange = e => {
    setOtp(e.target.value);
    setDisable(!password || !passwordMatch || !e.target.value);
  };
  const handlePasswordChange = e => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};:'",.<>/?]).{8,}$/;
    const hasLetter = /[A-Za-z]/.test(newPassword);
    const hasDigit = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};:'",.<>/?]/.test(
      newPassword
    );
    const hasLength = newPassword?.length >= 8;
    const isValid = passwordRegex.test(newPassword);
    setIsValidPassword(isValid);
    const passwordMatch = newPassword === passwordConfirm;
    setPasswordMatch(passwordMatch);
    setPasswordErrors({
      letter: hasLetter,
      digit: hasDigit,
      special: hasSpecialChar,
      length: hasLength,
    });
    setDisable(!newPassword || !passwordMatch || !isValid || !otp);
  };
  const handleConfirmPasswordChange = e => {
    const isMatch = password === e.target.value;
    setPasswordConfirm(e.target.value);
    setPasswordMatch(isMatch);
    setDisable(!password || !isMatch || !isValidPassword || !otp);
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
      <CreatePassword
        handlePasswordChange={handlePasswordChange}
        passwordErrors={passwordErrors}
        handleConfirmPasswordChange={handleConfirmPasswordChange}
        password={password}
        passwordMatch={passwordMatch}
      />
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
