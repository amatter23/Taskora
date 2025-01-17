import style from './button.module.css';
const Button = ({ children, onClick }) => {
  console.log('but run');
  const handleClick = e => {
    onClick(e);
  };
  return (
    <div onClick={handleClick} className={style.container}>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default Button;
