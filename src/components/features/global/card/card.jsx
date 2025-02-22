/**
 * A versatile card component that displays either project or task information
 * @component
 * @param {Object} props - Component props
 * @param {'project'|'task'} props.type - Determines whether the card displays project or task information
 * @param {string} props.uuid - Unique identifier for the project or task
 *
 * @returns {JSX.Element} A card section containing:
 * - Title section with name and description
 * - Footer section with:
 *   - For projects: task count
 *   - For tasks: tag (if exists) and project name
 *   - Due date for both types
 *
 * @example
 * // Project card
 * <Card type="project" uuid="project-123" />
 *
 * // Task card
 * <Card type="task" uuid="task-456" />
 *
 * @description
 * The card is clickable and will open a modal with detailed view of the project/task.
 * It uses Redux store to fetch data based on the UUID and type.
 * Styling is handled through CSS modules (style object).
 */
import style from './card.module.css';
import { MdOutlineTaskAlt, MdDateRange } from 'react-icons/md';
import { FaProjectDiagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectProjectWithUuid } from '../../../../store/selectors/projects/projectwithUuidSelector';
import { selectTaskWithUuid } from '../../../../store/selectors/tasks/taskwithUuidSelector';
import useDeadlineRemaining from '../../../../hooks/useDeadlineRemaining';
import View from '../view/view/view';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import useModalComponent from '../../../../hooks/useModalComponent';

const Card = ({ type, uuid }) => {
  const toggleVisibility = useModalVisibility();
  const setComponent = useModalComponent();

  const handleClick = () => {
    setComponent(<View uuid={uuid} type={type} />);
    toggleVisibility();
  };

  const data =
    useSelector(state => {
      if (type === 'task') {
        return selectTaskWithUuid(state, uuid);
      }
      return selectProjectWithUuid(state, uuid);
    }) || {};
  return (
    <section onClick={handleClick} className={style.card}>
      <main className={style.title}>
        <div className={style.name}>
          <h2>{data.name}</h2>
          {type === 'project' ? (
            <div
              className={style.color}
              style={{ backgroundColor: data.color }}
            ></div>
          ) : null}
        </div>
        <h5>{data.description}</h5>
      </main>
      <footer className={style.footer}>
        {type === 'project' ? (
          <div className={style.tasksCount}>
            <MdOutlineTaskAlt />
            <h6>{data?.tasks?.length} task</h6>
          </div>
        ) : (
          <>
            {data.tag === undefined ? null : (
              <div
                style={{ backgroundColor: '#007bff' + '50' }}
                className={style.tag}
              >
                <h5>{data?.tag.name}</h5>
              </div>
            )}
            <div
              style={{ color: data.project?.color + '50' }}
              className={style.prjectName}
            >
              <FaProjectDiagram />
              <h4>{data?.project?.name}</h4>
            </div>
          </>
        )}

        <div className={style.dueDate}>
          <MdDateRange />
          <h4>{useDeadlineRemaining(data.dueDate)}</h4>
        </div>
      </footer>
    </section>
  );
};

export default Card;
