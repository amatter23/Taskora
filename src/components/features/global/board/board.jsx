import style from './board.module.css';
import BoardColumn from '../boardColumn/boardColumn';
import { useSelector } from 'react-redux';
import { selectAllStatuses } from '../../../../store/selectors/statuses/allStatusesSelector';
import useSearch from '../../../../hooks/useSearch';
const Board = ({ search, nameSearch }) => {
  const statuses = useSelector(selectAllStatuses);
  const dataSearch = useSearch({
    list: statuses,
    from: 'name',
    to: search?.status?.name,
  });

  const preferredOrder = ['INPROGRESS', 'DONE', 'ARCHIVED'];
  const orderedStatuses = [...(dataSearch || [])].sort((a, b) => {
    const norm = (s) =>
      (s?.name || '').toString().toUpperCase().replace(/[\s_]/g, '');
    const ia = preferredOrder.indexOf(norm(a));
    const ib = preferredOrder.indexOf(norm(b));
    if (ia === -1 && ib === -1) return 0;
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return (
    <main className={style.boardContainer}>
      {orderedStatuses.map((status) => (
        <BoardColumn
          search={search}
          nameSearch={nameSearch}
          statusUuid={status.uuid}
          key={status.uuid}
        />
      ))}
    </main>
  );
};

export default Board;
