/**
 * Details component displays and handles editing of item name and description
 * @param {string} name - The name of the item
 * @param {string} description - The description of the item
 * @param {string} uuid - Unique identifier for the item
 * @param {string} type - Type of the item
 * @param {string} color - Color for the project icon
 * @param {function} onNameChange - Callback function for name changes
 * @param {function} onDescriptionChange - Callback function for description changes
 */
import style from './details.module.css';
import useContentUpdate from '../../../../../hooks/useContentUpdate';
import { ImParagraphLeft } from 'react-icons/im';
import { AiOutlineProject } from 'react-icons/ai';
const Details = ({
  name,
  description,
  uuid,
  type,
  color,
  onNameChange,
  onDescriptionChange,
}) => {
  // Custom hook to handle content updates
  const { handleUpdate } = useContentUpdate(type);
  return (
    <div className={style.details}>
      {/* Name input section */}
      <div className={style.name}>
        <AiOutlineProject style={{ color: color }} />
        <input
          className={`${style.input} ${style.inputName}`}
          defaultValue={name}
          // Update name in database when input loses focus and value has changed
          onBlur={e =>
            uuid && e.target.value != name
              ? handleUpdate(uuid, 'name', e.target.value)
              : ''
          }
          // Handle real-time name changes
          onChange={e => {
            onNameChange(e.target.value);
          }}
          placeholder='Submit essay on AI by Thursday p1'
        />
      </div>

      {/* Description input section */}
      <div className={style.description}>
        <ImParagraphLeft className={style.icon} />
        <input
          className={`${style.input} ${style.inputDescription}`}
          defaultValue={description}
          // Update description in database when input loses focus and value has changed
          onBlur={e =>
            uuid && e.target.value != description
              ? handleUpdate(uuid, 'description', e.target.value)
              : ''
          }
          // Handle real-time description changes
          onChange={e => {
            onDescriptionChange(e.target.value);
          }}
          placeholder='description '
        />
      </div>
    </div>
  );
};

export default Details;
