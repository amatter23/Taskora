/**
 * A component that displays a date label with an icon and text.
 *
 * @component
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.icon - The icon element to display
 * @param {string} props.text - The text to display next to the icon
 * @param {Date} props.date - The date object to format and display
 * @param {Function} [props.onClick] - Optional click handler for the date label
 * @returns {JSX.Element} A date label component with icon, text and formatted date
 *
 * @example
 * <DateLabel
 *   icon={<CalendarIcon />}
 *   text="Due Date"
 *   date={new Date()}
 *   onClick={() => handleClick()}
 * />
 */
import style from './dateLable.module.css';
const DateLabel = ({ icon, text, date, onClick }) => {
  return (
    <div className={style.dateLabel} onClick={onClick}>
      <div className={style.title}>
        {icon}
        <h4>{text}</h4>
      </div>
      <h4>
        {date.toLocaleDateString('en-US', {
          weekday: 'short',
        })}
      </h4>
    </div>
  );
};

export default DateLabel;
