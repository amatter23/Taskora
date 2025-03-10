/**
 * A component that allows users to create and select tags
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onChange - Callback function triggered when a tag is selected
 *
 * @example
 * ```jsx
 * <TagPicker onChange={(selectedTag) => handleTagSelect(selectedTag)} />
 * ```
 *
 * @returns {JSX.Element} A form with input fields for creating new tags and a list of existing tags
 *
 * Features:
 * - Creates new tags with custom names and colors
 * - Displays existing tags from the store
 * - Allows selection of existing tags
 * - Input validation for new tag creation
 * - Color picker for tag customization
 *
 * Dependencies:
 * - Requires Redux store with tags state
 * - Uses useCreateTagMutation for tag creation
 * - Requires Button, Input, ColorSelect, and StatusLabel components
 */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllTags } from '../../../../../../store/selectors/tags/allTagsSelector';
import StatusLable from '../tagLable/tagLable';
import { FaTag } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import { Input } from 'antd';
import style from './tagPicker.module.css';
import Button from '../../../../../common/button/button';
import { useCreateTagMutation } from '../../../../../../store/services/tagsApi';
import ColorSelect from '../../color/colorSelect';
import { useCreateMutation } from '../../../../../../hooks/useCreateMutation';
import useSearch from '../../../../../../hooks/useSearch';
const TagPicker = ({ onChange }) => {
  const tags = useSelector(state => selectAllTags(state));
  const [newTag, setNewTag] = useState({
    name: '',
    color: '#306bff',
  });
  const search = useSearch({ list: tags, from: 'name', to: newTag });

  const { handleMutation } = useCreateMutation(useCreateTagMutation, {
    successMessage: `Tag added successfully`,
    onSuccess: () =>
      setNewTag({
        name: '',
        color: '#306bff',
      }),
  });
  const handleCreateTag = () =>
    handleMutation({
      name: newTag?.name,
      color: newTag?.color,
    });
  return (
    <>
      <div className={style.newTag}>
        <div className={style.inputs}>
          <Input
            className={style.input}
            placeholder='New tag name'
            onChange={e => {
              setNewTag({
                ...newTag,
                name: e.target.value,
              });
            }}
          />
          <ColorSelect
            onColorSelect={value => {
              setNewTag({
                ...newTag,
                color: value,
              });
            }}
            data={'var(--primary-color)'}
          />
        </div>
        <div style={{ display: newTag.name === '' ? 'none' : 'flex' }}>
          <Button
            onClick={handleCreateTag}
            bgColor={true}
            color={'var(--text-color)'}
          >
            <IoAdd />
            Create&ldquo;{newTag.name}&quot;
          </Button>
        </div>
      </div>
      {search.map(tag => (
        <StatusLable
          key={tag.uuid}
          iconColor={tag.color + 70}
          icon={<FaTag />}
          title={tag.name}
          onClick={() => {
            onChange(tag);
          }}
        ></StatusLable>
      ))}
    </>
  );
};

export default TagPicker;
