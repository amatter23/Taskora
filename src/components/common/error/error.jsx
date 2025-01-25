import { MdError } from 'react-icons/md';
import style from './error.module.css';
const Error = ({ text }) => {
  return (
    <div className={style.container}>
      <MdError size='1.5rem' color='var(--error-color)' />
      <h2>{text}</h2>
    </div>
  );
};
Error.defaultProps = {
  text: 'Tasks are acting up! Give us a moment to fix this.',
};

export default Error;
