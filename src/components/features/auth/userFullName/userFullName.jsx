import { useSelector } from 'react-redux';
import style from './userFullName.module.css';
import { useUpdateProfile } from '../../../../hooks/useUpdateProfile';
import Loading from '../../../common/loading /loading';
import { useIsValidName } from '../../../../hooks/auth/useIsValidNama';
const UserFullName = () => {
  const userFullName = useSelector(state => state.auth.user.name);
  const { name, setName, isValidName, nameError } =
    useIsValidName(userFullName);
  const { updateProfile, isLoading } = useUpdateProfile();
  const handelChangeName = () => {
    if (name === userFullName || !isValidName) return;
    const newName = {
      name: name,
    };
    updateProfile({ update: newName, isPhoto: false });
  };
  return (
    <div className={style.nameContainer}>
      <h6>Full name</h6>
      <div className={style.inputContainer}>
        <input
          onChange={e => {
            setName(e.target.value);
          }}
          onBlur={handelChangeName}
          type='text'
          className={`${style.title} ${nameError ? style.error : ''}`}
          value={name} 
        />
        <label htmlFor=''>
          {nameError && <div className={style.errorText}>{nameError}</div>}
        </label>
        {isLoading && (
          <Loading
            color={'var(--text-color)'}
            size={'3px'}
            height={'0.5rem'}
            width={'0.5rem'}
            containerHeight={'100%'}
          />
        )}
      </div>
    </div>
  );
};

export default UserFullName;
