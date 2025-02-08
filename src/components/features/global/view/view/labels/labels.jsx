/**
 * A component that renders a collection of select labels for task/project management
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.data - Data object containing date, status, tag and color information
 * @param {string} props.data.dueDate - Due date of the task/project
 * @param {string} props.data.status - Status of the task/project
 * @param {string} props.data.tag - Tag associated with the task/project
 * @param {string} props.data.color - Color code (only for projects)
 * @param {string} props.uuid - Unique identifier for the task/project
 * @param {('task'|'project')} props.type - Type of the item being labeled
 * @returns {JSX.Element} A div containing DateSelect, StatusSelect, TagSelect and
 *                        conditionally ColorSelect (only for projects)
 *
 * @example
 * <Labels
 *   data={{ dueDate: '2023-12-31', status: 'active', tag: 'urgent', color: '#ff0000' }}
 *   uuid="123abc"
 *   type="project"
 * />
 */
import style from './labels.module.css';
import LabelSelect from '../../labelSelect/labelSelect';
import DateSelect from '../../date/dateSelect/dateSelect';
import StatusSelect from '../../status/statusSelect/statusSelect';
import TagSelect from '../../tags/tagSelect/tagSelect';
import ColorSelect from '../../color/colorSelect';
import Delete from '../../delete/delete';
import useHandleDates from '../../../../../../hooks/useHandleDates';
const Labels = ({ data, uuid, type }) => {
  const handelDate = useHandleDates;

  return (
    <div className={style.labels}>
      <div className={style.label}>
        <DateSelect
          data={handelDate(data?.dueDate)}
          Type={LabelSelect}
          uuid={uuid}
          type={type}
        ></DateSelect>
      </div>
      <div className={style.label}>
        <StatusSelect
          data={data?.status}
          Type={LabelSelect}
          uuid={uuid}
          type={type}
        ></StatusSelect>
      </div>
      <div className={style.label}>
        <TagSelect
          data={data?.tag}
          Type={LabelSelect}
          uuid={uuid}
          type={type}
        ></TagSelect>
      </div>
      {type === 'project' ? (
        <ColorSelect data={data?.color} uuid={uuid} type={type}></ColorSelect>
      ) : (
        ''
      )}
      <div className={style.label}>
        <Delete uuid={uuid} type={type}></Delete>
      </div>
    </div>
  );
};
export default Labels;
