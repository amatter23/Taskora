import style from './card.module.css';
import { MdOutlineTaskAlt, MdDateRange } from 'react-icons/md';
import { FaProjectDiagram } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectProjectWithUuid } from '../../../../store/selectors/projects/projectwithUuidSelector';
import { selectTaskWithUuid } from '../../../../store/selectors/tasks/taskwithUuidSelector';
import useDeadlineRemaining from '../../../../hooks/useDeadlineRemaining';
// type can be either 'project' or 'task'
// uuid is used to fetch data
// onClick is a function to handle click events
const Card = ({ type, uuid, onClick }) => {
  const handleClick = () => {
    onClick(uuid);
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
            <h6>{data.tasks.length} task</h6>
          </div>
        ) : (
          <>
            {data == null ? null : (
              <div
                style={{ backgroundColor: '#007bff' + '50' }}
                className={style.tag}
              >
                <h5>{data.tag.name}</h5>
              </div>
            )}
            <div
              style={{ color: data.project?.color + '50' }}
              className={style.prjectName}
            >
              <FaProjectDiagram />
              <h4>{data.project.name}</h4>
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
