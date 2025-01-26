import style from './image.module.css';
const Image = ({ onClick }) => {
  return (
    <div onClick={onClick} className={style.profile}>
      <img src='https://media.licdn.com/dms/image/v2/D4D03AQEQ-tQyPnWMJQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1710320366583?e=1740009600&v=beta&t=tNGgkWPxAaHOU6BU2UABVN1Xi60eMmngm6wBV_pOth8' />
    </div>
  );
};
export default Image;
