import style from './signWith.module.css';
import { FaGoogle } from 'react-icons/fa';
const SignWith = () => {
  return (
    <div className={style.signWith}>
      <div className={style.or}>
        <div></div>
        <h5>Or</h5>
        <div></div>
      </div>

      <a
        className={style.loginWithGoogle}
        href='https://api.taskora.live/api/v1/auth/google'
      >
        <FaGoogle />
        Continue with Google
      </a>
    </div>
  );
};

export default SignWith;
