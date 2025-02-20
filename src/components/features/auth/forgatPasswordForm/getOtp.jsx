import { useState } from 'react';
import style from '../../../layouts/authLayout/authLayout.module.css';
import useForgotPassword from '../../../../hooks/auth/useForgotPassword';

const GetOtp = ({ passData }) => {
  const { handelGetOtp, getOtpResultIsLoading } = useForgotPassword();
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(true);

  const handelOtp = async e => {
    e.preventDefault();
    const result = await handelGetOtp(email);
    if (result) {
      passData(email);
    }
  };

  return (
    <form onSubmit={handelOtp}>
      <div>
        <label>Email</label>
        <input
          placeholder='Enter your email to forget password'
          type='email'
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setDisable(e.target.value === '');
          }}
        />
      </div>
      <button
        disabled={disable}
        className={
          disable || getOtpResultIsLoading
            ? style.actionBtnDisabled
            : style.actionBtn
        }
        type='submit'
      >
        {getOtpResultIsLoading ? 'Authenticating...' : 'Forget Password'}
      </button>
    </form>
  );
};

export default GetOtp;
