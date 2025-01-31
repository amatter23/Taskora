/**
 * A component that renders a clickable card with minimal information
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.uuid - Unique identifier for the project or task
 * @param {('project'|'task')} props.type - Determines if the card represents a project or task
 * @returns {JSX.Element} A card displaying either project (with color) or task information
 *
 * @example
 * <MiniCard
 *   onClick={() => {}}
 *   uuid="123e4567-e89b"
 *   type="project"
 * />
 */
import style from './miniCard.module.css';
import { useSelector } from 'react-redux';
import { selectProjectWithUuid } from '../../../../store/selectors/projects/projectwithUuidSelector';
import { selectTaskWithUuid } from '../../../../store/selectors/tasks/taskwithUuidSelector';
import useModalComponent from '../../../../hooks/useModalComponent';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import View from '../../global/view/view/view';
const MiniCard = ({ onClick, uuid, type }) => {
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();
  const data = useSelector(state =>
    type === 'project'
      ? selectProjectWithUuid(state, uuid)
      : selectTaskWithUuid(state, uuid)
  );
  const handleClick = () => {
    setComponent(<View type={type} uuid={uuid} />);
    toggleVisibility();
  };
  return (
    <div className={style.row} onClick={handleClick}>
      {type === 'project' ? (
        <div
          className={style.color}
          style={{ backgroundColor: data.color }}
        ></div>
      ) : (
        ''
      )}
      <h3>{data.name}</h3>
    </div>
  );
};
export default MiniCard;
