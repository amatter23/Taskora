import BackgroundImage from '../../features/auth/backgroundImage/backgroundImage';
import style from './authLayout.module.css';
import AuthState from '../../features/auth/authState/authState';
import SignWith from '../../features/auth/signWith/signWith';
const AuthLayout = ({ children, title, description, authState, signWith }) => {
  return (
    <div className={style.authLayout}>
      <div className={style.authLayoutContainer}>
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
              <h1>{title}</h1>
              <h6>{description}</h6>
            </div>
            {children}
            {signWith ? <SignWith /> : null}
            {authState === 'login' ? (
              <>
                <AuthState
                  title={`Don't have an account?`}
                  link={'/register'}
                  type={'Sign up'}
                ></AuthState>
              </>
            ) : (
              <>
                <AuthState
                  title={`Already have an account?`}
                  link={'/login'}
                  type={'Login'}
                ></AuthState>
              </>
            )}
          </div>
        </div>
        <BackgroundImage></BackgroundImage>
      </div>
    </div>
  );
};

export default AuthLayout;
