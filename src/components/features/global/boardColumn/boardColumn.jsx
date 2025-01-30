/**
 * A component that renders a column in a board view for either projects or tasks
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.statusUuid - The UUID of the status to display in this column
 * 
 * @returns {JSX.Element} A column containing:
 *  - Header with status name and count of items
 *  - List of Card components or EmptyState if no items
 * 
 * @example
 * <BoardColumn statusUuid="123e4567-e89b-12d3-a456-426614174000" />
 * 
 * @dependencies
 * - useSelector from redux to get status, type and data
 * - handleNames custom hook for name formatting
 * - EmptyState component for empty columns
 * - Card component for rendering individual items
 */
import style from './boardColumn.module.css';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { selectStatusWithUuid } from '../../../../store/selectors/statuses/statusWithUuidSelector';
import { selectProjectsWithStatues } from '../../../../store/selectors/projects/projectsWithStatuesSelector';
import { selectTasksWithStatues } from '../../../../store/selectors/tasks/tasksWithStatuesSelector';
import useHandleNames from '../../../../hooks/useHandleNames';
import EmptyState from '../../../common/emptyState/emptyState';
const BoardColumn = ({ statusUuid }) => {
  const status = useSelector(state => selectStatusWithUuid(state, statusUuid));
  const type = useSelector(state => state.typeView.typeView);
  const data = useSelector(state =>
    type === 'project'
      ? selectProjectsWithStatues(state, statusUuid)
      : selectTasksWithStatues(state, statusUuid)
  );
  const handleNames = useHandleNames();
  return (
    <main className={style.column}>
      <header
        style={{ borderBottomColor: status.color }}
        className={style.header}
      >
        <h2>{handleNames(status.name)}</h2>
        <div className={style.count}>
          <div>{data.length}</div>
          <div>{type}s</div>
        </div>
      </header>
      <div className={style.cardsContainer}>
        {data.length === 0 ? (
          <div>
            <EmptyState type={type}></EmptyState>
          </div>
        ) : (
          data.map(project => {
            return (
              <Card key={project.uuid} type={type} uuid={project.uuid}></Card>
            );
          })
        )}
      </div>
    </main>
  );
};

export default BoardColumn;
