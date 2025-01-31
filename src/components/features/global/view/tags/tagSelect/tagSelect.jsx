/**
 * A component that provides tag selection functionality with optional update capabilities
 *
 * @component
 * @param {Object} props - The component props
 * @param {Object} props.data - Initial tag data
 * @param {Function} props.onTagSelect - Callback function triggered when a tag is selected
 * @param {React.ComponentType} props.Type - Component type to render the tag display
 * @param {string} [props.uuid] - UUID for updating tag associations
 * @param {string} props.type - Type identifier for content update context
 *
 * @returns {JSX.Element} A dropdown component with tag selection functionality
 *
 * @example
 * <TagSelect
 *   data={tagData}
 *   onTagSelect={(tag) => handleTagSelection(tag)}
 *   Type={CustomTagComponent}
 *   uuid="123e4567-e89b"
 *   type="task"
 * />
 */
import { useState } from 'react';
import DropDown from '../../dropDown/dropDown';
import TagPicker from '../tagPicker/tagPicker';
import { FaTag } from 'react-icons/fa';
import useContentUpdate from '../../../../../../hooks/useContentUpdate';
const TagSelect = ({ data, onTagSelect, Type, uuid, type }) => {
  const [tag, setTag] = useState(data);
  const { handleUpdate } = useContentUpdate(type);

  const handleTagSelect = async tag => {
    if (uuid) {
      const updated = await handleUpdate(uuid, 'tagUuid', tag.uuid);
      if (updated) {
        setTag(tag);
        onTagSelect?.(tag);
      }
    } else {
      setTag(tag);
      onTagSelect?.(tag);
    }
  };

  return (
    <DropDown
      maxHeight={'400px'}
      content={TagPicker}
      onChange={handleTagSelect}
    >
      <Type title={tag ? tag.name : 'Tags'}>
        {tag ? <FaTag color={tag.color + 70} /> : <FaTag />}
      </Type>
    </DropDown>
  );
};

export default TagSelect;
