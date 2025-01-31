/**
 * A component that renders a list of selectable status options
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.onChange - Callback function triggered when a status is selected
 * @returns {JSX.Element} A div containing status options that can be selected
 *
 * @example
 * // Example usage:
 * <StatusPicker onChange={(selectedStatus) => handleStatusChange(selectedStatus)} />
 */
import { useSelector } from 'react-redux';
import { selectAllStatuses } from '../../../../../../store/selectors/statuses/allStatusesSelector';
import StatusLable from '../statusLable/statusLable';
import { RiFlag2Fill } from 'react-icons/ri';
const StatusPicker = ({ onChange }) => {
  const statuses = useSelector(state => selectAllStatuses(state));
  return (
    <div>
      {statuses.map(status => (
        <StatusLable
          key={status.uuid}
          iconColor={status.color}
          icon={<RiFlag2Fill />}
          title={status.name}
          onClick={() => {
            onChange(status);
          }}
        ></StatusLable>
      ))}
    </div>
  );
};
export default StatusPicker;
