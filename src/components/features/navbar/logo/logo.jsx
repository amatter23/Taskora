import style from './logo.module.css';
import { LuListTodo } from 'react-icons/lu';

const Logo = () => {
  return (
    <div className={style.logo}>
      <img
        src='../../../../../logo.png'
        style={{
          width: '1.5rem',
          height: '1.5rem',
          color: 'var(--primary-color)',
        }}
        alt=''
      />
      <h1>Taskora</h1>
    </div>
  );
};

export default Logo;
