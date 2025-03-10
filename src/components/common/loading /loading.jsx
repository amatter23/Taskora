/**
 * Loading component displays a spinner with optional text
 * @param {Object} props - Component props
 * @param {string} props.color - Color of the spinner border
 * @param {string} props.text - Text to display below the spinner
 * @returns {JSX.Element} Loading spinner with text
 */
import style from './loading.module.css';
const Loading = ({ containerHeight, size, color, text, width, height }) => {
  return (
    <div style={{ height: containerHeight }} className={style.container}>
      {/* Spinner element with dynamic border color */}
      <div
        className={style.spinner}
        style={{
          borderTop: ` solid ${size} ${color} `,
          width: width,
          height: height,
        }}
      />
      {/* Text display below spinner */}
      <h1>{text}</h1>
    </div>
  );
};

export default Loading;
