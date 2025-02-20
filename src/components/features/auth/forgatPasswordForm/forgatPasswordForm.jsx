import AuthLayout from '../../../layouts/authLayout/authLayout';
import { useState } from 'react';
import ChangePassword from './changePassword';
import GetOtp from './getOtp';
const ForgatPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [otpSended, setOtpSended] = useState(false);
  const handelOtpDone = email => {
    setOtpSended(true);
    setEmail(email);
  };
  return (
    <AuthLayout title='Forgat Password'>
      {otpSended ? <ChangePassword email={email}/> : <GetOtp passData={handelOtpDone} />}
    </AuthLayout>
  );
};

export default ForgatPasswordForm;
