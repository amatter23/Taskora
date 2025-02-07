import style from './logo.module.css';
import { LuListTodo } from 'react-icons/lu';

const Logo = () => {
  return (
    <div className={style.logo}>
      <img
        src='https://res.cloudinary.com/de9jdl1lm/image/upload/v1738898452/taskora-api/xfujhxusx4ymtdlclcp3.png'
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
