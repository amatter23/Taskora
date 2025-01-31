/**
 * A component for selecting and displaying dates with optional update functionality
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onDateSelect - Callback function triggered when a date is selected
 * @param {Object} props.data - Initial data containing date and title information
 * @param {Object} props.Type - Component type for rendering the date selector UI
 * @param {string} [props.uuid] - Unique identifier for updating date in storage
 * @param {string} [props.type] - Type identifier for content update context
 *
 * @returns {JSX.Element} A date selector dropdown component that displays either
 * a calendar icon or a date range icon with color coding for today/tomorrow
 *
 * @example
 * <DateSelect
 *   onDateSelect={(date) => handleDate(date)}
 *   data={{ date: "2023-12-25", title: "Tomorrow" }}
 *   Type={CustomTypeComponent}
 *   uuid="123"
 *   type="task"
 * />
 */
import { useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import DatePicker from '../datePicker/datePicker';
import DropDown from '../../dropDown/dropDown';
import useContentUpdate from '../../../../../../hooks/useContentUpdate';
const DateSelect = ({ onDateSelect, data, Type, uuid, type }) => {
  const { handleUpdate } = useContentUpdate(type);
  const [date, setDate] = useState(data?.date);
  const [title, setTitle] = useState(data?.title);
  const handleDateSelect = async date => {
    if (uuid) {
      const updated = await handleUpdate(uuid, 'dueDate', date.date);
      if (updated) {
        setDate(date?.date);
        onDateSelect?.(date?.date);
        setTitle(date?.text);
      }
    } else {
      setDate(date?.date);
      onDateSelect?.(date?.date);
      setTitle(date?.text);
    }
  };
  return (
    <DropDown content={DatePicker} onChange={handleDateSelect}>
      <Type title={date ? title : 'Date'}>
        {date ? (
          <MdDateRange
            color={
              title === 'Today'
                ? '#25b84c'
                : title === 'Tomorrow'
                ? '#ff9a14'
                : ''
            }
          />
        ) : (
          <CiCalendarDate />
        )}
      </Type>
    </DropDown>
  );
};

export default DateSelect;
