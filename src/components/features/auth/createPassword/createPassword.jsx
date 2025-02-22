const CreatePassword = ({
  handlePasswordChange,
  passwordErrors,
  handleConfirmPasswordChange,
  password,
  passwordMatch,
}) => {
  return (
    <>
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
      <label>
        <p>{passwordErrors?.letter ? '✅' : '❌'} Must have a letter</p>
        <p>{passwordErrors?.digit ? '✅' : '❌'} Must have a number</p>
        <p>
          {passwordErrors?.special ? '✅' : '❌'} Must have a special character
        </p>
        {passwordErrors?.length ? '✅' : '❌'} Must have at least 8 characters
      </label>
      <div>
        <label>Confirm password</label>
        <input
          onChange={e => {
            handleConfirmPasswordChange(e);
          }}
          placeholder='Confirm your password'
          type='password'
        />
        <label>
          {password ? (passwordMatch ? '' : 'password not match') : ''}
        </label>
      </div>
    </>
  );
};

export default CreatePassword;
