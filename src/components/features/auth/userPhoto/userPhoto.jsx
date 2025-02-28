import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useUpdateProfile } from '../../../../hooks/useUpdateProfile';
import { useSelector } from 'react-redux';
import style from './userPhoto.module.css';
const UserPhoto = () => {
  const userData = useSelector(state => state.auth.user);
  const { updateProfile, isLoading } = useUpdateProfile();
  const handleChange = async info => {
    if (info.file.status === 'done') {
      await updateProfile({ update: info.file.originFileObj, isPhoto: true });
    }
  };
  return (
    <Upload
      name='image'
      listType='picture-circle'
      disabled={isLoading}
      showUploadList={false}
      customRequest={({ onSuccess }) => {
        setTimeout(() => {
          onSuccess('ok');
        }, 0);
      }}
      onChange={handleChange}
      className={style.userPhotoUpload}
    >
      {isLoading ? (
        <>
          <div className={style.loading}>
            <LoadingOutlined />
            <div>Loading</div>
          </div>
        </>
      ) : userData.picture ? (
        <img
          src={userData.picture}
          className={style.userPhoto}
          alt='avatar'
          title='Change photo'
        />
      ) : (
        <button
          style={{
            border: 0,
            background: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            color: 'var(--text-color)',
          }}
          title='Change photo'
        >
          {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              color: 'var(--text-color)',
            }}
          >
            <div style={{ padding: '0 0.5rem' }}>
              <div>Upload</div>
              <div style={{ color: 'var(--light-text-color)' }}>
                png, jpg, jpeg
              </div>
            </div>
          </div>
        </button>
      )}
    </Upload>
  );
};

export default UserPhoto;
