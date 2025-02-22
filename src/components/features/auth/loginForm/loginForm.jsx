import style from '../../../layouts/authLayout/authLayout.module.css';
import { useNavigate } from 'react-router-dom';
import useLogin from '../../../../hooks/auth/useLogIn';
import { useState } from 'react';
import AuthLayout from '../../../layouts/authLayout/authLayout';
const LoginForm = () => {
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
    <AuthLayout
      title='Welcome back 🤚'
      description={`Productivity is never an accident. It's the result of a commitment to excellence, intelligent planning, and focused effort.`}
      signWith
      authState={'login'}
    >
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
            placeholder='At least 8 characters'
            type='password'
          />
        </div>
        <div className={style.forgetPassword}>
          <h5
            onClick={() => {
              navigate('/forgot-password  ');
            }}
          >
            Forget password
          </h5>
        </div>
        <button
          className={
            disable || isEmailLoading
              ? style.actionBtnDisabled
              : style.actionBtn
          }
          type='submit'
          disabled={disable}
        >
          {isEmailLoading ? 'Authenticating...' : 'Login'}
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
