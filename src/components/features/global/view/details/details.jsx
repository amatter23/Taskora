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
  const { handleUpdate } = useContentUpdate(type);
  return (
    <div className={style.details}>
      <div className={style.name}>
        <AiOutlineProject style={{ color: color }} />
        <input
          autoFocus
          className={`${style.input} ${style.inputName}`}
          defaultValue={name}
          onBlur={e =>
            uuid && e.target.value != name
              ? handleUpdate(uuid, 'name', e.target.value)
              : ''
          }
          onChange={e => {
            onNameChange(e.target.value);
          }}
          placeholder='Submit essay on AI by Thursday p1'
          maxLength={60}
        />
      </div>
      <div className={style.description}>
        <ImParagraphLeft className={style.icon} />
        <input
          className={`${style.input} ${style.inputDescription}`}
          defaultValue={description}
          onBlur={e =>
            uuid && e.target.value != description
              ? handleUpdate(uuid, 'description', e.target.value)
              : ''
          }
          onChange={e => {
            onDescriptionChange(e.target.value);
          }}
          placeholder='description'
          maxLength={250}
        />
      </div>
    </div>
  );
};

export default Details;
