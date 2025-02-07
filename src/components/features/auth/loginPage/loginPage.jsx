import style from './loginPage.module.css';
import SignWith from '../signWith/signWith';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../../../hooks/auth/useLogIn';
import Loading from '../../../common/loading /loading';
import AuthState from '../authState/authState';
import BackgroundImage from '../backgroundImage/backgroundImage';
import { useState } from 'react';
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [disable, setDisable] = useState(true);
  const { handleEmailLogin, isEmailLoading } = useLogin();

  const handelLogin = async e => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const success = await handleEmailLogin({ email, password });
    if (isEmailLoading) return <Loading text='Authenticating with Google...' />;
    if (success) {
      navigate('/');
    }
  };

  const handleEmailChange = e => {
    const email = e.target.value;
    setEmail(email);
    setDisable(!email || !password);
  };
  const handlePasswordChange = e => {
    const password = e.target.value;
    setPassword(password);
    setDisable(!email || !password);
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
              <h1>Welcome back 🤚</h1>
              <h6>
                Productivity is never an accident. It's the result of a
                commitment to excellence, intelligent planning, and focused
                effort
              </h6>
            </div>
            <form onSubmit={handelLogin}>
              <div>
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
              <div className={style.forgetPassword}>
                <h5>Forget password</h5>
              </div>
              <button
                className={disable ? style.loginBtnDisabled : style.loginBtn}
                type='submit'
                disabled={disable}
              >
                {isEmailLoading ? 'Authenticating...' : 'Login'}
              </button>
            </form>
            <SignWith></SignWith>
            <AuthState
              title={`Don't have an account ?`}
              link={'/register'}
              type={'Sign up'}
            ></AuthState>
          </div>
        </div>
        <BackgroundImage></BackgroundImage>
      </div>
    </div>
  );
};

export default LoginPage;
