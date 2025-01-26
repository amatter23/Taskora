import style from './miniCard.module.css';
import { useSelector } from 'react-redux';
import { selectProjectWithUuid } from '../../../../store/selectors/projects/projectwithUuidSelector';
import { selectTaskWithUuid } from '../../../../store/selectors/tasks/taskwithUuidSelector';
const MiniCard = ({ uuid, type }) => {
  const data = useSelector(state =>
    type === 'project'
      ? selectProjectWithUuid(state, uuid)
      : selectTaskWithUuid(state, uuid)
  );
  return (
    <div
      className={style.row}
      onClick={() => {
        console.log('wating data page view');
      }}
    >
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
