import style from './backgroundImage.module.css';

const BackgroundImage = () => {
  return (
    <div className={style.picture}>
      <img
        src='https://res.cloudinary.com/de9jdl1lm/image/upload/v1738898512/taskora-api/ygskxcthhtgrtekq0agd.png'
        alt='Background image'
      />
    </div>
  );
};

export default BackgroundImage;
