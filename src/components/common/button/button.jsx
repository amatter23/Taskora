/**
 * A reusable Button component with customizable styles and functionality
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be displayed inside the button
 * @param {Function} props.onClick - Click event handler
 * @param {boolean} props.isActive - Controls active state styling
 * @param {string} props.bgColor - Background color class name
 * @param {string} props.textColor - Text color class name
 * @param {string} props.color - Custom color value
 * @param {string|number} props.width - Button width value
 * @param {boolean} props.disable - Controls if button is disabled
 * @returns {JSX.Element} A styled button component
 */

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
      style={{ color: color, width: width }}
      className={buttonClasses}
    >
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default Button;
