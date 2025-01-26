import style from './button.module.css';
const Button = ({ children, onClick, isActive, bgColor, textColor, color }) => {
  const handleClick = e => {
    onClick(e);
  };

  const buttonClasses = [
    style.button,
    isActive && style['buttonActive'],
    bgColor && style[`buttonBg`],
    textColor && style[`buttonText`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      onClick={handleClick}
      style={{ color: color || '' }}
      className={buttonClasses}
    >
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default Button;
