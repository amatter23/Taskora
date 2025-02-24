import style from './signWith.module.css';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const SignWith = () => {
  const API_URL = '/backend';
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

  return (
    <div className={style.signWith}>
      <div className={style.or}>
        <div></div>
        <h5>Or</h5>
        <div></div>
      </div>

      <a className={style.loginWithGoogle} href={`${API_URL}/auth/google`}>
        <FaGoogle />
        Continue with Google
      </a>
      <a
        className={style.loginWithGoogle}
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`}
      >
        <FaGithub />
        Continue with GitHub
      </a>
    </div>
  );
};

export default SignWith;
