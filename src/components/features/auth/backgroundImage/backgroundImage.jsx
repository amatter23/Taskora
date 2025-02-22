import style from './backgroundImage.module.css';

const BackgroundImage = () => {
  return (
    <div className={style.picture}>
      <img
        src='/auth.png'
        alt='Background image'
      />
    </div>
  );
};

export default BackgroundImage;
