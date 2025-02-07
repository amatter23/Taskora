import { useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';
import DatePicker from '../datePicker/datePicker';
import DropDown from '../../dropDown/dropDown';
import useContentUpdate from '../../../../../../hooks/useContentUpdate';
const DateSelect = ({ onDateSelect, data, Type, uuid, type }) => {
  const { handleUpdate, isLoading } = useContentUpdate(type);
  console.log(isLoading);
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
    <DropDown
      isLoading={isLoading}
      content={DatePicker}
      defaultValue={date}
      onChange={handleDateSelect}
    >
      <Type isLoading={isLoading} title={date ? title : 'Date'}>
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
