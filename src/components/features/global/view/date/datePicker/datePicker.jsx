/**
 * A date picker component that allows users to select a date either through preset options or a calendar.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.onChange - Callback function that is called when a date is selected.
 *                                   Receives an object with {date: Date, text: string} as argument.
 * 
 * @example
 * // Basic usage
 * const handleDateChange = ({date, text}) => {
 *   console.log(date, text);
 * };
 * 
 * <DatePicker onChange={handleDateChange} />
 * 
 * @returns {JSX.Element} A date picker component with preset options (Today/Tomorrow) and a calendar widget
 */
import { Calendar } from 'antd';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoSunny } from 'react-icons/io5';
import DateLabel from '../dateLabel/dateLable';
import style from './datePicker.module.css';
const DatePicker = ({ onChange }) => {
  const dateOptions = [
    {
      text: 'Today',
      date: new Date(),
      icon: <FaCalendarAlt style={{ color: '#25b84c' }} />,
    },
    {
      text: 'Tomorrow',
      date: new Date(Date.now() + 86400000),
      icon: <IoSunny style={{ color: '#ff9a14' }} />,
    },
  ];

  return (
    <div className={style.datePicker}>
      <div className={style.header}>
        {dateOptions.map(option => (
          <DateLabel
            key={option.text}
            {...option}
            onClick={() => {
              onChange({ date: option.date, text: option.text });
            }}
          />
        ))}
      </div>
      <Calendar
        onChange={value => {
          onChange({
            date: value.$d,
            text: value.$d.toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
            }),
          });
        }}
        inC
        style={{
          width: '100%',
          backgroundColor: 'var(--background-color)',
        }}
        fullscreen={false}
      />
    </div>
  );
};

export default DatePicker;
