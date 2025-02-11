import style from './registerPage.module.css';
import SignWith from '../signWith/signWith';
import AuthState from '../authState/authState';
import BackgroundImage from '../backgroundImage/backgroundImage';
import useRegistration from '../../../../hooks/auth/useRegistration';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const RegisterPage = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const { handleRegister, registerIsLoading } = useRegistration();
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const registration = async e => {
    e.preventDefault();
    if (!disable) {
      const success = await handleRegister({ name, email, password });
      if (success) {
        navigate('/');
      }
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
    <div className={style.login}>
      <div className={style.loginContainer}>
        <div className={style.form}>
          <div className={style.formContent}>
            <div className={style.title}>
              <img
                className={style.logo}
                src='https://res.cloudinary.com/de9jdl1lm/image/upload/v1738898452/taskora-api/xfujhxusx4ymtdlclcp3.png'
                alt=''
                style={{
                  width: '2rem',
                  height: '2rem',
                  color: 'var(--primary-color)',
                }}
              />
              <h1>Create Account</h1>
              <h6>Join us to boost your productivity</h6>
            </div>
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
                    ? style.registerBtnDisabled
                    : style.registerBtn
                }
                type='submit'
              >
                {registerIsLoading ? 'Authenticating...' : 'Register'}
              </button>
            </form>
            <SignWith></SignWith>
            <AuthState
              title={`Do you have an account ?`}
              link={'/login'}
              type={'Sign in'}
            ></AuthState>
          </div>
        </div>
        <BackgroundImage></BackgroundImage>
      </div>
    </div>
  );
};

export default RegisterPage;
