import { Calendar } from 'antd';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoSunny } from 'react-icons/io5';
import DateLabel from '../dateLabel/dateLable';
import style from './datePicker.module.css';
import dayjs from 'dayjs';
const DatePicker = ({ onChange, defaultValue }) => {
  const defaultDate = defaultValue ? dayjs(defaultValue) : dayjs();

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
        value={defaultDate}
        defaultValue={defaultDate}
      />
    </div>
  );
};

export default DatePicker;
