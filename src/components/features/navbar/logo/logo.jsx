import style from './logo.module.css';
import { LuListTodo } from 'react-icons/lu';

const Logo = () => {
  return (
    <div className={style.logo}>
      <LuListTodo className={style.icon} />
      <h1>TO DO</h1>
    </div>
  );
};

export default Logo;
