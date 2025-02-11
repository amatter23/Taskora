import style from './signWith.module.css';
import { FaGoogle } from 'react-icons/fa';
const SignWith = () => {
  const API_URL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : '/api';

  return (
    <div className={style.signWith}>
      <div className={style.or}>
        <div></div>
        <h5>Or</h5>
        <div></div>
      </div>

      <a
        className={style.loginWithGoogle}
        href={`${API_URL}/auth/google`}
      >
        <FaGoogle />
        Continue with Google
      </a>
    </div>
  );
};

export default SignWith;
