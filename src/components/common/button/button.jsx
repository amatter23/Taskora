import style from './button.module.css';
const Button = ({
  children,
  onClick,
  isActive,
  bgColor,
  textColor,
  color,
  width,
  disable,
  title,
  display,
}) => {
  const handleClick = e => {
    onClick(e);
  };

  const buttonClasses = [
    style.button,
    isActive && style['buttonActive'],
    bgColor && style[`buttonBg`],
    textColor && style[`buttonText`],
    disable && style[`buttonDisable`],
    color && style['customeColor'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      onClick={disable ? '' : handleClick}
      style={{ display: display, color: color, width: width }}
      className={buttonClasses}
      title={title}
    >
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default Button;
