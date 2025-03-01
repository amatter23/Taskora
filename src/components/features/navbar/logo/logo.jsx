import style from './logo.module.css';
import Lottie from 'lottie-react';
import ramadan from './ramadan.json';

const Logo = () => {
  return (
    <div className={style.logo}>
      <img
        src='/logo.png'
        style={{
          width: '1.5rem',
          height: '1.5rem',
        }}
        alt='Logo'
      />
      <div className={style.title}>
        <h1>Taskora</h1>
        <Lottie
        className={style.lanternAnimation}
          animationData={ramadan}
          loop={true}
          size={0.1}
        />
      </div>
    </div>
  );
};

export default Logo;
