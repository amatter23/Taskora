import style from './board.module.css';
import BoardColumn from '../boardColumn/boardColumn';
import { useSelector } from 'react-redux';
import { selectAllStatuses } from '../../../../store/selectors/statuses/allStatusesSelector';
const Board = () => {
  const statuses = useSelector(selectAllStatuses);
  if (statuses.length === 0)
    return (
      <main className={style.boardContainer}>
        <h1>No statuses Add your First Project now</h1>
      </main>
    );
  return (
    <main className={style.boardContainer}>
      {statuses.map(status => (
        <BoardColumn statusUuid={status.uuid} key={status.uuid} />
      ))}
    </main>
  );
};

export default Board;
