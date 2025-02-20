import style from '../../../layouts/authLayout/authLayout.module.css';
import useRegistration from '../../../../hooks/auth/useRegistration';
import { useState } from 'react';
import AuthLayout from '../../../layouts/authLayout/authLayout';
const RegisterForm = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const { handleRegister, registerIsLoading } = useRegistration();
  const [disable, setDisable] = useState(true);
  const registration = async e => {
    e.preventDefault();
    if (!disable) {
      await handleRegister({ name, email, password });
    }
  };

  const handleNameChange = e => {
    const newName = e.target.value;
    setName(newName);
    setDisable(!newName || !email || !password || !passwordMatch);
  };

  const handleEmailChange = e => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setDisable(!name || !newEmail || !password || !passwordMatch);
  };

  const handlePasswordChange = e => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setDisable(!name || !email || !newPassword || !passwordMatch);
  };

  const handleConfirmPasswordChange = e => {
    const isMatch = password === e.target.value;
    setPasswordMatch(isMatch);
    setDisable(!name || !email || !password || !isMatch);
  };

  return (
    <AuthLayout
      title='Create Account'
      description='Join us to boost your productivity
      and make your life easier.'
      signWith
      authState={'register'}
    >
      <form
        onSubmit={e => {
          registration(e);
        }}
      >
        <div>
          <div>
            <label>Full Name</label>
            <input
              onChange={e => {
                handleNameChange(e);
              }}
              placeholder='Enter your full name'
              type='text'
            />
          </div>
          <label>Email</label>
          <input
            onChange={e => {
              handleEmailChange(e);
            }}
            placeholder='Example@email.com'
            type='email'
          />
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={e => {
              handlePasswordChange(e);
            }}
            placeholder='At least 6 characters'
            type='password'
          />
        </div>
        <div>
          <label>Confirm password</label>
          <input
            onChange={e => {
              handleConfirmPasswordChange(e);
            }}
            placeholder='Confirm your password'
            type='password'
          />
          <label>
            {password ? (passwordMatch ? '' : 'password not match') : ''}
          </label>
        </div>
        <button
          disabled={disable}
          className={
            disable || registerIsLoading
              ? style.actionBtnDisabled
              : style.actionBtn
          }
          type='submit'
        >
          {registerIsLoading ? 'Authenticating...' : 'Register'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;
