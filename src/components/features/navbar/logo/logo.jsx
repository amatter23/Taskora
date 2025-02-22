import style from './logo.module.css';
const Logo = () => {
  return (
    <div className={style.logo}>
      <img
        src='/logo.png'
        style={{
          width: '1.5rem',
          height: '1.5rem',
          color: 'var(--primary-color)',
        }}
        alt='Logo'
      />
      <h1>Taskora</h1>
    </div>
  );
};

export default Logo;
