/**
 * A reusable Button component with customizable styles
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to be displayed inside the button
 * @param {Function} props.onClick - Click event handler
 * @param {boolean} props.isActive - Controls active state styling
 * @param {string} props.bgColor - Background color class name
 * @param {string} props.textColor - Text color class name
 * @param {string} props.color - Custom color value
 */
import style from './button.module.css';
const Button = ({ children, onClick, isActive, bgColor, textColor, color }) => {
  // Handle click events and forward them to the onClick prop
  const handleClick = e => {
    onClick(e);
  };

  // Combine CSS classes conditionally
  const buttonClasses = [
    style.button, // Base button style
    isActive && style['buttonActive'], // Active state style
    bgColor && style[`buttonBg`], // Background color style
    textColor && style[`buttonText`], // Text color style
    color && style['customeColor'], // Custom color style
  ]
    .filter(Boolean) // Remove falsy values
    .join(' '); // Join classes with space

  return (
    <div
      onClick={handleClick}
      style={{ color: color || '' }} // Apply custom color if provided
      className={buttonClasses}
    >
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default Button;
