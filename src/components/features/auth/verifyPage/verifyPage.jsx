import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './verifyPage.module.css';
import { MdEmail } from 'react-icons/md';
import { IoIosRefresh } from 'react-icons/io';
import Button from '../../../common/button/button';
import useVerifyEmail from '../../../../hooks/auth/useVerifyEmail';
import Loading from '../../../common/loading /loading';
import useLogout from '../../../../hooks/auth/useLogout';
import { useSelector } from 'react-redux';
const VerifyPage = () => {
  const navigate = useNavigate();
  const { handleLogout, logoutIsLoading } = useLogout();
  const {
    handelVerifyEmail,
    handelResendEmail,
    verifyEmailLoading,
    resendIsLoading,
  } = useVerifyEmail();
  const email = useSelector(state => state.auth.user.email);
  useEffect(() => {
    handelVerifyEmail();
  }, []);
  if (verifyEmailLoading) {
    return <Loading text='Verifying email...' />;
  }
  return (
    <div className={style.verifyPage}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.content}>
            <MdEmail className={style.emailIcon} />
            <h1>Verify your email</h1>
            <div className={style.text}>
              <p>We{`'`}ve sent a verification link to your email address.</p>
              <p>Please check your inbox and click the link to verify</p>
              <p>your account.</p>
            </div>
          </div>
          <div>
            <div className={style.loader}></div>
          </div>
          <Button
            onClick={() => {
              handelResendEmail(email);
            }}
            textColor={true}
            disable={resendIsLoading}
          >
            {resendIsLoading ? (
              <>Wait a moment ...</>
            ) : (
              <>
                <IoIosRefresh />
                Resend verification email
              </>
            )}
          </Button>
          <div className={style.faq}>
            <h3>Frequently Asked Questions</h3>
            <div>
              <h4>Haven't received the email?</h4>
              <p>
                Please check your spam folder or click the resend button above.
              </p>
            </div>
            <div>
              <h4>Link expired?</h4>
              <p>
                Verification links are valid for 24 hours. Request a new one if
                needed.
              </p>
            </div>
          </div>
          <div className={style.return}>
            <h4
              onClick={() => {
                navigate('/');
              }}
            >
              Return to Home
            </h4>
            <p>Already verified your email? Return to the Home page.</p>
          </div>
          <div className={style.return}>
            <h4
              onClick={() => {
                handleLogout();
              }}
              disabled={logoutIsLoading}
            >
              {logoutIsLoading ? <>Logging out ...</> : <>Logout</>}
            </h4>
            <p>Logout and try again</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyPage;
