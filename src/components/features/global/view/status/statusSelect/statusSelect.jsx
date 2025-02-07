/**
 * A component that renders a dropdown for selecting status with a flag icon.
 *
 * @component
 * @param {Object} props - The component props
 * @param {Function} props.onStatusSelect - Callback function triggered when a status is selected
 * @param {React.ComponentType} props.Type - Component type to render the status display
 * @param {Object} props.data - Initial status data object
 * @param {string} props.uuid - Unique identifier for the status item
 * @param {string} props.type - Type identifier for content update handling
 *
 * @returns {JSX.Element} A dropdown component with status selection functionality
 *
 * @example
 * <StatusSelect
 *   onStatusSelect={(status) => console.log(status)}
 *   Type={StatusTypeComponent}
 *   data={initialStatus}
 *   uuid="123"
 *   type="task"
 * />
 */
import { useState } from 'react';
import DropDown from '../../dropDown/dropDown';
import StatusPicker from '../statusPicker/statusPicker';
import { RiFlag2Fill } from 'react-icons/ri';
import useHandleNames from '../../../../../../hooks/useHandleNames';
import useContentUpdate from '../../../../../../hooks/useContentUpdate';
const StatusSelect = ({ onStatusSelect, Type, data, uuid, type }) => {
  const handleNames = useHandleNames();
  const [status, setStatus] = useState(data);
  const { handleUpdate, isLoading } = useContentUpdate(type);
  const handleStatusSelect = async status => {
    if (uuid) {
      const updated = await handleUpdate(uuid, 'statusUuid', status.uuid);
      if (updated) {
        setStatus(status);
        onStatusSelect?.(status);
      }
    } else {
      setStatus(status);
      onStatusSelect?.(status);
    }
  };

  return (
    <DropDown
      isLoading={isLoading}
      content={StatusPicker}
      onChange={handleStatusSelect}
    >
      <Type
        isLoading={isLoading}
        title={status ? handleNames(status?.name) : 'Status'}
      >
        <RiFlag2Fill style={{ color: status?.color }} />
      </Type>
    </DropDown>
  );
};

export default StatusSelect;
