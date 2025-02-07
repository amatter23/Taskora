import { useState } from 'react';
import DropDown from '../../dropDown/dropDown';
import TagPicker from '../tagPicker/tagPicker';
import { FaTag } from 'react-icons/fa';
import useContentUpdate from '../../../../../../hooks/useContentUpdate';
const TagSelect = ({ data, onTagSelect, Type, uuid, type }) => {
  const [tag, setTag] = useState(data);
  const { handleUpdate, isLoading } = useContentUpdate(type);

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
      isLoading={isLoading}
    >
      <Type isLoading={isLoading} title={tag ? tag.name : 'Tags'}>
        {tag ? <FaTag color={tag.color + 70} /> : <FaTag />}
      </Type>
    </DropDown>
  );
};

export default TagSelect;
