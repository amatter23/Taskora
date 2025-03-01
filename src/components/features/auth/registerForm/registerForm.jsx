import style from '../../../layouts/authLayout/authLayout.module.css';
import useRegistration from '../../../../hooks/auth/useRegistration';
import { useState, useEffect } from 'react';
import AuthLayout from '../../../layouts/authLayout/authLayout';
import CreatePassword from '../createPassword/createPassword';
import { useIsValidName } from '../../../../hooks/auth/useIsValidNama';
const RegisterForm = () => {
  const { name, setName, isValidName, nameError } = useIsValidName();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    letter: false,
    digit: false,
    special: false,
    length: false,
  });
  const { handleRegister, registerIsLoading } = useRegistration();
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    setDisable(
      !isValidName || 
      !email || 
      !password || 
      !passwordMatch || 
      !isValidPassword
    );
  }, [isValidName, email, password, passwordMatch, isValidPassword]);
  
  const registration = async e => {
    e.preventDefault();
    if (!disable && isValidName && isValidPassword && passwordMatch) {
      await handleRegister({ name, email, password });
    }
  };

  const handleNameChange = e => {
    const newName = e.target.value;
    setName(newName);
  };

  const handleEmailChange = e => {
    const newEmail = e.target.value;
    setEmail(newEmail);
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
  };
  const handleConfirmPasswordChange = e => {
    const isMatch = password === e.target.value;
    setPasswordConfirm(e.target.value);
    setPasswordMatch(isMatch);
  };

  return (
    <AuthLayout
      title='Create Account'
      description='Join us to boost your productivity
      and make your life easier.'
      signWith
      authState={'register'}
    >
      <form onSubmit={registration}>
        <div>
          <div>
            <label>Full Name</label>
            <input
              value={name}
              onChange={handleNameChange}
              placeholder='Enter your full name'
              type='text'
              className={nameError ? style.inputError : ''}
            />
            {nameError && <label className={style.errorText}>{nameError}</label>}
          </div>
          <label>Email</label>
          <input
            value={email}
            onChange={handleEmailChange}
            placeholder='Example@email.com'
            type='email'
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
            disable || registerIsLoading
              ? style.actionBtnDisabled
              : style.actionBtn
          }
          type='submit'
          disabled={disable || registerIsLoading}
        >
          {registerIsLoading ? 'Authenticating...' : 'Register'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;
