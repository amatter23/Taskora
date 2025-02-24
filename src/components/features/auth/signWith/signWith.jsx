import style from './signWith.module.css';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useState } from 'react';
const SignWith = () => {
  const API_URL = '/backend';
  const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI;

  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = e => {
    if (isDisabled) {
      e.preventDefault();
    } else {
      setIsDisabled(true);
    }
  };
  console.log(isDisabled);
  return (
    <div className={style.signWith}>
      <div className={style.or}>
        <div></div>
        <h5>Or</h5>
        <div></div>
      </div>

      <a
        className={isDisabled ? style.loginWithDisabled : style.loginWith}
        href={`${API_URL}/auth/google`}
        onClick={handleClick}
      >
        <FaGoogle />
        Continue with Google
      </a>

      <a
        className={isDisabled ? style.loginWithDisabled : style.loginWith}
        href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user:email`}
        onClick={handleClick}
      >
        <FaGithub />
        Continue with GitHub
      </a>
    </div>
  );
};

export default SignWith;
